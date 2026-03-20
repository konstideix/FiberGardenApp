import SwiftUI

struct HabitatScene: View {
    let placedItems: [PlacedItem]
    let selectedInventoryItem: InventoryItem?
    let validCells: [HabitatCell]
    let blockedCells: Set<HabitatCell>
    let isEditing: Bool
    let onTapCell: (HabitatCell) -> Void
    let onTapPlacedItem: (PlacedItem) -> Void

    private let columns = AppStateViewModel.Habitat.columns
    private let rows = AppStateViewModel.Habitat.rows

    var body: some View {
        GeometryReader { geometry in
            let metrics = HabitatMetrics(size: geometry.size, columns: columns, rows: rows)
            ZStack {
                skyBackdrop
                habitatShadow(metrics: metrics)
                habitatGround(metrics: metrics)
                environmentalProps(metrics: metrics)
                blockedZones(metrics: metrics)
                fence(metrics: metrics)
                if isEditing {
                    placementOverlay(metrics: metrics)
                }
                worldObjects(metrics: metrics)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .contentShape(Rectangle())
        }
        .aspectRatio(1.12, contentMode: .fit)
        .accessibilityElement(children: .contain)
        .accessibilityLabel("Isometrischer Habitatbereich")
    }

    private var sceneItems: [SceneItem] {
        let itemObjects = placedItems.map { placed -> SceneItem in
            SceneItem(id: placed.id.uuidString, depth: placed.cell.y * 100 + placed.cell.x * 4 + 40) { metrics in
                placedObjectView(item: placed, metrics: metrics)
            }
        }

        let animalOverlays = placedItems.filter { $0.type == .animal }.map { animal -> SceneItem in
            SceneItem(id: "animal-\(animal.id.uuidString)", depth: animal.cell.y * 100 + animal.cell.x * 4 + 90) { metrics in
                wanderingAnimalView(item: animal, metrics: metrics)
            }
        }

        return (itemObjects + animalOverlays).sorted { $0.depth < $1.depth }
    }

    private var skyBackdrop: some View {
        LinearGradient(
            colors: [Color(red: 0.76, green: 0.89, blue: 1.0), Color(red: 0.95, green: 0.98, blue: 1.0)],
            startPoint: .top,
            endPoint: .bottom
        )
        .overlay(alignment: .topLeading) {
            Circle()
                .fill(Color.white.opacity(0.55))
                .frame(width: 120, height: 120)
                .blur(radius: 3)
                .offset(x: 16, y: 12)
        }
    }

    private func habitatShadow(metrics: HabitatMetrics) -> some View {
        Ellipse()
            .fill(Color.black.opacity(0.12))
            .frame(width: metrics.tileWidth * CGFloat(columns + 1), height: metrics.tileHeight * CGFloat(rows) * 0.9)
            .position(x: metrics.origin.x, y: metrics.origin.y + metrics.tileHeight * CGFloat(rows) * 0.62)
            .blur(radius: 10)
    }

    private func habitatGround(metrics: HabitatMetrics) -> some View {
        ZStack {
            habitatBase(color: Color(red: 0.56, green: 0.77, blue: 0.42), metrics: metrics)
            habitatPatch(cell: HabitatCell(x: 1, y: 1), color: Color(red: 0.44, green: 0.70, blue: 0.40), metrics: metrics)
            habitatPatch(cell: HabitatCell(x: 5, y: 2), color: Color(red: 0.48, green: 0.72, blue: 0.52), metrics: metrics)
            habitatPatch(cell: HabitatCell(x: 1, y: 5), color: Color(red: 0.82, green: 0.74, blue: 0.56), metrics: metrics)
            habitatPatch(cell: HabitatCell(x: 5, y: 5), color: Color(red: 0.76, green: 0.85, blue: 0.60), metrics: metrics)
        }
    }

    private func habitatBase(color: Color, metrics: HabitatMetrics) -> some View {
        Path { path in
            let top = metrics.isoPoint(for: HabitatCell(x: 0, y: 0))
            let right = metrics.isoPoint(for: HabitatCell(x: columns, y: 0))
            let bottom = metrics.isoPoint(for: HabitatCell(x: columns, y: rows))
            let left = metrics.isoPoint(for: HabitatCell(x: 0, y: rows))
            path.move(to: top)
            path.addLine(to: right)
            path.addLine(to: bottom)
            path.addLine(to: left)
            path.closeSubpath()
        }
        .fill(color.gradient)
        .overlay {
            Path { path in
                let top = metrics.isoPoint(for: HabitatCell(x: 0, y: 0))
                let right = metrics.isoPoint(for: HabitatCell(x: columns, y: 0))
                let bottom = metrics.isoPoint(for: HabitatCell(x: columns, y: rows))
                let left = metrics.isoPoint(for: HabitatCell(x: 0, y: rows))
                path.move(to: top)
                path.addLine(to: right)
                path.addLine(to: bottom)
                path.addLine(to: left)
                path.closeSubpath()
            }
            .stroke(Color.black.opacity(0.12), lineWidth: 1.5)
        }
    }

    private func habitatPatch(cell: HabitatCell, color: Color, metrics: HabitatMetrics) -> some View {
        let center = metrics.centerPoint(for: cell)
        return Ellipse()
            .fill(color.opacity(0.8))
            .frame(width: metrics.tileWidth * 1.6, height: metrics.tileHeight * 1.3)
            .position(center)
    }

    private func environmentalProps(metrics: HabitatMetrics) -> some View {
        ZStack {
            pathSegment(at: HabitatCell(x: 1, y: 5), metrics: metrics)
            pathSegment(at: HabitatCell(x: 2, y: 5), metrics: metrics)
            pathSegment(at: HabitatCell(x: 3, y: 5), metrics: metrics)
            pathSegment(at: HabitatCell(x: 4, y: 5), metrics: metrics)
            pathSegment(at: HabitatCell(x: 4, y: 4), metrics: metrics)
            pond(at: HabitatCell(x: 5, y: 1), metrics: metrics)
            shrub(at: HabitatCell(x: 0, y: 4), metrics: metrics)
            shrub(at: HabitatCell(x: 6, y: 2), metrics: metrics)
            rock(at: HabitatCell(x: 6, y: 5), metrics: metrics)
        }
    }

    private func pathSegment(at cell: HabitatCell, metrics: HabitatMetrics) -> some View {
        let center = metrics.centerPoint(for: cell)
        return IsoTileShape(tileWidth: metrics.tileWidth * 0.92, tileHeight: metrics.tileHeight * 0.78)
            .fill(Color(red: 0.80, green: 0.73, blue: 0.58))
            .overlay {
                IsoTileShape(tileWidth: metrics.tileWidth * 0.92, tileHeight: metrics.tileHeight * 0.78)
                    .stroke(Color.white.opacity(0.35), lineWidth: 1)
            }
            .frame(width: metrics.tileWidth, height: metrics.tileHeight)
            .position(center)
    }

    private func pond(at cell: HabitatCell, metrics: HabitatMetrics) -> some View {
        let center = metrics.centerPoint(for: cell)
        return ZStack {
            Ellipse()
                .fill(Color(red: 0.30, green: 0.69, blue: 0.86))
                .frame(width: metrics.tileWidth * 1.15, height: metrics.tileHeight * 0.90)
            Ellipse()
                .stroke(Color.white.opacity(0.35), lineWidth: 2)
                .frame(width: metrics.tileWidth * 0.88, height: metrics.tileHeight * 0.58)
                .offset(y: -2)
        }
        .position(center)
    }

    private func shrub(at cell: HabitatCell, metrics: HabitatMetrics) -> some View {
        let center = metrics.centerPoint(for: cell)
        return ZStack {
            Capsule()
                .fill(Color(red: 0.28, green: 0.60, blue: 0.25))
                .frame(width: metrics.tileWidth * 0.8, height: metrics.tileHeight * 0.55)
                .offset(y: 8)
            Circle()
                .fill(Color(red: 0.36, green: 0.70, blue: 0.30))
                .frame(width: metrics.tileWidth * 0.6)
                .offset(x: -10, y: -4)
            Circle()
                .fill(Color(red: 0.30, green: 0.64, blue: 0.26))
                .frame(width: metrics.tileWidth * 0.56)
                .offset(x: 8, y: -10)
        }
        .position(center)
    }

    private func rock(at cell: HabitatCell, metrics: HabitatMetrics) -> some View {
        let center = metrics.centerPoint(for: cell)
        return ZStack {
            Ellipse()
                .fill(Color.black.opacity(0.10))
                .frame(width: metrics.tileWidth * 0.7, height: metrics.tileHeight * 0.3)
                .offset(y: 10)
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(red: 0.66, green: 0.69, blue: 0.72))
                .frame(width: metrics.tileWidth * 0.45, height: metrics.tileHeight * 0.55)
                .rotationEffect(.degrees(-12))
                .offset(x: -8)
            RoundedRectangle(cornerRadius: 10)
                .fill(Color(red: 0.57, green: 0.61, blue: 0.66))
                .frame(width: metrics.tileWidth * 0.34, height: metrics.tileHeight * 0.44)
                .rotationEffect(.degrees(8))
                .offset(x: 10, y: -2)
        }
        .position(center)
    }


