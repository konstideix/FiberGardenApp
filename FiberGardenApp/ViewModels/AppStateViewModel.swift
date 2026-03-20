import Foundation
import SwiftUI
import UIKit

@MainActor
final class AppStateViewModel: ObservableObject {
    @Published var totalSeeds: Int = 0 {
        didSet { userDefaults.set(totalSeeds, forKey: Keys.totalSeeds) }
    }

    @Published var totalEggs: Int = 0 {
        didSet { userDefaults.set(totalEggs, forKey: Keys.totalEggs) }
    }

    @Published var placedItems: [PlacedItem] = [] {
        didSet { savePlacedItems() }
    }

    @Published var inventoryItems: [InventoryItem] = [] {
        didSet { saveInventoryItems() }
    }

    @Published var dailyFiber: Double = 0 {
        didSet { userDefaults.set(dailyFiber, forKey: Keys.dailyFiber) }
    }

    @Published var dailyFoodsLog: [String: Int] = [:] {
        didSet { saveDailyFoodsLog() }
    }

    @Published var lastDateString: String = "" {
        didSet { userDefaults.set(lastDateString, forKey: Keys.lastDateString) }
    }

    @Published var streakCount: Int = 0 {
        didSet { userDefaults.set(streakCount, forKey: Keys.streakCount) }
    }

    @Published var lastGoalDateString: String? {
        didSet { userDefaults.set(lastGoalDateString, forKey: Keys.lastGoalDateString) }
    }

    @Published var selectedPlacementItemID: InventoryItem.ID?

    private let userDefaults = UserDefaults.standard
    private let calendar = Calendar.current

    enum Habitat {
        static let columns = 7
        static let rows = 7
        static let blockedCells: Set<HabitatCell> = [
            HabitatCell(x: 1, y: 1),
            HabitatCell(x: 4, y: 1),
            HabitatCell(x: 2, y: 4)
        ]
        static let preferredPathCells: Set<HabitatCell> = [
            HabitatCell(x: 1, y: 5), HabitatCell(x: 2, y: 5), HabitatCell(x: 3, y: 5), HabitatCell(x: 4, y: 5),
            HabitatCell(x: 4, y: 4), HabitatCell(x: 5, y: 4)
        ]
    }

    private enum Keys {
        static let totalSeeds = "totalSeeds"
        static let totalEggs = "totalEggs"
        static let placedItems = "placedItems"
        static let inventoryItems = "inventoryItems"
        static let dailyFiber = "dailyFiber"
        static let dailyFoodsLog = "dailyFoodsLog"
        static let lastDateString = "lastDateString"
        static let streakCount = "streakCount"
        static let lastGoalDateString = "lastGoalDateString"
    }

    let dailyGoal: Double = 30.0

    let foods: [FoodItem] = [
        FoodItem(name: "Haferflocken", portionLabel: "50 g", fiberGrams: 5.0, seedReward: 2),
        FoodItem(name: "Apfel", portionLabel: "1 Stück", fiberGrams: 4.4, seedReward: 2),
        FoodItem(name: "Linsen", portionLabel: "150 g gekocht", fiberGrams: 11.0, seedReward: 6),
        FoodItem(name: "Kichererbsen", portionLabel: "150 g gekocht", fiberGrams: 9.0, seedReward: 5),
        FoodItem(name: "Vollkornbrot", portionLabel: "2 Scheiben", fiberGrams: 6.5, seedReward: 4),
        FoodItem(name: "Chiasamen", portionLabel: "20 g", fiberGrams: 6.8, seedReward: 5),
        FoodItem(name: "Brokkoli", portionLabel: "200 g", fiberGrams: 6.0, seedReward: 3),
        FoodItem(name: "Himbeeren", portionLabel: "125 g", fiberGrams: 8.0, seedReward: 5)
    ]

    let shopItems: [ShopItem] = [
        ShopItem(name: "Kirschbaum", seedCost: 50, symbolName: "tree.fill", kind: .cherryTree),
        ShopItem(name: "Blumenbeet", seedCost: 20, symbolName: "leaf.fill", kind: .flowerBed),
        ShopItem(name: "Felsgruppe", seedCost: 24, symbolName: "mountain.2.fill", kind: .rockCluster),
        ShopItem(name: "Steinpfad", seedCost: 18, symbolName: "square.grid.3x3.fill", kind: .stonePath),
        ShopItem(name: "Teich", seedCost: 40, symbolName: "drop.fill", kind: .pond)
    ]

    let animalItems: [AnimalItem] = [
        AnimalItem(name: "Ameise", eggCost: 1, symbolName: "ant.fill", species: .ant),
        AnimalItem(name: "Katze", eggCost: 4, symbolName: "pawprint.fill", species: .cat)
    ]

