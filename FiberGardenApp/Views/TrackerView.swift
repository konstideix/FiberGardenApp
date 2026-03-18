import SwiftUI

struct TrackerView: View {
    @EnvironmentObject var appState: AppStateViewModel

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    headerCard
                    streakCard
                    foodsSection
                    footerCard
                }
                .padding(.horizontal, 16)
                .padding(.top, 12)
                .padding(.bottom, 24)
            }
            .background(Color(.systemGroupedBackground).ignoresSafeArea())
            .navigationTitle("Tracker")
            .onAppear {
                appState.checkDateRollover()
            }
        }
    }

    private var headerCard: some View {
        CardView {
            VStack(alignment: .leading, spacing: 12) {
                Text("Heute")
                    .font(.title2)
                    .fontWeight(.semibold)

                Text("\(appState.dailyFiber, specifier: "%.1f") g / 30 g")
                    .font(.system(size: 38, weight: .bold, design: .rounded))
                    .contentTransition(.numericText())

                ProgressView(value: appState.dailyProgress)
                    .progressViewStyle(.linear)
                    .tint(appState.gardenUnlockedToday ? .green : .accentColor)
                    .animation(.easeInOut(duration: 0.25), value: appState.dailyProgress)
                    .accessibilityLabel("Tagesfortschritt")
                    .accessibilityValue("\(Int(appState.dailyProgress * 100)) Prozent")
            }
        }
    }

    private var streakCard: some View {
        CardView {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Label("Streak", systemImage: "flame.fill")
                        .font(.headline)
                        .foregroundStyle(.orange)
                    Spacer()
                    Text("\(appState.streakCount) Tage")
                        .font(.headline)
                }

                ProgressView(value: appState.daysToNextEggProgress)
                    .tint(.yellow)
                    .animation(.easeInOut(duration: 0.25), value: appState.daysToNextEggProgress)

                Text("Bei 7 Tagen bekommst du ein Ei.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                Text("Aktueller Zyklus: \(appState.daysInCurrentEggCycle)/7 • Eier: \(appState.totalEggs)")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
    }

    private var foodsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Lebensmittel")
                .font(.title3)
                .fontWeight(.semibold)
                .padding(.leading, 4)

            ForEach(appState.foods) { food in
                CardView {
                    VStack(alignment: .leading, spacing: 10) {
                        Text(food.name)
                            .font(.headline)
                        Text(food.portionLabel)
                            .font(.subheadline)
                            .foregroundStyle(.secondary)

                        HStack {
                            Text("Fiber: \(food.fiberGrams, specifier: "%.1f") g")
                            Spacer()
                            Text("+Seeds: \(food.seedReward)")
                        }
                        .font(.subheadline)
                        .foregroundStyle(.secondary)

                        Button {
                            appState.addFood(food)
                        } label: {
                            Label("+ Portion", systemImage: "plus.circle.fill")
                                .font(.headline)
                                .frame(maxWidth: .infinity)
                        }
                        .buttonStyle(.borderedProminent)
                        .controlSize(.large)
                        .accessibilityLabel("\(food.name) Portion hinzufügen")
                    }
                }
            }
        }
    }

    private var footerCard: some View {
        CardView {
            VStack(alignment: .leading, spacing: 10) {
                Text("Samen gesamt: \(appState.totalSeeds)")
                    .font(.headline)

                Button(role: .destructive) {
                    appState.resetDayDebug()
                } label: {
                    Text("Reset Tag (Debug)")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.bordered)
            }
        }
    }
}

#Preview {
    TrackerView()
        .environmentObject(AppStateViewModel())
}