    private func blockedZones(metrics: HabitatMetrics) -> some View {
        ZStack {
            ForEach(Array(blockedCells), id: \.self) { cell in
                IsoTileShape(tileWidth: metrics.tileWidth * 0.9, tileHeight: metrics.tileHeight * 0.76)
                    .fill(Color.black.opacity(0.07))
                    .overlay {
                        IsoTileShape(tileWidth: metrics.tileWidth * 0.9, tileHeight: metrics.tileHeight * 0.76)
                            .stroke(Color.white.opacity(0.18), lineWidth: 1)
                    }
                    .frame(width: metrics.tileWidth, height: metrics.tileHeight)
                    .position(metrics.centerPoint(for: cell))
            }
        }
    }

    private func fence(metrics: HabitatMetrics) -> some View {
        ZStack {
            fenceEdge(from: HabitatCell(x: 0, y: 0), to: HabitatCell(x: columns, y: 0), metrics: metrics)
            fenceEdge(from: HabitatCell(x: columns, y: 0), to: HabitatCell(x: columns, y: rows), metrics: metrics)
            fenceEdge(from: HabitatCell(x: 0, y: rows), to: HabitatCell(x: columns, y: rows), metrics: metrics)
            fenceEdge(from: HabitatCell(x: 0, y: 0), to: HabitatCell(x: 0, y: rows), metrics: metrics)
        }
    }

