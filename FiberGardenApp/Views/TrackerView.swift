import SwiftUI

struct TrackerView: View {
    @EnvironmentObject var appState: AppStateViewModel

    private var remainingFiber: Double {
        max(appState.dailyGoal - appState.dailyFiber, 0)
    }

    private var foodsLoggedToday: Int {
        appState.dailyFoodsLog.values.reduce(0, +)
    }

    private var nextEggDaysRemaining: Int {
        let remainder = appState.streakCount % 7
        return remainder == 0 && appState.streakCount > 0 ? 0 : max(7 - remainder, 0)
    }

    private var topFoodsToday: [(name: String, count: Int, fiber: Double, seeds: Int)] {
        appState.foods
            .compactMap { food in
                guard let count = appState.dailyFoodsLog[food.name], count > 0 else { return nil }
                return (
                    name: food.name,
                    count: count,
                    fiber: Double(count) * food.fiberGrams,
                    seeds: count * food.seedReward
                )
            }
            .sorted { lhs, rhs in
                if lhs.fiber == rhs.fiber {
                    return lhs.name < rhs.name
                }
                return lhs.fiber > rhs.fiber
            }
    }

    var body: some View {
        NavigationStack {
            ScrollView(showsIndicators: false) {
                VStack(spacing: 20) {
                    heroSection
                    insightsRow
                    logSection
                    rewardSection
                    footerActions
                }
                .padding(.horizontal, 16)
                .padding(.top, 12)
                .padding(.bottom, 32)
            }
            .background(trackerBackground.ignoresSafeArea())
            .navigationTitle("Tracker")
            .navigationBarTitleDisplayMode(.large)
            .onAppear {
                appState.checkDateRollover()
            }
        }
    }

