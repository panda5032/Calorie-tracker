// ============================================================
// App State
// ============================================================
let currentTab = 'dashboard';
let scanImageData = null;

// ============================================================
// Init
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Set default date for log
    document.getElementById('log-date').value = Storage.todayStr();
    document.getElementById('exercise-date').value = Storage.todayStr();

    // Set goal date default
    const profile = Storage.getProfile();
    document.getElementById('prof-goal-date').value = profile.goalDate;

    // Load profile into form
    loadProfileForm(profile);
    loadApiKey();

    // Init category chips
    initCategoryChips();

    // Update all views
    updateDashboard();
    loadLogEntries();
    loadExerciseEntries();
    recalcProfile();

    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    }
}

// ============================================================
// Tab Switching
// ============================================================
function switchTab(tab) {
    currentTab = tab;

    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    // Show selected
    document.getElementById('tab-' + tab).classList.add('active');
    document.getElementById('btn-' + tab).classList.add('active');

    // Refresh data
    if (tab === 'dashboard') updateDashboard();
    if (tab === 'log') loadLogEntries();
    if (tab === 'exercise') loadExerciseEntries();
    if (tab === 'profile') recalcProfile();
}

// ============================================================
// Dashboard
// ============================================================
function updateDashboard() {
    const profile = Storage.getProfile();
    const calc = CalorieCalculator.computeAll(profile);
    const entries = Storage.getTodaysEntries();
    const exercises = Storage.getTodaysExercises();

    const totalCal = entries.reduce((s, e) => s + (e.calories || 0), 0);
    const totalProtein = entries.reduce((s, e) => s + (e.protein || 0), 0);
    const totalCarbs = entries.reduce((s, e) => s + (e.carbs || 0), 0);
    const totalFat = entries.reduce((s, e) => s + (e.fat || 0), 0);
    const exerciseBurned = exercises.reduce((s, e) => s + (e.caloriesBurned || 0), 0);
    const totalExMinutes = exercises.reduce((s, e) => s + (e.duration || 0), 0);
    const todaysSteps = Storage.getTodaysSteps();
    const stepCalories = calcStepCalories(todaysSteps, profile.weightLbs);
    const totalBurned = exerciseBurned + stepCalories;
    const netCalories = totalCal - totalBurned;
    const remaining = calc.dailyTarget - totalCal + totalBurned;

    // Exercise dashboard card
    document.getElementById('dash-burned').textContent = totalBurned.toLocaleString();
    document.getElementById('dash-net').textContent = netCalories.toLocaleString();
    document.getElementById('dash-steps').textContent = todaysSteps.toLocaleString();

    // Ring
    const progress = Math.min(totalCal / calc.dailyTarget, 1.0);
    const circumference = 2 * Math.PI * 80; // r=80
    const offset = circumference * (1 - progress);
    const ring = document.getElementById('ring-progress');
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = offset;

    // Ring color
    if (totalCal > calc.dailyTarget) {
        ring.style.stroke = 'var(--red)';
    } else if (progress > 0.8) {
        ring.style.stroke = 'var(--fat)';
    } else {
        ring.style.stroke = 'var(--accent)';
    }

    // Ring text
    const consumedEl = document.getElementById('ring-consumed');
    consumedEl.textContent = totalCal.toLocaleString();
    consumedEl.style.color = totalCal > calc.dailyTarget ? 'var(--red)' : 'var(--accent)';

    document.getElementById('ring-label').textContent = `of ${calc.dailyTarget.toLocaleString()} cal`;

    const remainEl = document.getElementById('ring-remaining');
    if (remaining >= 0) {
        remainEl.textContent = `${remaining.toLocaleString()} remaining`;
        remainEl.classList.remove('over');
    } else {
        remainEl.textContent = `${(-remaining).toLocaleString()} over`;
        remainEl.classList.add('over');
    }

    // Macros
    document.getElementById('dash-protein').textContent = Math.round(totalProtein) + 'g';
    document.getElementById('dash-carbs').textContent = Math.round(totalCarbs) + 'g';
    document.getElementById('dash-fat').textContent = Math.round(totalFat) + 'g';

    // Stats
    document.getElementById('dash-bmr').textContent = calc.bmr.toLocaleString();
    document.getElementById('dash-tdee').textContent = calc.tdee.toLocaleString();
    document.getElementById('dash-target').textContent = calc.dailyTarget.toLocaleString();

    // Today's entries
    const container = document.getElementById('today-entries');
    if (entries.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🍽️</div>
                <p>No food logged today</p>
                <small>Use the Scan tab to get started</small>
            </div>`;
    } else {
        container.innerHTML = entries.map(e => entryRowHTML(e, false)).join('');
    }
}

// ============================================================
// Food Log
// ============================================================
function loadLogEntries() {
    const dateStr = document.getElementById('log-date').value;
    const entries = Storage.getEntriesForDate(dateStr);
    const totalCal = entries.reduce((s, e) => s + (e.calories || 0), 0);

    document.getElementById('log-total-cal').textContent = totalCal.toLocaleString() + ' cal';

    const container = document.getElementById('log-entries');
    if (entries.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <p>No food logged</p>
                <small>Tap + to add a food entry</small>
            </div>`;
    } else {
        container.innerHTML = entries.map(e => entryRowHTML(e, true)).join('');
    }
}