    private func fenceEdge(from start: HabitatCell, to end: HabitatCell, metrics: HabitatMetrics) -> some View {
        let startPoint = metrics.isoPoint(for: start)
        let endPoint = metrics.isoPoint(for: end)
        return Path { path in
            path.move(to: startPoint)
            path.addLine(to: endPoint)
        }
        .stroke(Color(red: 0.49, green: 0.31, blue: 0.18), style: StrokeStyle(lineWidth: 3.5, lineCap: .round, dash: [8, 6]))
    }

    private func placementOverlay(metrics: HabitatMetrics) -> some View {
        ZStack {
            ForEach(validCells, id: \.self) { cell in
                let center = metrics.centerPoint(for: cell)
                let isPreview = selectedInventoryItem != nil
                Button {
                    onTapCell(cell)
                } label: {
                    IsoTileShape(tileWidth: metrics.tileWidth * 0.92, tileHeight: metrics.tileHeight * 0.78)
                        .fill(isPreview ? Color.white.opacity(0.18) : Color.clear)
                        .overlay {
                            IsoTileShape(tileWidth: metrics.tileWidth * 0.92, tileHeight: metrics.tileHeight * 0.78)
                                .stroke(Color.white.opacity(0.25), style: StrokeStyle(lineWidth: 1, dash: [4, 5]))
                        }
                        .frame(width: metrics.tileWidth, height: metrics.tileHeight)
                }
                .buttonStyle(.plain)
                .position(center)
            }
        }
    }

