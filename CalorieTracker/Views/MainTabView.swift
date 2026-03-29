import SwiftUI

struct MainTabView: View {
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            DashboardView()
                .tabItem {
                    Label("Dashboard", systemImage: "chart.pie.fill")
                }
                .tag(0)

            FoodLogView()
                .tabItem {
                    Label("Food Log", systemImage: "list.bullet.clipboard.fill")
                }
                .tag(1)

            CameraView()
                .tabItem {
                    Label("Scan Food", systemImage: "camera.fill")
                }
                .tag(2)

            ProfileView()
                .tabItem {
                    Label("Profile", systemImage: "person.circle.fill")
                }
                .tag(3)
        }
        .tint(AppColors.accent)
    }
}
