import Foundation

struct ShopItem: Identifiable, Codable, Hashable {
    let id: UUID
    let name: String
    let seedCost: Int
    let symbolName: String

    init(id: UUID = UUID(), name: String, seedCost: Int, symbolName: String) {
        self.id = id
        self.name = name
        self.seedCost = seedCost
        self.symbolName = symbolName
    }
}
