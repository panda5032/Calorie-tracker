// roundRect polyfill for older Safari
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        r = typeof r === 'number' ? r : (r && r[0]) || 0;
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
    };
}

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
    loadWeightHistory();

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
    if (tab === 'profile') { recalcProfile(); loadWeightHistory(); }
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

    // Render trends charts
    renderTrends();
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

function entryRowHTML(entry, showActions) {
    const iconHTML = entry.imageData
        ? `<img src="${entry.imageData}" alt="">`
        : '🍴';
    const time = entry.timestamp ? Storage.formatTime(entry.timestamp) : '';
    const actionBtns = showActions
        ? `<button class="entry-edit" onclick="editEntry('${entry.id}')">✎</button><button class="entry-delete" onclick="deleteEntry('${entry.id}')">✕</button>`
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
            ${actionBtns}
        </div>`;
}

// ============================================================
// Manual Entry
// ============================================================
let _editingEntryId = null;
let _baseNutrition = null; // stores per-1-serving nutrition for scaling

function showManualEntry() {
    _editingEntryId = null;
    _baseNutrition = null;
    document.getElementById('manual-entry-modal').style.display = 'flex';
    document.getElementById('manual-modal-title').textContent = 'Add Food';
    document.getElementById('manual-name').value = '';
    document.getElementById('manual-calories').value = '';
    document.getElementById('manual-protein').value = '';
    document.getElementById('manual-carbs').value = '';
    document.getElementById('manual-fat').value = '';
    document.getElementById('manual-serving').value = '1';
    document.getElementById('manual-serving-label').textContent = 'serving';
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('manual-save-btn').disabled = true;
}

function editEntry(id) {
    const entries = Storage.getAllEntries();
    const entry = entries.find(e => e.id === id);
    if (!entry) return;

    _editingEntryId = id;
    document.getElementById('manual-entry-modal').style.display = 'flex';
    document.getElementById('manual-modal-title').textContent = 'Edit Food';
    document.getElementById('manual-name').value = entry.name;
    document.getElementById('manual-calories').value = entry.calories;
    document.getElementById('manual-protein').value = entry.protein || '';
    document.getElementById('manual-carbs').value = entry.carbs || '';
    document.getElementById('manual-fat').value = entry.fat || '';
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('manual-save-btn').disabled = false;

    // Set up base nutrition for scaling
    const servingQty = parseFloat(entry.servingQty) || 1;
    _baseNutrition = {
        cal: (entry.calories || 0) / servingQty,
        protein: (entry.protein || 0) / servingQty,
        carbs: (entry.carbs || 0) / servingQty,
        fat: (entry.fat || 0) / servingQty,
        unit: entry.servingUnit || 'serving'
    };
    document.getElementById('manual-serving').value = servingQty;
    document.getElementById('manual-serving-label').textContent = _baseNutrition.unit;
}

function closeManualEntry() {
    document.getElementById('manual-entry-modal').style.display = 'none';
    _editingEntryId = null;
    _baseNutrition = null;
}

let _lastSearchResults = [];

function searchFood(query) {
    const results = FoodDatabase.search(query);
    _lastSearchResults = results;
    const container = document.getElementById('search-results');

    if (results.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = results.map((f, i) => `
        <div class="search-result-item" onclick="pickSearchResult(${i})">
            <span>${escapeHtml(f.name)}</span>
            <span>${f.cal} cal</span>
        </div>
    `).join('');
}

function pickSearchResult(index) {
    const f = _lastSearchResults[index];
    if (!f) return;
    fillManualEntry(f.name, f.cal, f.protein, f.carbs, f.fat, f.serving);
}

function fillManualEntry(name, cal, protein, carbs, fat, serving) {
    document.getElementById('manual-name').value = name;
    document.getElementById('manual-calories').value = cal;
    document.getElementById('manual-protein').value = protein;
    document.getElementById('manual-carbs').value = carbs;
    document.getElementById('manual-fat').value = fat;
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('manual-save-btn').disabled = false;

    // Store base nutrition per 1 serving for scaling
    _baseNutrition = { cal, protein, carbs, fat, unit: serving };
    document.getElementById('manual-serving').value = '1';
    document.getElementById('manual-serving-label').textContent = serving;
}

function onServingChange() {
    if (!_baseNutrition) return;
    const qty = parseFloat(document.getElementById('manual-serving').value) || 1;
    document.getElementById('manual-calories').value = Math.round(_baseNutrition.cal * qty);
    document.getElementById('manual-protein').value = Math.round(_baseNutrition.protein * qty * 10) / 10;
    document.getElementById('manual-carbs').value = Math.round(_baseNutrition.carbs * qty * 10) / 10;
    document.getElementById('manual-fat').value = Math.round(_baseNutrition.fat * qty * 10) / 10;
}

function checkManualForm() {
    const name = document.getElementById('manual-name').value.trim();
    const cal = document.getElementById('manual-calories').value;
    document.getElementById('manual-save-btn').disabled = !name || !cal;
}

function saveManualEntry() {
    const qty = parseFloat(document.getElementById('manual-serving').value) || 1;
    const unit = _baseNutrition ? _baseNutrition.unit : 'serving';
    const servingDisplay = qty === 1 ? unit : qty + ' ' + unit;

    const data = {
        name: document.getElementById('manual-name').value.trim(),
        calories: parseInt(document.getElementById('manual-calories').value) || 0,
        protein: parseFloat(document.getElementById('manual-protein').value) || 0,
        carbs: parseFloat(document.getElementById('manual-carbs').value) || 0,
        fat: parseFloat(document.getElementById('manual-fat').value) || 0,
        serving: servingDisplay,
        servingQty: qty,
        servingUnit: unit
    };

    if (_editingEntryId) {
        Storage.updateEntry(_editingEntryId, data);
        showToast('Entry updated!');
    } else {
        data.date = document.getElementById('log-date').value;
        Storage.addEntry(data);
        showToast('Food added!');
    }

    closeManualEntry();
    loadLogEntries();
    updateDashboard();
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

let _lastScanResults = [];

function showScanResults(results) {
    _lastScanResults = results;
    const resultsDiv = document.getElementById('scan-results');
    resultsDiv.querySelector('h3').textContent = 'What did we find?';

    document.getElementById('scan-results-list').innerHTML = results.map((r, i) => `
        <div class="result-item" onclick="pickScanResult(${i})">
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

function pickScanResult(index) {
    const r = _lastScanResults[index];
    if (!r) return;
    selectScanResult(r.name, r.cal, r.protein, r.carbs, r.fat, r.serving);
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

    const serving = document.getElementById('result-serving').value || '1 serving';
    const entry = {
        name: document.getElementById('result-name').value.trim(),
        calories: parseInt(document.getElementById('result-calories').value) || 0,
        protein: parseFloat(document.getElementById('result-protein').value) || 0,
        carbs: parseFloat(document.getElementById('result-carbs').value) || 0,
        fat: parseFloat(document.getElementById('result-fat').value) || 0,
        serving: serving,
        servingQty: 1,
        servingUnit: serving,
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
// Trends / Analysis
// ============================================================
let _trendPeriod = 7;

function setTrendPeriod(days) {
    _trendPeriod = days;
    document.querySelectorAll('.trends-period-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderTrends();
}

function renderTrends() {
    const days = _trendPeriod;
    const profile = Storage.getProfile();
    const calc = CalorieCalculator.computeAll(profile);
    const dates = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        dates.push(d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'));
    }

    // Gather weight data
    const weightLog = Storage.getWeightLog();
    const weightMap = {};
    weightLog.forEach(e => { weightMap[e.date] = e.weight; });

    const weightData = [];
    let lastWeight = null;
    // Find most recent weight before the period starts for interpolation
    for (const e of weightLog) {
        if (e.date <= dates[0]) { lastWeight = e.weight; break; }
    }
    dates.forEach(date => {
        if (weightMap[date] !== undefined) {
            lastWeight = weightMap[date];
            weightData.push(lastWeight);
        } else {
            weightData.push(lastWeight); // carry forward or null
        }
    });

    // Gather net calorie data
    const allEntries = Storage.getAllEntries();
    const allExercises = Storage.getAllExercises();
    const allSteps = Storage.getAllSteps();

    const netCalData = dates.map(date => {
        const dayEntries = allEntries.filter(e => e.date === date);
        const dayExercises = allExercises.filter(e => e.date === date);
        const daySteps = allSteps[date] || 0;

        const consumed = dayEntries.reduce((s, e) => s + (e.calories || 0), 0);
        const exerciseBurned = dayExercises.reduce((s, e) => s + (e.caloriesBurned || 0), 0);
        const stepCal = calcStepCalories(daySteps, profile.weightLbs);
        const totalBurned = exerciseBurned + stepCal;

        // Only count days with any data
        if (consumed === 0 && totalBurned === 0) return null;
        return consumed - totalBurned;
    });

    // Draw charts
    drawWeightChart(dates, weightData);
    drawCalorieChart(dates, netCalData, calc.dailyTarget);

    // Summary stats
    renderTrendsSummary(weightData, netCalData, calc.dailyTarget);
}

function drawWeightChart(dates, data) {
    const canvas = document.getElementById('weight-chart');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = (rect.width - 16) * dpr;
    canvas.height = 150 * dpr;
    canvas.style.height = '150px';
    ctx.scale(dpr, dpr);
    const W = rect.width - 16;
    const H = 150;
    ctx.clearRect(0, 0, W, H);

    const validData = data.filter(v => v !== null);
    if (validData.length < 1) {
        ctx.fillStyle = '#8888a8';
        ctx.font = '13px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('No weight data yet', W / 2, H / 2);
        return;
    }

    const padL = 40, padR = 10, padT = 15, padB = 30;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    const min = Math.min(...validData) - 1;
    const max = Math.max(...validData) + 1;
    const range = max - min || 1;

    // Y-axis grid lines
    const ySteps = 4;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#8888a8';
    ctx.font = '10px -apple-system, sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= ySteps; i++) {
        const val = min + (range * i / ySteps);
        const y = padT + chartH - (chartH * i / ySteps);
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(W - padR, y);
        ctx.stroke();
        ctx.fillText(val.toFixed(0), padL - 5, y + 3);
    }

    // X-axis labels
    ctx.textAlign = 'center';
    ctx.fillStyle = '#5a5a78';
    const labelInterval = Math.ceil(dates.length / 6);
    dates.forEach((date, i) => {
        if (i % labelInterval === 0 || i === dates.length - 1) {
            const x = padL + (i / (dates.length - 1)) * chartW;
            const d = new Date(date + 'T12:00:00');
            ctx.fillText((d.getMonth() + 1) + '/' + d.getDate(), x, H - 5);
        }
    });

    // Line
    const points = [];
    data.forEach((v, i) => {
        if (v === null) return;
        const x = padL + (i / (dates.length - 1)) * chartW;
        const y = padT + chartH - ((v - min) / range) * chartH;
        points.push({ x, y });
    });

    if (points.length > 1) {
        // Gradient fill
        const gradient = ctx.createLinearGradient(0, padT, 0, padT + chartH);
        gradient.addColorStop(0, 'rgba(255, 140, 66, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 140, 66, 0.0)');
        ctx.beginPath();
        ctx.moveTo(points[0].x, padT + chartH);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, padT + chartH);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Line
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.strokeStyle = '#ff8c42';
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.stroke();
    }

    // Dots
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff8c42';
        ctx.fill();
        ctx.strokeStyle = '#1a1a2e';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    });
}

