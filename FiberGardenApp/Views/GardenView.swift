import SwiftUI

struct GardenView: View {
    @EnvironmentObject var appState: AppStateViewModel
    @State private var isEditingHabitat = false

    private var dateFormatter: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .none
        return formatter
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 18) {
                    statsRow
                    unlockBanner
                    habitatSection
                    placementTray
                    inventorySection
                    storeSection(title: "Shop – Habitat Props", items: appState.shopItems) { item in
                        appState.buyDecoration(item)
                    } row: { item in
                        Label(item.name, systemImage: item.symbolName)
                    } detail: { item in
                        "\(item.seedCost) Seeds"
                    } disabled: { item in
                        !appState.gardenUnlockedToday || appState.totalSeeds < item.seedCost
                    }
                    storeSection(title: "Tiere", items: appState.animalItems) { item in
                        appState.hatchAnimal(item)
                    } row: { item in
                        Label(item.name, systemImage: item.symbolName)
                    } detail: { item in
                        "\(item.eggCost) Eier"
                    } disabled: { item in
                        !appState.gardenUnlockedToday || appState.totalEggs < item.eggCost
                    }
                    placedItemsSection
                }
                .padding(.horizontal, 16)
                .padding(.top, 12)
                .padding(.bottom, 24)
            }
            .background(Color(.systemGroupedBackground).ignoresSafeArea())
            .navigationTitle("Habitat")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button(isEditingHabitat ? "Fertig" : "Bearbeiten") {
                        withAnimation(.easeInOut(duration: 0.2)) {
                            isEditingHabitat.toggle()
                        }
                    }
                    .disabled(!appState.gardenUnlockedToday)
                }
            }
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

    private var unlockBanner: some View {
        VStack(alignment: .leading, spacing: 8) {
            if appState.gardenUnlockedToday {
                Label("Habitat für heute freigeschaltet", systemImage: "checkmark.seal.fill")
                    .font(.headline)
                    .foregroundStyle(.green)
                Text("Kaufe Objekte, wähle sie unten aus und setze sie in freie Zellen innerhalb des Geheges.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            } else {
                Label("Erreiche 30g Ballaststoffe, um dein Habitat zu öffnen.", systemImage: "lock.fill")
                    .font(.headline)
                Text("Noch \(appState.gramsUntilUnlock, specifier: "%.1f") g bis zum Freischalten.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private var habitatSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Mini-Habitat")
                        .font(.title3)
                        .fontWeight(.semibold)
                    Text(isEditingHabitat ? "Tippe auf eine freie Boden-Zelle, um das ausgewählte Objekt zu platzieren." : "Alle Weltobjekte leben im selben isometrischen Koordinatensystem.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                if let selected = appState.selectedPlacementItem, isEditingHabitat {
                    VStack(alignment: .trailing, spacing: 4) {
                        Text("Ausgewählt")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                        Text(selected.name)
                            .font(.subheadline.weight(.semibold))
                    }
                }
            }

            HabitatScene(
                placedItems: appState.placedItems,
                selectedInventoryItem: appState.selectedPlacementItem,
                validCells: appState.validPlacementCells,
                blockedCells: AppStateViewModel.Habitat.blockedCells,
                isEditing: isEditingHabitat,
                onTapCell: { cell in
                    appState.placeSelectedItem(at: cell)
                },
                onTapPlacedItem: { item in
                    appState.removePlacedItem(item)
                }
            )
            .overlay(alignment: .bottomLeading) {
                habitatLegend
                    .padding(14)
            }
            .clipShape(RoundedRectangle(cornerRadius: 28, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: 28, style: .continuous)
                    .stroke(Color.white.opacity(0.35), lineWidth: 1)
            }
            .shadow(color: Color.black.opacity(0.10), radius: 18, y: 10)
        }
    }

    private var habitatLegend: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Weltlogik")
                .font(.caption.weight(.semibold))
            Text("• Zäune und Gras bilden die feste Bühne")
            Text("• Freie Zellen erscheinen nur im Bearbeiten-Modus")
            Text("• Tiere wandern innerhalb ihrer Heimat-Zellen")
        }
        .font(.caption)
        .padding(10)
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
    }

    private var placementTray: some View {
        CardView {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Text("Platzierung")
                        .font(.headline)
                    Spacer()
                    Text(isEditingHabitat ? "Bearbeiten an" : "Bearbeiten aus")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }

                if let selected = appState.selectedPlacementItem {
                    HStack(spacing: 12) {
                        Image(systemName: selected.symbolName)
                            .font(.title2)
                            .foregroundStyle(selected.type == .animal ? .orange : .green)
                            .frame(width: 36)
                        VStack(alignment: .leading, spacing: 4) {
                            Text(selected.name)
                                .font(.subheadline.weight(.semibold))
                            Text(selected.type == .animal ? "Tier bewegt sich nach dem Platzieren innerhalb seiner Zelle." : "Objekt rastet bodengebunden in die nächste freie Habitat-Zelle ein.")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                        Spacer()
                        Button("Abwählen") {
                            appState.selectPlacementItem(nil)
                        }
                        .buttonStyle(.bordered)
                    }
                } else {
                    Text("Wähle unten ein gekauftes Objekt aus deinem Inventar aus. Dann kannst du es im Habitat platzieren.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
            }
        }
    }

    private var inventorySection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Inventar")
                .font(.title3)
                .fontWeight(.semibold)
                .padding(.leading, 4)

            if appState.inventoryItems.isEmpty {
                CardView {
                    Text("Noch keine unplatzierten Objekte. Kaufe Pflanzen oder Tiere im Shop und setze sie danach bewusst ins Gehege.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
            } else {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        ForEach(appState.inventoryItems) { item in
                            Button {
                                appState.selectPlacementItem(item)
                                isEditingHabitat = true
                            } label: {
                                VStack(alignment: .leading, spacing: 8) {
                                    Image(systemName: item.symbolName)
                                        .font(.title2)
                                        .foregroundStyle(item.type == .animal ? .orange : .green)
                                    Text(item.name)
                                        .font(.subheadline.weight(.semibold))
                                        .multilineTextAlignment(.leading)
                                    Text(item.type == .animal ? "Tier" : "Dekor")
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }
                                .padding(14)
                                .frame(width: 130, alignment: .leading)
                                .background(
                                    RoundedRectangle(cornerRadius: 18, style: .continuous)
                                        .fill(appState.selectedPlacementItemID == item.id ? Color.accentColor.opacity(0.16) : Color(.secondarySystemGroupedBackground))
                                )
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }
            }
        }
    }

    private func storeSection<Item: Identifiable, RowLabel: View>(title: String, items: [Item], action: @escaping (Item) -> Void, @ViewBuilder row: @escaping (Item) -> RowLabel, detail: @escaping (Item) -> String, disabled: @escaping (Item) -> Bool) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title)
                .font(.title3)
                .fontWeight(.semibold)
                .padding(.leading, 4)

            ForEach(items) { item in
                CardView {
                    HStack(spacing: 12) {
                        row(item)
                            .font(.headline)
                        Spacer()
                        VStack(alignment: .trailing, spacing: 8) {
                            Text(detail(item))
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                            Button("Kaufen") {
                                action(item)
                            }
                            .buttonStyle(.borderedProminent)
                            .disabled(disabled(item))
                        }
                    }
                }
            }
        }
    }

    private var placedItemsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Platzierte Weltobjekte")
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
                    Text("Noch nichts platziert. Das Habitat bleibt bewusst luftig, bis du Objekte im Gehege positionierst.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
            } else {
                ForEach(appState.placedItems.sorted(by: { ($0.cell.y, $0.cell.x) < ($1.cell.y, $1.cell.x) })) { item in
                    CardView {
                        HStack(spacing: 12) {
                            Image(systemName: item.symbolName)
                                .font(.title3)
                                .frame(width: 34)
                                .foregroundStyle(item.type == .animal ? .orange : .green)
                            VStack(alignment: .leading, spacing: 4) {
                                Text(item.name)
                                    .font(.headline)
                                Text("Zelle x:\(item.cell.x) · y:\(item.cell.y) • \(item.type == .animal ? "Tier" : "Dekoration")")
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
