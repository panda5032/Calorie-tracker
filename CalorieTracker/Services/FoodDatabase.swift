import Foundation

struct FoodNutrition {
    let name: String
    let caloriesPerServing: Int
    let proteinGrams: Double
    let carbsGrams: Double
    let fatGrams: Double
    let servingSize: String
}

struct FoodDatabase {
    static let foods: [String: FoodNutrition] = [
        // Proteins
        "grilled chicken breast": FoodNutrition(name: "Grilled Chicken Breast", caloriesPerServing: 165, proteinGrams: 31, carbsGrams: 0, fatGrams: 3.6, servingSize: "100g"),
        "steak": FoodNutrition(name: "Grilled Steak", caloriesPerServing: 271, proteinGrams: 26, carbsGrams: 0, fatGrams: 18, servingSize: "100g"),
        "salmon": FoodNutrition(name: "Salmon Fillet", caloriesPerServing: 208, proteinGrams: 20, carbsGrams: 0, fatGrams: 13, servingSize: "100g"),
        "eggs": FoodNutrition(name: "Eggs (2 large)", caloriesPerServing: 143, proteinGrams: 12.6, carbsGrams: 0.7, fatGrams: 9.5, servingSize: "2 eggs"),
        "tuna": FoodNutrition(name: "Tuna", caloriesPerServing: 132, proteinGrams: 28, carbsGrams: 0, fatGrams: 1, servingSize: "100g"),
        "shrimp": FoodNutrition(name: "Shrimp", caloriesPerServing: 99, proteinGrams: 24, carbsGrams: 0.2, fatGrams: 0.3, servingSize: "100g"),
        "turkey breast": FoodNutrition(name: "Turkey Breast", caloriesPerServing: 135, proteinGrams: 30, carbsGrams: 0, fatGrams: 1, servingSize: "100g"),
        "tofu": FoodNutrition(name: "Tofu", caloriesPerServing: 76, proteinGrams: 8, carbsGrams: 1.9, fatGrams: 4.8, servingSize: "100g"),

        // Grains & Carbs
        "rice": FoodNutrition(name: "White Rice", caloriesPerServing: 206, proteinGrams: 4.3, carbsGrams: 44.5, fatGrams: 0.4, servingSize: "1 cup"),
        "brown rice": FoodNutrition(name: "Brown Rice", caloriesPerServing: 216, proteinGrams: 5, carbsGrams: 44.8, fatGrams: 1.8, servingSize: "1 cup"),
        "pasta": FoodNutrition(name: "Pasta", caloriesPerServing: 220, proteinGrams: 8, carbsGrams: 43, fatGrams: 1.3, servingSize: "1 cup"),
        "bread": FoodNutrition(name: "Bread (2 slices)", caloriesPerServing: 160, proteinGrams: 6, carbsGrams: 30, fatGrams: 2, servingSize: "2 slices"),
        "oatmeal": FoodNutrition(name: "Oatmeal", caloriesPerServing: 154, proteinGrams: 5, carbsGrams: 27, fatGrams: 2.6, servingSize: "1 cup"),
        "potato": FoodNutrition(name: "Baked Potato", caloriesPerServing: 161, proteinGrams: 4.3, carbsGrams: 36.6, fatGrams: 0.2, servingSize: "1 medium"),
        "sweet potato": FoodNutrition(name: "Sweet Potato", caloriesPerServing: 103, proteinGrams: 2.3, carbsGrams: 24, fatGrams: 0.1, servingSize: "1 medium"),

        // Fruits
        "apple": FoodNutrition(name: "Apple", caloriesPerServing: 95, proteinGrams: 0.5, carbsGrams: 25, fatGrams: 0.3, servingSize: "1 medium"),
        "banana": FoodNutrition(name: "Banana", caloriesPerServing: 105, proteinGrams: 1.3, carbsGrams: 27, fatGrams: 0.4, servingSize: "1 medium"),
        "orange": FoodNutrition(name: "Orange", caloriesPerServing: 62, proteinGrams: 1.2, carbsGrams: 15, fatGrams: 0.2, servingSize: "1 medium"),
        "strawberries": FoodNutrition(name: "Strawberries", caloriesPerServing: 49, proteinGrams: 1, carbsGrams: 12, fatGrams: 0.5, servingSize: "1 cup"),
        "blueberries": FoodNutrition(name: "Blueberries", caloriesPerServing: 84, proteinGrams: 1.1, carbsGrams: 21, fatGrams: 0.5, servingSize: "1 cup"),
        "grapes": FoodNutrition(name: "Grapes", caloriesPerServing: 104, proteinGrams: 1.1, carbsGrams: 27, fatGrams: 0.2, servingSize: "1 cup"),

        // Vegetables
        "salad": FoodNutrition(name: "Garden Salad", caloriesPerServing: 35, proteinGrams: 2.5, carbsGrams: 6.5, fatGrams: 0.4, servingSize: "2 cups"),
        "broccoli": FoodNutrition(name: "Broccoli", caloriesPerServing: 55, proteinGrams: 3.7, carbsGrams: 11, fatGrams: 0.6, servingSize: "1 cup"),
        "spinach": FoodNutrition(name: "Spinach", caloriesPerServing: 7, proteinGrams: 0.9, carbsGrams: 1.1, fatGrams: 0.1, servingSize: "1 cup"),
        "carrots": FoodNutrition(name: "Carrots", caloriesPerServing: 52, proteinGrams: 1.2, carbsGrams: 12, fatGrams: 0.3, servingSize: "1 cup"),
        "corn": FoodNutrition(name: "Corn", caloriesPerServing: 132, proteinGrams: 5, carbsGrams: 29, fatGrams: 1.8, servingSize: "1 ear"),

        // Common Meals
        "pizza": FoodNutrition(name: "Pizza (1 slice)", caloriesPerServing: 285, proteinGrams: 12, carbsGrams: 36, fatGrams: 10, servingSize: "1 slice"),
        "burger": FoodNutrition(name: "Hamburger", caloriesPerServing: 354, proteinGrams: 20, carbsGrams: 29, fatGrams: 17, servingSize: "1 burger"),
        "hot dog": FoodNutrition(name: "Hot Dog", caloriesPerServing: 290, proteinGrams: 10, carbsGrams: 24, fatGrams: 17, servingSize: "1 hot dog"),
        "sandwich": FoodNutrition(name: "Turkey Sandwich", caloriesPerServing: 320, proteinGrams: 22, carbsGrams: 34, fatGrams: 10, servingSize: "1 sandwich"),
        "burrito": FoodNutrition(name: "Burrito", caloriesPerServing: 450, proteinGrams: 22, carbsGrams: 52, fatGrams: 16, servingSize: "1 burrito"),
        "sushi": FoodNutrition(name: "Sushi Roll", caloriesPerServing: 255, proteinGrams: 9, carbsGrams: 38, fatGrams: 7, servingSize: "6 pieces"),
        "tacos": FoodNutrition(name: "Tacos", caloriesPerServing: 226, proteinGrams: 14, carbsGrams: 20, fatGrams: 10, servingSize: "1 taco"),
        "soup": FoodNutrition(name: "Chicken Soup", caloriesPerServing: 150, proteinGrams: 10, carbsGrams: 15, fatGrams: 5, servingSize: "1 bowl"),
        "fried rice": FoodNutrition(name: "Fried Rice", caloriesPerServing: 238, proteinGrams: 5.5, carbsGrams: 35, fatGrams: 8.5, servingSize: "1 cup"),
        "mac and cheese": FoodNutrition(name: "Mac and Cheese", caloriesPerServing: 310, proteinGrams: 11, carbsGrams: 36, fatGrams: 13, servingSize: "1 cup"),

        // Dairy
        "milk": FoodNutrition(name: "Whole Milk", caloriesPerServing: 149, proteinGrams: 8, carbsGrams: 12, fatGrams: 8, servingSize: "1 cup"),
        "yogurt": FoodNutrition(name: "Greek Yogurt", caloriesPerServing: 100, proteinGrams: 17, carbsGrams: 6, fatGrams: 0.7, servingSize: "1 cup"),
        "cheese": FoodNutrition(name: "Cheddar Cheese", caloriesPerServing: 113, proteinGrams: 7, carbsGrams: 0.4, fatGrams: 9, servingSize: "1 oz"),

        // Snacks & Drinks
        "chips": FoodNutrition(name: "Potato Chips", caloriesPerServing: 152, proteinGrams: 2, carbsGrams: 15, fatGrams: 10, servingSize: "1 oz"),
        "cookie": FoodNutrition(name: "Chocolate Chip Cookie", caloriesPerServing: 78, proteinGrams: 1, carbsGrams: 9, fatGrams: 4.5, servingSize: "1 cookie"),
        "ice cream": FoodNutrition(name: "Ice Cream", caloriesPerServing: 267, proteinGrams: 5, carbsGrams: 32, fatGrams: 14, servingSize: "1 cup"),
        "donut": FoodNutrition(name: "Glazed Donut", caloriesPerServing: 269, proteinGrams: 4, carbsGrams: 31, fatGrams: 15, servingSize: "1 donut"),
        "chocolate": FoodNutrition(name: "Dark Chocolate", caloriesPerServing: 170, proteinGrams: 2, carbsGrams: 13, fatGrams: 12, servingSize: "1 oz"),
        "peanut butter": FoodNutrition(name: "Peanut Butter", caloriesPerServing: 188, proteinGrams: 8, carbsGrams: 6, fatGrams: 16, servingSize: "2 tbsp"),
        "almonds": FoodNutrition(name: "Almonds", caloriesPerServing: 164, proteinGrams: 6, carbsGrams: 6, fatGrams: 14, servingSize: "1 oz"),
        "protein shake": FoodNutrition(name: "Protein Shake", caloriesPerServing: 160, proteinGrams: 30, carbsGrams: 5, fatGrams: 2, servingSize: "1 scoop"),
        "coffee": FoodNutrition(name: "Coffee (black)", caloriesPerServing: 2, proteinGrams: 0.3, carbsGrams: 0, fatGrams: 0, servingSize: "1 cup"),
        "orange juice": FoodNutrition(name: "Orange Juice", caloriesPerServing: 112, proteinGrams: 1.7, carbsGrams: 26, fatGrams: 0.5, servingSize: "1 cup"),
        "soda": FoodNutrition(name: "Soda", caloriesPerServing: 140, proteinGrams: 0, carbsGrams: 39, fatGrams: 0, servingSize: "12 oz"),

        // Breakfast
        "pancakes": FoodNutrition(name: "Pancakes", caloriesPerServing: 227, proteinGrams: 6, carbsGrams: 30, fatGrams: 9, servingSize: "2 pancakes"),
        "waffle": FoodNutrition(name: "Waffle", caloriesPerServing: 218, proteinGrams: 6, carbsGrams: 25, fatGrams: 11, servingSize: "1 waffle"),
        "cereal": FoodNutrition(name: "Cereal with Milk", caloriesPerServing: 220, proteinGrams: 6, carbsGrams: 40, fatGrams: 3, servingSize: "1 bowl"),
        "bacon": FoodNutrition(name: "Bacon", caloriesPerServing: 43, proteinGrams: 3, carbsGrams: 0, fatGrams: 3.3, servingSize: "1 slice"),
    ]

    static func lookup(_ name: String) -> FoodNutrition? {
        let key = name.lowercased()
        if let exact = foods[key] { return exact }
        // Fuzzy match: find first food whose key is contained in the search term or vice versa
        return foods.first(where: { key.contains($0.key) || $0.key.contains(key) })?.value
    }
}