    private func worldObjects(metrics: HabitatMetrics) -> some View {
        ZStack {
            ForEach(sceneItems) { item in
                item.makeView(metrics)
                    .zIndex(Double(item.depth))
            }
        }
    }

    private func placedObjectView(item: PlacedItem, metrics: HabitatMetrics) -> some View {
        let center = metrics.centerPoint(for: item.cell)
        return worldObjectShape(for: item, metrics: metrics)
            .position(center)
            .onTapGesture {
                if isEditing { onTapPlacedItem(item) }
            }
    }

    @ViewBuilder
    private func worldObjectShape(for item: PlacedItem, metrics: HabitatMetrics) -> some View {
        switch (item.type, item.assetKey) {
        case (.decoration, DecorationKind.cherryTree.rawValue):
            treeShape(metrics: metrics)
        case (.decoration, DecorationKind.flowerBed.rawValue):
            flowerBedShape(metrics: metrics)
        case (.decoration, DecorationKind.rockCluster.rawValue):
            rockClusterShape(metrics: metrics)
        case (.decoration, DecorationKind.stonePath.rawValue):
            pathTileShape(metrics: metrics)
        case (.decoration, DecorationKind.pond.rawValue):
            pondFeatureShape(metrics: metrics)
        default:
            fallbackDecoration(metrics: metrics, symbolName: item.symbolName)
        }
    }

    private func treeShape(metrics: HabitatMetrics) -> some View {
        ZStack {
            shadow(width: metrics.tileWidth * 0.7)
            RoundedRectangle(cornerRadius: 8)
                .fill(Color(red: 0.44, green: 0.25, blue: 0.12))
                .frame(width: metrics.tileWidth * 0.14, height: metrics.tileHeight * 1.25)
                .offset(y: 4)
            Circle()
                .fill(Color(red: 0.95, green: 0.71, blue: 0.80))
                .frame(width: metrics.tileWidth * 0.56)
                .offset(x: -10, y: -24)
            Circle()
                .fill(Color(red: 0.90, green: 0.56, blue: 0.70))
                .frame(width: metrics.tileWidth * 0.62)
                .offset(x: 12, y: -28)
            Circle()
                .fill(Color(red: 0.85, green: 0.42, blue: 0.60))
                .frame(width: metrics.tileWidth * 0.5)
                .offset(y: -44)
        }
        .frame(width: metrics.tileWidth, height: metrics.tileHeight * 2.2)
        .offset(y: -metrics.tileHeight * 0.62)
    }

    private func flowerBedShape(metrics: HabitatMetrics) -> some View {
        ZStack {
            shadow(width: metrics.tileWidth * 0.72)
            Capsule()
                .fill(Color(red: 0.37, green: 0.61, blue: 0.31))
                .frame(width: metrics.tileWidth * 0.74, height: metrics.tileHeight * 0.46)
                .offset(y: 4)
            HStack(spacing: 4) {
                ForEach(0..<5, id: \.self) { index in
                    Circle()
                        .fill([Color.pink, Color.yellow, Color.orange, Color.purple, Color.white][index])
                        .frame(width: metrics.tileWidth * 0.12)
                }
            }
            .offset(y: -4)
        }
        .frame(width: metrics.tileWidth, height: metrics.tileHeight)
    }