    private var heroSection: some View {
        ZStack(alignment: .bottom) {
            RoundedRectangle(cornerRadius: 34, style: .continuous)
                .fill(
                    LinearGradient(
                        colors: [
                            Color(red: 0.83, green: 0.93, blue: 0.84),
                            Color(red: 0.91, green: 0.97, blue: 0.91),
                            Color.white
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .overlay {
                    RoundedRectangle(cornerRadius: 34, style: .continuous)
                        .stroke(Color.white.opacity(0.75), lineWidth: 1.2)
                }
                .shadow(color: Color(red: 0.27, green: 0.53, blue: 0.31).opacity(0.12), radius: 30, y: 18)

            decorativeGarden

            VStack(spacing: 18) {
                VStack(spacing: 6) {
                    Text("Fiber Garden")
                        .font(.system(size: 30, weight: .bold, design: .rounded))
                    Text("Dein heutiger Ballaststoff-Fortschritt")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                .padding(.top, 24)

                progressRing

                VStack(spacing: 10) {
                    Text(appState.gardenUnlockedToday ? "Ziel erreicht – dein Garten ist offen" : "Noch \(remainingFiber, specifier: "%.1f") g bis zu deinem Tagesziel")
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(appState.gardenUnlockedToday ? Color.green : Color.primary.opacity(0.75))

                    HStack(spacing: 10) {
                        trackerCapsule(title: "Ziel", value: "\(Int(appState.dailyGoal)) g", accent: .green)
                        trackerCapsule(title: "Geloggt", value: "\(foodsLoggedToday)", accent: .mint)
                    }
                }
                .padding(.bottom, 28)
            }
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity)
    }

    private var progressRing: some View {
        ZStack {
            Circle()
                .stroke(Color.white.opacity(0.85), lineWidth: 22)

            Circle()
                .stroke(Color.green.opacity(0.12), style: StrokeStyle(lineWidth: 16, lineCap: .round, dash: [10, 16]))
                .padding(11)

            Circle()
                .trim(from: 0, to: appState.dailyProgress)
                .stroke(
                    AngularGradient(
                        colors: [Color(red: 0.30, green: 0.70, blue: 0.34), Color(red: 0.62, green: 0.85, blue: 0.22), Color(red: 0.18, green: 0.58, blue: 0.33)],
                        center: .center
                    ),
                    style: StrokeStyle(lineWidth: 18, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .shadow(color: Color.green.opacity(0.22), radius: 10, y: 6)
                .animation(.easeInOut(duration: 0.35), value: appState.dailyProgress)

            VStack(spacing: 6) {
                Text("\(appState.dailyFiber, specifier: "%.1f")g")
                    .font(.system(size: 44, weight: .bold, design: .rounded))
                    .contentTransition(.numericText())
                Text("BALLASTSTOFFE HEUTE")
                    .font(.headline.weight(.bold))
                    .tracking(1.5)
                Text(appState.gardenUnlockedToday ? "Tagesziel geschafft" : "Ziel: \(Int(appState.dailyGoal)) g")
                    .font(.subheadline.weight(.semibold))
                    .padding(.horizontal, 18)
                    .padding(.vertical, 9)
                    .background(.ultraThinMaterial, in: Capsule())
            }
            .foregroundStyle(Color(red: 0.09, green: 0.32, blue: 0.16))
        }
        .frame(width: 270, height: 270)
        .padding(.vertical, 6)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Tagesfortschritt")
        .accessibilityValue("\(appState.dailyFiber, specifier: "%.1f") von \(appState.dailyGoal, specifier: "%.0f") Gramm")
    }

    private var insightsRow: some View {
        HStack(alignment: .top, spacing: 12) {
            metricCard(
                title: "Fortschritt",
                value: "\(Int(appState.dailyProgress * 100))%",
                subtitle: "\(appState.dailyFiber, specifier: "%.1f") / \(appState.dailyGoal, specifier: "%.0f") g",
                symbol: "leaf.fill",
                accent: [Color(red: 0.22, green: 0.67, blue: 0.27), Color(red: 0.56, green: 0.86, blue: 0.32)]
            )

            metricCard(
                title: "Samen",
                value: "\(appState.totalSeeds)",
                subtitle: foodsLoggedToday > 0 ? "+\(topFoodsToday.first?.seeds ?? 0) stärkste Portion" : "Mit jedem Eintrag wächst dein Vorrat",
                symbol: "sparkles",
                accent: [Color(red: 0.16, green: 0.63, blue: 0.88), Color(red: 0.46, green: 0.82, blue: 0.95)]
            )

            metricCard(
                title: "Streak",
                value: "\(appState.streakCount)",
                subtitle: nextEggDaysRemaining == 0 ? "Ei bereit zum Einlösen" : "Noch \(nextEggDaysRemaining) Tage bis zum Ei",
                symbol: "flame.fill",
                accent: [Color(red: 0.94, green: 0.78, blue: 0.16), Color(red: 0.99, green: 0.55, blue: 0.24)]
            )
        }
    }

    private var logSection: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Heute im Fokus")
                        .font(.title3.weight(.bold))
                    Text(topFoodsToday.isEmpty ? "Starte mit deiner ersten Portion." : "Deine stärksten Ballaststoff-Quellen von heute.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                Text("\(foodsLoggedToday) Einträge")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.green)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(Color.green.opacity(0.10), in: Capsule())
            }

            if topFoodsToday.isEmpty {
                emptyStateCard
            } else {
                VStack(spacing: 12) {
                    ForEach(Array(topFoodsToday.enumerated()), id: \.offset) { index, entry in
                        loggedFoodRow(rank: index + 1, entry: entry)
                    }
                }
            }

            VStack(alignment: .leading, spacing: 12) {
                Text("Schnell hinzufügen")
                    .font(.headline)

                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                    ForEach(appState.foods) { food in
                        quickAddCard(food)
                    }
                }
            }
        }
        .padding(18)
        .background(
            RoundedRectangle(cornerRadius: 30, style: .continuous)
                .fill(Color(.systemBackground).opacity(0.88))
        )
        .overlay {
            RoundedRectangle(cornerRadius: 30, style: .continuous)
                .stroke(Color.white.opacity(0.7), lineWidth: 1)
        }
        .shadow(color: Color.black.opacity(0.06), radius: 18, y: 10)
    }

    private var rewardSection: some View {
        VStack(spacing: 14) {
            HStack(alignment: .center, spacing: 14) {
                VStack(alignment: .leading, spacing: 6) {
                    Text("Belohnungsweg")
                        .font(.title3.weight(.bold))
                    Text(appState.gardenUnlockedToday ? "Heute ist dein Habitat freigeschaltet – Zeit zum Dekorieren." : "Erreiche dein Ziel, um Samen und dein Habitat freizuschalten.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 4) {
                    Text("Eier")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text("\(appState.totalEggs)")
                        .font(.system(size: 28, weight: .bold, design: .rounded))
                        .foregroundStyle(.orange)
                }
            }

            VStack(spacing: 10) {
                progressSummaryRow(label: "Tagesziel", detail: appState.gardenUnlockedToday ? "Freigeschaltet" : "\(remainingFiber, specifier: "%.1f") g fehlen", progress: appState.dailyProgress, colors: [Color.green, Color.mint])
                progressSummaryRow(label: "Ei-Zyklus", detail: "\(appState.daysInCurrentEggCycle)/7 Tage", progress: appState.daysToNextEggProgress, colors: [Color.yellow, Color.orange])
            }
        }
        .padding(18)
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 28, style: .continuous))
        .overlay {
            RoundedRectangle(cornerRadius: 28, style: .continuous)
                .stroke(Color.white.opacity(0.65), lineWidth: 1)
        }
    }

    private var footerActions: some View {
        CardView {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Label("Debug & Verwaltung", systemImage: "slider.horizontal.3")
                        .font(.headline)
                    Spacer()
                    Text("Samen gesamt: \(appState.totalSeeds)")
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(.secondary)
                }

                Text("Nutze den Reset nur für Entwicklung und Tests. Dein Fortschritt für heute wird dabei zurückgesetzt.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                Button(role: .destructive) {
                    appState.resetDayDebug()
                } label: {
                    Label("Tag zurücksetzen", systemImage: "arrow.counterclockwise")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.bordered)
            }
        }
    }