    init() {
        loadPersistedState()
        checkDateRollover()
        validateStreakAcrossMissedDays()
        normalizeHabitatStateIfNeeded()
    }

    var dailyProgress: Double { min(max(dailyFiber / dailyGoal, 0), 1) }
    var gramsUntilUnlock: Double { max(0, dailyGoal - dailyFiber) }
    var gardenUnlockedToday: Bool { dailyFiber >= dailyGoal }
    var daysToNextEggProgress: Double { Double(streakCount % 7) / 7.0 }
    var daysInCurrentEggCycle: Int { streakCount % 7 }

    var habitatCells: [HabitatCell] {
        (0..<Habitat.rows).flatMap { y in
            (0..<Habitat.columns).map { x in HabitatCell(x: x, y: y) }
        }
    }

    var validPlacementCells: [HabitatCell] {
        habitatCells.filter(isPlacementCellAvailable(_:))
    }

    var selectedPlacementItem: InventoryItem? {
        inventoryItems.first(where: { $0.id == selectedPlacementItemID })
    }

    func checkDateRollover(now: Date = Date()) {
        let today = dateString(for: now)
        guard !lastDateString.isEmpty else {
            lastDateString = today
            return
        }
        guard today != lastDateString else { return }
        dailyFiber = 0
        dailyFoodsLog = [:]
        lastDateString = today
        validateStreakAcrossMissedDays(referenceDate: now)
    }

    func addFood(_ food: FoodItem) {
        withAnimation(.spring(duration: 0.3)) {
            dailyFiber += food.fiberGrams
            totalSeeds += food.seedReward
            dailyFoodsLog[food.name, default: 0] += 1
        }
        UIImpactFeedbackGenerator(style: .soft).impactOccurred()
        processGoalReachedIfNeeded()
    }

    func buyDecoration(_ item: ShopItem) {
        guard gardenUnlockedToday, totalSeeds >= item.seedCost else { return }
        totalSeeds -= item.seedCost
        let inventoryItem = InventoryItem(type: .decoration, name: item.name, symbolName: item.symbolName, assetKey: item.kind.rawValue)
        inventoryItems.append(inventoryItem)
        selectedPlacementItemID = inventoryItem.id
        UINotificationFeedbackGenerator().notificationOccurred(.success)
    }

    func hatchAnimal(_ item: AnimalItem) {
        guard gardenUnlockedToday, totalEggs >= item.eggCost else { return }
        totalEggs -= item.eggCost
        let inventoryItem = InventoryItem(type: .animal, name: item.name, symbolName: item.symbolName, assetKey: item.species.rawValue)
        inventoryItems.append(inventoryItem)
        selectedPlacementItemID = inventoryItem.id
        UINotificationFeedbackGenerator().notificationOccurred(.success)
    }

    func selectPlacementItem(_ item: InventoryItem?) {
        selectedPlacementItemID = item?.id
    }

    func placeSelectedItem(at cell: HabitatCell) {
        guard gardenUnlockedToday,
              let selected = selectedPlacementItem,
              isPlacementCellAvailable(cell, for: selected) else { return }

        placedItems.append(
            PlacedItem(
                type: selected.type,
                name: selected.name,
                symbolName: selected.symbolName,
                assetKey: selected.assetKey,
                cell: cell
            )
        )
        inventoryItems.removeAll { $0.id == selected.id }
        selectedPlacementItemID = inventoryItems.first?.id
        UINotificationFeedbackGenerator().notificationOccurred(.success)
    }

    func removePlacedItem(_ item: PlacedItem) {
        placedItems.removeAll { $0.id == item.id }
        let inventoryItem = InventoryItem(type: item.type, name: item.name, symbolName: item.symbolName, assetKey: item.assetKey)
        inventoryItems.append(inventoryItem)
        selectedPlacementItemID = inventoryItem.id
    }

    func resetDayDebug() {
        dailyFiber = 0
        dailyFoodsLog = [:]
    }

    func clearGardenDebug() {
        let recovered = placedItems.map {
            InventoryItem(type: $0.type, name: $0.name, symbolName: $0.symbolName, assetKey: $0.assetKey)
        }
        placedItems = []
        inventoryItems.append(contentsOf: recovered)
        selectedPlacementItemID = inventoryItems.first?.id
    }

