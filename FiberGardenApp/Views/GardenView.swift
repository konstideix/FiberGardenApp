import SwiftUI

struct GardenView: View {
    @EnvironmentObject var appState: AppStateViewModel

    private var dateFormatter: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .none
        return formatter
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    statsRow
                    gateCard
                    gardenPlaceholder
                    shopSection
                    animalSection
                    placedItemsSection
                }
                .padding(.horizontal, 16)
                .padding(.top, 12)
                .padding(.bottom, 24)
            }
            .background(Color(.systemGroupedBackground).ignoresSafeArea())
            .navigationTitle("Garten")
            .onAppear {
                appState.checkDateRollover()
            }
        }
    }

    private var statsRow: some View {
        HStack(spacing: 10) {
            StatPill(title: "Samen", value: "\(appState.totalSeeds)", symbolName: "leaf.fill")
            StatPill(title: "Eier", value: "\(appState.totalEggs)", symbolName: "sparkles")
            Spacer(minLength: 0)
        }
    }

    private var gateCard: some View {
        CardView {
            VStack(alignment: .leading, spacing: 8) {
                if appState.gardenUnlockedToday {
                    Label("Garten freigeschaltet für heute ✅", systemImage: "checkmark.seal.fill")
                        .font(.headline)
                        .foregroundStyle(.green)
                } else {
                    Label("Erreiche 30g Ballaststoffe, um zu pflanzen.", systemImage: "lock.fill")
                        .font(.headline)
                    Text("Noch \(appState.gramsUntilUnlock, specifier: "%.1f") g bis zum Freischalten.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
            }
        }
    }

    private var gardenPlaceholder: some View {
        CardView {
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .fill(
                    LinearGradient(
                        colors: [Color.green.opacity(0.22), Color.blue.opacity(0.14)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .frame(height: 180)
                .overlay {
                    VStack(spacing: 8) {
                        Image(systemName: "leaf.circle.fill")
                            .font(.system(size: 40))
                            .foregroundStyle(.green)
                        Text("Dein Garten")
                            .font(.title3)
                            .fontWeight(.semibold)
                    }
                }
                .accessibilityLabel("Dein Garten Bereich")
        }
    }

    private var shopSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Shop – Pflanzen")
                .font(.title3)
                .fontWeight(.semibold)
                .padding(.leading, 4)

            ForEach(appState.shopItems) { item in
                CardView {
                    HStack(spacing: 12) {
                        Image(systemName: item.symbolName)
                            .font(.title2)
                            .frame(width: 34)
                            .foregroundStyle(.green)

                        VStack(alignment: .leading, spacing: 4) {
                            Text(item.name)
                                .font(.headline)
                            Text("Kosten: \(item.seedCost) Seeds")
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                        }

                        Spacer()

                        Button("Kaufen & Platzieren") {
                            appState.buyDecoration(item)
                        }
                        .buttonStyle(.borderedProminent)
                        .disabled(!appState.gardenUnlockedToday || appState.totalSeeds < item.seedCost)
                    }
                }
            }
        }
    }

    private var animalSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Tiere (Eier)")
                .font(.title3)
                .fontWeight(.semibold)
                .padding(.leading, 4)

            ForEach(appState.animalItems) { item in
                CardView {
                    HStack(spacing: 12) {
                        Image(systemName: item.symbolName)
                            .font(.title2)
                            .frame(width: 34)
                            .foregroundStyle(.orange)

                        VStack(alignment: .leading, spacing: 4) {
                            Text(item.name)
                                .font(.headline)
                            Text("Kosten: \(item.eggCost) Eier")
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                        }

                        Spacer()

                        Button("Ausbrüten & Platzieren") {
                            appState.hatchAnimal(item)
                        }
                        .buttonStyle(.borderedProminent)
                        .disabled(!appState.gardenUnlockedToday || appState.totalEggs < item.eggCost)
                    }
                }
            }
        }
    }

    private var placedItemsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Dein Garten (Liste)")
                    .font(.title3)
                    .fontWeight(.semibold)
                Spacer()
                if !appState.placedItems.isEmpty {
                    Button("Alles entfernen") {
                        appState.clearGardenDebug()
                    }
                    .font(.subheadline)
                }
            }
            .padding(.leading, 4)

            if appState.placedItems.isEmpty {
                CardView {
                    Text("Noch nichts platziert. Kaufe im Shop und starte deinen Garten 🌱")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
            } else {
                ForEach(appState.placedItems) { item in
                    CardView {
                        HStack(spacing: 12) {
                            Image(systemName: item.symbolName)
                                .font(.title3)
                                .frame(width: 34)
                            VStack(alignment: .leading, spacing: 4) {
                                Text(item.name)
                                    .font(.headline)
                                Text(item.type == .animal ? "Tier" : "Dekoration")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                            Spacer()
                            Text(dateFormatter.string(from: item.datePlaced))
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                    }
                }
            }
        }
    }
}

#Preview {
    GardenView()
        .environmentObject(AppStateViewModel())
}
