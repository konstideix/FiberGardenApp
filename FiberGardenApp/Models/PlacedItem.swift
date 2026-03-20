import Foundation

enum PlacedItemType: String, Codable {
    case decoration
    case animal
}

struct HabitatCell: Codable, Hashable {
    let x: Int
    let y: Int
}

struct InventoryItem: Identifiable, Codable, Hashable {
    let id: UUID
    let type: PlacedItemType
    let name: String
    let symbolName: String
    let assetKey: String
    let dateAdded: Date

    init(id: UUID = UUID(), type: PlacedItemType, name: String, symbolName: String, assetKey: String, dateAdded: Date = Date()) {
        self.id = id
        self.type = type
        self.name = name
        self.symbolName = symbolName
        self.assetKey = assetKey
        self.dateAdded = dateAdded
    }
}

struct PlacedItem: Identifiable, Codable, Hashable {
    let id: UUID
    let type: PlacedItemType
    let name: String
    let symbolName: String
    let assetKey: String
    let cell: HabitatCell
    let datePlaced: Date

    init(id: UUID = UUID(), type: PlacedItemType, name: String, symbolName: String, assetKey: String, cell: HabitatCell, datePlaced: Date = Date()) {
        self.id = id
        self.type = type
        self.name = name
        self.symbolName = symbolName
        self.assetKey = assetKey
        self.cell = cell
        self.datePlaced = datePlaced
    }

    private enum CodingKeys: String, CodingKey {
        case id, type, name, symbolName, assetKey, cell, datePlaced
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decodeIfPresent(UUID.self, forKey: .id) ?? UUID()
        type = try container.decodeIfPresent(PlacedItemType.self, forKey: .type) ?? .decoration
        name = try container.decodeIfPresent(String.self, forKey: .name) ?? "Objekt"
        symbolName = try container.decodeIfPresent(String.self, forKey: .symbolName) ?? "leaf.fill"
        assetKey = try container.decodeIfPresent(String.self, forKey: .assetKey) ?? symbolName
        cell = try container.decodeIfPresent(HabitatCell.self, forKey: .cell) ?? HabitatCell(x: 2, y: 2)
        datePlaced = try container.decodeIfPresent(Date.self, forKey: .datePlaced) ?? Date()
    }
}
