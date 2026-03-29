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

    // Set goal date default
    const profile = Storage.getProfile();
    document.getElementById('prof-goal-date').value = profile.goalDate;

    // Load profile into form
    loadProfileForm(profile);

    // Update all views
    updateDashboard();
    loadLogEntries();
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
    if (tab === 'profile') recalcProfile();
}

// ============================================================
// Dashboard
// ============================================================
function updateDashboard() {
    const profile = Storage.getProfile();
    const calc = CalorieCalculator.computeAll(profile);
    const entries = Storage.getTodaysEntries();

    const totalCal = entries.reduce((s, e) => s + (e.calories || 0), 0);
    const totalProtein = entries.reduce((s, e) => s + (e.protein || 0), 0);
    const totalCarbs = entries.reduce((s, e) => s + (e.carbs || 0), 0);
    const totalFat = entries.reduce((s, e) => s + (e.fat || 0), 0);
    const remaining = calc.dailyTarget - totalCal;

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

function analyzeFood() {
    document.getElementById('scan-analyze').style.display = 'none';

    // Show loading
    const resultsDiv = document.getElementById('scan-results');
    resultsDiv.style.display = 'block';
    resultsDiv.querySelector('h3').textContent = '';
    document.getElementById('scan-results-list').innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <span>Analyzing food...</span>
        </div>`;

    // Simulate analysis delay
    setTimeout(() => {
        const results = FoodDatabase.classifyFood();
        resultsDiv.querySelector('h3').textContent = 'What did we find?';

        document.getElementById('scan-results-list').innerHTML = results.map(r => `
            <div class="result-item" onclick="selectScanResult('${escapeHtml(r.name)}', ${r.cal}, ${r.protein}, ${r.carbs}, ${r.fat}, '${escapeHtml(r.serving)}')">
                <div class="result-info">
                    <div class="result-name">${escapeHtml(r.name)}</div>
                    <div class="result-meta">${r.cal} cal · ${r.serving}</div>
                </div>
                <span class="result-confidence">${Math.round(r.confidence * 100)}%</span>
                <span class="result-arrow">›</span>
            </div>
        `).join('');
    }, 1200);
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
