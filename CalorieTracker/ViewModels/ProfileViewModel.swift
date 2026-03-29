import Foundation
import SwiftData

@Observable
class ProfileViewModel {
    var profile: UserProfile?
    var dailyTarget: Int = AppConstants.defaultDailyTarget
    var bmr: Int = 0
    var tdee: Int = 0

    func loadProfile(context: ModelContext) {
        let descriptor = FetchDescriptor<UserProfile>()
        if let existing = try? context.fetch(descriptor).first {
            profile = existing
        } else {
            let newProfile = UserProfile()
            context.insert(newProfile)
            try? context.save()
            profile = newProfile
        }
        recalculate()
    }

    func saveProfile(context: ModelContext) {
        try? context.save()
        recalculate()
    }

    func recalculate() {
        guard let profile else { return }
        bmr = CalorieCalculator.bmrForProfile(profile)
        tdee = CalorieCalculator.tdeeForProfile(profile)
        dailyTarget = CalorieCalculator.dailyTargetForProfile(profile)
    }

    var weightToLose: Double {
        guard let profile else { return 0 }
        return max(0, profile.weightLbs - profile.goalWeightLbs)
    }

    var daysRemaining: Int {
        guard let profile else { return 0 }
        return Date().daysUntil(profile.goalDate)
    }

    var weeklyLossRate: Double {
        guard let profile else { return 0 }
        let weeks = max(1, Double(profile.weeksToGoal))
        return weightToLose / weeks
    }
}