function drawCalorieChart(dates, data, target) {
    const canvas = document.getElementById('calorie-chart');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = (rect.width - 16) * dpr;
    canvas.height = 150 * dpr;
    canvas.style.height = '150px';
    ctx.scale(dpr, dpr);
    const W = rect.width - 16;
    const H = 150;
    ctx.clearRect(0, 0, W, H);

    const validData = data.filter(v => v !== null);
    if (validData.length < 1) {
        ctx.fillStyle = '#8888a8';
        ctx.font = '13px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('No calorie data yet', W / 2, H / 2);
        return;
    }

    const padL = 45, padR = 10, padT = 15, padB = 30;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    const allVals = [...validData, target];
    const min = Math.min(0, Math.min(...allVals)) - 100;
    const max = Math.max(...allVals) + 200;
    const range = max - min || 1;

    // Y-axis grid
    const ySteps = 4;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#8888a8';
    ctx.font = '10px -apple-system, sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= ySteps; i++) {
        const val = min + (range * i / ySteps);
        const y = padT + chartH - (chartH * i / ySteps);
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(W - padR, y);
        ctx.stroke();
        ctx.fillText(Math.round(val).toLocaleString(), padL - 5, y + 3);
    }

    // Target line
    const targetY = padT + chartH - ((target - min) / range) * chartH;
    ctx.strokeStyle = 'rgba(78, 205, 196, 0.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, targetY);
    ctx.lineTo(W - padR, targetY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#4ecdc4';
    ctx.font = '9px -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Target', padL + 4, targetY - 4);

    // X-axis labels
    ctx.textAlign = 'center';
    ctx.fillStyle = '#5a5a78';
    const labelInterval = Math.ceil(dates.length / 6);
    dates.forEach((date, i) => {
        if (i % labelInterval === 0 || i === dates.length - 1) {
            const x = padL + (i / Math.max(dates.length - 1, 1)) * chartW;
            const d = new Date(date + 'T12:00:00');
            ctx.fillText((d.getMonth() + 1) + '/' + d.getDate(), x, H - 5);
        }
    });

    // Bars
    const barWidth = Math.max(4, Math.min(20, (chartW / dates.length) * 0.6));
    const zeroY = padT + chartH - ((0 - min) / range) * chartH;

    dates.forEach((date, i) => {
        const val = data[i];
        if (val === null) return;
        const x = padL + (i / Math.max(dates.length - 1, 1)) * chartW;
        const valY = padT + chartH - ((val - min) / range) * chartH;

        const isOver = val > target;
        ctx.fillStyle = isOver ? 'rgba(255, 107, 107, 0.7)' : 'rgba(78, 205, 196, 0.7)';
        const barTop = Math.min(valY, zeroY);
        const barH = Math.abs(valY - zeroY);
        ctx.beginPath();
        ctx.roundRect(x - barWidth / 2, barTop, barWidth, Math.max(barH, 2), 2);
        ctx.fill();
    });
}

