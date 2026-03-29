import Foundation

struct DailySummary {
    let date: Date
    let entries: [FoodEntry]

    var totalCalories: Int {
        entries.reduce(0) { $0 + $1.calories }
    }

    var totalProtein: Double {
        entries.reduce(0) { $0 + $1.protein }
    }

    var totalCarbs: Double {
        entries.reduce(0) { $0 + $1.carbs }
    }

    var totalFat: Double {
        entries.reduce(0) { $0 + $1.fat }
    }

    func remainingCalories(target: Int) -> Int {
        target - totalCalories
    }

    func progressFraction(target: Int) -> Double {
        guard target > 0 else { return 0 }
        return min(Double(totalCalories) / Double(target), 1.0)
    }
}
