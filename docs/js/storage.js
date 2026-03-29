const Storage = {
    PROFILE_KEY: 'ct_profile',
    ENTRIES_KEY: 'ct_entries',
    EXERCISES_KEY: 'ct_exercises',
    STEPS_KEY: 'ct_steps',

    getDefaultProfile() {
        const goalDate = new Date();
        goalDate.setMonth(goalDate.getMonth() + 6);
        return {
            weightLbs: 215,
            heightInches: 70,
            age: 36,
            sex: 'male',
            activityMultiplier: 1.375,
            goalWeightLbs: 180,
            goalDate: goalDate.toISOString().split('T')[0],
            startWeightLbs: 215,
            createdAt: new Date().toISOString()
        };
    },

    getProfile() {
        const data = localStorage.getItem(this.PROFILE_KEY);
        if (data) {
            const profile = JSON.parse(data);
            // Ensure startWeightLbs exists for older profiles
            if (!profile.startWeightLbs) profile.startWeightLbs = 215;
            return profile;
        }
        const defaultProfile = this.getDefaultProfile();
        this.saveProfile(defaultProfile);
        return defaultProfile;
    },

    saveProfile(profile) {
        localStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile));
    },

    getAllEntries() {
        const data = localStorage.getItem(this.ENTRIES_KEY);
        return data ? JSON.parse(data) : [];
    },

    getEntriesForDate(dateStr) {
        const entries = this.getAllEntries();
        return entries
            .filter(e => e.date === dateStr)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    },

    getTodaysEntries() {
        return this.getEntriesForDate(this.todayStr());
    },

    addEntry(entry) {
        const entries = this.getAllEntries();
        entry.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        entry.date = entry.date || this.todayStr();
        entry.timestamp = new Date().toISOString();
        entries.push(entry);
        localStorage.setItem(this.ENTRIES_KEY, JSON.stringify(entries));
        return entry;
    },

    deleteEntry(id) {
        let entries = this.getAllEntries();
        entries = entries.filter(e => e.id !== id);
        localStorage.setItem(this.ENTRIES_KEY, JSON.stringify(entries));
    },

    // Exercise methods
    getAllExercises() {
        const data = localStorage.getItem(this.EXERCISES_KEY);
        return data ? JSON.parse(data) : [];
    },

    getExercisesForDate(dateStr) {
        return this.getAllExercises()
            .filter(e => e.date === dateStr)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    },

    getTodaysExercises() {
        return this.getExercisesForDate(this.todayStr());
    },

    addExercise(exercise) {
        const exercises = this.getAllExercises();
        exercise.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        exercise.date = exercise.date || this.todayStr();
        exercise.timestamp = new Date().toISOString();
        exercises.push(exercise);
        localStorage.setItem(this.EXERCISES_KEY, JSON.stringify(exercises));
        return exercise;
    },

    deleteExercise(id) {
        let exercises = this.getAllExercises();
        exercises = exercises.filter(e => e.id !== id);
        localStorage.setItem(this.EXERCISES_KEY, JSON.stringify(exercises));
    },

    // Steps methods
    getAllSteps() {
        const data = localStorage.getItem(this.STEPS_KEY);
        return data ? JSON.parse(data) : {};
    },

    getStepsForDate(dateStr) {
        const steps = this.getAllSteps();
        return steps[dateStr] || 0;
    },

    getTodaysSteps() {
        return this.getStepsForDate(this.todayStr());
    },

    saveStepsForDate(dateStr, count) {
        const steps = this.getAllSteps();
        steps[dateStr] = count;
        localStorage.setItem(this.STEPS_KEY, JSON.stringify(steps));
    },

    todayStr() {
        const d = new Date();
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    },

    formatTime(isoStr) {
        const d = new Date(isoStr);
        return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }
};
