import Foundation

struct AnimalItem: Identifiable, Codable, Hashable {
    let id: UUID
    let name: String
    let eggCost: Int
    let symbolName: String

    init(id: UUID = UUID(), name: String, eggCost: Int, symbolName: String) {
        self.id = id
        self.name = name
        self.eggCost = eggCost
        self.symbolName = symbolName
    }
}
