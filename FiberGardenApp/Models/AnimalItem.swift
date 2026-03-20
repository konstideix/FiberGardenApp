import Foundation

enum AnimalSpecies: String, Codable, CaseIterable {
    case ant
    case cat
}

struct AnimalItem: Identifiable, Codable, Hashable {
    let id: UUID
    let name: String
    let eggCost: Int
    let symbolName: String
    let species: AnimalSpecies

    init(id: UUID = UUID(), name: String, eggCost: Int, symbolName: String, species: AnimalSpecies) {
        self.id = id
        self.name = name
        self.eggCost = eggCost
        self.symbolName = symbolName
        self.species = species
    }
}
