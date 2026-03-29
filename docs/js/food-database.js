const FoodDatabase = {
    foods: {
        // Proteins
        "grilled chicken breast": { name: "Grilled Chicken Breast", cal: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
        "steak": { name: "Grilled Steak", cal: 271, protein: 26, carbs: 0, fat: 18, serving: "100g" },
        "salmon": { name: "Salmon Fillet", cal: 208, protein: 20, carbs: 0, fat: 13, serving: "100g" },
        "eggs": { name: "Eggs (2 large)", cal: 143, protein: 12.6, carbs: 0.7, fat: 9.5, serving: "2 eggs" },
        "tuna": { name: "Tuna", cal: 132, protein: 28, carbs: 0, fat: 1, serving: "100g" },
        "shrimp": { name: "Shrimp", cal: 99, protein: 24, carbs: 0.2, fat: 0.3, serving: "100g" },
        "turkey breast": { name: "Turkey Breast", cal: 135, protein: 30, carbs: 0, fat: 1, serving: "100g" },
        "tofu": { name: "Tofu", cal: 76, protein: 8, carbs: 1.9, fat: 4.8, serving: "100g" },

        // Grains & Carbs
        "rice": { name: "White Rice", cal: 206, protein: 4.3, carbs: 44.5, fat: 0.4, serving: "1 cup" },
        "brown rice": { name: "Brown Rice", cal: 216, protein: 5, carbs: 44.8, fat: 1.8, serving: "1 cup" },
        "pasta": { name: "Pasta", cal: 220, protein: 8, carbs: 43, fat: 1.3, serving: "1 cup" },
        "bread": { name: "Bread (2 slices)", cal: 160, protein: 6, carbs: 30, fat: 2, serving: "2 slices" },
        "oatmeal": { name: "Oatmeal", cal: 154, protein: 5, carbs: 27, fat: 2.6, serving: "1 cup" },
        "potato": { name: "Baked Potato", cal: 161, protein: 4.3, carbs: 36.6, fat: 0.2, serving: "1 medium" },
        "sweet potato": { name: "Sweet Potato", cal: 103, protein: 2.3, carbs: 24, fat: 0.1, serving: "1 medium" },

        // Fruits
        "apple": { name: "Apple", cal: 95, protein: 0.5, carbs: 25, fat: 0.3, serving: "1 medium" },
        "banana": { name: "Banana", cal: 105, protein: 1.3, carbs: 27, fat: 0.4, serving: "1 medium" },
        "orange": { name: "Orange", cal: 62, protein: 1.2, carbs: 15, fat: 0.2, serving: "1 medium" },
        "strawberries": { name: "Strawberries", cal: 49, protein: 1, carbs: 12, fat: 0.5, serving: "1 cup" },
        "blueberries": { name: "Blueberries", cal: 84, protein: 1.1, carbs: 21, fat: 0.5, serving: "1 cup" },
        "grapes": { name: "Grapes", cal: 104, protein: 1.1, carbs: 27, fat: 0.2, serving: "1 cup" },
        "watermelon": { name: "Watermelon", cal: 86, protein: 1.7, carbs: 22, fat: 0.4, serving: "2 cups" },
        "mango": { name: "Mango", cal: 99, protein: 1.4, carbs: 25, fat: 0.6, serving: "1 cup" },
        "pineapple": { name: "Pineapple", cal: 82, protein: 0.9, carbs: 22, fat: 0.2, serving: "1 cup" },
        "avocado": { name: "Avocado", cal: 240, protein: 3, carbs: 13, fat: 22, serving: "1 whole" },

        // Vegetables
        "salad": { name: "Garden Salad", cal: 35, protein: 2.5, carbs: 6.5, fat: 0.4, serving: "2 cups" },
        "broccoli": { name: "Broccoli", cal: 55, protein: 3.7, carbs: 11, fat: 0.6, serving: "1 cup" },
        "spinach": { name: "Spinach", cal: 7, protein: 0.9, carbs: 1.1, fat: 0.1, serving: "1 cup" },
        "carrots": { name: "Carrots", cal: 52, protein: 1.2, carbs: 12, fat: 0.3, serving: "1 cup" },
        "corn": { name: "Corn", cal: 132, protein: 5, carbs: 29, fat: 1.8, serving: "1 ear" },
        "green beans": { name: "Green Beans", cal: 44, protein: 2.4, carbs: 10, fat: 0.4, serving: "1 cup" },

        // Common Meals
        "pizza": { name: "Pizza (1 slice)", cal: 285, protein: 12, carbs: 36, fat: 10, serving: "1 slice" },
        "burger": { name: "Hamburger", cal: 354, protein: 20, carbs: 29, fat: 17, serving: "1 burger" },
        "hot dog": { name: "Hot Dog", cal: 290, protein: 10, carbs: 24, fat: 17, serving: "1 hot dog" },
        "sandwich": { name: "Turkey Sandwich", cal: 320, protein: 22, carbs: 34, fat: 10, serving: "1 sandwich" },
        "burrito": { name: "Burrito", cal: 450, protein: 22, carbs: 52, fat: 16, serving: "1 burrito" },
        "sushi": { name: "Sushi Roll", cal: 255, protein: 9, carbs: 38, fat: 7, serving: "6 pieces" },
        "tacos": { name: "Tacos", cal: 226, protein: 14, carbs: 20, fat: 10, serving: "1 taco" },
        "soup": { name: "Chicken Soup", cal: 150, protein: 10, carbs: 15, fat: 5, serving: "1 bowl" },
        "fried rice": { name: "Fried Rice", cal: 238, protein: 5.5, carbs: 35, fat: 8.5, serving: "1 cup" },
        "mac and cheese": { name: "Mac and Cheese", cal: 310, protein: 11, carbs: 36, fat: 13, serving: "1 cup" },
        "chicken wings": { name: "Chicken Wings", cal: 320, protein: 27, carbs: 0, fat: 22, serving: "4 wings" },
        "fried chicken": { name: "Fried Chicken", cal: 390, protein: 29, carbs: 14, fat: 24, serving: "1 piece" },
        "french fries": { name: "French Fries", cal: 365, protein: 4, carbs: 48, fat: 17, serving: "medium" },
        "nachos": { name: "Nachos", cal: 346, protein: 9, carbs: 36, fat: 19, serving: "1 serving" },
        "ramen": { name: "Ramen", cal: 436, protein: 17, carbs: 56, fat: 16, serving: "1 bowl" },

        // Dairy
        "milk": { name: "Whole Milk", cal: 149, protein: 8, carbs: 12, fat: 8, serving: "1 cup" },
        "yogurt": { name: "Greek Yogurt", cal: 100, protein: 17, carbs: 6, fat: 0.7, serving: "1 cup" },
        "cheese": { name: "Cheddar Cheese", cal: 113, protein: 7, carbs: 0.4, fat: 9, serving: "1 oz" },

        // Snacks & Drinks
        "chips": { name: "Potato Chips", cal: 152, protein: 2, carbs: 15, fat: 10, serving: "1 oz" },
        "cookie": { name: "Chocolate Chip Cookie", cal: 78, protein: 1, carbs: 9, fat: 4.5, serving: "1 cookie" },
        "ice cream": { name: "Ice Cream", cal: 267, protein: 5, carbs: 32, fat: 14, serving: "1 cup" },
        "donut": { name: "Glazed Donut", cal: 269, protein: 4, carbs: 31, fat: 15, serving: "1 donut" },
        "chocolate": { name: "Dark Chocolate", cal: 170, protein: 2, carbs: 13, fat: 12, serving: "1 oz" },
        "peanut butter": { name: "Peanut Butter", cal: 188, protein: 8, carbs: 6, fat: 16, serving: "2 tbsp" },
        "almonds": { name: "Almonds", cal: 164, protein: 6, carbs: 6, fat: 14, serving: "1 oz" },
        "protein shake": { name: "Protein Shake", cal: 160, protein: 30, carbs: 5, fat: 2, serving: "1 scoop" },
        "granola bar": { name: "Granola Bar", cal: 190, protein: 3, carbs: 29, fat: 7, serving: "1 bar" },
        "trail mix": { name: "Trail Mix", cal: 175, protein: 5, carbs: 16, fat: 11, serving: "1/4 cup" },
        "popcorn": { name: "Popcorn", cal: 93, protein: 3, carbs: 19, fat: 1, serving: "3 cups" },
        "coffee": { name: "Coffee (black)", cal: 2, protein: 0.3, carbs: 0, fat: 0, serving: "1 cup" },
        "latte": { name: "Latte", cal: 190, protein: 10, carbs: 18, fat: 7, serving: "16 oz" },
        "orange juice": { name: "Orange Juice", cal: 112, protein: 1.7, carbs: 26, fat: 0.5, serving: "1 cup" },
        "soda": { name: "Soda", cal: 140, protein: 0, carbs: 39, fat: 0, serving: "12 oz" },
        "smoothie": { name: "Fruit Smoothie", cal: 210, protein: 4, carbs: 42, fat: 2, serving: "16 oz" },
        "beer": { name: "Beer", cal: 153, protein: 1.6, carbs: 13, fat: 0, serving: "12 oz" },
        "wine": { name: "Wine", cal: 125, protein: 0.1, carbs: 4, fat: 0, serving: "5 oz" },

        // Breakfast
        "pancakes": { name: "Pancakes", cal: 227, protein: 6, carbs: 30, fat: 9, serving: "2 pancakes" },
        "waffle": { name: "Waffle", cal: 218, protein: 6, carbs: 25, fat: 11, serving: "1 waffle" },
        "cereal": { name: "Cereal with Milk", cal: 220, protein: 6, carbs: 40, fat: 3, serving: "1 bowl" },
        "bacon": { name: "Bacon", cal: 43, protein: 3, carbs: 0, fat: 3.3, serving: "1 slice" },
        "bagel": { name: "Bagel", cal: 270, protein: 10, carbs: 53, fat: 1.5, serving: "1 bagel" },
        "muffin": { name: "Blueberry Muffin", cal: 340, protein: 5, carbs: 50, fat: 13, serving: "1 muffin" },
    },

    search(query) {
        if (!query || query.length < 2) return [];
        const lower = query.toLowerCase();
        return Object.values(this.foods)
            .filter(f => f.name.toLowerCase().includes(lower))
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 6);
    },

    lookup(name) {
        const key = name.toLowerCase();
        if (this.foods[key]) return this.foods[key];
        // Fuzzy: find first whose key contains or is contained by the search
        for (const [k, v] of Object.entries(this.foods)) {
            if (key.includes(k) || k.includes(key)) return v;
        }
        return null;
    },

    // Simulate food classification from an image
    classifyFood() {
        const keys = Object.keys(this.foods);
        const shuffled = keys.sort(() => Math.random() - 0.5);
        const picks = shuffled.slice(0, 3);
        let confidence = 0.85;

        return picks.map(key => {
            const food = this.foods[key];
            const result = {
                name: food.name,
                confidence: confidence,
                cal: food.cal,
                protein: food.protein,
                carbs: food.carbs,
                fat: food.fat,
                serving: food.serving
            };
            confidence -= 0.15;
            return result;
        });
    }
};