    private func rockClusterShape(metrics: HabitatMetrics) -> some View {
        ZStack {
            shadow(width: metrics.tileWidth * 0.68)
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(red: 0.72, green: 0.74, blue: 0.78))
                .frame(width: metrics.tileWidth * 0.34, height: metrics.tileHeight * 0.56)
                .rotationEffect(.degrees(-10))
                .offset(x: -12, y: -2)
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(red: 0.61, green: 0.64, blue: 0.70))
                .frame(width: metrics.tileWidth * 0.44, height: metrics.tileHeight * 0.62)
                .offset(x: 6, y: -8)
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(red: 0.78, green: 0.80, blue: 0.84))
                .frame(width: metrics.tileWidth * 0.26, height: metrics.tileHeight * 0.42)
                .offset(x: 16, y: 4)
        }
        .frame(width: metrics.tileWidth, height: metrics.tileHeight)
    }

    private func pathTileShape(metrics: HabitatMetrics) -> some View {
        ZStack {
            IsoTileShape(tileWidth: metrics.tileWidth * 0.86, tileHeight: metrics.tileHeight * 0.72)
                .fill(Color(red: 0.72, green: 0.67, blue: 0.56))
            IsoTileShape(tileWidth: metrics.tileWidth * 0.86, tileHeight: metrics.tileHeight * 0.72)
                .stroke(Color.white.opacity(0.3), lineWidth: 1)
        }
        .frame(width: metrics.tileWidth, height: metrics.tileHeight)
    }

    private func pondFeatureShape(metrics: HabitatMetrics) -> some View {
        ZStack {
            shadow(width: metrics.tileWidth * 0.88)
            Ellipse()
                .fill(Color(red: 0.28, green: 0.69, blue: 0.87))
                .frame(width: metrics.tileWidth * 0.82, height: metrics.tileHeight * 0.58)
            Ellipse()
                .stroke(Color.white.opacity(0.45), lineWidth: 1.5)
                .frame(width: metrics.tileWidth * 0.56, height: metrics.tileHeight * 0.30)
                .offset(y: -2)
        }
        .frame(width: metrics.tileWidth, height: metrics.tileHeight)
    }

    private func fallbackDecoration(metrics: HabitatMetrics, symbolName: String) -> some View {
        ZStack {
            shadow(width: metrics.tileWidth * 0.55)
            Circle()
                .fill(Color.white)
                .frame(width: metrics.tileWidth * 0.46)
            Image(systemName: symbolName)
                .foregroundStyle(.green)
        }
        .frame(width: metrics.tileWidth, height: metrics.tileHeight)
    }

    private func wanderingAnimalView(item: PlacedItem, metrics: HabitatMetrics) -> some View {
        TimelineView(.animation) { timeline in
            let pose = animalPose(for: item, at: timeline.date, metrics: metrics)
            animalShape(for: item, metrics: metrics)
                .scaleEffect(x: pose.facingLeft ? -1 : 1, y: 1)
                .position(pose.position)
                .animation(.easeInOut(duration: 0.25), value: pose.position)
        }
    }

    private func animalShape(for item: PlacedItem, metrics: HabitatMetrics) -> some View {
        switch item.assetKey {
        case AnimalSpecies.ant.rawValue:
            return AnyView(antShape(metrics: metrics))
        case AnimalSpecies.cat.rawValue:
            return AnyView(catShape(metrics: metrics))
        default:
            return AnyView(fallbackDecoration(metrics: metrics, symbolName: item.symbolName))
        }
    }

    private func antShape(metrics: HabitatMetrics) -> some View {
        ZStack {
            shadow(width: metrics.tileWidth * 0.36)
            HStack(spacing: 2) {
                Circle().fill(Color(red: 0.28, green: 0.17, blue: 0.12)).frame(width: metrics.tileWidth * 0.12)
                Circle().fill(Color(red: 0.30, green: 0.18, blue: 0.13)).frame(width: metrics.tileWidth * 0.15)
                Circle().fill(Color(red: 0.33, green: 0.20, blue: 0.14)).frame(width: metrics.tileWidth * 0.18)
            }
            .offset(y: -2)
        }
        .frame(width: metrics.tileWidth * 0.7, height: metrics.tileHeight * 0.6)
    }

    private func catShape(metrics: HabitatMetrics) -> some View {
        ZStack {
            shadow(width: metrics.tileWidth * 0.55)
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(red: 0.90, green: 0.66, blue: 0.44))
                .frame(width: metrics.tileWidth * 0.34, height: metrics.tileHeight * 0.50)
                .offset(y: -2)
            Circle()
                .fill(Color(red: 0.96, green: 0.74, blue: 0.54))
                .frame(width: metrics.tileWidth * 0.20)
                .offset(x: 10, y: -12)
            Triangle()
                .fill(Color(red: 0.90, green: 0.66, blue: 0.44))
                .frame(width: metrics.tileWidth * 0.08, height: metrics.tileHeight * 0.12)
                .offset(x: 4, y: -22)
            Triangle()
                .fill(Color(red: 0.90, green: 0.66, blue: 0.44))
                .frame(width: metrics.tileWidth * 0.08, height: metrics.tileHeight * 0.12)
                .offset(x: 14, y: -22)
        }
        .frame(width: metrics.tileWidth * 0.8, height: metrics.tileHeight * 0.9)
    }

    private func shadow(width: CGFloat) -> some View {
        Ellipse()
            .fill(Color.black.opacity(0.12))
            .frame(width: width, height: width * 0.32)
            .offset(y: 12)
    }

    private func animalPose(for item: PlacedItem, at date: Date, metrics: HabitatMetrics) -> AnimalPose {
        let t = date.timeIntervalSinceReferenceDate
        let base = metrics.centerPoint(for: item.cell)
        let seed = Double(abs(item.id.hashValue % 10_000)) / 10_000
        let phase = seed * .pi * 2
        let driftX = sin(t * 0.55 + phase) * metrics.tileWidth * 0.16
        let driftY = cos(t * 0.37 + phase * 1.7) * metrics.tileHeight * 0.12
        let pauseWeight = max(0.15, sin(t * 0.22 + phase * 0.8) * 0.5 + 0.5)
        let x = base.x + driftX * pauseWeight
        let y = base.y - metrics.tileHeight * 0.18 + driftY * pauseWeight
        return AnimalPose(position: CGPoint(x: x, y: y), facingLeft: driftX < 0)
    }
}