    func isPlacementCellAvailable(_ cell: HabitatCell, for item: InventoryItem? = nil) -> Bool {
        guard habitatCells.contains(cell), !Habitat.blockedCells.contains(cell) else { return false }
        if placedItems.contains(where: { $0.cell == cell }) { return false }
        guard let item else { return true }
        if item.type == .animal { return cell.y >= 2 }
        if item.assetKey == DecorationKind.stonePath.rawValue { return Habitat.preferredPathCells.contains(cell) }
        if item.assetKey == DecorationKind.pond.rawValue { return !Habitat.preferredPathCells.contains(cell) && cell.y <= 3 }
        return true
    }

    private func normalizeHabitatStateIfNeeded() {
        let allowedCells = Set(habitatCells).subtracting(Habitat.blockedCells)
        placedItems = placedItems.enumerated().map { index, item in
            if allowedCells.contains(item.cell) && !placedItems[..<index].contains(where: { $0.cell == item.cell }) {
                return item
            }
            let fallbackCell = firstOpenCell(preferredFor: item.type, assetKey: item.assetKey) ?? HabitatCell(x: 3, y: 3)
            return PlacedItem(id: item.id, type: item.type, name: item.name, symbolName: item.symbolName, assetKey: item.assetKey, cell: fallbackCell, datePlaced: item.datePlaced)
        }
        if selectedPlacementItemID == nil {
            selectedPlacementItemID = inventoryItems.first?.id
        }
    }

    private func firstOpenCell(preferredFor type: PlacedItemType, assetKey: String? = nil) -> HabitatCell? {
        let placeholder = InventoryItem(type: type, name: "", symbolName: "", assetKey: assetKey ?? "")
        return habitatCells.first { cell in
            isPlacementCellAvailable(cell, for: placeholder)
        }
    }

    private func processGoalReachedIfNeeded(now: Date = Date()) {
        guard dailyFiber >= dailyGoal else { return }
        let today = dateString(for: now)
        guard lastGoalDateString != today else { return }
        if let lastGoalDateString,
           let lastGoalDate = date(from: lastGoalDateString),
           calendar.isDate(lastGoalDate, inSameDayAs: calendar.date(byAdding: .day, value: -1, to: now) ?? now) {
            streakCount += 1
        } else {
            streakCount = 1
        }
        lastGoalDateString = today
        if streakCount % 7 == 0 { totalEggs += 1 }
    }

    private func validateStreakAcrossMissedDays(referenceDate: Date = Date()) {
        guard let lastGoalDateString, let lastGoalDate = date(from: lastGoalDateString) else { return }
        let startOfLastGoal = calendar.startOfDay(for: lastGoalDate)
        let startOfToday = calendar.startOfDay(for: referenceDate)
        let dayDiff = calendar.dateComponents([.day], from: startOfLastGoal, to: startOfToday).day ?? 0
        if dayDiff > 1 { streakCount = 0 }
    }

    private func loadPersistedState() {
        totalSeeds = userDefaults.integer(forKey: Keys.totalSeeds)
        totalEggs = userDefaults.integer(forKey: Keys.totalEggs)
        dailyFiber = userDefaults.double(forKey: Keys.dailyFiber)
        streakCount = userDefaults.integer(forKey: Keys.streakCount)
        lastDateString = userDefaults.string(forKey: Keys.lastDateString) ?? ""
        lastGoalDateString = userDefaults.string(forKey: Keys.lastGoalDateString)

        if let data = userDefaults.data(forKey: Keys.placedItems),
           let decoded = try? JSONDecoder().decode([PlacedItem].self, from: data) {
            placedItems = decoded
        }

        if let data = userDefaults.data(forKey: Keys.inventoryItems),
           let decoded = try? JSONDecoder().decode([InventoryItem].self, from: data) {
            inventoryItems = decoded
        }

        if let data = userDefaults.data(forKey: Keys.dailyFoodsLog),
           let decoded = try? JSONDecoder().decode([String: Int].self, from: data) {
            dailyFoodsLog = decoded
        }
    }

    private func savePlacedItems() {
        guard let data = try? JSONEncoder().encode(placedItems) else { return }
        userDefaults.set(data, forKey: Keys.placedItems)
    }

    private func saveInventoryItems() {
        guard let data = try? JSONEncoder().encode(inventoryItems) else { return }
        userDefaults.set(data, forKey: Keys.inventoryItems)
    }

    private func saveDailyFoodsLog() {
        guard let data = try? JSONEncoder().encode(dailyFoodsLog) else { return }
        userDefaults.set(data, forKey: Keys.dailyFoodsLog)
    }

    private func dateString(for date: Date) -> String {
        let formatter = DateFormatter()
        formatter.calendar = calendar
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: date)
    }

    private func date(from string: String) -> Date? {
        let formatter = DateFormatter()
        formatter.calendar = calendar
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.date(from: string)
    }
}
