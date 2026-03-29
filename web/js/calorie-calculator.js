const CalorieCalculator = {
    // Mifflin-St Jeor BMR equation
    bmr(weightKg, heightCm, age, sex) {
        const base = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
        return sex === 'male' ? base + 5 : base - 161;
    },

    // Total Daily Energy Expenditure
    tdee(bmr, activityMultiplier) {
        return bmr * activityMultiplier;
    },

    // Daily calorie target for weight loss
    dailyTarget(currentWeightLbs, goalWeightLbs, weeks, tdee) {
        const lbsToLose = currentWeightLbs - goalWeightLbs;
        if (lbsToLose <= 0 || weeks <= 0) return Math.round(tdee);

        const totalDeficit = lbsToLose * 3500; // 1 lb fat ≈ 3500 cal
        const dailyDeficit = totalDeficit / (weeks * 7);
        const target = tdee - dailyDeficit;
        return Math.max(1200, Math.round(target));
    },

    // Unit conversions
    lbsToKg(lbs) { return lbs * 0.453592; },
    inchesToCm(inches) { return inches * 2.54; },

    // Compute all values from a profile object
    computeAll(profile) {
        const weightKg = this.lbsToKg(profile.weightLbs);
        const heightCm = this.inchesToCm(profile.heightInches);
        const bmr = this.bmr(weightKg, heightCm, profile.age, profile.sex);
        const tdee = this.tdee(bmr, profile.activityMultiplier);
        const weeks = this.weeksUntil(new Date(profile.goalDate));
        const dailyTarget = this.dailyTarget(profile.weightLbs, profile.goalWeightLbs, weeks, tdee);

        return {
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            dailyTarget,
            weeks,
            daysRemaining: this.daysUntil(new Date(profile.goalDate))
        };
    },

    weeksUntil(date) {
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        return Math.max(1, Math.round(diff / (7 * 24 * 60 * 60 * 1000)));
    },

    daysUntil(date) {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const target = new Date(date);
        target.setHours(0, 0, 0, 0);
        return Math.max(0, Math.round((target - now) / (24 * 60 * 60 * 1000)));
    }
};
