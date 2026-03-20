import Foundation

enum DecorationKind: String, Codable, CaseIterable {
    case cherryTree
    case flowerBed
    case rockCluster
    case stonePath
    case pond
}

struct ShopItem: Identifiable, Codable, Hashable {
    let id: UUID
    let name: String
    let seedCost: Int
    let symbolName: String
    let kind: DecorationKind

    init(id: UUID = UUID(), name: String, seedCost: Int, symbolName: String, kind: DecorationKind) {
        self.id = id
        self.name = name
        self.seedCost = seedCost
        self.symbolName = symbolName
        self.kind = kind
    }
}