function changeLogDate(delta) {
    const input = document.getElementById('log-date');
    const d = new Date(input.value + 'T12:00:00');
    d.setDate(d.getDate() + delta);
    input.value = d.toISOString().split('T')[0];
    loadLogEntries();
}

function deleteEntry(id) {
    Storage.deleteEntry(id);
    loadLogEntries();
    updateDashboard();
    showToast('Entry deleted');
}

function entryRowHTML(entry, showDelete) {
    const iconHTML = entry.imageData
        ? `<img src="${entry.imageData}" alt="">`
        : '🍴';
    const time = entry.timestamp ? Storage.formatTime(entry.timestamp) : '';
    const deleteBtn = showDelete
        ? `<button class="entry-delete" onclick="deleteEntry('${entry.id}')">✕</button>`
        : '';

    return `
        <div class="entry-row">
            <div class="entry-icon">${iconHTML}</div>
            <div class="entry-info">
                <div class="entry-name">${escapeHtml(entry.name)}</div>
                <div class="entry-meta">${escapeHtml(entry.serving || '')}${time ? ' · ' + time : ''}</div>
            </div>
            <div class="entry-calories">
                <span class="entry-cal-num">${entry.calories}</span>
                <span class="entry-cal-unit">cal</span>
            </div>
            ${deleteBtn}
        </div>`;
}

// ============================================================
// Manual Entry
// ============================================================
function showManualEntry() {
    document.getElementById('manual-entry-modal').style.display = 'flex';
    document.getElementById('manual-name').value = '';
    document.getElementById('manual-calories').value = '';
    document.getElementById('manual-protein').value = '';
    document.getElementById('manual-carbs').value = '';
    document.getElementById('manual-fat').value = '';
    document.getElementById('manual-serving').value = '1 serving';
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('manual-save-btn').disabled = true;
}

function closeManualEntry() {
    document.getElementById('manual-entry-modal').style.display = 'none';
}

