/**
 * Typing Master - Unified Core Engine & Practice Module
 * ---------------------------------------------------
 * Handles the main typing engine, homepage widget, and Practice Mode.
 * Version 1.2 - Consolidated Architecture
 */

const TM_ENGINE = (function () {
    // --- Shared State & Settings ---
    let state = {
        xp: 0,
        streak: 0,
        user: { username: 'Guest', avatar: '🙂', email: '' },
        history: [],
        board: [],
        currentLesson: null
    };

    let settings = {
        sound: localStorage.getItem('tm_sound') !== 'false',
        soundProfile: localStorage.getItem('tm_sound_profile') || 'clicky',
        focus: localStorage.getItem('tm_focus') === 'true',
        layout: localStorage.getItem('tm_layout') || 'qwerty',
        fingers: localStorage.getItem('tm_fingers') !== 'false',
        theme: localStorage.getItem('tm_theme') || 'tactical',
        volume: parseInt(localStorage.getItem('tm_volume')) || 50
    };

    // --- Core Test Metrics ---
    let running = false;
    let paused = false;
    let duration = 60;
    let startTime, endTime, timer;
    let buffer = '', idx = 0;
    let typedChars = 0, correctChars = 0, mistakes = 0, mistakesMap = {};
    let recentTimes = [], wpmSamples = [];
    let smoothedWPM = 0, smoothedCPM = 0;

    // --- Hero Widget State ---
    let heroState = {
        sampleTexts: [
            "The quick brown fox jumps over the lazy dog with remarkable speed and agility.",
            "Practice makes perfect when you dedicate time to improving your typing skills.",
            "Technology evolves rapidly, and staying current requires continuous learning.",
            "Effective communication depends on clarity, precision, and proper timing.",
            "Success comes to those who persist through challenges and never give up.",
            "Innovation requires creativity, courage, and willingness to take risks.",
            "Quality matters more than quantity in almost every aspect of life.",
            "Knowledge shared is knowledge multiplied across communities and generations."
        ],
        currentText: '',
        typedChars: 0,
        errors: 0,
        startTime: null,
        isTyping: false,
        initialized: false
    };

    // --- Helpers ---
    let elements = {
        text: 'text',
        clock: 'clock',
        progress: 'progress',
        wpm: 'hero-wpm', // default
        accuracy: 'hero-accuracy',
        input: 'hero-typing-input'
    };

    let onCompleteCallback = null;

    const el = id => document.getElementById(elements[id] || id);
    const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
    const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    /**
     * Main Initialization
     */
    function init() {
        console.log("[TM_ENGINE] Initializing Core... 🚀");
        try { loadLocalData(); } catch (e) { console.error("Local Data Error:", e); }
        try { applySettings(); } catch (e) { console.error("Settings Error:", e); }

        const safeInit = (name, obj) => {
            if (obj && typeof obj.init === 'function') {
                try {
                    obj.init(name === 'TM_AUTH' ? onUserChange : undefined);
                    console.log(`[TM_ENGINE] ${name} initialized.`);
                } catch (e) {
                    console.error(`[TM_ENGINE] Failed to initialize ${name}:`, e);
                }
            }
        };

        safeInit('TM_AUTH', window.TM_AUTH);
        safeInit('TM_LEARN', window.TM_LEARN);
        safeInit('TM_EXAM', window.TM_EXAM);
        safeInit('TM_COURSE', window.TM_COURSE);

        try { setupTabListeners(); } catch (e) { console.error("Tab Listeners Error:", e); }
        try { setupGameListeners(); } catch (e) { console.error("Game Listeners Error:", e); }

        try { resetAll(); } catch (e) { console.error("Reset Error:", e); }

        // Initial tab
        try { showTab('home'); } catch (e) { console.error("Show Tab Error:", e); }
        try { refreshDashboard(); } catch (e) { console.error("Dashboard Error:", e); }

        // Initialize Hero Widget if we are on the home tab
        setTimeout(() => {
            try { initHeroWidget(); } catch (e) { console.error("Hero Widget Error:", e); }
        }, 100);

        console.log("[TM_ENGINE] Ready. Version 1.2.1");
    }

    function onUserChange(user) {
        if (user) {
            state.user.username = user.displayName || user.email.split('@')[0];
            state.user.email = user.email;
            if (el('user-display-name')) el('user-display-name').textContent = state.user.username;
            el('btn-login')?.classList.add('hidden');
            el('user-info')?.classList.remove('hidden');
            el('guest-info')?.classList.add('hidden');
            syncUserStats();
        } else {
            el('btn-login')?.classList.remove('hidden');
            el('user-info')?.classList.add('hidden');
            el('guest-info')?.classList.remove('hidden');
        }
        updateXPUI();
    }

    function loadLocalData() {
        const saved = localStorage.getItem('tt_state_final');
        if (saved) state = { ...state, ...JSON.parse(saved) };
    }

    function saveLocalData() {
        localStorage.setItem('tt_state_final', JSON.stringify(state));
    }

    function applySettings() {
        document.body.classList.toggle('focus-mode', settings.focus);
        if (el('btn-sound-toggle')) el('btn-sound-toggle').textContent = settings.sound ? '🔊' : '🔇';
        if (el('btn-focus-toggle')) el('btn-focus-toggle').textContent = settings.focus ? '👁️' : '🕶️';

        // Apply Theme
        document.body.className = `theme-${settings.theme} ` + document.body.className.replace(/theme-\w+/g, '').trim();

        // Apply Volume
        const sounds = ['sound-click', 'sound-error', 'sound-success'];
        sounds.forEach(sid => { if (el(sid)) el(sid).volume = settings.volume / 100; });

        // Update settings UI if open
        syncSettingsUI();
    }

    function syncSettingsUI() {
        if (!el('tab-settings')) return;
        if (el('setting-layout')) el('setting-layout').value = settings.layout;
        if (el('setting-sound-profile')) el('setting-sound-profile').value = settings.soundProfile;
        if (el('setting-volume')) el('setting-volume').value = settings.volume;
        if (el('setting-fingers')) el('setting-fingers').checked = settings.fingers;

        // Update Theme Cards
        $$('.theme-card').forEach(card => {
            const isSelected = card.dataset.themeId === settings.theme;
            card.classList.toggle('border-indigo-500', isSelected);
            card.classList.toggle('shadow-lg', isSelected);
            card.classList.toggle('opacity-70', !isSelected);
        });
    }

    // --- UI/Tab Logic ---
    function showTab(name) {
        if (name !== 'test' && running && !paused) pauseTest();
        $$('.tab-panel').forEach(p => p.classList.add('hidden'));
        el(`tab-${name}`)?.classList.remove('hidden');

        // Auto-load practice text if entering test tab and nothing is loaded
        if (name === 'test' && !buffer) {
            const mode = el('mode')?.value || 'words';
            loadCustomText(getPracticeText(mode), mode.charAt(0).toUpperCase() + mode.slice(1) + " Practice");
        }

        // Initialize/Refocus Hero Widget and Load Stats when showing home
        if (name === 'home') {
            setTimeout(() => {
                initHeroWidget();
                refreshDashboard();
            }, 50);
        }

        // Handle Stats Tab
        if (name === 'stats') {
            renderDetailedStats();
        }

        // Handle Settings Tab
        if (name === 'settings') {
            syncSettingsUI();
        }

        // Default to typing subtab when entering practice tab
        if (name === 'test') {
            renderStats(); // Auto-load charts for the new practice layout
        }

        $$('.tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === name);
        });

        // Sync typing meter visibility with tab state
        if (name !== 'test' && name !== 'learn' && name !== 'course') {
            el('typing-meter')?.classList.add('hidden');
        } else if (running && !paused) {
            el('typing-meter')?.classList.remove('hidden');
        }
    }


    function refreshDashboard() {
        if (el('dash-streak')) el('dash-streak').textContent = `${state.streak || 0} Days`;
        if (el('dash-xp')) el('dash-xp').textContent = `${state.xp || 0} XP`;
        if (el('dash-certs')) {
            const certs = state.history.filter(h => h.isCert).length;
            el('dash-certs').textContent = certs;
        }
        const level = Math.floor(Math.sqrt(state.xp / 50)) + 1;
        if (el('dash-rank')) {
            const ranks = ["Novice", "Beginner", "Intermediate", "Advanced", "Elite", "Pro", "Master"];
            el('dash-rank').textContent = ranks[Math.min(level - 1, ranks.length - 1)];
        }
        // Render detailed stats and leaderboard
        renderLeaderboard();
        renderStats();
    }

    async function syncUserStats() {
        const user = window.TM_AUTH?.getUser();
        if (!user || !user.uid) return;

        const level = Math.floor(Math.sqrt(state.xp / 50)) + 1;
        const ranks = ["Novice", "Beginner", "Intermediate", "Advanced", "Elite", "Pro", "Master"];
        const rankName = ranks[Math.min(level - 1, ranks.length - 1)];

        const syncData = {
            username: state.user.username || user.displayName || "Anonymous",
            xp: state.xp || 0,
            rank: rankName,
            avatar: state.user.avatar || '😊',
            lastUpdated: new Date().toISOString()
        };

        console.log("[TM_ENGINE] Syncing to Firestore...", syncData);
        await window.TM_DB?.updateUserProfile(user.uid, syncData);
    }

    function setupTabListeners() {
        $$('.tab-btn').forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));
        el('btn-login')?.addEventListener('click', () => TM_AUTH.login());
        el('btn-logout')?.addEventListener('click', () => TM_AUTH.logout());


        el('btn-seed-data')?.addEventListener('click', async () => {
            const btn = el('btn-seed-data');
            if (!btn) return;
            btn.disabled = true;
            btn.textContent = "Seeding... ⏳";
            const success = await window.TM_DB?.seedLeaderboard();
            if (success) {
                btn.textContent = "Seeded! ✨";
                setTimeout(() => { btn.textContent = "Seed Demo Data 🧪"; btn.disabled = false; }, 2000);
                renderLeaderboard();
            } else {
                btn.textContent = "Failed ❌";
                setTimeout(() => { btn.textContent = "Seed Demo Data 🧪"; btn.disabled = false; }, 2000);
            }
        });

        el('change-user')?.addEventListener('click', () => {
            el('modal-username').value = state.user.username === 'Guest' ? '' : state.user.username;
            el('user-modal').classList.add('show');
        });

        el('modal-save')?.addEventListener('click', () => {
            const name = el('modal-username').value.trim();
            if (name) {
                state.user.username = name;
                saveLocalData();
                onUserChange({ displayName: name });
                refreshDashboard();
            }
            el('user-modal').classList.remove('show');
        });

        el('report-close')?.addEventListener('click', () => el('report-modal').classList.remove('show'));
        el('report-ok')?.addEventListener('click', () => el('report-modal').classList.remove('show'));

        el('btn-restart')?.addEventListener('click', restartPractice);

        el('mode')?.addEventListener('change', () => {
            resetAll();
            const mode = el('mode').value;
            loadCustomText(getPracticeText(mode), mode.charAt(0).toUpperCase() + mode.slice(1) + " Practice");
        });

        el('duration')?.addEventListener('change', () => resetAll());

        el('btn-sound-toggle')?.addEventListener('click', () => {
            settings.sound = !settings.sound;
            localStorage.setItem('tm_sound', settings.sound);
            applySettings();
            if (settings.sound) {
                const s = el('sound-click');
                if (s) { s.volume = 0; s.play().then(() => { s.pause(); s.volume = 1; s.currentTime = 0; }).catch(() => { }); }
            }
        });

        el('btn-focus-toggle')?.addEventListener('click', () => {
            settings.focus = !settings.focus;
            localStorage.setItem('tm_focus', settings.focus);
            applySettings();
        });

        // --- Settings Tab Listeners ---
        $$('.theme-card').forEach(card => {
            card.addEventListener('click', () => {
                settings.theme = card.dataset.themeId;
                applySettings(); // Live preview
            });
        });

        el('btn-save-settings')?.addEventListener('click', () => {
            settings.layout = el('setting-layout').value;
            settings.soundProfile = el('setting-sound-profile').value;
            settings.volume = parseInt(el('setting-volume').value);
            settings.fingers = el('setting-fingers').checked;

            // Persist
            localStorage.setItem('tm_theme', settings.theme);
            localStorage.setItem('tm_layout', settings.layout);
            localStorage.setItem('tm_sound_profile', settings.soundProfile);
            localStorage.setItem('tm_volume', settings.volume);
            localStorage.setItem('tm_fingers', settings.fingers);

            applySettings();
            alert("Settings saved successfully! ✨");
        });

        el('btn-reset-settings')?.addEventListener('click', () => {
            if (confirm("Reset all settings to default?")) {
                settings = {
                    sound: true,
                    soundProfile: 'clicky',
                    focus: false,
                    layout: 'qwerty',
                    fingers: true,
                    theme: 'tactical',
                    volume: 50
                };
                applySettings();
            }
        });

    }

    // --- Core Engine logic ---
    function resetAll() {
        clearContent();
        resetMetrics();
        const durEl = el('duration');
        duration = parseInt(durEl?.value) || 60;
        const timeStr = fmt(duration);
        el('clock').textContent = timeStr;
        if (el('fs-time-arena')) el('fs-time-arena').textContent = timeStr;
        el('progress').style.width = '0%';
        running = false; paused = false;
        el('btn-pause').disabled = true;
        el('btn-stop').disabled = true;

        // Unlock settings
        if (el('mode')) el('mode').disabled = false;
        if (el('duration')) el('duration').disabled = false;
        if (el('lock-note')) {
            el('lock-note').classList.add('hidden');
            el('lock-note').classList.remove('settings-locked-active');
        }
    }

    function restartPractice() {
        resetAll();
        if (!state.currentLesson) {
            const mode = el('mode')?.value || 'words';
            loadCustomText(getPracticeText(mode), mode.charAt(0).toUpperCase() + mode.slice(1) + " Practice");
        }
    }

    function clearContent() {
        el('text').innerHTML = '';
        buffer = ''; idx = 0;
        ensureCaret();
        const tutor = document.getElementById('keyboard-tutor');
        if (tutor && !state.currentLesson) tutor.classList.add('hidden');
    }

    function loadCustomText(text, title = "Custom Practice", config = null) {
        if (config) {
            elements = { ...elements, ...config.elements };
            onCompleteCallback = config.onComplete || null;
            duration = config.duration || duration;
        } else {
            // Reset to defaults if no config
            elements = {
                text: 'text',
                clock: 'clock',
                progress: 'progress',
                wpm: 'hero-wpm',
                accuracy: 'hero-accuracy',
                input: 'hero-typing-input'
            };
            onCompleteCallback = null;
        }

        resetAll();
        const textArea = el('text');
        if (textArea) textArea.innerHTML = '';
        buffer = ''; idx = 0;
        appendBuffer(text);
        ensureCaret();
        const header = $$('.test-header h2')[0];
        if (header) header.textContent = `📖 ${title}`;

        if (title.includes(': Lesson')) {
            const parts = title.split(': Lesson ');
            state.currentLesson = { course: parts[0].replace('📖 ', ''), id: parseInt(parts[1]) };
        } else {
            state.currentLesson = null;
        }
    }

    function resetMetrics() {
        typedChars = 0; correctChars = 0; mistakes = 0; mistakesMap = {};
        smoothedWPM = 0; smoothedCPM = 0; recentTimes = []; wpmSamples = [];
        if (el('fs-wpm-arena')) el('fs-wpm-arena').textContent = '0';
        if (el('fs-acc-arena')) el('fs-acc-arena').textContent = '100%';
        if (el('fs-cpm-arena')) el('fs-cpm-arena').textContent = '0';
        if (el('fs-time-arena')) el('fs-time-arena').textContent = fmt(duration || 60);
        updateHUD();
    }

    function appendBuffer(str) {
        const frag = document.createDocumentFragment();
        str.split('').forEach((c, i) => {
            const span = document.createElement('span');
            span.className = 'ch' + (c === ' ' ? ' space' : '');
            span.textContent = c;
            span.dataset.i = buffer.length + i;
            span.dataset.char = c;
            frag.appendChild(span);
        });
        el('text').appendChild(frag);
        buffer += str;
    }

    function ensureCaret() {
        $$('.ch.caret').forEach(c => c.classList.remove('caret'));
        const cur = el('text').querySelector(`.ch[data-i="${idx}"]`);
        if (!cur) return;
        cur.classList.add('caret');
        const smooth = el('smooth-caret'), arena = el('arena');
        if (smooth && arena) {
            const aRect = arena.getBoundingClientRect(), cRect = cur.getBoundingClientRect();
            smooth.style.top = (cRect.top - aRect.top + arena.scrollTop) + 'px';
            smooth.style.left = (cRect.left - aRect.left + arena.scrollLeft) + 'px';
            smooth.style.height = cRect.height + 'px';
        }
        cur.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    function startTest() {
        if (running) return;
        running = true; startTime = Date.now();
        endTime = startTime + duration * 1000;
        wpmSamples = []; // Reset samples
        document.body.classList.add('test-running');
        el('btn-pause').disabled = false;
        el('btn-stop').disabled = false;

        // Lock settings
        if (el('mode')) el('mode').disabled = true;
        if (el('duration')) el('duration').disabled = true;
        if (el('lock-note')) {
            el('lock-note').classList.remove('hidden');
            el('lock-note').classList.add('settings-locked-active');
        }

        if (state.currentLesson && window.TM_LEARN) {
            const cur = el('text').querySelector(`.ch[data-i="0"]`);
            if (cur) TM_LEARN.highlightKey(cur.dataset.char);
        }

        let lastSampleTime = startTime;
        timer = setInterval(() => {
            if (paused) return;
            const now = Date.now(), left = Math.max(0, endTime - now);
            const timeStr = fmt(Math.ceil(left / 1000));
            el('clock').textContent = timeStr;
            if (el('fs-time-arena')) el('fs-time-arena').textContent = timeStr;
            const prog = ((duration * 1000 - left) / (duration * 1000)) * 100;
            el('progress').style.width = prog + '%';

            // Collect WPM Sample every second
            if (now - lastSampleTime >= 1000) {
                const elapsedSec = (now - startTime) / 1000;
                const currentWPM = Math.round((correctChars / 5) / (elapsedSec / 60));
                wpmSamples.push(currentWPM);
                lastSampleTime = now;
            }

            if (left <= 0) finish();
        }, 100);
    }

    function pauseTest() {
        if (!running) return;
        paused = !paused;
        el('btn-pause').textContent = paused ? '▶ Resume' : '⏸ Pause';
        updateMeter();
    }

    function finish() {
        if (!running) return;
        running = false; clearInterval(timer);
        document.body.classList.remove('test-running');
        el('typing-meter')?.classList.add('hidden');

        // Unlock settings
        if (el('mode')) el('mode').disabled = false;
        if (el('duration')) el('duration').disabled = false;
        if (el('lock-note')) {
            el('lock-note').classList.add('hidden');
            el('lock-note').classList.remove('settings-locked-active');
        }

        const netWPM = Math.round(Math.max(0, (correctChars / 5) / (duration / 60)));
        const grossWPM = Math.round((typedChars / 5) / (duration / 60));
        const accuracy = typedChars ? Math.round((correctChars / typedChars) * 100) : 0;

        // Trigger Callback if exists
        if (onCompleteCallback) {
            onCompleteCallback({
                wpm: netWPM,
                accuracy: accuracy,
                mistakes: mistakes,
                time: duration,
                mistakesDict: mistakesMap
            });
            return; // Skip default report if callback handles it
        }

        // Calculate Consistency (Coefficient of Variation)
        const samples = wpmSamples.length > 0 ? wpmSamples : [netWPM];
        const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
        const squareDiffs = samples.map(v => Math.pow(v - avg, 2));
        const variance = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
        const stdDev = Math.sqrt(variance);
        const consistency = avg > 0 ? Math.max(0, Math.min(100, Math.round(100 - (stdDev / avg) * 100))) : 100;

        const testTitle = el('test-title')?.textContent || "Typing Test";

        showCourseReport({
            title: testTitle,
            grossWPM,
            netWPM,
            accuracy,
            consistency,
            time: fmt(duration),
            mistakes: mistakesMap,
            samples: samples
        });

        state.xp += Math.round(correctChars / 10);
        state.history.push({ date: new Date().toISOString(), wpm: netWPM, accuracy: accuracy, isCert: testTitle.includes('Official') });
        saveLocalData();
        refreshDashboard();
        syncUserStats();
    }

    let reportChart = null;
    function showCourseReport(data) {
        el('report-lesson-name').textContent = data.title;
        el('report-gross-wpm').textContent = data.grossWPM;
        el('report-net-wpm').textContent = data.netWPM;
        el('report-accuracy').textContent = data.accuracy;
        el('report-consistency').textContent = data.consistency;

        // Recommendation Logic
        let rec = "You're doing great! Keep up the consistent practice to build muscle memory.";
        if (data.accuracy < 90) rec = "Focus on accuracy over speed. Try slowing down to hit the correct keys every time.";
        else if (data.consistency < 70) rec = "Your speed is fluctuating. Try to maintain a steady rhythm for better flow.";
        else if (data.netWPM > 50 && data.accuracy >= 95) rec = "Excellent work! Challenge yourself with Paragraphs or Code mode to push further.";
        el('report-recommendation').textContent = rec;

        const problems = Object.entries(data.mistakes).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([key]) => `<span class="problem-key">${key}</span>`).join('');
        el('report-problem-keys').innerHTML = problems || "Perfect execution!";

        // Sparkline Render
        if (reportChart) reportChart.destroy();
        const ctx = el('reportSparkline')?.getContext('2d');
        if (ctx) {
            reportChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.samples.map((_, i) => i + 1),
                    datasets: [{
                        label: 'WPM',
                        data: data.samples,
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: {
                            beginAtZero: true,
                            ticks: { display: false },
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        el('report-modal').classList.remove('hidden');
        if (state.currentLesson && window.TM_LEARN && data.accuracy >= 90) TM_LEARN.unlockNext(state.currentLesson.id);
    }

    function setupGameListeners() {
        window.addEventListener('keydown', (e) => {
            // Allow input from our special hidden course input
            const isCourseInput = e.target.id === 'course-typing-input';
            if ((e.target.tagName === 'INPUT' && !isCourseInput) || e.target.tagName === 'TEXTAREA') return;
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            if (el('report-modal')?.classList.contains('show')) return;

            // Handle Escape key for quick restart
            if (e.key === 'Escape') {
                restartPractice();
                return;
            }

            // Play mechanical sound for character keys and prevent default
            if (e.key.length === 1 || e.key === ' ') {
                if (window.TM_SOUND) TM_SOUND.playKeySound();
                e.preventDefault();
            } else if (e.key === 'Backspace') { // Prevent default for backspace
                e.preventDefault();
            }

            if (!running && idx === 0 && e.key.length === 1) startTest();
            if (!running || paused) return;
            const cur = el('text').querySelector(`.ch[data-i="${idx}"]`);
            if (!cur) return;
            if (e.key === 'Backspace') {
                if (idx > 0) {
                    idx--;
                    const prev = el('text').querySelector(`.ch[data-i="${idx}"]`);
                    prev.classList.remove('wrong', 'correct-flash');
                    if (prev.dataset.wasCorrect === '1') correctChars--; else mistakes--;
                    typedChars--;
                    ensureCaret();
                }
                return;
            }
            const expected = cur.dataset.char;
            typedChars++;

            // Play mechanical sound
            if (window.TM_SOUND) TM_SOUND.playKeySound();

            if (e.key === expected) {
                correctChars++;
                cur.classList.add('correct-flash');
                cur.dataset.wasCorrect = '1';
                recentTimes.push(Date.now());
                spawnParticle(cur, 'correct'); // Visual Flair
            } else {
                mistakes++;
                const key = expected === ' ' ? 'Space' : expected;
                mistakesMap[key] = (mistakesMap[key] || 0) + 1;
                cur.classList.add('wrong');
                cur.dataset.wasCorrect = '0';
                spawnParticle(cur, 'wrong'); // Visual Flair
            }
            idx++;
            ensureCaret();
            updateHUD();
            if (state.currentLesson && window.TM_LEARN) {
                const next = el('text').querySelector(`.ch[data-i="${idx}"]`);
                if (next) TM_LEARN.highlightKey(next.dataset.char);
            }
        });

        el('btn-pause')?.addEventListener('click', pauseTest);
        el('btn-stop')?.addEventListener('click', finish);

        // Enhanced Modal Actions
        const closeReport = () => el('report-modal')?.classList.add('hidden');
        el('report-ok')?.addEventListener('click', closeReport);
        el('report-close')?.addEventListener('click', closeReport);
        el('report-retry')?.addEventListener('click', () => {
            closeReport();
            restartPractice();
        });
    }

    function updateHUD() {
        const now = Date.now();
        recentTimes = recentTimes.filter(t => now - t < 2000);
        const rawWpm = (recentTimes.length / 2) * 12;
        smoothedWPM = smoothedWPM * 0.8 + rawWpm * 0.2;
        smoothedCPM = Math.round(smoothedWPM * 5);
        // Arena Metrics Bar (External Card)
        if (el('wpm')) el('wpm').textContent = Math.round(smoothedWPM);
        if (el('accuracy')) el('accuracy').textContent = typedChars ? Math.round((correctChars / typedChars) * 100) : '100';
        if (el('errors')) el('errors').textContent = mistakes;

        if (el('fs-wpm-arena')) el('fs-wpm-arena').textContent = Math.round(smoothedWPM);
        if (el('fs-acc-arena')) el('fs-acc-arena').textContent = typedChars ? Math.round((correctChars / typedChars) * 100) + '%' : '100%';
        if (el('fs-cpm-arena')) el('fs-cpm-arena').textContent = smoothedCPM;

        updateMeter();
    }

    function updateMeter() {
        const activeTab = $$('.tab-panel:not(.hidden)')[0]?.id?.replace('tab-', '');
        const isTypingTab = activeTab === 'test' || activeTab === 'learn';

        if (!running || !isTypingTab || paused) {
            el('typing-meter')?.classList.add('hidden');
            return;
        }
        el('typing-meter')?.classList.remove('hidden');
        if (el('meter-wpm')) el('meter-wpm').textContent = Math.round(smoothedWPM);
        const needle = el('meter-needle');
        if (needle) {
            const angle = Math.min(90, (smoothedWPM / 100) * 180 - 90);
            needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;
        }
    }

    function updateXPUI() {
        const level = Math.floor(Math.sqrt(state.xp / 50)) + 1;
        const currentLevelXP = 50 * Math.pow(level - 1, 2), nextLevelXP = 50 * Math.pow(level, 2);
        const progress = ((state.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
        if (el('user-level')) el('user-level').textContent = level;
        if (el('xp-text')) el('xp-text').textContent = `${state.xp} XP`;
        if (el('xp-progress')) el('xp-progress').style.width = `${Math.max(5, progress)}%`;
    }

    // --- Hero Widget Functions ---
    function initHeroWidget() {
        const input = el('hero-typing-input');
        if (!input) return;
        if (heroState.initialized) return;

        input.addEventListener('input', (e) => handleHeroInput(e));
        input.addEventListener('focus', () => { if (!heroState.isTyping) displayHeroText(); });
        el('hero-refresh-text')?.addEventListener('click', () => loadNewHeroText());

        loadNewHeroText();
        heroState.initialized = true;
    }

    function loadNewHeroText() {
        const randomIndex = Math.floor(Math.random() * heroState.sampleTexts.length);
        heroState.currentText = heroState.sampleTexts[randomIndex];
        displayHeroText();
        resetHeroStats();
        el('hero-typing-input')?.focus();
    }

    function displayHeroText() {
        const display = el('hero-text-display');
        if (!display) return;
        display.innerHTML = heroState.currentText.split('').map((char, idx) => `<span id="hero-char-${idx}" class="hero-char">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
    }

    function handleHeroInput(e) {
        const typed = e.target.value;
        if (!heroState.startTime && typed.length === 1) { heroState.startTime = Date.now(); heroState.isTyping = true; }

        for (let i = 0; i < heroState.currentText.length; i++) {
            const charEl = el(`hero-char-${i}`);
            if (!charEl) continue;
            if (i < typed.length) {
                charEl.className = 'hero-char ' + (typed[i] === heroState.currentText[i] ? 'hero-char-correct' : 'hero-char-wrong');
            } else if (i === typed.length) {
                charEl.className = 'hero-char hero-char-current';
            } else {
                charEl.className = 'hero-char';
            }
        }

        heroState.typedChars = typed.length;
        heroState.errors = 0;
        for (let i = 0; i < typed.length; i++) { if (typed[i] !== heroState.currentText[i]) heroState.errors++; }

        const timeElapsed = heroState.startTime ? (Date.now() - heroState.startTime) / 1000 / 60 : 0;
        const wpm = timeElapsed > 0 ? Math.round((heroState.typedChars / 5) / timeElapsed) : 0;
        const accuracy = heroState.typedChars > 0 ? Math.round(((heroState.typedChars - heroState.errors) / heroState.typedChars) * 100) : 100;
        const progress = Math.round((heroState.typedChars / heroState.currentText.length) * 100);

        if (el('hero-wpm')) el('hero-wpm').textContent = wpm;
        if (el('hero-accuracy')) {
            el('hero-accuracy').textContent = accuracy + '%';
            el('hero-accuracy').className = 'text-3xl font-black ' + (accuracy >= 95 ? 'text-green-600' : accuracy >= 85 ? 'text-yellow-600' : 'text-red-600');
        }
        if (el('hero-progress')) el('hero-progress').textContent = progress + '%';

        if (typed.length >= heroState.currentText.length) {
            heroState.isTyping = false;
            setTimeout(() => { if (el('hero-typing-input')) el('hero-typing-input').value = ''; loadNewHeroText(); }, 1500);
        }
    }

    function resetHeroStats() {
        heroState.typedChars = 0; heroState.errors = 0; heroState.startTime = null; heroState.isTyping = false;
        if (el('hero-wpm')) el('hero-wpm').textContent = '0';
        if (el('hero-accuracy')) el('hero-accuracy').textContent = '100%';
        if (el('hero-progress')) el('hero-progress').textContent = '0%';
        if (el('hero-typing-input')) el('hero-typing-input').value = '';
    }

    // --- Stats & Leaderboard Renderers ---
    async function renderLeaderboard() {
        const boardEl = el('board');
        if (!boardEl) return;
        boardEl.innerHTML = '<div class="text-center py-8 text-gray-400">Loading rankings...</div>';
        const data = await window.TM_DB?.getLeaderboard();
        if (!data || data.length === 0) {
            boardEl.innerHTML = '<div class="text-center py-8 text-gray-500">Rankings Unavailable</div>';
            return;
        }
        boardEl.innerHTML = data.map((u, i) => `
            <div class="flex items-center gap-4 bg-white/80 p-4 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-indigo-600">#${i + 1}</div>
                <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">${u.avatar || '🙂'}</div>
                <div class="flex-1">
                    <div class="font-bold text-gray-800">${u.username || 'Anonymous'}</div>
                    <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${u.rank || 'Beginner'}</div>
                </div>
                <div class="text-right">
                    <div class="text-lg font-black text-indigo-600">${u.xp || 0}</div>
                    <div class="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Total XP</div>
                </div>
            </div>
        `).join('');
    }

    function renderStats() {
        if (!state.history || state.history.length === 0) return;
        const history = state.history.slice(-10);

        if (typeof Chart === 'undefined') {
            console.error("Chart.js not loaded");
            return;
        }

        const statsCtx = el('statsChart')?.getContext('2d');
        if (statsCtx) {
            if (window.myStatsChart) window.myStatsChart.destroy();
            window.myStatsChart = new Chart(statsCtx, {
                type: 'line',
                data: {
                    labels: history.map((_, i) => `S-${i + 1}`),
                    datasets: [{ label: 'WPM', data: history.map(h => h.wpm), borderColor: '#6366f1', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderWidth: 3, tension: 0.4, fill: true }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true }, x: { display: false } } }
            });
        }

        const wpmCtx = el('detailedWpmChart')?.getContext('2d');
        if (wpmCtx) {
            if (window.myWpmChart) window.myWpmChart.destroy();
            window.myWpmChart = new Chart(wpmCtx, {
                type: 'bar',
                data: {
                    labels: history.map((_, i) => `T-${i + 1}`),
                    datasets: [{ label: 'Accuracy %', data: history.map(h => h.accuracy), backgroundColor: '#10b981', borderRadius: 8 }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { max: 100, beginAtZero: true }, x: { display: false } } }
            });
        }
    }

    function renderDetailedStats() {
        if (!state.history || state.history.length === 0) {
            console.log("[TM_ENGINE] No history for detailed stats");
            return;
        }

        // Aggregate Metrics
        const totalWpm = state.history.reduce((a, b) => a + b.wpm, 0);
        const avgWpm = Math.round(totalWpm / state.history.length);
        const peakWpm = Math.max(...state.history.map(h => h.wpm));
        const totalAcc = state.history.reduce((a, b) => a + b.accuracy, 0);
        const avgAcc = Math.round(totalAcc / state.history.length);
        const totalTime = Math.round((state.history.length * 60) / 3600 * 10) / 10; // Approx based on sessions

        if (el('stats-avg-wpm')) el('stats-avg-wpm').textContent = avgWpm;
        if (el('stats-peak-wpm')) el('stats-peak-wpm').textContent = peakWpm;
        if (el('stats-avg-acc')) el('stats-avg-acc').textContent = avgAcc;
        if (el('stats-total-time')) el('stats-total-time').textContent = totalTime;

        // Long term charts
        const ctxWpm = el('longTermWpmChart')?.getContext('2d');
        if (ctxWpm) {
            if (window.longWpmChart) window.longWpmChart.destroy();
            window.longWpmChart = new Chart(ctxWpm, {
                type: 'line',
                data: {
                    labels: state.history.map((_, i) => i + 1),
                    datasets: [{
                        label: 'WPM',
                        data: state.history.map(h => h.wpm),
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.05)',
                        fill: true,
                        tension: 0.3,
                        pointRadius: 2
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
            });
        }

        const ctxAcc = el('longTermAccChart')?.getContext('2d');
        if (ctxAcc) {
            if (window.longAccChart) window.longAccChart.destroy();
            window.longAccChart = new Chart(ctxAcc, {
                type: 'line',
                data: {
                    labels: state.history.map((_, i) => i + 1),
                    datasets: [{
                        label: 'Accuracy %',
                        data: state.history.map(h => h.accuracy),
                        borderColor: '#10b981',
                        fill: false,
                        tension: 0.3,
                        pointRadius: 2
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 50, max: 100 } } }
            });
        }
    }

    function getPracticeText(mode) {
        const words = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"];

        if (mode === 'words') return words.sort(() => Math.random() - 0.5).slice(0, 40).join(' ');

        if (mode === 'quotes') {
            const quotes = [
                "The only way to do great work is to love what you do. - Steve Jobs",
                "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
                "Life is what happens when you're busy making other plans. - John Lennon",
                "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln",
                "Believe you can and you're halfway there. - Theodore Roosevelt",
                "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
                "It does not matter how slowly you go as long as you do not stop. - Confucius"
            ];
            return quotes[Math.floor(Math.random() * quotes.length)];
        }

        if (mode === 'sentences') return "The quick brown fox jumps over the lazy dog. Success is not final, failure is not fatal: it is the courage to continue that counts.";

        if (mode === 'paragraphs') return "Typed text is often compared to a mechanical process, but it is an art of coordination. Every keystroke is a deliberate signal from the brain to the fingers, requiring both speed and precision. As you practice, your muscle memory begins to take over, allowing you to focus on the content of your thoughts rather than the location of the keys.";

        if (mode === 'code') {
            const snippets = [
                "const TM_ENGINE = (function() { return { init: function() { console.log('Ready'); } }; })();",
                "function calculateWPM(chars, time) { return Math.round((chars / 5) / (time / 60)); }",
                "document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === name));",
                "export const TM_AUTH = { init: (callback) => { firebase.auth().onAuthStateChanged(callback); } };",
                "<div class='glass p-8 rounded-3xl border border-white/40 shadow-sm relative overflow-hidden'></div>",
                "input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 10px rgba(99, 102, 241, 0.2); }"
            ];
            return snippets[Math.floor(Math.random() * snippets.length)];
        }

        if (mode === 'weak') {
            const weakChars = Object.entries(mistakesMap)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(e => e[0]);

            if (weakChars.length === 0) return "No weak keys detected yet. Keep practicing to build your performance profile!";

            let weakText = "";
            for (let i = 0; i < 40; i++) {
                const char = weakChars[Math.floor(Math.random() * weakChars.length)];
                weakText += char + (Math.random() > 0.8 ? " " : "");
            }
            return weakText.trim();
        }

        return words.slice(0, 20).join(' ');
    }

    // --- Particle Effects ---
    function spawnParticle(targetEl, type) {
        const container = document.getElementById('particles-container');
        if (!container || !targetEl) return;

        const rect = targetEl.getBoundingClientRect();
        const p = document.createElement('div');
        p.className = `particle ${type}`;
        p.textContent = targetEl.textContent;
        p.style.left = (rect.left + rect.width / 2) + 'px'; // Absolute to viewport? No, container is absolute to arena

        // Wait, particles-container is inside #arena which has overflow-y: auto.
        // If #arena scrolls, we need position relative to it.
        // BUT particle animation might want to be independent of scroll?
        // Let's position relative to container.

        const containerRect = container.getBoundingClientRect();
        p.style.left = (rect.left - containerRect.left) + 'px';
        p.style.top = (rect.top - containerRect.top) + 'px';

        container.appendChild(p);
        setTimeout(() => p.remove(), 400);
    }

    // --- Public API ---
    return {
        init,
        isRunning: () => running,
        isPaused: () => paused,
        startTest,
        pauseTest,
        finish,
        showTab,
        refreshDashboard,
        loadCustomText,
        getState: () => state,
        renderLeaderboard,
        renderStats,
        showCourseReport,
        // Hero Widget Exports
        initHeroWidget,
        loadNewHeroText
    };
})();

// Settings Dropdown Logic
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('settings-toggle');
    const modal = document.getElementById('settings-modal');
    if (toggle && modal) {
        toggle.onclick = (e) => { e.stopPropagation(); modal.classList.toggle('hidden'); };
        document.onclick = (e) => { if (e.target !== modal && !modal.contains(e.target)) modal.classList.add('hidden'); };
    }
});

// Final Exposure
window.TM_ENGINE = TM_ENGINE;
window.HeroPractice = TM_ENGINE; // Alias for compatibility

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        TM_ENGINE.init();
    }, 100);
});
