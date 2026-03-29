import Foundation
import SwiftData

@Observable
class DashboardViewModel {
    var dailySummary: DailySummary = DailySummary(date: Date(), entries: [])
    var dailyTarget: Int = AppConstants.defaultDailyTarget
    var bmr: Int = 0
    var tdee: Int = 0

    func loadData(context: ModelContext) {
        loadProfile(context: context)
        loadTodaysEntries(context: context)
    }

    private func loadProfile(context: ModelContext) {
        let descriptor = FetchDescriptor<UserProfile>()
        if let profile = try? context.fetch(descriptor).first {
            dailyTarget = CalorieCalculator.dailyTargetForProfile(profile)
            bmr = CalorieCalculator.bmrForProfile(profile)
            tdee = CalorieCalculator.tdeeForProfile(profile)
        }
    }

    private func loadTodaysEntries(context: ModelContext) {
        let startOfDay = Date().startOfDay
        let endOfDay = Date().endOfDay
        let descriptor = FetchDescriptor<FoodEntry>(
            predicate: #Predicate { entry in
                entry.timestamp >= startOfDay && entry.timestamp <= endOfDay
            },
            sortBy: [SortDescriptor(\.timestamp, order: .reverse)]
        )
        let entries = (try? context.fetch(descriptor)) ?? []
        dailySummary = DailySummary(date: Date(), entries: entries)
    }

    var caloriesConsumed: Int { dailySummary.totalCalories }
    var caloriesRemaining: Int { dailySummary.remainingCalories(target: dailyTarget) }
    var progressFraction: Double { dailySummary.progressFraction(target: dailyTarget) }
    var isOverTarget: Bool { caloriesConsumed > dailyTarget }
}