    private var emptyStateCard: some View {
        VStack(spacing: 12) {
            Image(systemName: "leaf.circle")
                .font(.system(size: 42))
                .foregroundStyle(.green)
            Text("Noch keine Lebensmittel geloggt")
                .font(.headline)
            Text("Wähle unten eine Portion aus, damit dein Tagesring und deine Belohnungen wachsen.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 28)
        .background(Color.green.opacity(0.06), in: RoundedRectangle(cornerRadius: 24, style: .continuous))
    }

    private func quickAddCard(_ food: FoodItem) -> some View {
        Button {
            appState.addFood(food)
        } label: {
            VStack(alignment: .leading, spacing: 10) {
                HStack(alignment: .top) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(food.name)
                            .font(.headline)
                            .foregroundStyle(.primary)
                            .multilineTextAlignment(.leading)
                        Text(food.portionLabel)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    Spacer(minLength: 8)
                    Image(systemName: "plus.circle.fill")
                        .font(.title3)
                        .foregroundStyle(.green)
                }

                VStack(alignment: .leading, spacing: 4) {
                    Text("\(food.fiberGrams, specifier: "%.1f") g Ballaststoffe")
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(Color(red: 0.09, green: 0.37, blue: 0.16))
                    Text("+\(food.seedReward) Samen")
                        .font(.caption.weight(.medium))
                        .foregroundStyle(.secondary)
                }
            }
            .padding(14)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(
                RoundedRectangle(cornerRadius: 22, style: .continuous)
                    .fill(
                        LinearGradient(
                            colors: [Color.white, Color(red: 0.93, green: 0.98, blue: 0.93)],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
            )
            .overlay {
                RoundedRectangle(cornerRadius: 22, style: .continuous)
                    .stroke(Color.green.opacity(0.10), lineWidth: 1)
            }
        }
        .buttonStyle(.plain)
        .accessibilityLabel("\(food.name) Portion hinzufügen")
    }

    private func loggedFoodRow(rank: Int, entry: (name: String, count: Int, fiber: Double, seeds: Int)) -> some View {
        HStack(spacing: 14) {
            ZStack {
                Circle()
                    .fill(Color.green.opacity(0.12))
                    .frame(width: 40, height: 40)
                Text("#\(rank)")
                    .font(.subheadline.weight(.bold))
                    .foregroundStyle(.green)
            }

            VStack(alignment: .leading, spacing: 4) {
                Text(entry.name)
                    .font(.headline)
                Text("\(entry.count)x Portion • \(entry.seeds) Samen")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Spacer()

            Text("\(entry.fiber, specifier: "%.1f") g")
                .font(.headline.weight(.bold))
                .foregroundStyle(Color(red: 0.08, green: 0.39, blue: 0.17))
        }
        .padding(14)
        .background(Color(.secondarySystemBackground), in: RoundedRectangle(cornerRadius: 22, style: .continuous))
    }

    private func metricCard(title: String, value: String, subtitle: String, symbol: String, accent: [Color]) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Image(systemName: symbol)
                .font(.title3)
                .foregroundStyle(LinearGradient(colors: accent, startPoint: .topLeading, endPoint: .bottomTrailing))

            VStack(alignment: .leading, spacing: 3) {
                Text(title)
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.secondary)
                Text(value)
                    .font(.system(size: 28, weight: .bold, design: .rounded))
                Text(subtitle)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }

            Capsule()
                .fill(LinearGradient(colors: accent, startPoint: .leading, endPoint: .trailing))
                .frame(height: 8)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(16)
        .background(
            RoundedRectangle(cornerRadius: 26, style: .continuous)
                .fill(Color(.systemBackground).opacity(0.92))
        )
        .overlay {
            RoundedRectangle(cornerRadius: 26, style: .continuous)
                .stroke(Color.white.opacity(0.72), lineWidth: 1)
        }
        .shadow(color: Color.black.opacity(0.05), radius: 16, y: 8)
    }

    private func trackerCapsule(title: String, value: String, accent: Color) -> some View {
        VStack(spacing: 2) {
            Text(title)
                .font(.caption)
                .foregroundStyle(.secondary)
            Text(value)
                .font(.headline.weight(.bold))
                .foregroundStyle(accent)
        }
        .padding(.horizontal, 18)
        .padding(.vertical, 10)
        .background(.regularMaterial, in: Capsule())
    }

    private func progressSummaryRow(label: String, detail: String, progress: Double, colors: [Color]) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text(label)
                    .font(.subheadline.weight(.semibold))
                Spacer()
                Text(detail)
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)
            }