function searchFood(query) {
    const results = FoodDatabase.search(query);
    const container = document.getElementById('search-results');

    if (results.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = results.map(f => `
        <div class="search-result-item" onclick="fillManualEntry('${escapeHtml(f.name)}', ${f.cal}, ${f.protein}, ${f.carbs}, ${f.fat}, '${escapeHtml(f.serving)}')">
            <span>${escapeHtml(f.name)}</span>
            <span>${f.cal} cal</span>
        </div>
    `).join('');
}

function fillManualEntry(name, cal, protein, carbs, fat, serving) {
    document.getElementById('manual-name').value = name;
    document.getElementById('manual-calories').value = cal;
    document.getElementById('manual-protein').value = protein;
    document.getElementById('manual-carbs').value = carbs;
    document.getElementById('manual-fat').value = fat;
    document.getElementById('manual-serving').value = serving;
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('manual-save-btn').disabled = false;
}

function checkManualForm() {
    const name = document.getElementById('manual-name').value.trim();
    const cal = document.getElementById('manual-calories').value;
    document.getElementById('manual-save-btn').disabled = !name || !cal;
}

function saveManualEntry() {
    const entry = {
        name: document.getElementById('manual-name').value.trim(),
        calories: parseInt(document.getElementById('manual-calories').value) || 0,
        protein: parseFloat(document.getElementById('manual-protein').value) || 0,
        carbs: parseFloat(document.getElementById('manual-carbs').value) || 0,
        fat: parseFloat(document.getElementById('manual-fat').value) || 0,
        serving: document.getElementById('manual-serving').value || '1 serving',
        date: document.getElementById('log-date').value
    };

    Storage.addEntry(entry);
    closeManualEntry();
    loadLogEntries();
    updateDashboard();
    showToast('Food added!');
}

// ============================================================
// Camera / Scan
// ============================================================
function takePhoto() {
    document.getElementById('camera-input').click();
}

function pickPhoto() {
    document.getElementById('library-input').click();
}

function handlePhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        scanImageData = e.target.result;
        const preview = document.getElementById('scan-preview');
        preview.src = scanImageData;
        preview.style.display = 'block';
        document.getElementById('scan-placeholder').style.display = 'none';
        document.getElementById('scan-actions').style.display = 'none';
        document.getElementById('scan-analyze').style.display = 'flex';
        document.getElementById('scan-results').style.display = 'none';
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be selected again
    event.target.value = '';
}

