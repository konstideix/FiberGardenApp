import Foundation

enum PlacedItemType: String, Codable {
    case decoration
    case animal
}

struct PlacedItem: Identifiable, Codable, Hashable {
    let id: UUID
    let type: PlacedItemType
    let name: String
    let symbolName: String
    let datePlaced: Date

    init(id: UUID = UUID(), type: PlacedItemType, name: String, symbolName: String, datePlaced: Date = Date()) {
        self.id = id
        self.type = type
        self.name = name
        self.symbolName = symbolName
        self.datePlaced = datePlaced
    }
}
