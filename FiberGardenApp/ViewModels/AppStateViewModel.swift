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

    private let userDefaults = UserDefaults.standard
    private let calendar = Calendar.current

    private enum Keys {
        static let totalSeeds = "totalSeeds"
        static let totalEggs = "totalEggs"
        static let placedItems = "placedItems"
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
        ShopItem(name: "Kirschbaum", seedCost: 50, symbolName: "tree.fill"),
        ShopItem(name: "Blumenbeet", seedCost: 20, symbolName: "leaf.fill"),
        ShopItem(name: "Steinpfad", seedCost: 35, symbolName: "square.grid.3x3.fill")
    ]

    let animalItems: [AnimalItem] = [
        AnimalItem(name: "Ameise", eggCost: 1, symbolName: "ant.fill"),
        AnimalItem(name: "Katze", eggCost: 4, symbolName: "pawprint.fill")
    ]

    init() {
        loadPersistedState()
        checkDateRollover()
        validateStreakAcrossMissedDays()
    }

    var dailyProgress: Double {
        min(max(dailyFiber / dailyGoal, 0), 1)
    }

    var gramsUntilUnlock: Double {
        max(0, dailyGoal - dailyFiber)
    }

    var gardenUnlockedToday: Bool {
        dailyFiber >= dailyGoal
    }

    var daysToNextEggProgress: Double {
        Double(streakCount % 7) / 7.0
    }

    var daysInCurrentEggCycle: Int {
        streakCount % 7
    }

    func checkDateRollover(now: Date = Date()) {
        let today = dateString(for: now)

        guard !lastDateString.isEmpty else {
            lastDateString = today
            return
        }

        guard today != lastDateString else {
            return
        }

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

        let feedback = UIImpactFeedbackGenerator(style: .soft)
        feedback.impactOccurred()

        processGoalReachedIfNeeded()
    }

    func buyDecoration(_ item: ShopItem) {
        guard gardenUnlockedToday, totalSeeds >= item.seedCost else { return }

        totalSeeds -= item.seedCost
        placedItems.append(PlacedItem(type: .decoration, name: item.name, symbolName: item.symbolName))
        UINotificationFeedbackGenerator().notificationOccurred(.success)
    }

    func hatchAnimal(_ item: AnimalItem) {
        guard gardenUnlockedToday, totalEggs >= item.eggCost else { return }

        totalEggs -= item.eggCost
        placedItems.append(PlacedItem(type: .animal, name: item.name, symbolName: item.symbolName))
        UINotificationFeedbackGenerator().notificationOccurred(.success)
    }

    func resetDayDebug() {
        dailyFiber = 0
        dailyFoodsLog = [:]
    }

    func clearGardenDebug() {
        placedItems = []
    }

    private func processGoalReachedIfNeeded(now: Date = Date()) {
        guard dailyFiber >= dailyGoal else { return }

        let today = dateString(for: now)

        guard lastGoalDateString != today else {
            return
        }

        if let lastGoalDateString,
           let lastGoalDate = date(from: lastGoalDateString),
           calendar.isDate(lastGoalDate, inSameDayAs: calendar.date(byAdding: .day, value: -1, to: now) ?? now) {
            streakCount += 1
        } else {
            streakCount = 1
        }

        lastGoalDateString = today

        if streakCount % 7 == 0 {
            totalEggs += 1
        }
    }

    private func validateStreakAcrossMissedDays(referenceDate: Date = Date()) {
        guard let lastGoalDateString,
              let lastGoalDate = date(from: lastGoalDateString) else {
            return
        }

        let startOfLastGoal = calendar.startOfDay(for: lastGoalDate)
        let startOfToday = calendar.startOfDay(for: referenceDate)
        let dayDiff = calendar.dateComponents([.day], from: startOfLastGoal, to: startOfToday).day ?? 0

        if dayDiff > 1 {
            streakCount = 0
        }
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

        if let data = userDefaults.data(forKey: Keys.dailyFoodsLog),
           let decoded = try? JSONDecoder().decode([String: Int].self, from: data) {
            dailyFoodsLog = decoded
        }
    }

    private func savePlacedItems() {
        guard let data = try? JSONEncoder().encode(placedItems) else { return }
        userDefaults.set(data, forKey: Keys.placedItems)
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
