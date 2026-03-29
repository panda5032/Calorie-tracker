import Foundation

struct CalorieCalculator {
    /// Mifflin-St Jeor BMR equation
    static func bmr(weightKg: Double, heightCm: Double, age: Int, sex: Sex) -> Double {
        let base = (10 * weightKg) + (6.25 * heightCm) - (5 * Double(age))
        switch sex {
        case .male: return base + 5
        case .female: return base - 161
        }
    }

    /// Total Daily Energy Expenditure
    static func tdee(bmr: Double, activityLevel: ActivityLevel) -> Double {
        bmr * activityLevel.multiplier
    }

    /// Calculate daily calorie target to reach goal weight by goal date
    static func dailyTarget(
        currentWeightLbs: Double,
        goalWeightLbs: Double,
        weeks: Int,
        tdee: Double
    ) -> Int {
        let lbsToLose = currentWeightLbs - goalWeightLbs
        guard lbsToLose > 0, weeks > 0 else { return Int(tdee) }

        // 1 lb of fat ≈ 3500 calories
        let totalDeficit = lbsToLose * 3500
        let dailyDeficit = totalDeficit / Double(weeks * 7)

        // Cap deficit at reasonable level (no less than 1200 cal/day)
        let target = tdee - dailyDeficit
        return max(1200, Int(target))
    }

    /// Convenience: compute everything from a UserProfile
    static func dailyTargetForProfile(_ profile: UserProfile) -> Int {
        let bmrValue = bmr(
            weightKg: profile.weightKg,
            heightCm: profile.heightCm,
            age: profile.age,
            sex: profile.sex
        )
        let tdeeValue = tdee(bmr: bmrValue, activityLevel: profile.activityLevel)
        return dailyTarget(
            currentWeightLbs: profile.weightLbs,
            goalWeightLbs: profile.goalWeightLbs,
            weeks: profile.weeksToGoal,
            tdee: tdeeValue
        )
    }

    /// BMR for display
    static func bmrForProfile(_ profile: UserProfile) -> Int {
        Int(bmr(weightKg: profile.weightKg, heightCm: profile.heightCm, age: profile.age, sex: profile.sex))
    }

    /// TDEE for display
    static func tdeeForProfile(_ profile: UserProfile) -> Int {
        let bmrValue = bmr(weightKg: profile.weightKg, heightCm: profile.heightCm, age: profile.age, sex: profile.sex)
        return Int(tdee(bmr: bmrValue, activityLevel: profile.activityLevel))
    }
}
