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

        // Detect if likely a drink (tall aspect, dark center, etc.)
        const darkRatio = (regions.dark) / n;
        const brownRatio = regions.brown / n;
        const hasTranslucency = darkRatio > 0.15 || (brownRatio > 0.1 && darkRatio > 0.08);

        return { avgR, avgG, avgB, brightness, saturation, colorVariance, regions, totalPixels: n, darkRatio, brightnessHist, hasTranslucency };
    },

    // Match color profile to foods - improved scoring
    _classifyFromColors(cp) {
        const scored = [];
        const p = (r) => (cp.regions[r] || 0) / cp.totalPixels * 100;

        const gP = p('green'), brP = p('brown'), rP = p('red');
        const yP = p('yellow'), oP = p('orange');
        const wP = p('white'), dP = p('dark'), pkP = p('pink');
        const beP = p('beige'), grP = p('gray'), puP = p('purple');

        // Detect drink-like images: significant dark + some color
        const isDrinkLikely = dP > 12 || (dP > 8 && brP > 8) || (dP > 8 && rP > 5);
        // Detect solid food plate: moderate brightness, varied colors
        const isPlate = cp.colorVariance > 45 && cp.brightness > 80 && cp.brightness < 190;
        // Detect light/white food
        const isLight = wP > 30 || (wP > 20 && beP > 10);
        // Detect very green
        const isGreen = gP > 25;

        for (const [key, food] of Object.entries(this.foods)) {
            let score = 0;

            // ===== DRINKS =====
            if (isDrinkLikely) {
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
                if (pkP > 8 || (rP > 8 && isDrinkLikely)) {
                    if (["smoothie","soda","wine"].includes(key)) score += 40;
                }
                // Light colored drinks
                if (wP > 15 && isDrinkLikely && grP < 20) {
                    if (["milk","latte","protein shake"].includes(key)) score += 40;
                }
                // Orange drinks
                if (oP > 10) {
                    if (["orange juice","smoothie"].includes(key)) score += 45;
                }
            }

            // ===== GREEN FOODS =====
            if (isGreen) {
                if (["salad","broccoli","spinach","green beans","avocado"].includes(key)) score += 55;
                if (["apple","grapes"].includes(key)) score += 20;
            } else if (gP > 10) {
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
            if (isPlate) {
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
