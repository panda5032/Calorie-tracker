const ExerciseDatabase = {
    exercises: {
        // Cardio (calories per 30 min for ~215 lb person)
        "running": { name: "Running", calPer30: 370, category: "Cardio", icon: "run" },
        "jogging": { name: "Jogging", calPer30: 280, category: "Cardio", icon: "run" },
        "walking": { name: "Walking (brisk)", calPer30: 150, category: "Cardio", icon: "walk" },
        "cycling": { name: "Cycling", calPer30: 300, category: "Cardio", icon: "cycle" },
        "swimming": { name: "Swimming", calPer30: 310, category: "Cardio", icon: "swim" },
        "jump rope": { name: "Jump Rope", calPer30: 370, category: "Cardio", icon: "jump" },
        "rowing": { name: "Rowing Machine", calPer30: 310, category: "Cardio", icon: "row" },
        "elliptical": { name: "Elliptical", calPer30: 270, category: "Cardio", icon: "elliptical" },
        "stair climber": { name: "Stair Climber", calPer30: 290, category: "Cardio", icon: "stairs" },
        "hiking": { name: "Hiking", calPer30: 250, category: "Cardio", icon: "hike" },
        "dancing": { name: "Dancing", calPer30: 200, category: "Cardio", icon: "dance" },
        "kickboxing": { name: "Kickboxing", calPer30: 350, category: "Cardio", icon: "box" },
        "sprinting": { name: "Sprinting (intervals)", calPer30: 430, category: "Cardio", icon: "run" },

        // Strength
        "weight lifting": { name: "Weight Lifting", calPer30: 180, category: "Strength", icon: "lift" },
        "bench press": { name: "Bench Press", calPer30: 170, category: "Strength", icon: "lift" },
        "squats": { name: "Squats", calPer30: 200, category: "Strength", icon: "squat" },
        "deadlifts": { name: "Deadlifts", calPer30: 210, category: "Strength", icon: "lift" },
        "pull ups": { name: "Pull-Ups", calPer30: 190, category: "Strength", icon: "pullup" },
        "push ups": { name: "Push-Ups", calPer30: 170, category: "Strength", icon: "pushup" },
        "kettlebell": { name: "Kettlebell Workout", calPer30: 220, category: "Strength", icon: "kettle" },
        "resistance bands": { name: "Resistance Bands", calPer30: 150, category: "Strength", icon: "band" },
        "lunges": { name: "Lunges", calPer30: 180, category: "Strength", icon: "lunge" },
        "shoulder press": { name: "Shoulder Press", calPer30: 170, category: "Strength", icon: "lift" },
        "bicep curls": { name: "Bicep Curls", calPer30: 140, category: "Strength", icon: "curl" },

        // Flexibility & Other
        "yoga": { name: "Yoga", calPer30: 130, category: "Flexibility", icon: "yoga" },
        "pilates": { name: "Pilates", calPer30: 160, category: "Flexibility", icon: "pilates" },
        "stretching": { name: "Stretching", calPer30: 80, category: "Flexibility", icon: "stretch" },
        "tai chi": { name: "Tai Chi", calPer30: 130, category: "Flexibility", icon: "taichi" },

        // Sports
        "basketball": { name: "Basketball", calPer30: 290, category: "Sports", icon: "ball" },
        "soccer": { name: "Soccer", calPer30: 300, category: "Sports", icon: "ball" },
        "tennis": { name: "Tennis", calPer30: 270, category: "Sports", icon: "racket" },
        "boxing": { name: "Boxing (sparring)", calPer30: 350, category: "Sports", icon: "box" },
        "golf": { name: "Golf (walking)", calPer30: 160, category: "Sports", icon: "golf" },
        "volleyball": { name: "Volleyball", calPer30: 200, category: "Sports", icon: "ball" },
        "baseball": { name: "Baseball", calPer30: 170, category: "Sports", icon: "ball" },
        "rock climbing": { name: "Rock Climbing", calPer30: 320, category: "Sports", icon: "climb" },

        // HIIT & Circuits
        "hiit": { name: "HIIT Workout", calPer30: 380, category: "HIIT", icon: "hiit" },
        "crossfit": { name: "CrossFit", calPer30: 350, category: "HIIT", icon: "cross" },
        "circuit training": { name: "Circuit Training", calPer30: 300, category: "HIIT", icon: "circuit" },
        "burpees": { name: "Burpees", calPer30: 350, category: "HIIT", icon: "burpee" },
        "tabata": { name: "Tabata", calPer30: 360, category: "HIIT", icon: "tabata" },
    },

    // Scale calories burned based on user's weight (base is 215 lbs)
    adjustForWeight(calPer30, userWeightLbs) {
        return Math.round(calPer30 * (userWeightLbs / 215));
    },

    search(query) {
        if (!query || query.length < 2) return [];
        const lower = query.toLowerCase();
        return Object.values(this.exercises)
            .filter(e => e.name.toLowerCase().includes(lower) || e.category.toLowerCase().includes(lower))
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 8);
    },

    getByCategory(category) {
        return Object.values(this.exercises)
            .filter(e => e.category === category)
            .sort((a, b) => a.name.localeCompare(b.name));
    },

    categories: ["Cardio", "Strength", "HIIT", "Sports", "Flexibility"],

    getCategoryIcon(category) {
        const icons = {
            "Cardio": "heart.fill",
            "Strength": "dumbbell.fill",
            "HIIT": "bolt.fill",
            "Sports": "sportscourt.fill",
            "Flexibility": "figure.mind.and.body"
        };
        return icons[category] || "figure.walk";
    },

    getCategoryEmoji(category) {
        const emojis = {
            "Cardio": "\u{1F3C3}",
            "Strength": "\u{1F4AA}",
            "HIIT": "\u{26A1}",
            "Sports": "\u{26BD}",
            "Flexibility": "\u{1F9D8}"
        };
        return emojis[category] || "\u{1F3CB}";
    }
};