            GeometryReader { proxy in
                let width = max(proxy.size.width * progress, progress > 0 ? 32 : 0)

                ZStack(alignment: .leading) {
                    Capsule()
                        .fill(Color.white.opacity(0.7))
                    Capsule()
                        .fill(LinearGradient(colors: colors, startPoint: .leading, endPoint: .trailing))
                        .frame(width: width)
                }
            }
            .frame(height: 12)
        }
    }

    private var trackerBackground: some View {
        ZStack {
            LinearGradient(
                colors: [
                    Color(red: 0.78, green: 0.92, blue: 0.82),
                    Color(red: 0.93, green: 0.98, blue: 0.96),
                    Color(red: 0.98, green: 0.98, blue: 0.96)
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )

            RadialGradient(
                colors: [Color.white.opacity(0.85), Color.clear],
                center: .top,
                startRadius: 80,
                endRadius: 520
            )
        }
    }

    private var decorativeGarden: some View {
        ZStack {
            HStack {
                gardenTuft(color: Color(red: 0.23, green: 0.57, blue: 0.22), size: 52)
                Spacer()
                gardenTuft(color: Color(red: 0.40, green: 0.72, blue: 0.28), size: 62)
            }
            .padding(.horizontal, 26)
            .padding(.bottom, 18)
            .frame(maxHeight: .infinity, alignment: .bottom)

            HStack(spacing: 18) {
                pebble(width: 34, height: 22, color: Color(red: 0.69, green: 0.65, blue: 0.60))
                pebble(width: 26, height: 18, color: Color(red: 0.78, green: 0.75, blue: 0.71))
                Spacer()
                pond
                    .frame(width: 110, height: 64)
            }
            .padding(.horizontal, 28)
            .padding(.bottom, 10)
            .frame(maxHeight: .infinity, alignment: .bottom)
        }
        .allowsHitTesting(false)
    }

    private func gardenTuft(color: Color, size: CGFloat) -> some View {
        ZStack(alignment: .bottom) {
            ForEach(0..<5, id: \.self) { index in
                Capsule()
                    .fill(
                        LinearGradient(
                            colors: [color.opacity(0.85), color.opacity(0.55)],
                            startPoint: .bottom,
                            endPoint: .top
                        )
                    )
                    .frame(width: size * 0.14, height: size * (0.55 + CGFloat(index) * 0.08))
                    .rotationEffect(.degrees(-26 + Double(index) * 12))
                    .offset(x: CGFloat(index - 2) * size * 0.12)
            }
        }
        .frame(width: size, height: size)
    }

    private func pebble(width: CGFloat, height: CGFloat, color: Color) -> some View {
        RoundedRectangle(cornerRadius: height / 2, style: .continuous)
            .fill(color.gradient)
            .frame(width: width, height: height)
            .shadow(color: .black.opacity(0.10), radius: 3, y: 2)
    }

    private var pond: some View {
        ZStack {
            Ellipse()
                .fill(Color(red: 0.54, green: 0.83, blue: 0.92))
            Ellipse()
                .stroke(Color(red: 0.30, green: 0.58, blue: 0.66), lineWidth: 6)
            Circle()
                .fill(Color(red: 0.54, green: 0.74, blue: 0.34))
                .frame(width: 18, height: 18)
                .offset(x: 18, y: 8)
        }
        .shadow(color: Color.blue.opacity(0.18), radius: 8, y: 5)
    }
}

#Preview {
    TrackerView()
        .environmentObject(AppStateViewModel())
}
