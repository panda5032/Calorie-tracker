import SwiftUI

enum AppConstants {
    static let appName = "Calorie Tracker"
    static let defaultDailyTarget = 1950
    static let minimumDailyCalories = 1200
    static let caloriesPerPoundFat = 3500.0

    enum MacroRatio {
        static let protein = 0.30  // 30% of calories from protein
        static let carbs = 0.40   // 40% from carbs
        static let fat = 0.30     // 30% from fat
    }
}

enum AppColors {
    static let calorieRing = Color.orange
    static let proteinColor = Color.blue
    static let carbsColor = Color.green
    static let fatColor = Color.yellow
    static let deficit = Color.green
    static let surplus = Color.red
    static let accent = Color.orange
}
