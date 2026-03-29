import Foundation
import SwiftData

enum Sex: String, Codable, CaseIterable {
    case male = "Male"
    case female = "Female"
}

enum ActivityLevel: String, Codable, CaseIterable {
    case sedentary = "Sedentary"
    case lightlyActive = "Lightly Active"
    case moderatelyActive = "Moderately Active"
    case veryActive = "Very Active"

    var multiplier: Double {
        switch self {
        case .sedentary: return 1.2
        case .lightlyActive: return 1.375
        case .moderatelyActive: return 1.55
        case .veryActive: return 1.725
        }
    }
}

@Model
final class UserProfile {
    var weightLbs: Double
    var heightInches: Double
    var age: Int
    var sex: Sex
    var activityLevel: ActivityLevel
    var goalWeightLbs: Double
    var goalDate: Date
    var createdAt: Date

    init(
        weightLbs: Double = 215,
        heightInches: Double = 70, // 5'10"
        age: Int = 36,
        sex: Sex = .male,
        activityLevel: ActivityLevel = .lightlyActive,
        goalWeightLbs: Double = 180,
        goalDate: Date = Calendar.current.date(byAdding: .month, value: 6, to: Date()) ?? Date(),
        createdAt: Date = Date()
    ) {
        self.weightLbs = weightLbs
        self.heightInches = heightInches
        self.age = age
        self.sex = sex
        self.activityLevel = activityLevel
        self.goalWeightLbs = goalWeightLbs
        self.goalDate = goalDate
        self.createdAt = createdAt
    }

    var weightKg: Double { weightLbs * 0.453592 }
    var heightCm: Double { heightInches * 2.54 }

    var weeksToGoal: Int {
        let days = Calendar.current.dateComponents([.day], from: Date(), to: goalDate).day ?? 182
        return max(1, days / 7)
    }
}