async function analyzeFood() {
    document.getElementById('scan-analyze').style.display = 'none';

    const resultsDiv = document.getElementById('scan-results');
    resultsDiv.style.display = 'block';
    resultsDiv.querySelector('h3').textContent = '';

    const apiKey = Storage.getApiKey();

    if (apiKey) {
        // Use Claude Vision API
        document.getElementById('scan-results-list').innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <span>Claude AI is analyzing your food...</span>
            </div>`;

        try {
            const results = await analyzeFoodWithClaude(scanImageData, apiKey);
            showScanResults(results);
        } catch (err) {
            console.error('Claude API error:', err);
            document.getElementById('scan-results-list').innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <span>AI failed, using backup scanner...</span>
                </div>`;
            const results = await FoodDatabase.classifyFromImage(scanImageData);
            showScanResults(results);
        }
    } else {
        // Fallback to color-based analysis
        document.getElementById('scan-results-list').innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <span>Analyzing food colors &amp; patterns...</span>
            </div>`;

        const results = await FoodDatabase.classifyFromImage(scanImageData);
        showScanResults(results);
    }
}

async function analyzeFoodWithClaude(imageData, apiKey) {
    // Extract base64 and media type from data URL
    const match = imageData.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!match) throw new Error('Invalid image data');

    const mediaType = match[1];
    const base64Data = match[2];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            messages: [{
                role: 'user',
                content: [
                    {
                        type: 'image',
                        source: {
                            type: 'base64',
                            media_type: mediaType,
                            data: base64Data
                        }
                    },
                    {
                        type: 'text',
                        text: `Identify the food(s) in this photo. For each distinct food item, estimate the nutritional information per typical serving.

Respond ONLY with a JSON array (no markdown, no explanation). Each item must have exactly these fields:
[
  {
    "name": "Food Name",
    "calories": 250,
    "protein": 12,
    "carbs": 30,
    "fat": 8,
    "serving": "1 cup",
    "confidence": 0.85
  }
]

Rules:
- Return 1-5 food items found in the photo
- Calories, protein, carbs, fat should be numbers (not strings)
- Confidence is 0.0-1.0 based on how sure you are
- If you can't identify any food, return: [{"name":"Unknown Food","calories":200,"protein":10,"carbs":25,"fat":8,"serving":"1 serving","confidence":0.3}]`
                    }
                ]
            }]
        })
    });

    if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`API ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const text = data.content[0].text.trim();

    // Parse JSON from response (handle potential markdown wrapping)
    let jsonStr = text;
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) jsonStr = jsonMatch[0];

    const items = JSON.parse(jsonStr);

    return items.map(item => ({
        name: item.name || 'Unknown Food',
        cal: parseInt(item.calories) || 200,
        protein: parseFloat(item.protein) || 0,
        carbs: parseFloat(item.carbs) || 0,
        fat: parseFloat(item.fat) || 0,
        serving: item.serving || '1 serving',
        confidence: parseFloat(item.confidence) || 0.5
    }));
}

function showScanResults(results) {
    const resultsDiv = document.getElementById('scan-results');
    resultsDiv.querySelector('h3').textContent = 'What did we find?';

    document.getElementById('scan-results-list').innerHTML = results.map(r => `
        <div class="result-item" onclick="selectScanResult('${escapeHtml(r.name)}', ${r.cal}, ${r.protein}, ${r.carbs}, ${r.fat}, '${escapeHtml(r.serving)}')">
            <div class="result-info">
                <div class="result-name">${escapeHtml(r.name)}</div>
                <div class="result-meta">${r.cal} cal \u00B7 ${r.serving}</div>
            </div>
            <span class="result-confidence">${Math.round(r.confidence * 100)}%</span>
            <span class="result-arrow">\u203A</span>
        </div>
    `).join('') + `
        <div class="scan-results-actions">
            <button class="btn btn-secondary" onclick="noneOfTheseManual()" style="width:100%">None of these \u2013 Enter Manually</button>
            <button class="btn btn-text" onclick="resetScan()">\u2190 Back to Camera</button>
        </div>
    `;
}

function selectScanResult(name, cal, protein, carbs, fat, serving) {
    document.getElementById('result-name').value = name;
    document.getElementById('result-calories').value = cal;
    document.getElementById('result-protein').value = protein;
    document.getElementById('result-carbs').value = carbs;
    document.getElementById('result-fat').value = fat;
    document.getElementById('result-serving').value = serving;
    document.getElementById('food-result-modal').style.display = 'flex';
}

function closeFoodResult() {
    document.getElementById('food-result-modal').style.display = 'none';
    // Goes back to results list so user can pick a different item
}

function saveFoodResult() {
    // Compress image for storage
    let thumbnail = null;
    if (scanImageData) {
        // Store a small version
        thumbnail = compressImage(scanImageData);
    }

    const entry = {
        name: document.getElementById('result-name').value.trim(),
        calories: parseInt(document.getElementById('result-calories').value) || 0,
        protein: parseFloat(document.getElementById('result-protein').value) || 0,
        carbs: parseFloat(document.getElementById('result-carbs').value) || 0,
        fat: parseFloat(document.getElementById('result-fat').value) || 0,
        serving: document.getElementById('result-serving').value || '1 serving',
        imageData: thumbnail,
        date: Storage.todayStr()
    };

    Storage.addEntry(entry);
    closeFoodResult();
    resetScan();
    updateDashboard();
    showToast('Food added!');
}

function noneOfTheseManual() {
    // Open manual entry modal so user can type in their food
    document.getElementById('scan-results').style.display = 'none';
    showManualEntry();
}

function resetScan() {
    scanImageData = null;
    document.getElementById('scan-preview').style.display = 'none';
    document.getElementById('scan-placeholder').style.display = 'block';
    document.getElementById('scan-actions').style.display = 'flex';
    document.getElementById('scan-analyze').style.display = 'none';
    document.getElementById('scan-results').style.display = 'none';
}

function compressImage(dataUrl) {
    try {
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.src = dataUrl;

        // Use small thumbnail size
        const maxSize = 100;
        let w = img.width || maxSize;
        let h = img.height || maxSize;

        if (w > h) {
            if (w > maxSize) { h = h * maxSize / w; w = maxSize; }
        } else {
            if (h > maxSize) { w = w * maxSize / h; h = maxSize; }
        }

        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        return canvas.toDataURL('image/jpeg', 0.5);
    } catch {
        return null;
    }
}

// ============================================================
// Profile
// ============================================================
function loadProfileForm(profile) {
    document.getElementById('prof-weight').value = profile.weightLbs;
    const totalInches = profile.heightInches;
    document.getElementById('prof-height-ft').value = Math.floor(totalInches / 12);
    document.getElementById('prof-height-in').value = totalInches % 12;
    document.getElementById('prof-age').value = profile.age;
    document.getElementById('prof-sex').value = profile.sex;
    document.getElementById('prof-activity').value = profile.activityMultiplier;
    document.getElementById('prof-goal-weight').value = profile.goalWeightLbs;
    document.getElementById('prof-goal-date').value = profile.goalDate;
}

function recalcProfile() {
    const profile = getProfileFromForm();
    const calc = CalorieCalculator.computeAll(profile);

    document.getElementById('prof-bmr').textContent = calc.bmr.toLocaleString() + ' cal';
    document.getElementById('prof-tdee').textContent = calc.tdee.toLocaleString() + ' cal';
    document.getElementById('prof-target').textContent = calc.dailyTarget.toLocaleString() + ' cal';

    const weightToLose = Math.max(0, profile.weightLbs - profile.goalWeightLbs);
    const weeklyRate = calc.weeks > 0 ? weightToLose / calc.weeks : 0;
    document.getElementById('prof-weekly-rate').textContent = weeklyRate.toFixed(1) + ' lbs/week';

    // Progress
    const startWeight = profile.startWeightLbs || 215;
    const totalToLose = startWeight - profile.goalWeightLbs;
    const lostSoFar = startWeight - profile.weightLbs;
    const progressPct = totalToLose > 0 ? Math.max(0, Math.min(100, (lostSoFar / totalToLose) * 100)) : 0;

    document.getElementById('weight-progress-bar').style.width = progressPct + '%';
    document.getElementById('prog-start').textContent = startWeight.toFixed(1) + ' lbs';
    document.getElementById('prog-current').textContent = profile.weightLbs.toFixed(1) + ' lbs';
    document.getElementById('prog-goal').textContent = profile.goalWeightLbs.toFixed(1) + ' lbs';
    document.getElementById('prog-lost').textContent = Math.max(0, lostSoFar).toFixed(1);
    document.getElementById('prog-togo').textContent = Math.max(0, weightToLose).toFixed(1);
    document.getElementById('prog-days').textContent = calc.daysRemaining;
}

function getProfileFromForm() {
    const stored = Storage.getProfile();
    return {
        weightLbs: parseFloat(document.getElementById('prof-weight').value) || 215,
        heightInches: (parseInt(document.getElementById('prof-height-ft').value) || 5) * 12 +
                      (parseInt(document.getElementById('prof-height-in').value) || 10),
        age: parseInt(document.getElementById('prof-age').value) || 36,
        sex: document.getElementById('prof-sex').value,
        activityMultiplier: parseFloat(document.getElementById('prof-activity').value) || 1.375,
        goalWeightLbs: parseFloat(document.getElementById('prof-goal-weight').value) || 180,
        goalDate: document.getElementById('prof-goal-date').value,
        startWeightLbs: stored.startWeightLbs || 215,
        createdAt: stored.createdAt
    };
}

function saveProfile() {
    const profile = getProfileFromForm();
    Storage.saveProfile(profile);
    recalcProfile();
    updateDashboard();
    showToast('Profile saved!');
}

function saveApiKey() {
    const key = document.getElementById('prof-api-key').value.trim();
    Storage.saveApiKey(key);
    showToast(key ? 'API key saved! AI scanner enabled.' : 'API key removed. Using basic scanner.');
}

function loadApiKey() {
    const key = Storage.getApiKey();
    document.getElementById('prof-api-key').value = key;
}

// ============================================================
// Exercise
// ============================================================
let selectedExerciseData = null;

function initCategoryChips() {
    const container = document.getElementById('category-chips');
    container.innerHTML = ExerciseDatabase.categories.map(cat =>
        `<button class="category-chip" onclick="selectCategory('${cat}')">
            ${ExerciseDatabase.getCategoryEmoji(cat)} ${cat}
        </button>`
    ).join('');
}

function showAddExercise() {
    document.getElementById('exercise-modal').style.display = 'flex';
    document.getElementById('exercise-search').value = '';
    document.getElementById('exercise-search-results').innerHTML = '';
    document.getElementById('category-exercises').innerHTML = '';
    document.getElementById('exercise-details').style.display = 'none';
    document.getElementById('exercise-save-btn').disabled = true;
    selectedExerciseData = null;
    // Reset active chips
    document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
}

function closeAddExercise() {
    document.getElementById('exercise-modal').style.display = 'none';
}

function searchExercise(query) {
    const results = ExerciseDatabase.search(query);
    const container = document.getElementById('exercise-search-results');

    if (results.length === 0) {
        container.innerHTML = '';
        return;
    }

    const profile = Storage.getProfile();
    container.innerHTML = results.map(ex => {
        const adjCal = ExerciseDatabase.adjustForWeight(ex.calPer30, profile.weightLbs);
        return `<div class="exercise-list-item" onclick="selectExercise('${escapeHtml(ex.name)}', ${ex.calPer30}, '${ex.category}')">
            <span class="exercise-list-emoji">${ExerciseDatabase.getCategoryEmoji(ex.category)}</span>
            <span class="exercise-list-name">${escapeHtml(ex.name)}</span>
            <span class="exercise-list-cal">${adjCal} cal/30min</span>
        </div>`;
    }).join('');
}

function selectCategory(category) {
    // Toggle active state
    document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
    event.target.closest('.category-chip').classList.add('active');

    const exercises = ExerciseDatabase.getByCategory(category);
    const profile = Storage.getProfile();
    const container = document.getElementById('category-exercises');

    container.innerHTML = exercises.map(ex => {
        const adjCal = ExerciseDatabase.adjustForWeight(ex.calPer30, profile.weightLbs);
        return `<div class="exercise-list-item" onclick="selectExercise('${escapeHtml(ex.name)}', ${ex.calPer30}, '${ex.category}')">
            <span class="exercise-list-emoji">${ExerciseDatabase.getCategoryEmoji(ex.category)}</span>
            <span class="exercise-list-name">${escapeHtml(ex.name)}</span>
            <span class="exercise-list-cal">${adjCal} cal/30min</span>
        </div>`;
    }).join('');

    // Clear search
    document.getElementById('exercise-search').value = '';
    document.getElementById('exercise-search-results').innerHTML = '';
}

function selectExercise(name, calPer30, category) {
    selectedExerciseData = { name, calPer30, category };

    const profile = Storage.getProfile();
    const adjCal = ExerciseDatabase.adjustForWeight(calPer30, profile.weightLbs);

    document.getElementById('exercise-details').style.display = 'block';
    document.getElementById('ex-name').value = name;
    document.getElementById('ex-duration').value = 30;
    document.getElementById('ex-intensity').value = '1.0';

    document.getElementById('selected-exercise-card').innerHTML = `
        <span class="selected-ex-icon">${ExerciseDatabase.getCategoryEmoji(category)}</span>
        <div class="selected-ex-info">
            <div class="selected-ex-name">${escapeHtml(name)}</div>
            <div class="selected-ex-detail">${category} &middot; ~${adjCal} cal/30min</div>
        </div>`;

    updateExCalories();
    document.getElementById('exercise-save-btn').disabled = false;

    // Hide search/categories
    document.getElementById('exercise-search-results').innerHTML = '';
    document.getElementById('category-exercises').innerHTML = '';
}

function updateExCalories() {
    if (!selectedExerciseData) return;
    const profile = Storage.getProfile();
    const duration = parseInt(document.getElementById('ex-duration').value) || 30;
    const intensity = parseFloat(document.getElementById('ex-intensity').value) || 1.0;
    const baseCal = ExerciseDatabase.adjustForWeight(selectedExerciseData.calPer30, profile.weightLbs);
    const totalCal = Math.round(baseCal * (duration / 30) * intensity);
    document.getElementById('ex-calories').value = totalCal;
}

function saveExercise() {
    const exercise = {
        name: document.getElementById('ex-name').value,
        duration: parseInt(document.getElementById('ex-duration').value) || 30,
        caloriesBurned: parseInt(document.getElementById('ex-calories').value) || 0,
        intensity: document.getElementById('ex-intensity').selectedOptions[0].text,
        category: selectedExerciseData ? selectedExerciseData.category : 'Other',
        notes: document.getElementById('ex-notes').value,
        date: document.getElementById('exercise-date').value
    };

    Storage.addExercise(exercise);
    closeAddExercise();
    loadExerciseEntries();
    updateDashboard();
    showToast('Exercise logged!');
}

function loadExerciseEntries() {
    const dateStr = document.getElementById('exercise-date').value;
    const exercises = Storage.getExercisesForDate(dateStr);

    const exerciseBurned = exercises.reduce((s, e) => s + (e.caloriesBurned || 0), 0);
    const totalDuration = exercises.reduce((s, e) => s + (e.duration || 0), 0);
    const steps = Storage.getStepsForDate(dateStr);
    const profile = Storage.getProfile();
    const stepCal = calcStepCalories(steps, profile.weightLbs);
    const totalBurned = exerciseBurned + stepCal;

    document.getElementById('ex-total-burned').textContent = totalBurned.toLocaleString();
    loadStepsForDate(dateStr);
    document.getElementById('ex-total-duration').textContent = totalDuration;
    document.getElementById('ex-total-count').textContent = exercises.length;

    const container = document.getElementById('exercise-entries');
    if (exercises.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">\u{1F3CB}\u{FE0F}</div>
                <p>No exercises logged</p>
                <small>Tap + to log a workout</small>
            </div>`;
    } else {
        container.innerHTML = exercises.map(e => exerciseRowHTML(e)).join('');
    }
}

