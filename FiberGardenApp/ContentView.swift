import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            TrackerView()
                .tabItem {
                    Label("Tracker", systemImage: "list.bullet.clipboard")
                }

            GardenView()
                .tabItem {
                    Label("Garten", systemImage: "leaf")
                }
        }
    }
}

#Preview {
    ContentView()
        .environmentObject(AppStateViewModel())
}
