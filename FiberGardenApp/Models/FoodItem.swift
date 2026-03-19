import Foundation

struct FoodItem: Identifiable, Codable, Hashable {
    let id: UUID
    let name: String
    let portionLabel: String
    let fiberGrams: Double
    let seedReward: Int

    init(id: UUID = UUID(), name: String, portionLabel: String, fiberGrams: Double, seedReward: Int) {
        self.id = id
        self.name = name
        self.portionLabel = portionLabel
        self.fiberGrams = fiberGrams
        self.seedReward = seedReward
    }
}