function renderTrendsSummary(weightData, netCalData, target) {
    const container = document.getElementById('trends-summary');
    const validWeights = weightData.filter(v => v !== null);
    const validCals = netCalData.filter(v => v !== null);

    let weightChangeHTML = '<span class="trend-stat-value">--</span>';
    if (validWeights.length >= 2) {
        const change = validWeights[validWeights.length - 1] - validWeights[0];
        const cls = change < -0.05 ? 'positive' : change > 0.05 ? 'negative' : '';
        const sign = change > 0 ? '+' : '';
        weightChangeHTML = `<span class="trend-stat-value ${cls}">${sign}${change.toFixed(1)}</span>`;
    }

    let avgCalHTML = '<span class="trend-stat-value">--</span>';
    if (validCals.length > 0) {
        const avg = Math.round(validCals.reduce((s, v) => s + v, 0) / validCals.length);
        const cls = avg <= target ? 'positive' : 'negative';
        avgCalHTML = `<span class="trend-stat-value ${cls}">${avg.toLocaleString()}</span>`;
    }

    let daysTracked = `<span class="trend-stat-value">${validCals.length}</span>`;

    container.innerHTML = `
        <div class="trend-stat">
            ${weightChangeHTML}
            <span class="trend-stat-label">Weight Change</span>
        </div>
        <div class="trend-stat">
            ${avgCalHTML}
            <span class="trend-stat-label">Avg Net Cal</span>
        </div>
        <div class="trend-stat">
            ${daysTracked}
            <span class="trend-stat-label">Days Tracked</span>
        </div>
    `;
}