private struct SceneItem: Identifiable {
    let id: String
    let depth: Int
    let makeView: (HabitatMetrics) -> AnyView

    init<V: View>(id: String, depth: Int, @ViewBuilder builder: @escaping (HabitatMetrics) -> V) {
        self.id = id
        self.depth = depth
        self.makeView = { metrics in AnyView(builder(metrics)) }
    }
}

private struct AnimalPose {
    let position: CGPoint
    let facingLeft: Bool
}

private struct HabitatMetrics {
    let size: CGSize
    let columns: Int
    let rows: Int
    let tileWidth: CGFloat
    let tileHeight: CGFloat
    let origin: CGPoint

    init(size: CGSize, columns: Int, rows: Int) {
        self.size = size
        self.columns = columns
        self.rows = rows
        let horizontalFit = size.width / CGFloat(columns + rows)
        let verticalFit = size.height / CGFloat(columns + rows) * 1.9
        tileWidth = min(horizontalFit * 1.72, verticalFit * 1.72)
        tileHeight = tileWidth * 0.52
        origin = CGPoint(x: size.width / 2, y: size.height * 0.24)
    }

    func isoPoint(for cell: HabitatCell) -> CGPoint {
        CGPoint(
            x: origin.x + CGFloat(cell.x - cell.y) * tileWidth / 2,
            y: origin.y + CGFloat(cell.x + cell.y) * tileHeight / 2
        )
    }

    func centerPoint(for cell: HabitatCell) -> CGPoint {
        isoPoint(for: HabitatCell(x: cell.x + 1, y: cell.y + 1))
    }
}

private struct IsoTileShape: Shape {
    let tileWidth: CGFloat
    let tileHeight: CGFloat

    func path(in rect: CGRect) -> Path {
        let center = CGPoint(x: rect.midX, y: rect.midY)
        var path = Path()
        path.move(to: CGPoint(x: center.x, y: center.y - tileHeight / 2))
        path.addLine(to: CGPoint(x: center.x + tileWidth / 2, y: center.y))
        path.addLine(to: CGPoint(x: center.x, y: center.y + tileHeight / 2))
        path.addLine(to: CGPoint(x: center.x - tileWidth / 2, y: center.y))
        path.closeSubpath()
        return path
    }
}

private struct Triangle: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.midX, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY))
        path.addLine(to: CGPoint(x: rect.minX, y: rect.maxY))
        path.closeSubpath()
        return path
    }
}