function exerciseRowHTML(exercise) {
    const emoji = ExerciseDatabase.getCategoryEmoji(exercise.category || 'Cardio');
    const time = exercise.timestamp ? Storage.formatTime(exercise.timestamp) : '';
    const notes = exercise.notes ? ` \u00B7 ${escapeHtml(exercise.notes)}` : '';

    return `
        <div class="exercise-entry-row">
            <div class="exercise-entry-icon">${emoji}</div>
            <div class="exercise-entry-info">
                <div class="exercise-entry-name">${escapeHtml(exercise.name)}</div>
                <div class="exercise-entry-meta">${exercise.duration} min \u00B7 ${exercise.intensity || 'Moderate'}${notes}${time ? ' \u00B7 ' + time : ''}</div>
            </div>
            <div class="exercise-entry-cal">
                <span class="exercise-cal-num">-${exercise.caloriesBurned}</span>
                <span class="exercise-cal-unit">cal</span>
            </div>
            <button class="entry-delete" onclick="deleteExerciseEntry('${exercise.id}')">\u2715</button>
        </div>`;
}

function deleteExerciseEntry(id) {
    Storage.deleteExercise(id);
    loadExerciseEntries();
    updateDashboard();
    showToast('Exercise deleted');
}

function changeExerciseDate(delta) {
    const input = document.getElementById('exercise-date');
    const d = new Date(input.value + 'T12:00:00');
    d.setDate(d.getDate() + delta);
    input.value = d.toISOString().split('T')[0];
    loadExerciseEntries();
}

