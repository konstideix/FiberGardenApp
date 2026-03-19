import SwiftUI

struct StatPill: View {
    let title: String
    let value: String
    let symbolName: String

    var body: some View {
        HStack(spacing: 10) {
            Image(systemName: symbolName)
                .font(.headline)
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Text(value)
                    .font(.headline)
                    .fontWeight(.semibold)
            }
        }
        .padding(.vertical, 10)
        .padding(.horizontal, 14)
        .background(Color(.secondarySystemBackground), in: Capsule())
    }
}
