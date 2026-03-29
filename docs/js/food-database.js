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
        "french toast": { name: "French Toast", cal: 220, protein: 7, carbs: 26, fat: 10, serving: "2 slices" },
        "breakfast burrito": { name: "Breakfast Burrito", cal: 350, protein: 15, carbs: 35, fat: 16, serving: "1 burrito" },
        "hash browns": { name: "Hash Browns", cal: 210, protein: 2, carbs: 25, fat: 12, serving: "1 cup" },
        "sausage": { name: "Breakfast Sausage", cal: 170, protein: 8, carbs: 1, fat: 15, serving: "2 links" },
        "egg sandwich": { name: "Egg Sandwich", cal: 340, protein: 16, carbs: 30, fat: 17, serving: "1 sandwich" },
        "omelet": { name: "Omelet (3 egg)", cal: 280, protein: 20, carbs: 2, fat: 21, serving: "1 omelet" },
        "scrambled eggs": { name: "Scrambled Eggs", cal: 182, protein: 12, carbs: 2, fat: 14, serving: "2 eggs" },
        "breakfast sandwich": { name: "Breakfast Sandwich", cal: 410, protein: 18, carbs: 35, fat: 22, serving: "1 sandwich" },
        "croissant": { name: "Croissant", cal: 231, protein: 5, carbs: 26, fat: 12, serving: "1 croissant" },
        "granola": { name: "Granola", cal: 210, protein: 5, carbs: 34, fat: 7, serving: "1/2 cup" },
        "yogurt parfait": { name: "Yogurt Parfait", cal: 250, protein: 12, carbs: 40, fat: 5, serving: "1 cup" },

        // Skillet & Casserole Meals
        "skillet": { name: "Chicken Skillet", cal: 380, protein: 28, carbs: 22, fat: 20, serving: "1 plate" },
        "skillet meal": { name: "Skillet Meal (mixed)", cal: 420, protein: 25, carbs: 30, fat: 22, serving: "1 plate" },
        "beef skillet": { name: "Beef Skillet", cal: 450, protein: 30, carbs: 25, fat: 26, serving: "1 plate" },
        "sausage skillet": { name: "Sausage Skillet", cal: 480, protein: 22, carbs: 28, fat: 32, serving: "1 plate" },
        "veggie skillet": { name: "Veggie Skillet", cal: 250, protein: 8, carbs: 30, fat: 12, serving: "1 plate" },
        "breakfast skillet": { name: "Breakfast Skillet", cal: 520, protein: 24, carbs: 32, fat: 33, serving: "1 plate" },
        "casserole": { name: "Casserole", cal: 380, protein: 20, carbs: 30, fat: 20, serving: "1 cup" },
        "chicken casserole": { name: "Chicken Casserole", cal: 350, protein: 25, carbs: 28, fat: 16, serving: "1 cup" },
        "tuna casserole": { name: "Tuna Casserole", cal: 320, protein: 22, carbs: 30, fat: 13, serving: "1 cup" },

        // More Proteins
        "pork chop": { name: "Pork Chop", cal: 231, protein: 27, carbs: 0, fat: 13, serving: "1 chop" },
        "lamb": { name: "Lamb Chop", cal: 250, protein: 26, carbs: 0, fat: 16, serving: "100g" },
        "ground beef": { name: "Ground Beef (80/20)", cal: 287, protein: 19, carbs: 0, fat: 23, serving: "100g" },
        "ground turkey": { name: "Ground Turkey", cal: 170, protein: 21, carbs: 0, fat: 9, serving: "100g" },
        "chicken thigh": { name: "Chicken Thigh", cal: 209, protein: 26, carbs: 0, fat: 11, serving: "1 thigh" },
        "chicken drumstick": { name: "Chicken Drumstick", cal: 172, protein: 28, carbs: 0, fat: 6, serving: "1 drumstick" },
        "chicken tender": { name: "Chicken Tenders", cal: 330, protein: 22, carbs: 20, fat: 18, serving: "4 pieces" },
        "chicken nuggets": { name: "Chicken Nuggets", cal: 270, protein: 14, carbs: 16, fat: 17, serving: "6 pieces" },
        "rotisserie chicken": { name: "Rotisserie Chicken", cal: 190, protein: 27, carbs: 0, fat: 9, serving: "100g" },
        "pulled pork": { name: "Pulled Pork", cal: 220, protein: 22, carbs: 6, fat: 12, serving: "100g" },
        "ribs": { name: "BBQ Ribs", cal: 340, protein: 24, carbs: 8, fat: 24, serving: "3 ribs" },
        "brisket": { name: "Beef Brisket", cal: 310, protein: 28, carbs: 0, fat: 22, serving: "100g" },
        "meatball": { name: "Meatballs", cal: 250, protein: 18, carbs: 8, fat: 16, serving: "3 meatballs" },
        "meatloaf": { name: "Meatloaf", cal: 260, protein: 17, carbs: 10, fat: 17, serving: "1 slice" },
        "fish fillet": { name: "Fish Fillet (fried)", cal: 280, protein: 18, carbs: 18, fat: 16, serving: "1 fillet" },
        "fish tacos": { name: "Fish Tacos", cal: 310, protein: 18, carbs: 28, fat: 14, serving: "2 tacos" },
        "crab": { name: "Crab Meat", cal: 97, protein: 19, carbs: 0, fat: 2, serving: "100g" },
        "lobster": { name: "Lobster", cal: 89, protein: 19, carbs: 0, fat: 0.9, serving: "100g" },
        "scallops": { name: "Scallops", cal: 111, protein: 20, carbs: 5, fat: 1, serving: "100g" },
        "beef jerky": { name: "Beef Jerky", cal: 116, protein: 9, carbs: 3, fat: 7, serving: "1 oz" },

        // Fast Food
        "big mac": { name: "Big Mac", cal: 550, protein: 25, carbs: 45, fat: 30, serving: "1 burger" },
        "cheeseburger": { name: "Cheeseburger", cal: 303, protein: 15, carbs: 28, fat: 14, serving: "1 burger" },
        "chicken sandwich": { name: "Chicken Sandwich", cal: 420, protein: 28, carbs: 40, fat: 16, serving: "1 sandwich" },
        "whopper": { name: "Whopper", cal: 657, protein: 28, carbs: 49, fat: 40, serving: "1 burger" },
        "mcnuggets": { name: "McNuggets (10pc)", cal: 420, protein: 24, carbs: 26, fat: 25, serving: "10 pieces" },
        "filet o fish": { name: "Filet-O-Fish", cal: 390, protein: 16, carbs: 39, fat: 19, serving: "1 sandwich" },
        "sub sandwich": { name: "Sub Sandwich (6 inch)", cal: 380, protein: 20, carbs: 42, fat: 14, serving: "6 inch" },
        "wrap": { name: "Chicken Wrap", cal: 360, protein: 22, carbs: 35, fat: 14, serving: "1 wrap" },
        "quesadilla": { name: "Quesadilla", cal: 470, protein: 24, carbs: 38, fat: 24, serving: "1 quesadilla" },
        "chalupa": { name: "Chalupa", cal: 350, protein: 12, carbs: 30, fat: 21, serving: "1 chalupa" },
        "crunchwrap": { name: "Crunchwrap Supreme", cal: 530, protein: 16, carbs: 51, fat: 30, serving: "1 wrap" },
        "onion rings": { name: "Onion Rings", cal: 340, protein: 5, carbs: 40, fat: 18, serving: "medium" },
        "mozzarella sticks": { name: "Mozzarella Sticks", cal: 360, protein: 16, carbs: 28, fat: 20, serving: "4 pieces" },
        "corn dog": { name: "Corn Dog", cal: 230, protein: 7, carbs: 26, fat: 11, serving: "1 corn dog" },
        "tater tots": { name: "Tater Tots", cal: 270, protein: 3, carbs: 32, fat: 15, serving: "1 cup" },

        // More Meals & Dinners
        "stir fry": { name: "Stir Fry", cal: 320, protein: 22, carbs: 28, fat: 14, serving: "1 plate" },
        "chicken stir fry": { name: "Chicken Stir Fry", cal: 340, protein: 28, carbs: 25, fat: 14, serving: "1 plate" },
        "beef stew": { name: "Beef Stew", cal: 250, protein: 18, carbs: 22, fat: 10, serving: "1 bowl" },
        "chili": { name: "Chili", cal: 310, protein: 22, carbs: 26, fat: 14, serving: "1 bowl" },
        "pot roast": { name: "Pot Roast", cal: 280, protein: 30, carbs: 10, fat: 14, serving: "1 serving" },
        "shepherd's pie": { name: "Shepherd's Pie", cal: 350, protein: 20, carbs: 30, fat: 16, serving: "1 cup" },
        "pot pie": { name: "Chicken Pot Pie", cal: 450, protein: 15, carbs: 40, fat: 26, serving: "1 pie" },
        "lasagna": { name: "Lasagna", cal: 380, protein: 20, carbs: 35, fat: 17, serving: "1 piece" },
        "spaghetti": { name: "Spaghetti & Meatballs", cal: 430, protein: 22, carbs: 48, fat: 16, serving: "1 plate" },
        "alfredo": { name: "Fettuccine Alfredo", cal: 480, protein: 14, carbs: 42, fat: 28, serving: "1 plate" },
        "carbonara": { name: "Pasta Carbonara", cal: 450, protein: 18, carbs: 40, fat: 24, serving: "1 plate" },
        "penne": { name: "Penne Pasta", cal: 350, protein: 12, carbs: 50, fat: 10, serving: "1 plate" },
        "macaroni": { name: "Macaroni", cal: 220, protein: 8, carbs: 43, fat: 1.3, serving: "1 cup" },
        "gumbo": { name: "Gumbo", cal: 280, protein: 18, carbs: 22, fat: 14, serving: "1 bowl" },
        "jambalaya": { name: "Jambalaya", cal: 310, protein: 20, carbs: 34, fat: 10, serving: "1 cup" },
        "curry": { name: "Chicken Curry", cal: 350, protein: 22, carbs: 20, fat: 20, serving: "1 cup" },
        "tikka masala": { name: "Tikka Masala", cal: 380, protein: 24, carbs: 18, fat: 24, serving: "1 cup" },
        "pad thai": { name: "Pad Thai", cal: 400, protein: 16, carbs: 50, fat: 16, serving: "1 plate" },
        "fried noodles": { name: "Fried Noodles", cal: 360, protein: 12, carbs: 45, fat: 15, serving: "1 plate" },
        "lo mein": { name: "Lo Mein", cal: 350, protein: 14, carbs: 42, fat: 14, serving: "1 plate" },
        "chow mein": { name: "Chow Mein", cal: 300, protein: 12, carbs: 38, fat: 12, serving: "1 plate" },
        "orange chicken": { name: "Orange Chicken", cal: 420, protein: 22, carbs: 44, fat: 18, serving: "1 cup" },
        "general tso": { name: "General Tso's Chicken", cal: 450, protein: 20, carbs: 48, fat: 20, serving: "1 cup" },
        "kung pao": { name: "Kung Pao Chicken", cal: 380, protein: 24, carbs: 22, fat: 22, serving: "1 cup" },
        "sweet and sour": { name: "Sweet & Sour Chicken", cal: 400, protein: 20, carbs: 44, fat: 16, serving: "1 cup" },
        "egg roll": { name: "Egg Roll", cal: 200, protein: 6, carbs: 22, fat: 10, serving: "1 roll" },
        "spring roll": { name: "Spring Roll", cal: 110, protein: 4, carbs: 16, fat: 3, serving: "1 roll" },
        "dumpling": { name: "Dumplings", cal: 230, protein: 10, carbs: 28, fat: 8, serving: "4 pieces" },
        "wonton soup": { name: "Wonton Soup", cal: 180, protein: 10, carbs: 20, fat: 6, serving: "1 bowl" },
        "gyro": { name: "Gyro", cal: 490, protein: 28, carbs: 42, fat: 23, serving: "1 gyro" },
        "falafel": { name: "Falafel", cal: 330, protein: 13, carbs: 32, fat: 18, serving: "4 pieces" },
        "shawarma": { name: "Chicken Shawarma", cal: 420, protein: 30, carbs: 35, fat: 18, serving: "1 wrap" },
        "pho": { name: "Pho", cal: 350, protein: 24, carbs: 40, fat: 8, serving: "1 bowl" },
        "bibimbap": { name: "Bibimbap", cal: 490, protein: 25, carbs: 60, fat: 16, serving: "1 bowl" },
        "teriyaki": { name: "Teriyaki Chicken", cal: 320, protein: 28, carbs: 22, fat: 12, serving: "1 serving" },
        "enchilada": { name: "Enchiladas", cal: 380, protein: 18, carbs: 32, fat: 20, serving: "2 enchiladas" },
        "tamale": { name: "Tamale", cal: 285, protein: 10, carbs: 30, fat: 14, serving: "1 tamale" },
        "taco salad": { name: "Taco Salad", cal: 480, protein: 22, carbs: 36, fat: 28, serving: "1 bowl" },
        "chicken parmesan": { name: "Chicken Parmesan", cal: 460, protein: 35, carbs: 24, fat: 25, serving: "1 piece" },
        "chicken alfredo": { name: "Chicken Alfredo", cal: 520, protein: 30, carbs: 42, fat: 26, serving: "1 plate" },
        "grilled cheese": { name: "Grilled Cheese", cal: 366, protein: 14, carbs: 30, fat: 22, serving: "1 sandwich" },
        "blt": { name: "BLT Sandwich", cal: 344, protein: 12, carbs: 30, fat: 20, serving: "1 sandwich" },
        "club sandwich": { name: "Club Sandwich", cal: 410, protein: 26, carbs: 34, fat: 20, serving: "1 sandwich" },
        "philly cheesesteak": { name: "Philly Cheesesteak", cal: 520, protein: 30, carbs: 42, fat: 26, serving: "1 sub" },
        "pulled pork sandwich": { name: "Pulled Pork Sandwich", cal: 450, protein: 26, carbs: 40, fat: 20, serving: "1 sandwich" },
        "sloppy joe": { name: "Sloppy Joe", cal: 380, protein: 20, carbs: 36, fat: 18, serving: "1 sandwich" },

        // Pizza Varieties
        "pepperoni pizza": { name: "Pepperoni Pizza", cal: 311, protein: 13, carbs: 36, fat: 13, serving: "1 slice" },
        "cheese pizza": { name: "Cheese Pizza", cal: 272, protein: 12, carbs: 34, fat: 10, serving: "1 slice" },
        "supreme pizza": { name: "Supreme Pizza", cal: 325, protein: 14, carbs: 36, fat: 14, serving: "1 slice" },
        "hawaiian pizza": { name: "Hawaiian Pizza", cal: 290, protein: 13, carbs: 36, fat: 10, serving: "1 slice" },

        // Sides & Extras
        "coleslaw": { name: "Coleslaw", cal: 150, protein: 1, carbs: 14, fat: 11, serving: "1/2 cup" },
        "mashed potatoes": { name: "Mashed Potatoes", cal: 210, protein: 4, carbs: 30, fat: 8, serving: "1 cup" },
        "baked beans": { name: "Baked Beans", cal: 240, protein: 12, carbs: 42, fat: 3, serving: "1 cup" },
        "mac salad": { name: "Macaroni Salad", cal: 290, protein: 5, carbs: 30, fat: 16, serving: "1 cup" },
        "potato salad": { name: "Potato Salad", cal: 270, protein: 4, carbs: 24, fat: 18, serving: "1 cup" },
        "cornbread": { name: "Cornbread", cal: 198, protein: 4, carbs: 28, fat: 8, serving: "1 piece" },
        "dinner roll": { name: "Dinner Roll", cal: 110, protein: 3, carbs: 19, fat: 2, serving: "1 roll" },
        "garlic bread": { name: "Garlic Bread", cal: 200, protein: 5, carbs: 24, fat: 10, serving: "2 slices" },
        "tortilla": { name: "Flour Tortilla", cal: 140, protein: 4, carbs: 24, fat: 3.5, serving: "1 tortilla" },
        "naan": { name: "Naan Bread", cal: 260, protein: 8, carbs: 45, fat: 5, serving: "1 piece" },
        "pita": { name: "Pita Bread", cal: 165, protein: 5, carbs: 33, fat: 1, serving: "1 pita" },
        "hummus": { name: "Hummus", cal: 166, protein: 8, carbs: 14, fat: 10, serving: "1/3 cup" },
        "guacamole": { name: "Guacamole", cal: 150, protein: 2, carbs: 8, fat: 13, serving: "1/4 cup" },
        "salsa": { name: "Salsa", cal: 36, protein: 2, carbs: 8, fat: 0.2, serving: "1/4 cup" },
        "ranch dressing": { name: "Ranch Dressing", cal: 129, protein: 0.4, carbs: 2, fat: 13, serving: "2 tbsp" },
        "caesar salad": { name: "Caesar Salad", cal: 200, protein: 8, carbs: 10, fat: 15, serving: "1 bowl" },

        // Soups
        "tomato soup": { name: "Tomato Soup", cal: 120, protein: 3, carbs: 20, fat: 3, serving: "1 bowl" },
        "clam chowder": { name: "Clam Chowder", cal: 250, protein: 10, carbs: 20, fat: 14, serving: "1 bowl" },
        "chicken noodle soup": { name: "Chicken Noodle Soup", cal: 170, protein: 10, carbs: 18, fat: 6, serving: "1 bowl" },
        "vegetable soup": { name: "Vegetable Soup", cal: 120, protein: 4, carbs: 20, fat: 2, serving: "1 bowl" },
        "broccoli cheese soup": { name: "Broccoli Cheese Soup", cal: 290, protein: 10, carbs: 18, fat: 20, serving: "1 bowl" },
        "minestrone": { name: "Minestrone Soup", cal: 150, protein: 6, carbs: 22, fat: 4, serving: "1 bowl" },

        // More Vegetables
        "asparagus": { name: "Asparagus", cal: 27, protein: 3, carbs: 5, fat: 0.2, serving: "1 cup" },
        "brussels sprouts": { name: "Brussels Sprouts", cal: 56, protein: 4, carbs: 11, fat: 0.4, serving: "1 cup" },
        "cauliflower": { name: "Cauliflower", cal: 25, protein: 2, carbs: 5, fat: 0.3, serving: "1 cup" },
        "mushrooms": { name: "Mushrooms", cal: 22, protein: 3, carbs: 3, fat: 0.3, serving: "1 cup" },
        "bell pepper": { name: "Bell Pepper", cal: 31, protein: 1, carbs: 6, fat: 0.3, serving: "1 medium" },
        "onion": { name: "Onion", cal: 44, protein: 1.2, carbs: 10, fat: 0.1, serving: "1 medium" },
        "tomato": { name: "Tomato", cal: 22, protein: 1.1, carbs: 5, fat: 0.2, serving: "1 medium" },
        "cucumber": { name: "Cucumber", cal: 16, protein: 0.7, carbs: 4, fat: 0.1, serving: "1 cup" },
        "celery": { name: "Celery", cal: 14, protein: 0.7, carbs: 3, fat: 0.2, serving: "2 stalks" },
        "zucchini": { name: "Zucchini", cal: 33, protein: 2.4, carbs: 6, fat: 0.6, serving: "1 medium" },
        "kale": { name: "Kale", cal: 33, protein: 3, carbs: 6, fat: 0.6, serving: "1 cup" },
        "lettuce": { name: "Lettuce", cal: 10, protein: 0.9, carbs: 2, fat: 0.1, serving: "1 cup" },
        "cabbage": { name: "Cabbage", cal: 22, protein: 1.3, carbs: 5, fat: 0.1, serving: "1 cup" },
        "peas": { name: "Green Peas", cal: 118, protein: 8, carbs: 21, fat: 0.6, serving: "1 cup" },
        "edamame": { name: "Edamame", cal: 188, protein: 18, carbs: 14, fat: 8, serving: "1 cup" },
        "black beans": { name: "Black Beans", cal: 227, protein: 15, carbs: 41, fat: 0.9, serving: "1 cup" },
        "kidney beans": { name: "Kidney Beans", cal: 225, protein: 15, carbs: 40, fat: 0.9, serving: "1 cup" },
        "lentils": { name: "Lentils", cal: 230, protein: 18, carbs: 40, fat: 0.8, serving: "1 cup" },
        "chickpeas": { name: "Chickpeas", cal: 269, protein: 15, carbs: 45, fat: 4, serving: "1 cup" },

        // More Fruits
        "peach": { name: "Peach", cal: 59, protein: 1.4, carbs: 14, fat: 0.4, serving: "1 medium" },
        "pear": { name: "Pear", cal: 101, protein: 0.7, carbs: 27, fat: 0.2, serving: "1 medium" },
        "plum": { name: "Plum", cal: 30, protein: 0.5, carbs: 8, fat: 0.2, serving: "1 plum" },
        "cherries": { name: "Cherries", cal: 87, protein: 1.5, carbs: 22, fat: 0.3, serving: "1 cup" },
        "raspberries": { name: "Raspberries", cal: 64, protein: 1.5, carbs: 15, fat: 0.8, serving: "1 cup" },
        "cantaloupe": { name: "Cantaloupe", cal: 60, protein: 1.5, carbs: 14, fat: 0.3, serving: "1 cup" },
        "honeydew": { name: "Honeydew Melon", cal: 64, protein: 1, carbs: 16, fat: 0.2, serving: "1 cup" },
        "kiwi": { name: "Kiwi", cal: 42, protein: 0.8, carbs: 10, fat: 0.4, serving: "1 kiwi" },
        "grapefruit": { name: "Grapefruit", cal: 52, protein: 1, carbs: 13, fat: 0.2, serving: "1/2 fruit" },
        "coconut": { name: "Coconut (shredded)", cal: 283, protein: 3, carbs: 10, fat: 27, serving: "1/2 cup" },
        "dried fruit": { name: "Dried Fruit Mix", cal: 240, protein: 2, carbs: 62, fat: 0.4, serving: "1/4 cup" },
        "raisins": { name: "Raisins", cal: 130, protein: 1.4, carbs: 34, fat: 0.2, serving: "1/4 cup" },
        "dates": { name: "Dates", cal: 140, protein: 1, carbs: 36, fat: 0.2, serving: "3 dates" },

        // More Dairy
        "cottage cheese": { name: "Cottage Cheese", cal: 110, protein: 12, carbs: 5, fat: 5, serving: "1/2 cup" },
        "cream cheese": { name: "Cream Cheese", cal: 99, protein: 2, carbs: 1, fat: 10, serving: "1 oz" },
        "mozzarella": { name: "Mozzarella Cheese", cal: 85, protein: 6, carbs: 0.7, fat: 6, serving: "1 oz" },
        "swiss cheese": { name: "Swiss Cheese", cal: 108, protein: 8, carbs: 1.5, fat: 8, serving: "1 oz" },
        "butter": { name: "Butter", cal: 102, protein: 0.1, carbs: 0, fat: 12, serving: "1 tbsp" },
        "sour cream": { name: "Sour Cream", cal: 60, protein: 0.7, carbs: 1.2, fat: 6, serving: "2 tbsp" },
        "whipped cream": { name: "Whipped Cream", cal: 51, protein: 0.3, carbs: 2, fat: 5, serving: "2 tbsp" },
        "chocolate milk": { name: "Chocolate Milk", cal: 208, protein: 8, carbs: 26, fat: 8, serving: "1 cup" },
        "skim milk": { name: "Skim Milk", cal: 83, protein: 8, carbs: 12, fat: 0.2, serving: "1 cup" },
        "almond milk": { name: "Almond Milk", cal: 39, protein: 1, carbs: 3.4, fat: 2.5, serving: "1 cup" },

        // More Snacks
        "pretzels": { name: "Pretzels", cal: 110, protein: 3, carbs: 23, fat: 1, serving: "1 oz" },
        "crackers": { name: "Crackers", cal: 130, protein: 2, carbs: 19, fat: 5, serving: "6 crackers" },
        "cheese puffs": { name: "Cheese Puffs", cal: 160, protein: 2, carbs: 15, fat: 10, serving: "1 oz" },
        "tortilla chips": { name: "Tortilla Chips", cal: 140, protein: 2, carbs: 18, fat: 7, serving: "1 oz" },
        "jerky": { name: "Turkey Jerky", cal: 80, protein: 13, carbs: 5, fat: 1, serving: "1 oz" },
        "fruit snacks": { name: "Fruit Snacks", cal: 90, protein: 1, carbs: 21, fat: 0, serving: "1 pouch" },
        "rice cake": { name: "Rice Cake", cal: 35, protein: 0.7, carbs: 7, fat: 0.3, serving: "1 cake" },
        "energy bar": { name: "Energy Bar", cal: 250, protein: 10, carbs: 30, fat: 10, serving: "1 bar" },
        "protein bar": { name: "Protein Bar", cal: 220, protein: 20, carbs: 22, fat: 8, serving: "1 bar" },
        "peanuts": { name: "Peanuts", cal: 161, protein: 7, carbs: 5, fat: 14, serving: "1 oz" },
        "cashews": { name: "Cashews", cal: 157, protein: 5, carbs: 9, fat: 12, serving: "1 oz" },
        "walnuts": { name: "Walnuts", cal: 185, protein: 4, carbs: 4, fat: 18, serving: "1 oz" },
        "pistachios": { name: "Pistachios", cal: 159, protein: 6, carbs: 8, fat: 13, serving: "1 oz" },
        "sunflower seeds": { name: "Sunflower Seeds", cal: 165, protein: 5, carbs: 7, fat: 14, serving: "1 oz" },

        // Desserts
        "cake": { name: "Cake (slice)", cal: 350, protein: 4, carbs: 52, fat: 14, serving: "1 slice" },
        "cheesecake": { name: "Cheesecake", cal: 401, protein: 7, carbs: 32, fat: 28, serving: "1 slice" },
        "brownie": { name: "Brownie", cal: 260, protein: 3, carbs: 36, fat: 12, serving: "1 brownie" },
        "pie": { name: "Apple Pie", cal: 296, protein: 2, carbs: 43, fat: 14, serving: "1 slice" },
        "cupcake": { name: "Cupcake", cal: 305, protein: 3, carbs: 45, fat: 12, serving: "1 cupcake" },
        "candy bar": { name: "Candy Bar", cal: 250, protein: 3, carbs: 33, fat: 12, serving: "1 bar" },
        "gummy bears": { name: "Gummy Bears", cal: 140, protein: 3, carbs: 31, fat: 0, serving: "1/4 cup" },
        "frozen yogurt": { name: "Frozen Yogurt", cal: 200, protein: 6, carbs: 38, fat: 3, serving: "1 cup" },
        "milkshake": { name: "Milkshake", cal: 530, protein: 12, carbs: 80, fat: 18, serving: "16 oz" },
        "sundae": { name: "Ice Cream Sundae", cal: 380, protein: 6, carbs: 52, fat: 16, serving: "1 sundae" },

        // More Drinks
        "iced tea": { name: "Iced Tea (sweet)", cal: 90, protein: 0, carbs: 23, fat: 0, serving: "16 oz" },
        "unsweetened tea": { name: "Unsweetened Tea", cal: 2, protein: 0, carbs: 0.5, fat: 0, serving: "16 oz" },
        "energy drink": { name: "Energy Drink", cal: 110, protein: 0, carbs: 28, fat: 0, serving: "8 oz" },
        "sports drink": { name: "Sports Drink", cal: 80, protein: 0, carbs: 21, fat: 0, serving: "12 oz" },
        "hot chocolate": { name: "Hot Chocolate", cal: 190, protein: 8, carbs: 27, fat: 6, serving: "1 cup" },
        "cappuccino": { name: "Cappuccino", cal: 120, protein: 8, carbs: 10, fat: 4, serving: "12 oz" },
        "mocha": { name: "Mocha", cal: 290, protein: 10, carbs: 36, fat: 12, serving: "16 oz" },
        "iced coffee": { name: "Iced Coffee", cal: 120, protein: 2, carbs: 22, fat: 2, serving: "16 oz" },
        "frappuccino": { name: "Frappuccino", cal: 380, protein: 5, carbs: 60, fat: 14, serving: "16 oz" },
        "lemonade": { name: "Lemonade", cal: 120, protein: 0, carbs: 32, fat: 0, serving: "16 oz" },
        "apple juice": { name: "Apple Juice", cal: 114, protein: 0.3, carbs: 28, fat: 0.3, serving: "1 cup" },
        "cranberry juice": { name: "Cranberry Juice", cal: 137, protein: 0, carbs: 34, fat: 0.3, serving: "1 cup" },
        "coconut water": { name: "Coconut Water", cal: 46, protein: 2, carbs: 9, fat: 0.5, serving: "1 cup" },
        "water": { name: "Water", cal: 0, protein: 0, carbs: 0, fat: 0, serving: "1 cup" },
        "diet soda": { name: "Diet Soda", cal: 0, protein: 0, carbs: 0, fat: 0, serving: "12 oz" },
        "margarita": { name: "Margarita", cal: 274, protein: 0, carbs: 36, fat: 0, serving: "8 oz" },
        "cocktail": { name: "Mixed Cocktail", cal: 200, protein: 0, carbs: 20, fat: 0, serving: "6 oz" },
        "whiskey": { name: "Whiskey", cal: 70, protein: 0, carbs: 0, fat: 0, serving: "1 shot" },
        "vodka": { name: "Vodka", cal: 97, protein: 0, carbs: 0, fat: 0, serving: "1.5 oz" },

        // Condiments & Sauces
        "ketchup": { name: "Ketchup", cal: 20, protein: 0, carbs: 5, fat: 0, serving: "1 tbsp" },
        "mustard": { name: "Mustard", cal: 3, protein: 0.2, carbs: 0.3, fat: 0.2, serving: "1 tsp" },
        "mayo": { name: "Mayonnaise", cal: 94, protein: 0.1, carbs: 0, fat: 10, serving: "1 tbsp" },
        "bbq sauce": { name: "BBQ Sauce", cal: 29, protein: 0, carbs: 7, fat: 0.1, serving: "1 tbsp" },
        "hot sauce": { name: "Hot Sauce", cal: 1, protein: 0, carbs: 0, fat: 0, serving: "1 tsp" },
        "soy sauce": { name: "Soy Sauce", cal: 9, protein: 0.9, carbs: 1, fat: 0, serving: "1 tbsp" },
        "olive oil": { name: "Olive Oil", cal: 119, protein: 0, carbs: 0, fat: 14, serving: "1 tbsp" },
        "honey": { name: "Honey", cal: 64, protein: 0.1, carbs: 17, fat: 0, serving: "1 tbsp" },
        "maple syrup": { name: "Maple Syrup", cal: 52, protein: 0, carbs: 13, fat: 0, serving: "1 tbsp" },
        "jam": { name: "Jam / Jelly", cal: 56, protein: 0.1, carbs: 14, fat: 0, serving: "1 tbsp" },

        // ===== McDonald's =====
        "mcdonald's big mac": { name: "McDonald's Big Mac", cal: 550, protein: 25, carbs: 45, fat: 30, serving: "1 burger" },
        "mcdonald's quarter pounder": { name: "McDonald's Quarter Pounder w/ Cheese", cal: 520, protein: 30, carbs: 42, fat: 26, serving: "1 burger" },
        "mcdonald's mcchicken": { name: "McDonald's McChicken", cal: 400, protein: 14, carbs: 40, fat: 21, serving: "1 sandwich" },
        "mcdonald's filet o fish": { name: "McDonald's Filet-O-Fish", cal: 390, protein: 16, carbs: 39, fat: 19, serving: "1 sandwich" },
        "mcdonald's mcnuggets 10": { name: "McDonald's McNuggets (10pc)", cal: 420, protein: 24, carbs: 26, fat: 25, serving: "10 pieces" },
        "mcdonald's mcnuggets 6": { name: "McDonald's McNuggets (6pc)", cal: 250, protein: 14, carbs: 15, fat: 15, serving: "6 pieces" },
        "mcdonald's large fries": { name: "McDonald's Large Fries", cal: 490, protein: 7, carbs: 66, fat: 23, serving: "large" },
        "mcdonald's medium fries": { name: "McDonald's Medium Fries", cal: 320, protein: 5, carbs: 43, fat: 15, serving: "medium" },
        "mcdonald's egg mcmuffin": { name: "McDonald's Egg McMuffin", cal: 310, protein: 17, carbs: 30, fat: 13, serving: "1 sandwich" },
        "mcdonald's sausage mcmuffin": { name: "McDonald's Sausage McMuffin", cal: 400, protein: 14, carbs: 29, fat: 25, serving: "1 sandwich" },
        "mcdonald's hotcakes": { name: "McDonald's Hotcakes", cal: 580, protein: 9, carbs: 102, fat: 15, serving: "3 hotcakes" },
        "mcdonald's mcflurry": { name: "McDonald's McFlurry (Oreo)", cal: 510, protein: 12, carbs: 80, fat: 17, serving: "regular" },
        "mcdonald's apple pie": { name: "McDonald's Apple Pie", cal: 230, protein: 3, carbs: 32, fat: 11, serving: "1 pie" },
        "mcdonald's hash brown": { name: "McDonald's Hash Brown", cal: 140, protein: 1, carbs: 16, fat: 8, serving: "1 piece" },
        "mcdonald's double cheeseburger": { name: "McDonald's Double Cheeseburger", cal: 450, protein: 25, carbs: 34, fat: 24, serving: "1 burger" },
        "mcdonald's crispy chicken": { name: "McDonald's Crispy Chicken Sandwich", cal: 470, protein: 26, carbs: 45, fat: 20, serving: "1 sandwich" },

        // ===== Burger King =====
        "bk whopper": { name: "Burger King Whopper", cal: 657, protein: 28, carbs: 49, fat: 40, serving: "1 burger" },
        "bk whopper jr": { name: "Burger King Whopper Jr.", cal: 310, protein: 13, carbs: 27, fat: 18, serving: "1 burger" },
        "bk chicken fries": { name: "Burger King Chicken Fries", cal: 280, protein: 13, carbs: 20, fat: 17, serving: "9 pieces" },
        "bk impossible whopper": { name: "Burger King Impossible Whopper", cal: 629, protein: 25, carbs: 58, fat: 34, serving: "1 burger" },
        "bk onion rings": { name: "Burger King Onion Rings", cal: 320, protein: 4, carbs: 40, fat: 16, serving: "medium" },
        "bk croissanwich": { name: "Burger King Croissan'wich", cal: 370, protein: 14, carbs: 23, fat: 24, serving: "1 sandwich" },

        // ===== Wendy's =====
        "wendy's dave's single": { name: "Wendy's Dave's Single", cal: 570, protein: 30, carbs: 39, fat: 34, serving: "1 burger" },
        "wendy's dave's double": { name: "Wendy's Dave's Double", cal: 810, protein: 49, carbs: 40, fat: 51, serving: "1 burger" },
        "wendy's baconator": { name: "Wendy's Baconator", cal: 950, protein: 57, carbs: 38, fat: 62, serving: "1 burger" },
        "wendy's spicy chicken": { name: "Wendy's Spicy Chicken", cal: 490, protein: 29, carbs: 48, fat: 19, serving: "1 sandwich" },
        "wendy's nuggets 10": { name: "Wendy's Nuggets (10pc)", cal: 440, protein: 22, carbs: 28, fat: 26, serving: "10 pieces" },
        "wendy's frosty": { name: "Wendy's Frosty", cal: 340, protein: 9, carbs: 56, fat: 9, serving: "medium" },
        "wendy's chili": { name: "Wendy's Chili", cal: 250, protein: 23, carbs: 21, fat: 8, serving: "large" },
        "wendy's baked potato": { name: "Wendy's Baked Potato", cal: 270, protein: 7, carbs: 63, fat: 0, serving: "1 potato" },

        // ===== Chick-fil-A =====
        "chick-fil-a sandwich": { name: "Chick-fil-A Chicken Sandwich", cal: 440, protein: 28, carbs: 40, fat: 19, serving: "1 sandwich" },
        "chick-fil-a spicy sandwich": { name: "Chick-fil-A Spicy Sandwich", cal: 450, protein: 28, carbs: 42, fat: 19, serving: "1 sandwich" },
        "chick-fil-a nuggets 12": { name: "Chick-fil-A Nuggets (12pc)", cal: 380, protein: 40, carbs: 16, fat: 17, serving: "12 pieces" },
        "chick-fil-a nuggets 8": { name: "Chick-fil-A Nuggets (8pc)", cal: 250, protein: 27, carbs: 11, fat: 11, serving: "8 pieces" },
        "chick-fil-a waffle fries": { name: "Chick-fil-A Waffle Fries", cal: 420, protein: 5, carbs: 45, fat: 24, serving: "medium" },
        "chick-fil-a grilled nuggets": { name: "Chick-fil-A Grilled Nuggets (8pc)", cal: 130, protein: 25, carbs: 1, fat: 3, serving: "8 pieces" },
        "chick-fil-a biscuit": { name: "Chick-fil-A Chicken Biscuit", cal: 440, protein: 17, carbs: 48, fat: 20, serving: "1 biscuit" },
        "chick-fil-a cobb salad": { name: "Chick-fil-A Cobb Salad", cal: 510, protein: 42, carbs: 28, fat: 27, serving: "1 salad" },
        "chick-fil-a milkshake": { name: "Chick-fil-A Milkshake", cal: 580, protein: 13, carbs: 82, fat: 22, serving: "medium" },

        // ===== Taco Bell =====
        "taco bell crunchy taco": { name: "Taco Bell Crunchy Taco", cal: 170, protein: 8, carbs: 13, fat: 10, serving: "1 taco" },
        "taco bell soft taco": { name: "Taco Bell Soft Taco", cal: 180, protein: 9, carbs: 18, fat: 9, serving: "1 taco" },
        "taco bell crunchwrap": { name: "Taco Bell Crunchwrap Supreme", cal: 530, protein: 16, carbs: 51, fat: 30, serving: "1 wrap" },
        "taco bell burrito supreme": { name: "Taco Bell Burrito Supreme", cal: 380, protein: 15, carbs: 44, fat: 16, serving: "1 burrito" },
        "taco bell chalupa": { name: "Taco Bell Chalupa Supreme", cal: 350, protein: 12, carbs: 30, fat: 21, serving: "1 chalupa" },
        "taco bell quesadilla": { name: "Taco Bell Chicken Quesadilla", cal: 500, protein: 27, carbs: 37, fat: 27, serving: "1 quesadilla" },
        "taco bell mexican pizza": { name: "Taco Bell Mexican Pizza", cal: 540, protein: 20, carbs: 46, fat: 30, serving: "1 pizza" },
        "taco bell nachos bellgrande": { name: "Taco Bell Nachos BellGrande", cal: 740, protein: 16, carbs: 82, fat: 38, serving: "1 serving" },
        "taco bell bean burrito": { name: "Taco Bell Bean Burrito", cal: 380, protein: 14, carbs: 55, fat: 11, serving: "1 burrito" },

        // ===== Subway =====
        "subway turkey breast": { name: "Subway Turkey Breast (6\")", cal: 270, protein: 18, carbs: 42, fat: 3.5, serving: "6 inch" },
        "subway italian bmt": { name: "Subway Italian B.M.T. (6\")", cal: 370, protein: 17, carbs: 42, fat: 14, serving: "6 inch" },
        "subway meatball sub": { name: "Subway Meatball Marinara (6\")", cal: 480, protein: 22, carbs: 53, fat: 20, serving: "6 inch" },
        "subway chicken teriyaki": { name: "Subway Chicken Teriyaki (6\")", cal: 320, protein: 26, carbs: 44, fat: 4.5, serving: "6 inch" },
        "subway tuna": { name: "Subway Tuna (6\")", cal: 480, protein: 20, carbs: 42, fat: 25, serving: "6 inch" },
        "subway steak cheese": { name: "Subway Steak & Cheese (6\")", cal: 380, protein: 26, carbs: 42, fat: 12, serving: "6 inch" },
        "subway cookie": { name: "Subway Chocolate Chip Cookie", cal: 220, protein: 2, carbs: 30, fat: 10, serving: "1 cookie" },

        // ===== Chipotle =====
        "chipotle burrito bowl": { name: "Chipotle Burrito Bowl", cal: 665, protein: 36, carbs: 72, fat: 24, serving: "1 bowl" },
        "chipotle burrito": { name: "Chipotle Burrito", cal: 955, protein: 42, carbs: 105, fat: 36, serving: "1 burrito" },
        "chipotle chicken bowl": { name: "Chipotle Chicken Bowl", cal: 665, protein: 42, carbs: 72, fat: 22, serving: "1 bowl" },
        "chipotle steak bowl": { name: "Chipotle Steak Bowl", cal: 700, protein: 40, carbs: 72, fat: 26, serving: "1 bowl" },
        "chipotle tacos": { name: "Chipotle Tacos (3)", cal: 570, protein: 30, carbs: 42, fat: 22, serving: "3 tacos" },
        "chipotle chips guac": { name: "Chipotle Chips & Guac", cal: 770, protein: 8, carbs: 76, fat: 48, serving: "1 serving" },
        "chipotle queso": { name: "Chipotle Queso Blanco", cal: 240, protein: 12, carbs: 6, fat: 18, serving: "1 side" },

        // ===== Starbucks =====
        "starbucks latte": { name: "Starbucks Caffe Latte", cal: 190, protein: 13, carbs: 18, fat: 7, serving: "grande" },
        "starbucks cappuccino": { name: "Starbucks Cappuccino", cal: 120, protein: 8, carbs: 12, fat: 4, serving: "grande" },
        "starbucks caramel macchiato": { name: "Starbucks Caramel Macchiato", cal: 250, protein: 10, carbs: 35, fat: 7, serving: "grande" },
        "starbucks frappuccino": { name: "Starbucks Mocha Frappuccino", cal: 370, protein: 5, carbs: 60, fat: 13, serving: "grande" },
        "starbucks pumpkin spice": { name: "Starbucks Pumpkin Spice Latte", cal: 380, protein: 14, carbs: 52, fat: 14, serving: "grande" },
        "starbucks iced coffee": { name: "Starbucks Iced Coffee", cal: 80, protein: 1, carbs: 20, fat: 0, serving: "grande" },
        "starbucks cold brew": { name: "Starbucks Cold Brew", cal: 5, protein: 0, carbs: 0, fat: 0, serving: "grande" },
        "starbucks pink drink": { name: "Starbucks Pink Drink", cal: 140, protein: 1, carbs: 27, fat: 2.5, serving: "grande" },
        "starbucks refresher": { name: "Starbucks Refresher", cal: 90, protein: 0, carbs: 22, fat: 0, serving: "grande" },
        "starbucks cake pop": { name: "Starbucks Cake Pop", cal: 160, protein: 2, carbs: 18, fat: 9, serving: "1 pop" },
        "starbucks croissant": { name: "Starbucks Butter Croissant", cal: 260, protein: 5, carbs: 29, fat: 14, serving: "1 croissant" },
        "starbucks bacon gouda": { name: "Starbucks Bacon Gouda Sandwich", cal: 370, protein: 18, carbs: 35, fat: 18, serving: "1 sandwich" },
        "starbucks egg bites": { name: "Starbucks Egg Bites (2pc)", cal: 300, protein: 19, carbs: 13, fat: 20, serving: "2 pieces" },

        // ===== Pizza Chains =====
        "pizza hut pepperoni": { name: "Pizza Hut Pepperoni (1 slice)", cal: 300, protein: 13, carbs: 33, fat: 13, serving: "1 slice" },
        "pizza hut cheese": { name: "Pizza Hut Cheese (1 slice)", cal: 260, protein: 11, carbs: 32, fat: 10, serving: "1 slice" },
        "pizza hut meat lovers": { name: "Pizza Hut Meat Lover's (1 slice)", cal: 370, protein: 16, carbs: 33, fat: 19, serving: "1 slice" },
        "pizza hut supreme": { name: "Pizza Hut Supreme (1 slice)", cal: 310, protein: 13, carbs: 33, fat: 14, serving: "1 slice" },
        "pizza hut wings": { name: "Pizza Hut Wings (6pc)", cal: 390, protein: 30, carbs: 18, fat: 22, serving: "6 pieces" },
        "pizza hut breadsticks": { name: "Pizza Hut Breadsticks (2pc)", cal: 260, protein: 7, carbs: 36, fat: 10, serving: "2 sticks" },
        "dominos pepperoni": { name: "Domino's Pepperoni (1 slice)", cal: 290, protein: 12, carbs: 33, fat: 12, serving: "1 slice" },
        "dominos cheese": { name: "Domino's Cheese (1 slice)", cal: 250, protein: 10, carbs: 33, fat: 9, serving: "1 slice" },
        "dominos wings": { name: "Domino's Wings (4pc)", cal: 200, protein: 17, carbs: 2, fat: 14, serving: "4 pieces" },
        "dominos lava cake": { name: "Domino's Lava Cake", cal: 350, protein: 4, carbs: 46, fat: 17, serving: "1 cake" },
        "little caesars pepperoni": { name: "Little Caesars Pepperoni (1 slice)", cal: 280, protein: 12, carbs: 32, fat: 12, serving: "1 slice" },
        "little caesars crazy bread": { name: "Little Caesars Crazy Bread", cal: 100, protein: 3, carbs: 15, fat: 3, serving: "1 stick" },

        // ===== KFC / Popeyes =====
        "kfc original recipe": { name: "KFC Original Recipe Breast", cal: 390, protein: 39, carbs: 11, fat: 21, serving: "1 breast" },
        "kfc extra crispy": { name: "KFC Extra Crispy Breast", cal: 530, protein: 35, carbs: 18, fat: 35, serving: "1 breast" },
        "kfc popcorn chicken": { name: "KFC Popcorn Chicken", cal: 400, protein: 20, carbs: 24, fat: 24, serving: "large" },
        "kfc mashed potatoes": { name: "KFC Mashed Potatoes & Gravy", cal: 130, protein: 2, carbs: 19, fat: 5, serving: "individual" },
        "kfc coleslaw": { name: "KFC Coleslaw", cal: 170, protein: 1, carbs: 14, fat: 12, serving: "individual" },
        "kfc biscuit": { name: "KFC Biscuit", cal: 180, protein: 4, carbs: 22, fat: 8, serving: "1 biscuit" },
        "kfc pot pie": { name: "KFC Pot Pie", cal: 720, protein: 26, carbs: 58, fat: 41, serving: "1 pot pie" },
        "popeyes chicken sandwich": { name: "Popeyes Chicken Sandwich", cal: 700, protein: 28, carbs: 50, fat: 42, serving: "1 sandwich" },
        "popeyes spicy chicken": { name: "Popeyes Spicy Chicken Breast", cal: 360, protein: 32, carbs: 12, fat: 21, serving: "1 breast" },
        "popeyes biscuit": { name: "Popeyes Biscuit", cal: 260, protein: 4, carbs: 27, fat: 15, serving: "1 biscuit" },
        "popeyes cajun fries": { name: "Popeyes Cajun Fries", cal: 260, protein: 4, carbs: 33, fat: 14, serving: "regular" },

        // ===== Panda Express =====
        "panda orange chicken": { name: "Panda Express Orange Chicken", cal: 490, protein: 25, carbs: 51, fat: 23, serving: "1 entree" },
        "panda beijing beef": { name: "Panda Express Beijing Beef", cal: 470, protein: 14, carbs: 56, fat: 22, serving: "1 entree" },
        "panda kung pao": { name: "Panda Express Kung Pao Chicken", cal: 290, protein: 17, carbs: 17, fat: 18, serving: "1 entree" },
        "panda broccoli beef": { name: "Panda Express Broccoli Beef", cal: 150, protein: 10, carbs: 13, fat: 7, serving: "1 entree" },
        "panda chow mein": { name: "Panda Express Chow Mein", cal: 510, protein: 13, carbs: 80, fat: 16, serving: "1 side" },
        "panda fried rice": { name: "Panda Express Fried Rice", cal: 520, protein: 11, carbs: 85, fat: 16, serving: "1 side" },
        "panda teriyaki chicken": { name: "Panda Express Teriyaki Chicken", cal: 340, protein: 36, carbs: 14, fat: 15, serving: "1 entree" },

        // ===== Sit-Down Restaurants =====
        "olive garden breadstick": { name: "Olive Garden Breadstick", cal: 140, protein: 4, carbs: 25, fat: 2.5, serving: "1 breadstick" },
        "olive garden chicken parm": { name: "Olive Garden Chicken Parmigiana", cal: 1060, protein: 64, carbs: 80, fat: 49, serving: "1 entree" },
        "olive garden alfredo": { name: "Olive Garden Fettuccine Alfredo", cal: 1310, protein: 33, carbs: 110, fat: 82, serving: "1 entree" },
        "olive garden soup": { name: "Olive Garden Zuppa Toscana", cal: 220, protein: 9, carbs: 15, fat: 14, serving: "1 bowl" },
        "olive garden salad": { name: "Olive Garden House Salad", cal: 150, protein: 3, carbs: 8, fat: 12, serving: "1 serving" },
        "chilis baby back ribs": { name: "Chili's Baby Back Ribs (full)", cal: 1210, protein: 72, carbs: 48, fat: 78, serving: "full rack" },
        "chilis burger": { name: "Chili's Oldtimer Burger", cal: 1130, protein: 50, carbs: 62, fat: 73, serving: "1 burger" },
        "chilis fajitas": { name: "Chili's Chicken Fajitas", cal: 460, protein: 41, carbs: 23, fat: 24, serving: "1 entree" },
        "chilis chicken crispers": { name: "Chili's Chicken Crispers", cal: 1350, protein: 56, carbs: 72, fat: 92, serving: "1 entree" },
        "chilis southwestern eggrolls": { name: "Chili's SW Eggrolls", cal: 780, protein: 24, carbs: 62, fat: 48, serving: "1 appetizer" },
        "chilis molten cake": { name: "Chili's Molten Lava Cake", cal: 1070, protein: 12, carbs: 130, fat: 56, serving: "1 dessert" },
        "applebees riblets": { name: "Applebee's Riblets Platter", cal: 1010, protein: 40, carbs: 80, fat: 56, serving: "1 entree" },
        "applebees bourbon steak": { name: "Applebee's Bourbon Street Steak", cal: 550, protein: 45, carbs: 15, fat: 34, serving: "1 entree" },
        "red lobster biscuit": { name: "Red Lobster Cheddar Bay Biscuit", cal: 160, protein: 3, carbs: 16, fat: 9, serving: "1 biscuit" },
        "red lobster shrimp": { name: "Red Lobster Garlic Shrimp Scampi", cal: 370, protein: 18, carbs: 3, fat: 32, serving: "1 entree" },
        "cheesecake factory cheesecake": { name: "Cheesecake Factory Cheesecake", cal: 830, protein: 11, carbs: 62, fat: 60, serving: "1 slice" },
        "cheesecake factory pasta": { name: "Cheesecake Factory Pasta", cal: 1170, protein: 42, carbs: 98, fat: 66, serving: "1 entree" },
        "texas roadhouse steak": { name: "Texas Roadhouse 8oz Sirloin", cal: 340, protein: 50, carbs: 0, fat: 15, serving: "8 oz" },
        "texas roadhouse rolls": { name: "Texas Roadhouse Roll w/ Butter", cal: 227, protein: 4, carbs: 24, fat: 13, serving: "1 roll" },
        "cracker barrel pancakes": { name: "Cracker Barrel Pancakes (3)", cal: 490, protein: 10, carbs: 70, fat: 18, serving: "3 pancakes" },
        "waffle house waffle": { name: "Waffle House Waffle", cal: 410, protein: 7, carbs: 50, fat: 20, serving: "1 waffle" },

        // ===== IHOP / Denny's / Breakfast =====
        "ihop pancakes": { name: "IHOP Buttermilk Pancakes (4)", cal: 680, protein: 14, carbs: 98, fat: 26, serving: "4 pancakes" },
        "ihop french toast": { name: "IHOP Brioche French Toast (2)", cal: 580, protein: 14, carbs: 64, fat: 30, serving: "2 slices" },
        "dennys grand slam": { name: "Denny's Grand Slam", cal: 770, protein: 34, carbs: 64, fat: 42, serving: "1 meal" },
        "dennys pancakes": { name: "Denny's Buttermilk Pancakes", cal: 640, protein: 12, carbs: 94, fat: 24, serving: "4 pancakes" },

        // ===== Dunkin' =====
        "dunkin donut glazed": { name: "Dunkin' Glazed Donut", cal: 240, protein: 4, carbs: 31, fat: 11, serving: "1 donut" },
        "dunkin iced coffee": { name: "Dunkin' Iced Coffee", cal: 120, protein: 2, carbs: 26, fat: 1, serving: "medium" },
        "dunkin latte": { name: "Dunkin' Latte", cal: 120, protein: 10, carbs: 11, fat: 4, serving: "medium" },
        "dunkin breakfast sandwich": { name: "Dunkin' Bacon Egg Cheese", cal: 460, protein: 18, carbs: 36, fat: 27, serving: "1 sandwich" },
        "dunkin bagel cream cheese": { name: "Dunkin' Bagel w/ Cream Cheese", cal: 440, protein: 13, carbs: 66, fat: 14, serving: "1 bagel" },
        "dunkin hash browns": { name: "Dunkin' Hash Browns (6pc)", cal: 360, protein: 3, carbs: 30, fat: 25, serving: "6 pieces" },
        "dunkin munchkins": { name: "Dunkin' Munchkins (5pc)", cal: 270, protein: 3, carbs: 30, fat: 15, serving: "5 pieces" },

        // ===== Five Guys / In-N-Out =====
        "five guys burger": { name: "Five Guys Cheeseburger", cal: 840, protein: 47, carbs: 40, fat: 55, serving: "1 burger" },
        "five guys little burger": { name: "Five Guys Little Cheeseburger", cal: 550, protein: 27, carbs: 40, fat: 32, serving: "1 burger" },
        "five guys fries": { name: "Five Guys Fries", cal: 530, protein: 8, carbs: 58, fat: 30, serving: "regular" },
        "five guys hot dog": { name: "Five Guys Hot Dog", cal: 545, protein: 18, carbs: 40, fat: 35, serving: "1 hot dog" },
        "in n out double double": { name: "In-N-Out Double-Double", cal: 670, protein: 37, carbs: 39, fat: 41, serving: "1 burger" },
        "in n out cheeseburger": { name: "In-N-Out Cheeseburger", cal: 480, protein: 22, carbs: 39, fat: 27, serving: "1 burger" },
        "in n out fries": { name: "In-N-Out Fries", cal: 395, protein: 7, carbs: 54, fat: 18, serving: "1 order" },

        // ===== Panera =====
        "panera broccoli cheddar": { name: "Panera Broccoli Cheddar Soup", cal: 360, protein: 14, carbs: 24, fat: 24, serving: "bread bowl" },
        "panera mac cheese": { name: "Panera Mac & Cheese", cal: 980, protein: 35, carbs: 92, fat: 52, serving: "bowl" },
        "panera caesar salad": { name: "Panera Caesar Salad", cal: 390, protein: 14, carbs: 22, fat: 28, serving: "full" },
        "panera turkey avocado": { name: "Panera Turkey Avocado BLT", cal: 600, protein: 32, carbs: 52, fat: 28, serving: "1 sandwich" },
        "panera bread bowl": { name: "Panera Bread Bowl", cal: 650, protein: 24, carbs: 100, fat: 16, serving: "1 bowl" },

        // ===== Grocery / Brand Frozen & Packaged =====
        "hot pocket": { name: "Hot Pocket (Pepperoni Pizza)", cal: 300, protein: 11, carbs: 34, fat: 13, serving: "1 pocket" },
        "lunchable": { name: "Lunchable (Turkey & Cheese)", cal: 310, protein: 16, carbs: 30, fat: 14, serving: "1 package" },
        "instant ramen": { name: "Instant Ramen (Maruchan)", cal: 380, protein: 8, carbs: 52, fat: 16, serving: "1 package" },
        "kraft mac cheese": { name: "Kraft Mac & Cheese", cal: 350, protein: 10, carbs: 48, fat: 13, serving: "1 cup prepared" },
        "pop tart": { name: "Pop-Tart (Frosted)", cal: 400, protein: 4, carbs: 74, fat: 10, serving: "2 pastries" },
        "eggo waffle": { name: "Eggo Waffle (2)", cal: 180, protein: 4, carbs: 30, fat: 6, serving: "2 waffles" },
        "frozen pizza": { name: "Frozen Pizza (DiGiorno 1/4)", cal: 380, protein: 15, carbs: 42, fat: 17, serving: "1/4 pizza" },
        "totino's pizza rolls": { name: "Totino's Pizza Rolls (6)", cal: 220, protein: 6, carbs: 28, fat: 9, serving: "6 rolls" },
        "jimmy dean sandwich": { name: "Jimmy Dean Breakfast Sandwich", cal: 350, protein: 14, carbs: 30, fat: 20, serving: "1 sandwich" },
        "lean cuisine": { name: "Lean Cuisine Entree", cal: 280, protein: 14, carbs: 38, fat: 7, serving: "1 meal" },
        "hungry man": { name: "Hungry-Man Dinner", cal: 630, protein: 22, carbs: 58, fat: 34, serving: "1 meal" },
        "stouffer's lasagna": { name: "Stouffer's Lasagna", cal: 380, protein: 18, carbs: 36, fat: 18, serving: "1 serving" },
        "el monterey burrito": { name: "El Monterey Frozen Burrito", cal: 300, protein: 8, carbs: 40, fat: 12, serving: "1 burrito" },
        "chef boyardee": { name: "Chef Boyardee Ravioli", cal: 220, protein: 7, carbs: 33, fat: 7, serving: "1 cup" },
        "campbell's soup": { name: "Campbell's Chicken Noodle Soup", cal: 120, protein: 4, carbs: 16, fat: 4, serving: "1 cup" },
        "cup noodles": { name: "Cup Noodles", cal: 290, protein: 7, carbs: 36, fat: 13, serving: "1 cup" },

        // ===== Brand Snacks & Candy =====
        "clif bar": { name: "Clif Bar", cal: 250, protein: 10, carbs: 44, fat: 5, serving: "1 bar" },
        "kind bar": { name: "KIND Bar", cal: 200, protein: 7, carbs: 17, fat: 13, serving: "1 bar" },
        "nature valley": { name: "Nature Valley Granola Bar", cal: 190, protein: 4, carbs: 29, fat: 7, serving: "2 bars" },
        "goldfish crackers": { name: "Goldfish Crackers", cal: 140, protein: 4, carbs: 20, fat: 5, serving: "55 pieces" },
        "cheez-it": { name: "Cheez-It Crackers", cal: 150, protein: 4, carbs: 17, fat: 8, serving: "27 crackers" },
        "doritos": { name: "Doritos", cal: 140, protein: 2, carbs: 17, fat: 7, serving: "1 oz" },
        "cheetos": { name: "Cheetos", cal: 160, protein: 2, carbs: 15, fat: 10, serving: "1 oz" },
        "lays": { name: "Lay's Potato Chips", cal: 160, protein: 2, carbs: 15, fat: 10, serving: "1 oz" },
        "pringles": { name: "Pringles", cal: 150, protein: 1, carbs: 15, fat: 9, serving: "16 crisps" },
        "oreos": { name: "Oreo Cookies", cal: 160, protein: 1, carbs: 25, fat: 7, serving: "3 cookies" },
        "chips ahoy": { name: "Chips Ahoy Cookies", cal: 160, protein: 1, carbs: 22, fat: 8, serving: "3 cookies" },
        "nutella": { name: "Nutella", cal: 200, protein: 2, carbs: 22, fat: 12, serving: "2 tbsp" },
        "m&ms": { name: "M&M's", cal: 240, protein: 2, carbs: 34, fat: 10, serving: "1 bag (1.69oz)" },
        "snickers": { name: "Snickers Bar", cal: 250, protein: 4, carbs: 33, fat: 12, serving: "1 bar" },
        "reese's": { name: "Reese's Peanut Butter Cups", cal: 210, protein: 5, carbs: 24, fat: 12, serving: "2 cups" },
        "skittles": { name: "Skittles", cal: 250, protein: 0, carbs: 56, fat: 2.5, serving: "1 bag (2.17oz)" },
        "twix": { name: "Twix Bar", cal: 250, protein: 2, carbs: 34, fat: 12, serving: "1 package" },
        "kit kat": { name: "Kit Kat Bar", cal: 210, protein: 3, carbs: 27, fat: 11, serving: "1 bar" },
        "ben jerry's": { name: "Ben & Jerry's Ice Cream", cal: 260, protein: 4, carbs: 26, fat: 16, serving: "2/3 cup" },
        "haagen dazs": { name: "Haagen-Dazs Ice Cream", cal: 270, protein: 5, carbs: 21, fat: 19, serving: "2/3 cup" },
    },

    search(query) {
        if (!query || query.length < 2) return [];
        const lower = query.toLowerCase();
        const words = lower.split(/\s+/);
        return Object.entries(this.foods)
            .filter(([key, f]) => {
                const name = f.name.toLowerCase();
                // Match if query appears in name OR key, or all words match
                return name.includes(lower) || key.includes(lower) ||
                    words.every(w => name.includes(w) || key.includes(w));
            })
            .map(([key, f]) => {
                // Score: exact match first, starts-with next, then contains
                const name = f.name.toLowerCase();
                let score = 0;
                if (name === lower || key === lower) score = 3;
                else if (name.startsWith(lower) || key.startsWith(lower)) score = 2;
                else score = 1;
                return { food: f, score };
            })
            .sort((a, b) => b.score - a.score || a.food.name.localeCompare(b.food.name))
            .map(item => item.food)
            .slice(0, 10);
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

    // Analyze image colors and classify food
    classifyFromImage(imageData) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const cp = this._analyzeColors(img);
                resolve(this._classifyFromColors(cp));
            };
            img.onerror = () => resolve(this._fallback());
            img.src = imageData;
        });
    },

    // Extract color profile from image via canvas
    _analyzeColors(img) {
        const canvas = document.createElement('canvas');
        const S = 150;
        canvas.width = S;
        canvas.height = S;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, S, S);
        const data = ctx.getImageData(0, 0, S, S).data;

        let tR = 0, tG = 0, tB = 0, n = 0;
        const regions = { red: 0, green: 0, brown: 0, yellow: 0, white: 0, dark: 0, orange: 0, pink: 0, beige: 0, purple: 0, gray: 0 };
        const m = Math.floor(S * 0.05); // smaller margin to capture more
        const rVals = [], gVals = [], bVals = [];
        const brightnessHist = new Array(10).fill(0); // brightness histogram in 10 buckets

        for (let y = m; y < S - m; y++) {
            for (let x = m; x < S - m; x++) {
                const i = (y * S + x) * 4;
                const r = data[i], g = data[i+1], b = data[i+2];
                tR += r; tG += g; tB += b;
                rVals.push(r); gVals.push(g); bVals.push(b);
                n++;

                const br = (r + g + b) / 3;
                const sat = Math.max(r, g, b) - Math.min(r, g, b);
                brightnessHist[Math.min(9, Math.floor(br / 25.6))]++;

                // Classify each pixel into a color region
                if (br < 40) regions.dark++;
                else if (br > 220 && sat < 30) regions.white++;
                else if (sat < 25 && br > 40 && br < 220) regions.gray++;
                else if (r > 180 && g < 80 && b < 80) regions.red++;
                else if (r > 200 && g > 100 && g < 180 && b < 60) regions.orange++;
                else if (r > 180 && g > 150 && b < 80) regions.yellow++;
                else if (g > 100 && g > r + 20 && g > b + 20) regions.green++;
                else if (r > 100 && g > 60 && g < r * 0.85 && b < r * 0.7 && br < 160) regions.brown++;
                else if (r > 150 && b > 100 && g < Math.min(r, b)) regions.pink++;
                else if (b > 100 && r > 80 && g < 80) regions.purple++;
                else if (r > 150 && g > 120 && b > 90 && sat < 60) regions.beige++;
                else if (br < 80) regions.dark++; // catch more darks
            }
        }

        const avgR = tR / n, avgG = tG / n, avgB = tB / n;
        const brightness = (avgR + avgG + avgB) / 3;
        const saturation = Math.max(avgR, avgG, avgB) - Math.min(avgR, avgG, avgB);
        const varR = rVals.reduce((s, v) => s + (v - avgR) ** 2, 0) / n;
        const varG = gVals.reduce((s, v) => s + (v - avgG) ** 2, 0) / n;
        const varB = bVals.reduce((s, v) => s + (v - avgB) ** 2, 0) / n;
        const colorVariance = Math.sqrt((varR + varG + varB) / 3);

        // Detect if likely a drink
        const darkRatio = (regions.dark) / n;
        const brownRatio = regions.brown / n;
        const grayRatio = regions.gray / n;
        const whiteRatio = regions.white / n;
        const hasTranslucency = darkRatio > 0.15 || (brownRatio > 0.1 && darkRatio > 0.08);

        // Clear cup detection: lots of gray/white (cup + background), low food-color saturation
        const foodColorTotal = (regions.green + regions.yellow + regions.orange + regions.pink + regions.purple) / n;
        const neutralDominant = grayRatio + whiteRatio; // gray + white as fraction
        const isClearCup = neutralDominant > 0.35 && foodColorTotal < 0.15;

        return { avgR, avgG, avgB, brightness, saturation, colorVariance, regions, totalPixels: n, darkRatio, brightnessHist, hasTranslucency, isClearCup, grayRatio, neutralDominant };
    },

    // Match color profile to foods - improved scoring
    _classifyFromColors(cp) {
        const scored = [];
        const p = (r) => (cp.regions[r] || 0) / cp.totalPixels * 100;

        const gP = p('green'), brP = p('brown'), rP = p('red');
        const yP = p('yellow'), oP = p('orange');
        const wP = p('white'), dP = p('dark'), pkP = p('pink');
        const beP = p('beige'), grP = p('gray'), puP = p('purple');

        // Detect drink-like images
        const isDrinkLikely = dP > 12 || (dP > 8 && brP > 8) || (dP > 8 && rP > 5) || cp.isClearCup;
        // Detect solid food plate: moderate brightness, varied colors, NOT a clear cup
        const isPlate = cp.colorVariance > 45 && cp.brightness > 80 && cp.brightness < 190 && !cp.isClearCup;
        // Detect light/white food (not when gray/white dominate from a cup)
        const isLight = !cp.isClearCup && (wP > 30 || (wP > 20 && beP > 10));
        // Detect very green
        const isGreen = gP > 25;

        // All drink keys for easy reference
        const drinkKeys = ["soda","coffee","beer","wine","latte","milk","orange juice","smoothie","protein shake"];

        for (const [key, food] of Object.entries(this.foods)) {
            let score = 0;

            // ===== DRINKS =====
            if (isDrinkLikely) {
                // Clear cup drinks (gray/white dominant, like Big Gulp, iced drinks)
                if (cp.isClearCup) {
                    if (drinkKeys.includes(key)) score += 55;
                    // If there's some brown/dark inside the cup, lean toward soda/coffee
                    if ((brP > 5 || dP > 5) && ["soda","coffee","latte","beer"].includes(key)) score += 15;
                    // If very light/white inside, lean toward milk/latte/water
                    if (wP > 25 && ["milk","latte","protein shake"].includes(key)) score += 10;
                }
                // Dark drinks (cola, coffee, beer)
                if (dP > 15) {
                    if (["soda","coffee","beer","wine"].includes(key)) score += 60;
                    if (["chocolate","blueberries"].includes(key)) score += 15;
                }
                // Dark + brown (coffee, cola with caramel)
                if (dP > 8 && brP > 8) {
                    if (["soda","coffee","latte","beer"].includes(key)) score += 55;
                }
                // Pink/red drinks
                if (pkP > 8 || (rP > 8 && !cp.isClearCup)) {
                    if (["smoothie","soda","wine"].includes(key)) score += 40;
                }
                // Red on a clear cup is likely branding/straw, boost soda
                if (rP > 3 && cp.isClearCup) {
                    if (["soda"].includes(key)) score += 20;
                }
                // Light colored drinks
                if (wP > 15 && grP < 20 && !cp.isClearCup) {
                    if (["milk","latte","protein shake"].includes(key)) score += 40;
                }
                // Orange drinks
                if (oP > 10) {
                    if (["orange juice","smoothie"].includes(key)) score += 45;
                }
            }

            // ===== Suppress solid food when drink is detected =====
            if (isDrinkLikely && !drinkKeys.includes(key)) {
                // Reduce any score solid foods might accumulate below
                score -= 20;
            }

            // ===== GREEN FOODS =====
            if (isGreen && !isDrinkLikely) {
                if (["salad","broccoli","spinach","green beans","avocado"].includes(key)) score += 55;
                if (["apple","grapes"].includes(key)) score += 20;
            } else if (gP > 10 && !isDrinkLikely) {
                if (["salad","broccoli","avocado"].includes(key)) score += 25;
            }

            // ===== BROWN FOODS (meats, bread, baked goods) =====
            if (brP > 20 && !isDrinkLikely) {
                if (["steak","grilled chicken breast","fried chicken","burger"].includes(key)) score += 50;
                if (["bread","bagel","muffin","cookie","donut"].includes(key)) score += 40;
                if (["pancakes","waffle","granola bar","oatmeal"].includes(key)) score += 30;
                if (["chocolate","peanut butter","almonds"].includes(key)) score += 20;
            } else if (brP > 10 && !isDrinkLikely) {
                if (["grilled chicken breast","bread","pasta","rice"].includes(key)) score += 20;
                if (["cookie","donut","muffin"].includes(key)) score += 15;
            }

            // ===== RED FOODS =====
            if (rP > 15 && !isDrinkLikely) {
                if (["pizza","tacos","ramen","strawberries","watermelon"].includes(key)) score += 50;
                if (["steak","burger","hot dog","bacon"].includes(key)) score += 35;
                if (["nachos","burrito","soup"].includes(key)) score += 25;
            } else if (rP > 8 && !isDrinkLikely) {
                if (["pizza","tacos","burger"].includes(key)) score += 20;
            }

            // ===== YELLOW/ORANGE FOODS =====
            if ((yP > 12 || oP > 12) && !isDrinkLikely) {
                if (["mac and cheese","cheese","french fries","chips","nachos","corn"].includes(key)) score += 50;
                if (["eggs","pancakes","fried rice","orange","mango"].includes(key)) score += 35;
                if (["banana","cereal"].includes(key)) score += 25;
            }

            // ===== WHITE/LIGHT FOODS =====
            if (isLight && !isDrinkLikely) {
                if (["rice","yogurt","tofu","bread","potato"].includes(key)) score += 45;
                if (["pasta","ice cream","cereal","oatmeal"].includes(key)) score += 30;
            }

            // ===== DARK SOLID FOODS (not drinks) =====
            if (dP > 20 && !isDrinkLikely && cp.colorVariance > 40) {
                if (["chocolate","blueberries","steak"].includes(key)) score += 35;
            }

            // ===== PINK FOODS =====
            if (pkP > 10 && !isDrinkLikely) {
                if (["salmon","shrimp"].includes(key)) score += 50;
                if (["ice cream","yogurt","watermelon"].includes(key)) score += 25;
            }

            // ===== BEIGE (bread-like, grains) =====
            if (beP > 15 && !isDrinkLikely) {
                if (["bread","rice","pasta","oatmeal","potato","cereal","bagel"].includes(key)) score += 30;
                if (["pancakes","waffle","tortilla"].includes(key)) score += 20;
            }

            // ===== MIXED PLATE =====
            if (isPlate && !isDrinkLikely) {
                if (["burrito","sushi","ramen","fried rice","nachos","salad","tacos","pizza","burger","sandwich"].includes(key)) score += 15;
            }

            // Only add if score > 0
            if (score > 0) {
                // Small randomization (±5%)
                score *= (0.95 + Math.random() * 0.10);
                scored.push({ key, food, score });
            }
        }

        scored.sort((a, b) => b.score - a.score);
        const top = scored.slice(0, 5);

        if (top.length === 0 || top[0].score < 10) return this._fallback();

        const max = top[0].score;
        return top.map(item => ({
            name: item.food.name,
            confidence: Math.min(0.94, (item.score / max) * 0.80 + 0.12),
            cal: item.food.cal, protein: item.food.protein,
            carbs: item.food.carbs, fat: item.food.fat,
            serving: item.food.serving
        }));
    },

    // Fallback for unclear images
    _fallback() {
        const meals = ["grilled chicken breast","rice","salad","pizza","burger","salmon","pasta","sandwich","eggs","steak","tacos","sushi","burrito","soup","fried rice"];
        const shuffled = meals.sort(() => Math.random() - 0.5);
        let conf = 0.45;
        return shuffled.slice(0, 5).map(key => {
            const f = this.foods[key];
            const r = { name: f.name, confidence: conf, cal: f.cal, protein: f.protein, carbs: f.carbs, fat: f.fat, serving: f.serving };
            conf -= 0.05;
            return r;
        });
    }
};