// ============================================================
// Steps
// ============================================================
function calcStepCalories(steps, weightLbs) {
    // ~0.04 cal/step for 155lb person, adjusted by weight
    return Math.round(steps * 0.04 * (weightLbs / 155));
}

function updateStepCalories() {
    const steps = parseInt(document.getElementById('steps-input').value) || 0;
    const profile = Storage.getProfile();
    const cal = calcStepCalories(steps, profile.weightLbs);
    document.getElementById('steps-calories').textContent = cal.toLocaleString();

    const goal = 10000;
    const pct = Math.min(100, (steps / goal) * 100);
    document.getElementById('steps-progress-bar').style.width = pct + '%';
    document.getElementById('steps-goal-label').textContent = steps.toLocaleString() + ' / ' + goal.toLocaleString();
}

function saveSteps() {
    const dateStr = document.getElementById('exercise-date').value;
    const steps = parseInt(document.getElementById('steps-input').value) || 0;
    Storage.saveStepsForDate(dateStr, steps);
    loadExerciseEntries();
    updateDashboard();
    showToast('Steps saved!');
}

function loadStepsForDate(dateStr) {
    const steps = Storage.getStepsForDate(dateStr);
    document.getElementById('steps-input').value = steps || '';
    const profile = Storage.getProfile();
    const cal = calcStepCalories(steps, profile.weightLbs);
    document.getElementById('steps-calories').textContent = cal.toLocaleString();

    const goal = 10000;
    const pct = Math.min(100, (steps / goal) * 100);
    document.getElementById('steps-progress-bar').style.width = pct + '%';
    document.getElementById('steps-goal-label').textContent = (steps || 0).toLocaleString() + ' / ' + goal.toLocaleString();
}

// ============================================================
// Utilities
// ============================================================
function showToast(message) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    });
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