// ============================================================
// Weight Tracker
// ============================================================
function saveWeightLog() {
    const weight = parseFloat(document.getElementById('weight-log-input').value);
    if (!weight || weight < 50 || weight > 999) {
        showToast('Enter a valid weight');
        return;
    }

    const dateStr = Storage.todayStr();
    Storage.saveWeight(dateStr, weight);

    // Update profile current weight
    const profile = getProfileFromForm();
    profile.weightLbs = weight;
    document.getElementById('prof-weight').value = weight;
    Storage.saveProfile(profile);

    recalcProfile();
    updateDashboard();
    loadWeightHistory();
    document.getElementById('weight-log-input').value = '';
    showToast('Weight logged!');
}

function loadWeightHistory() {
    const log = Storage.getWeightLog();
    const container = document.getElementById('weight-history');

    if (log.length === 0) {
        container.innerHTML = '<div class="empty-state" style="padding:16px 0"><p style="font-size:13px">No weight entries yet</p></div>';
        return;
    }

    // Show last 14 entries
    const recent = log.slice(0, 14);

    let html = '<div class="weight-history-title">Recent History</div>';
    recent.forEach((entry, i) => {
        const dateObj = new Date(entry.date + 'T12:00:00');
        const dateLabel = formatWeightDate(dateObj);
        const weight = entry.weight.toFixed(1);

        // Calculate change from next (older) entry
        let changeHtml = '';
        if (i < recent.length - 1) {
            const diff = entry.weight - recent[i + 1].weight;
            if (Math.abs(diff) < 0.05) {
                changeHtml = '<span class="weight-entry-change same">0.0</span>';
            } else if (diff < 0) {
                changeHtml = `<span class="weight-entry-change loss">${diff.toFixed(1)}</span>`;
            } else {
                changeHtml = `<span class="weight-entry-change gain">+${diff.toFixed(1)}</span>`;
            }
        }

        html += `
            <div class="weight-entry">
                <span class="weight-entry-date">${dateLabel}</span>
                <div class="weight-entry-right">
                    ${changeHtml}
                    <span class="weight-entry-value">${weight}</span>
                    <button class="weight-entry-delete" onclick="deleteWeightEntry('${entry.date}')">&times;</button>
                </div>
            </div>`;
    });

    container.innerHTML = html;

    // Pre-fill today's weight if already logged
    const todayWeight = Storage.getWeightForDate(Storage.todayStr());
    if (todayWeight) {
        document.getElementById('weight-log-input').placeholder = todayWeight.toFixed(1);
        document.getElementById('weight-date-label').textContent = 'Today (update)';
    } else {
        document.getElementById('weight-date-label').textContent = 'Today';
    }
}

function deleteWeightEntry(dateStr) {
    Storage.deleteWeight(dateStr);
    loadWeightHistory();
    showToast('Weight entry deleted');
}

function formatWeightDate(date) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

    if (sameDay(date, today)) return 'Today';
    if (sameDay(date, yesterday)) return 'Yesterday';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
