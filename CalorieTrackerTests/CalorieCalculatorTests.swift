import XCTest
@testable import CalorieTracker

final class CalorieCalculatorTests: XCTestCase {

    // MARK: - BMR Tests (Mifflin-St Jeor)

    func testBMR_Male_215lbs_5ft10_36yrs() {
        // 215 lbs = 97.52 kg, 5'10" = 70 in = 177.8 cm
        let weightKg = 215.0 * 0.453592  // 97.52
        let heightCm = 70.0 * 2.54       // 177.8
        let result = CalorieCalculator.bmr(weightKg: weightKg, heightCm: heightCm, age: 36, sex: .male)

        // BMR = (10 * 97.52) + (6.25 * 177.8) - (5 * 36) + 5
        // = 975.2 + 1111.25 - 180 + 5 = 1911.45
        XCTAssertEqual(result, 1911.45, accuracy: 1.0, "BMR for 215lb male should be ~1911")
    }

    func testBMR_Female() {
        let weightKg = 70.0
        let heightCm = 165.0
        let result = CalorieCalculator.bmr(weightKg: weightKg, heightCm: heightCm, age: 30, sex: .female)

        // BMR = (10 * 70) + (6.25 * 165) - (5 * 30) - 161
        // = 700 + 1031.25 - 150 - 161 = 1420.25
        XCTAssertEqual(result, 1420.25, accuracy: 1.0)
    }

    // MARK: - TDEE Tests

    func testTDEE_LightlyActive() {
        let bmr = 1911.0
        let result = CalorieCalculator.tdee(bmr: bmr, activityLevel: .lightlyActive)
        XCTAssertEqual(result, 1911 * 1.375, accuracy: 1.0)
    }

    func testTDEE_Sedentary() {
        let bmr = 1911.0
        let result = CalorieCalculator.tdee(bmr: bmr, activityLevel: .sedentary)
        XCTAssertEqual(result, 1911 * 1.2, accuracy: 1.0)
    }

    func testTDEE_VeryActive() {
        let bmr = 1911.0
        let result = CalorieCalculator.tdee(bmr: bmr, activityLevel: .veryActive)
        XCTAssertEqual(result, 1911 * 1.725, accuracy: 1.0)
    }

    // MARK: - Daily Target Tests

    func testDailyTarget_UserGoal() {
        // 215 -> 180 lbs in 26 weeks
        let tdee = 2628.0 // approximate TDEE for lightly active
        let result = CalorieCalculator.dailyTarget(
            currentWeightLbs: 215,
            goalWeightLbs: 180,
            weeks: 26,
            tdee: tdee
        )

        // Deficit: 35 lbs * 3500 cal/lb = 122,500 cal total
        // Daily deficit: 122,500 / (26*7) = 672.8 cal/day
        // Target: 2628 - 673 = ~1955
        XCTAssertEqual(result, 1955, accuracy: 20, "Daily target should be ~1955 calories")
    }

    func testDailyTarget_MinimumFloor() {
        // Extreme deficit should be capped at 1200
        let result = CalorieCalculator.dailyTarget(
            currentWeightLbs: 300,
            goalWeightLbs: 150,
            weeks: 10,
            tdee: 2000
        )
        XCTAssertEqual(result, 1200, "Should not go below 1200 calories")
    }

    func testDailyTarget_NoWeightToLose() {
        let result = CalorieCalculator.dailyTarget(
            currentWeightLbs: 180,
            goalWeightLbs: 180,
            weeks: 26,
            tdee: 2500
        )
        XCTAssertEqual(result, 2500, "Target should equal TDEE when no weight to lose")
    }

    // MARK: - Food Database Tests

    func testFoodLookup_ExactMatch() {
        let result = FoodDatabase.lookup("grilled chicken breast")
        XCTAssertNotNil(result)
        XCTAssertEqual(result?.caloriesPerServing, 165)
    }

    func testFoodLookup_FuzzyMatch() {
        let result = FoodDatabase.lookup("chicken")
        XCTAssertNotNil(result, "Should find chicken via fuzzy match")
    }

    func testFoodLookup_NoMatch() {
        let result = FoodDatabase.lookup("xyznonexistentfood")
        XCTAssertNil(result)
    }

    // MARK: - Activity Level Multiplier Tests

    func testActivityMultipliers() {
        XCTAssertEqual(ActivityLevel.sedentary.multiplier, 1.2)
        XCTAssertEqual(ActivityLevel.lightlyActive.multiplier, 1.375)
        XCTAssertEqual(ActivityLevel.moderatelyActive.multiplier, 1.55)
        XCTAssertEqual(ActivityLevel.veryActive.multiplier, 1.725)
    }
}
