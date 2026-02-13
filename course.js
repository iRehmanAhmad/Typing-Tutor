/**
 * Typing Master - Course Module
 * ---------------------------------------
 * Handles course data, progress tracking, and lesson management
 * Integrates with Firestore for cloud sync
 */

const TM_COURSE = (function () {
    // Course state
    let currentCourse = null;
    let userName = null;
    let progress = {
        selectedCourse: null,
        currentLesson: 1,
        currentSubLesson: '1.1',
        completedSubLessons: [],
        totalStars: 0,
        currentStreak: 0,
        lastCompletionDate: null,
        dailyGoal: { target: 3, completed: 0, date: null },
        unlockedAchievements: [],
        weakKeys: {}
    };

    /**
     * Initialize Course Module
     */
    function init() {
        console.log('[TM_COURSE] Initializing...');

        if (!window.COURSES) {
            console.error('[TM_COURSE] Critical Error: Course data not loaded.');
            document.getElementById('course-container').innerHTML = `
                <div class="text-center py-20 text-red-500">
                    <h3>⚠️ Failed to load course data</h3>
                    <p>Please refresh the page. If the issue persists, contact support.</p>
                </div>
            `;
            return;
        }

        loadProgress();
        checkWelcomeScreen();
    }

    /**
     * Load progress from LocalStorage
     */
    function loadProgress() {
        try {
            const saved = localStorage.getItem('tm_course_progress');
            if (saved) {
                const parsed = JSON.parse(saved);
                progress = { ...progress, ...parsed };
                checkDailyGoalReset();
            }
        } catch (e) {
            console.error('[TM_COURSE] Failed to load progress:', e);
        }

        // Sync from Firestore if available
        syncProgressFromFirestore();
    }

    /**
     * Save progress to LocalStorage and Cloud
     */
    function saveProgress() {
        try {
            localStorage.setItem('tm_course_progress', JSON.stringify(progress));
            syncProgressToFirestore();
        } catch (e) {
            console.error('[TM_COURSE] Failed to save progress:', e);
        }
    }

    /**
     * Sync progress from Firestore
     */
    async function syncProgressFromFirestore() {
        if (!window.TM_DB || !window.TM_AUTH) return;
        const user = TM_AUTH.getUser();
        if (!user) return;

        try {
            // We need a method in TM_DB to get course progress. 
            // Assuming updateUserProfile returns the full profile or we have a separate getter.
            // For now, let's assume we can rely on local storage for immediate load, 
            // and we might need to implement a specific fetch if we want true multi-device sync.
            console.log('[TM_COURSE] Cloud sync check initiated...');
        } catch (e) {
            console.error('[TM_COURSE] Cloud sync failed:', e);
        }
    }

    /**
     * Sync progress to Firestore
     */
    async function syncProgressToFirestore() {
        if (!window.TM_DB || !window.TM_AUTH) return;
        const user = TM_AUTH.getUser();
        if (!user) return;

        try {
            const syncData = {
                courseName: userName,
                courseProgress: progress,
                lastUpdated: new Date().toISOString()
            };
            await TM_DB.updateUserProfile(user.uid, syncData);
            console.log('[TM_COURSE] Progress synced to cloud ☁️');
        } catch (e) {
            console.error('[TM_COURSE] Cloud save failed:', e);
        }
    }

    /**
     * Check if daily goal needs reset
     */
    function checkDailyGoalReset() {
        const today = new Date().toDateString();
        if (progress.dailyGoal.date !== today) {
            progress.dailyGoal = { target: 3, completed: 0, date: today };
            // Don't call saveProgress here to avoid infinite loop if called from load
            localStorage.setItem('tm_course_progress', JSON.stringify(progress));
        }
    }

    /**
     * Check if user needs to see welcome screen
     */
    function checkWelcomeScreen() {
        userName = localStorage.getItem('tm_course_name');
        const selectedCourse = localStorage.getItem('tm_selected_course');

        if (!userName) {
            // First time user - show welcome screen
            showWelcomeScreen();
        } else if (!selectedCourse) {
            // Has name but no course selected
            showCourseSelection();
        } else {
            // Returning user - load dashboard
            progress.selectedCourse = selectedCourse;
            currentCourse = window.COURSES[selectedCourse];
            showCourseDashboard();
        }
    }

    /**
     * Show Welcome Screen (Name Input)
     */
    function showWelcomeScreen() {
        const container = document.getElementById('course-container');
        container.innerHTML = `
            <div class="course-welcome">
                <div class="welcome-card">
                    <h1>👋 Welcome to Typing Course!</h1>
                    <p>Let's personalize your experience</p>
                    
                    <div class="name-input-group">
                        <label>What should we call you?</label>
                        <input type="text" id="user-name-input" placeholder="Enter your name..." maxlength="30">
                    </div>
                    
                    <button class="btn-primary" id="continue-btn">Continue →</button>
                    
                    <p class="hint">💡 Your name is saved locally - no account needed</p>
                </div>
            </div>
        `;

        // Event listeners
        const nameInput = document.getElementById('user-name-input');
        const continueBtn = document.getElementById('continue-btn');

        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && nameInput.value.trim().length >= 2) {
                saveNameAndContinue();
            }
        });

        continueBtn.addEventListener('click', saveNameAndContinue);

        // Focus input
        setTimeout(() => nameInput.focus(), 100);
    }

    /**
     * Save user name and show course selection
     */
    function saveNameAndContinue() {
        const nameInput = document.getElementById('user-name-input');
        const name = nameInput.value.trim();

        if (name.length < 2) {
            alert('Please enter at least 2 characters');
            return;
        }

        userName = name;
        localStorage.setItem('tm_course_name', name);
        console.log('[TM_COURSE] Name saved:', name);

        // Animate transition
        document.querySelector('.course-welcome').style.opacity = '0';
        setTimeout(() => showCourseSelection(), 300);
    }

    /**
     * Show Course Selection Screen
     */
    function showCourseSelection() {
        const container = document.getElementById('course-container');
        container.innerHTML = `
            <div class="course-selection">
                <div class="selection-header">
                    <h2>Hi ${userName}! Choose Your Learning Path</h2>
                </div>

                <div class="course-cards">
                    <!-- Basic Course -->
                    <div class="course-card" data-course="basic">
                        <div class="course-icon">📚</div>
                        <h3>BASIC COURSE</h3>
                        <div class="course-info">
                            <p><strong>Perfect for:</strong></p>
                            <ul>
                                <li>Complete beginners</li>
                                <li>Learning from scratch</li>
                            </ul>
                            <p class="course-stats">📖 12 Lessons • 📝 ~70 Sub-lessons</p>
                            <p class="course-stats">⏱️ 3-5 min each</p>
                        </div>
                        <div class="course-features">
                            <span>✓ Home row</span>
                            <span>✓ All keys</span>
                            <span>✓ Numbers</span>
                            <span>✓ Punctuation</span>
                        </div>
                        <button class="btn-course" data-course="basic">Start Basic Course</button>
                    </div>

                    <!-- Speed Building Course -->
                    <div class="course-card" data-course="speed">
                        <div class="course-icon">⚡</div>
                        <h3>SPEED BUILDING</h3>
                        <div class="course-info">
                            <p><strong>Perfect for:</strong></p>
                            <ul>
                                <li>Experienced typists</li>
                                <li>Already know keys</li>
                            </ul>
                            <p class="course-stats">📖 6 Lessons • 📝 ~31 Sub-lessons</p>
                            <p class="course-stats">⏱️ 2-6 min each</p>
                        </div>
                        <div class="course-features">
                            <span>✓ Speed drills</span>
                            <span>✓ Finger training</span>
                            <span>✓ Common words</span>
                            <span>✓ Fluency</span>
                        </div>
                        <button class="btn-course" data-course="speed">Start Speed Course</button>
                    </div>

                    <!-- Developer Course -->
                    <div class="course-card" data-course="developer">
                        <div class="course-icon">💻</div>
                        <h3>DEVELOPER COURSE</h3>
                        <div class="course-info">
                            <p><strong>Perfect for:</strong></p>
                            <ul>
                                <li>Coders & Programmers</li>
                                <li>Enhance coding speed</li>
                            </ul>
                            <p class="course-stats">📖 8 Lessons • 📝 ~43 Sub-lessons</p>
                            <p class="course-stats">⏱️ 3-6 min each</p>
                        </div>
                        <div class="course-features">
                            <span>✓ Brackets</span>
                            <span>✓ Symbols</span>
                            <span>✓ Operators</span>
                            <span>✓ JS/Py/HTML</span>
                        </div>
                        <button class="btn-course" data-course="developer">Start Dev Course</button>
                    </div>
                </div>
            </div>
        `;

        // Event listeners for course selection
        document.querySelectorAll('.btn-course').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const courseId = e.target.dataset.course;
                selectCourse(courseId);
            });
        });
    }

    /**
     * Select a course and save to storage
     */
    function selectCourse(courseId) {
        console.log('[TM_COURSE] Course selected:', courseId);

        localStorage.setItem('tm_selected_course', courseId);
        progress.selectedCourse = courseId;
        currentCourse = COURSES[courseId];

        // Sync to Firestore if user is logged in
        syncProgressToFirestore();

        // Animate transition
        document.querySelector('.course-selection').style.opacity = '0';
        setTimeout(() => showCourseDashboard(), 300);
    }

    /**
     * Show Course Dashboard
     */
    /**
     * Show Course Dashboard (Now Init Course Player)
     */
    function showCourseDashboard() {
        initCoursePlayer();
    }

    /**
     * Initialize the Unified Course Player (3-Column Layout)
     */
    function initCoursePlayer() {
        const container = document.getElementById('course-container');
        const course = currentCourse;

        if (!course) {
            console.error('[TM_COURSE] No course selected');
            return;
        }

        // 1. Show Skeleton while preparing
        container.innerHTML = `
            <div class="course-player-grid skeleton-loading">
                <aside class="cp-sidebar-left">
                    <div class="cp-sidebar-header">
                        <div class="tm-skeleton" style="width: 70%; height: 24px; margin-bottom: 10px;"></div>
                        <div class="tm-skeleton" style="width: 40%; height: 16px;"></div>
                    </div>
                    <div class="cp-nav-tree">
                        ${Array(8).fill('<div class="tm-skeleton" style="margin-bottom: 15px; height: 30px;"></div>').join('')}
                    </div>
                </aside>
                <main class="cp-main-content">
                    <div class="tm-skeleton" style="height: 200px; margin-bottom: 2rem; border-radius: 16px;"></div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
                        ${Array(4).fill('<div class="tm-skeleton" style="height: 150px; border-radius: 12px;"></div>').join('')}
                    </div>
                </main>
            </div>
        `;

        // Artificial delay for smooth transition (optional, or just wait for next tick)
        setTimeout(() => {
            renderFinalGrid();
        }, 300);

        function renderFinalGrid() {
            container.innerHTML = `
                <div class="course-player-grid">
                    <!-- Left Sidebar: Navigation -->
                    <aside class="cp-sidebar-left">
                        <div class="cp-sidebar-header">
                            <h3>${course.name}</h3>
                            <p>${progress.completedSubLessons.length}/${course.totalSubLessons} Completed</p>
                        </div>
                        <div class="cp-nav-tree" id="cp-nav-tree">
                            <!-- Tree generated by JS -->
                        </div>
                    </aside>

                    <!-- Center: Main Content -->
                    <main class="cp-main-content">
                        <div class="cp-content-wrapper" id="cp-dynamic-content">
                            <!-- Default Overview or Current Lesson -->
                        </div>
                    </main>

                    <!-- Right Sidebar: Ads/Extras -->
                    <aside class="cp-sidebar-right">
                        <div class="tm-ad-container" data-ad-size="300x250">
                            <div class="tm-ad-placeholder">
                                <span class="tm-ad-label">Advertisement</span>
                                <div class="tm-ad-dimensions">300 × 250</div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 2rem; text-align: center; width: 100%;">
                            <div class="tm-ad-container" data-ad-size="300x600">
                                 <div class="tm-ad-placeholder">
                                    <span class="tm-ad-label">Advertisement</span>
                                    <div class="tm-ad-dimensions">300 × 600</div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            `;

            // 2. Render Navigation Tree
            renderCourseNavigation();

            // 3. Render Initial Content (Dashboard Overview)
            renderPlayerOverview();
        }
    }

    /**
     * Render Course Navigation Tree (Left Sidebar)
     */
    function renderCourseNavigation() {
        const treeContainer = document.getElementById('cp-nav-tree');
        if (!treeContainer) return;

        let html = '';
        const course = currentCourse;

        course.lessons.forEach(lesson => {
            // Chapter/Lesson Header
            html += `
                <div class="cp-chapter-item">
                    <div class="cp-chapter-title">Lesson ${lesson.id}: ${lesson.title}</div>
                    <div class="cp-chapter-subs">
            `;

            // Sub-lessons
            lesson.subLessons.forEach(sub => {
                const isCompleted = progress.completedSubLessons.some(c => c.id === sub.id);
                // First lesson is always unlocked
                const isUnlocked = isLessonUnlocked(lesson.id);
                // For sub-lessons, strictly speaking we should check if previous sub is done, 
                // but usually within a lesson we unlock all or sequential.
                // For simplicity, let's assume if lesson is unlocked, subs are clickable.
                // (Refinement: strict sub-lesson locking if needed)

                // Check if the lesson is unlocked (all previous lessons completed)
                const isLessonOpen = isLessonUnlocked(lesson.id);

                // Allow clicking if lesson is open OR this specific sub-lesson is already completed
                const isActionable = isLessonOpen || isCompleted;

                const isActive = progress.currentSubLesson === sub.id;
                const statusIcon = isCompleted ? '✓' : (isLessonOpen ? '○' : '🔒');
                const statusClass = isCompleted ? 'completed' : (isLessonOpen ? 'open' : 'locked');

                html += `
                    <div class="cp-lesson-item ${isActive ? 'active' : ''} ${isActionable ? '' : 'locked'}" 
                         data-sub-id="${sub.id}"
                         ${isActionable ? `onclick="TM_COURSE.playSubLesson('${sub.id}')"` : ''}>
                        <div class="cp-lesson-status ${statusClass}">${statusIcon}</div>
                        <div class="cp-lesson-name">${sub.title}</div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        treeContainer.innerHTML = html;
    }

    /**
     * Render Player Overview (Default Center Content)
     */
    function renderPlayerOverview() {
        const contentContainer = document.getElementById('cp-dynamic-content');
        const course = currentCourse;
        const displayName = progress.userName || 'Student';

        contentContainer.innerHTML = `
            <div class="course-dashboard"> 
                <div class="dashboard-header">
                    <div class="user-info">
                        <h2>Welcome back, ${displayName}! 👋</h2>
                        <p>Ready to continue your journey?</p>
                    </div>
                </div>

                <!-- Visual Course Map -->
                <div class="course-map-container" style="margin-top: 1.5rem;">
                    <h3 style="margin-top:0; font-size: 1rem; color: var(--text-muted);">Learning Path</h3>
                    <div class="map-path">
                        ${course.lessons.map(l => {
            const lessonProgress = getLessonProgress(l.id);
            const isDone = lessonProgress.completed;
            const isCurrent = isLessonUnlocked(l.id) && !isDone;
            const isLocked = !isLessonUnlocked(l.id);

            return `
                                <div class="map-node ${isDone ? 'completed' : ''} ${isCurrent ? 'active' : ''} ${isLocked ? 'locked' : ''}" 
                                     title="${l.title}"
                                     onclick="TM_COURSE.startLesson(${l.id})">
                                    ${isDone ? '✓' : l.id}
                                </div>
                            `;
        }).join('')}
                    </div>
                </div>

                <div class="progress-overview" style="margin-top: 1.5rem;">
                     <div class="progress-card">
                        <h3>📊 Overall Progress</h3>
                        <div class="progress-bar" style="margin: 1rem 0;">
                            <div class="progress-fill" style="width: ${calculateProgress()}%"></div>
                        </div>
                        <p>${progress.completedSubLessons.length}/${course.totalSubLessons} Sub-lessons Complete</p>
                        
                        <button class="btn-primary" style="margin-top: 1rem; width: 100%;" onclick="TM_COURSE.resumeCourse()">
                            ▶ Resume Best Lesson
                        </button>
                    </div>
                     <div class="stats-row" style="margin-top: 1rem;">
                        <div class="stat-card">
                            <span class="stat-icon">🔥</span>
                            <span class="stat-label">Streak</span>
                            <span class="stat-value">${progress.currentStreak} Days</span>
                        </div>
                         <div class="stat-card">
                            <span class="stat-icon">🏆</span>
                            <span class="stat-label">Stars</span>
                            <span class="stat-value">${progress.totalStars}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Resume Course (Finds next incomplete lesson)
     */
    function resumeCourse() {
        // Logic to find first incomplete sub-lesson
        // Simply iterate through lessons -> sublessons
        let nextSubId = null;
        const course = currentCourse;

        for (const lesson of course.lessons) {
            for (const sub of lesson.subLessons) {
                if (!progress.completedSubLessons.some(c => c.id === sub.id)) {
                    nextSubId = sub.id;
                    break;
                }
            }
            if (nextSubId) break;
        }

        if (nextSubId) {
            playSubLesson(nextSubId);
        } else {
            alert("Course Complete! Review any lesson from the sidebar.");
        }
    }

    /**
     * Render lessons grid
     */
    function renderLessons() {
        const course = currentCourse;
        let html = '';

        course.lessons.forEach((lesson, index) => {
            const isUnlocked = isLessonUnlocked(lesson.id);
            const lessonProgress = getLessonProgress(lesson.id);

            html += `
                <div class="lesson-card ${isUnlocked ? 'unlocked' : 'locked'}" data-lesson-id="${lesson.id}">
                    <div class="lesson-number">Lesson ${lesson.id}</div>
                    <h3>${lesson.title}</h3>
                    <p class="lesson-desc">${lesson.description}</p>
                    <div class="lesson-stats">
                        <span>${lesson.subLessons.length} sub-lessons</span>
                        ${lessonProgress.stars > 0 ? `<span>⭐ ${lessonProgress.stars}/3</span>` : ''}
                    </div>
                    ${isUnlocked ?
                    `<button class="btn-start-lesson" data-lesson-id="${lesson.id}">
                            ${lessonProgress.completed ? 'Review' : 'Start'} Lesson
                        </button>` :
                    `<div class="locked-badge">🔒 Locked</div>`
                }
                </div>
            `;
        });

        return html;
    }

    /**
     * Render achievement showcase
     */
    function renderAchievementShowcase() {
        if (!window.TM_ACHIEVEMENTS) return '';

        const allAch = TM_ACHIEVEMENTS.getAllAchievements();
        return allAch.map(ach => {
            const isUnlocked = progress.unlockedAchievements.includes(ach.id);
            return `
                <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}" data-ach-id="${ach.id}">
                    ${isUnlocked ? ach.icon : '🔒'}
                    <div class="ach-tooltip">
                        <strong>${ach.title}</strong><br>
                        ${ach.desc}
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Render problem keys (weak keys)
     */
    function renderProblemKeys() {
        if (!progress.weakKeys || Object.keys(progress.weakKeys).length === 0) {
            return '<span class="no-problems">None yet!</span>';
        }

        // Sort keys by error count and take top 3
        const sorted = Object.entries(progress.weakKeys)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        return sorted.map(([key, count]) => `
            <span class="problem-key-chip" title="${count} errors">
                ${key === ' ' ? 'Space' : key}
            </span>
        `).join('');
    }

    /**
     * Calculate overall progress percentage
     */
    function calculateProgress() {
        const total = currentCourse.totalSubLessons;
        const completed = progress.completedSubLessons.length;
        return Math.round((completed / total) * 100);
    }

    /**
     * Check if lesson is unlocked
     */
    function isLessonUnlocked(lessonId) {
        // First lesson is always unlocked
        if (lessonId === 1) return true;

        // Check if previous lesson is completed
        const prevLesson = currentCourse.lessons.find(l => l.id === lessonId - 1);
        if (!prevLesson) return false;

        // Check if all sub-lessons of previous lesson are completed
        const prevCompleted = prevLesson.subLessons.every(sub =>
            progress.completedSubLessons.some(c => c.id === sub.id)
        );

        return prevCompleted;
    }

    /**
     * Get lesson progress
     */
    function getLessonProgress(lessonId) {
        const lesson = currentCourse.lessons.find(l => l.id === lessonId);
        if (!lesson) return { completed: false, stars: 0 };

        const completedSubs = lesson.subLessons.filter(sub =>
            progress.completedSubLessons.some(c => c.id === sub.id)
        );

        const totalStars = completedSubs.reduce((sum, sub) => {
            const completed = progress.completedSubLessons.find(c => c.id === sub.id);
            return sum + (completed?.stars || 0);
        }, 0);

        return {
            completed: completedSubs.length === lesson.subLessons.length,
            stars: totalStars
        };
    }

    /**
     * Attach lesson click listeners
     */
    function attachLessonListeners() {
        document.querySelectorAll('.btn-start-lesson').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lessonId = parseInt(e.target.dataset.lessonId);
                startLesson(lessonId);
            });
        });
    }

    /**
     * Start a lesson (opens first sub-lesson)
     */
    function startLesson(lessonId) {
        console.log('[TM_COURSE] Starting lesson:', lessonId);
        const lesson = currentCourse.lessons.find(l => l.id === lessonId);
        if (!lesson) return;

        // Find first incomplete sub-lesson or just the first one
        const firstSub = lesson.subLessons.find(sub =>
            !progress.completedSubLessons.some(c => c.id === sub.id)
        ) || lesson.subLessons[0];

        playSubLesson(firstSub.id);
    }

    /**
     * Play a specific sub-lesson
     */
    function playSubLesson(subId) {
        const lessonId = parseInt(subId.split('.')[0]);
        const lesson = currentCourse.lessons.find(l => l.id === lessonId);
        const sub = lesson.subLessons.find(s => s.id === subId);

        if (!sub) return;

        // Validation: Ensure lesson is unlocked
        if (!isLessonUnlocked(lessonId)) {
            // Check if sub-lesson is already completed (allow replaying completed subs in locked lessons?? rare edge case)
            const isCompleted = progress.completedSubLessons.some(c => c.id === subId);
            if (!isCompleted) {
                console.warn('[TM_COURSE] Attempted to play locked lesson:', subId);
                return;
            }
        }

        console.log('[TM_COURSE] Playing sub-lesson:', subId);
        progress.currentSubLesson = subId;
        progress.currentLesson = lessonId;

        if (sub.type === 'info') {
            showInfoScreen(sub);
        } else if (sub.type === 'practice') {
            renderLessonDetail(sub);
        } else if (sub.type === 'completion_final') {
            showCertificate();
        }
    }

    /**
     * Show Informational Screen
     */
    /**
     * Show Informational Screen
     */
    function showInfoScreen(sub) {
        // Target dynamic content
        const container = document.getElementById('cp-dynamic-content');
        if (!container) {
            initCoursePlayer(); // Fallback
            setTimeout(() => showInfoScreen(sub), 0);
            return;
        }

        // Update Navigation Active State
        updateSidebarActiveState(sub.id);

        container.innerHTML = `
            <div class="course-info-screen">
                <div class="info-card">
                    <div class="info-header">
                        <span class="lesson-num">Lesson ${progress.currentLesson}</span>
                        <h2>${sub.title}</h2>
                    </div>
                    <div class="info-content">
                        ${sub.content}
                    </div>
                    <div class="info-footer">
                        <button class="btn-primary" id="continue-info">Got it, Continue →</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('continue-info').addEventListener('click', () => {
            completeSubLesson(sub.id);
        });
    }

    /**
     * Start a dynamic remedial practice session based on weak keys
     */
    function startRemedialPractice() {
        if (!progress.weakKeys || Object.keys(progress.weakKeys).length === 0) return;

        // Get top 3 weak keys
        const weakChars = Object.entries(progress.weakKeys)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([key]) => key);

        console.log('[TM_COURSE] Starting remedial practice for:', weakChars);

        // Generate customized text
        let text = "";
        for (let i = 0; i < 20; i++) {
            const char = weakChars[Math.floor(Math.random() * weakChars.length)];
            text += char.repeat(3) + " ";
        }
        text = text.trim();

        // Create a virtual sub-lesson
        const virtualSub = {
            id: 'remedial',
            title: 'Weak Key Remedial',
            type: 'practice',
            duration: 120, // 2 minutes
            targetKeys: weakChars,
            minAccuracy: 90,
            starThresholds: { 1: 92, 2: 95, 3: 98 },
            text: text,
            tutorialText: weakChars.map(c => c.repeat(3)).join(' ')
        };

        startPracticeDrill(virtualSub);
    }

    /**
     * Start Practice Drill
     */
    /**
     * Render Lesson Detail View (Pre-flight Screen)
     */
    function renderLessonDetail(sub) {
        // Target dynamic content
        const container = document.getElementById('cp-dynamic-content');
        if (!container) {
            initCoursePlayer();
            setTimeout(() => renderLessonDetail(sub), 0);
            return;
        }

        updateSidebarActiveState(sub.id);

        // Get personal best for this sub-lesson
        const record = progress.completedSubLessons.find(c => c.id === sub.id);
        const bestWPM = record ? record.wpm : 0;
        const bestStars = record ? record.stars : 0;

        container.innerHTML = `
            <div class="lesson-detail-view">
                <div class="detail-header">
                    <span class="lesson-tag">Lesson ${progress.currentLesson}</span>
                    <h1>${sub.title}</h1>
                </div>

                <div class="detail-content">
                    <div class="detail-card">
                        <h3>🎯 Goal</h3>
                        <p>Complete this drill with at least <strong>90% accuracy</strong> to unlock the next step.</p>
                        
                        <div class="key-highlight">
                            <span>Focus Keys:</span>
                            <div class="key-list">
                                ${sub.targetKeys ? sub.targetKeys.map(k => `<kbd>${k}</kbd>`).join('') : '<span>All Keys</span>'}
                            </div>
                        </div>
                    </div>

                    <div class="stats-preview">
                        <div class="stat-box">
                            <span class="label">Your Best Speed</span>
                            <span class="value">${bestWPM} <small>WPM</small></span>
                        </div>
                         <div class="stat-box">
                            <span class="label">Stars Earned</span>
                            <span class="value stars">${'⭐'.repeat(bestStars) || '-'}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-actions">
                    <button class="btn-primary btn-large" id="btn-open-drill">
                        ${record ? '🔄 Replay Lesson' : '▶ Start Practice'}
                    </button>
                    ${sub.tutorialText ? `<p class="tutorial-hint">💡 Tip: ${sub.tutorialText}</p>` : ''}
                </div>
            </div>
        `;

        document.getElementById('btn-open-drill').addEventListener('click', () => {
            openPracticeModal(sub);
        });
    }

    /**
     * Open Full-Screen Practice Modal
     */
    function openPracticeModal(sub) {
        // Remove existing modal if any
        const existing = document.getElementById('course-modal-overlay');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'course-modal-overlay';
        modal.className = 'course-modal-overlay';

        modal.innerHTML = `
            <div class="course-modal-content">
                <div class="modal-top-bar">
                    <div class="top-bar-left">
                        <h3>${sub.title}</h3>
                        <span class="timer-badge">⏱️ ${sub.duration || '300'}s</span>
                    </div>
                    
                    <div class="top-bar-center">
                        <div class="mini-metric">
                            <span class="mm-label">WPM</span>
                            <span class="mm-value" id="course-wpm">0</span>
                        </div>
                        <div class="mini-metric">
                            <span class="mm-label">ACC</span>
                            <span class="mm-value" id="course-accuracy">100%</span>
                        </div>
                        <div class="mini-metric">
                            <span class="mm-label">ERR</span>
                            <span class="mm-value" id="course-errors">0</span>
                        </div>
                    </div>

                    <div class="top-bar-right">
                        <button class="btn-close-modal" id="close-modal-btn">✕</button>
                    </div>
                </div>

                 <div class="modal-body-grid">
                    <!-- Left Ad Panel -->
                    <aside class="modal-ad-left">
                        <div class="ad-container-vertical">
                            <div class="ad-label">Ad</div>
                            <div class="ad-placeholder-vertical">
                                <!-- 160x600 Skyscraper Ad -->
                                <!-- <ins class="adsbygoogle"
                                     style="display:inline-block;width:160px;height:600px"
                                     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                                     data-ad-slot="XXXXXXXXXX"></ins> -->
                                <span class="placeholder-text">160×600</span>
                            </div>
                        </div>
                    </aside>

                    <!-- Center: Main Content -->
                    <div class="modal-body-center">
                        <div class="practice-arena modal-arena">
                            <div id="course-typing-area">
                                <div class="course-drill-box">
                                    <div id="course-text-display"></div>
                                    <input type="text" id="course-typing-input" autocomplete="off" spellcheck="false">
                                </div>
                            </div>
                        </div>

                        <!-- Virtual Keyboard Container -->
                        <div id="virtual-keyboard-container"></div>
                    </div>

                    <!-- Right Ad Panel -->
                    <aside class="modal-ad-right">
                        <div class="ad-container-vertical">
                            <div class="ad-label">Ad</div>
                            <div class="ad-placeholder-vertical">
                                <!-- 160x600 Skyscraper Ad -->
                                <!-- <ins class="adsbygoogle"
                                     style="display:inline-block;width:160px;height:600px"
                                     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                                     data-ad-slot="XXXXXXXXXX"></ins> -->
                                <span class="placeholder-text">160×600</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate in
        requestAnimationFrame(() => modal.classList.add('active'));

        // Close Handler
        const closeBtn = document.getElementById('close-modal-btn');
        closeBtn.addEventListener('click', closePracticeModal);

        // Escape Key Handler
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closePracticeModal();
                window.removeEventListener('keydown', handleEsc);
            }
        };
        window.addEventListener('keydown', handleEsc);

        // Expose handleEsc to closePracticeModal for cleanup if closed via button
        modal._handleEsc = handleEsc;

        // Initialize Virtual Keyboard
        console.log('[TM_COURSE] Initializing Virtual Keyboard...');
        const kb = new VirtualKeyboard('virtual-keyboard-container');
        console.log('[TM_COURSE] Virtual Keyboard instance:', kb);

        // Init Drill & Keyboard Logic
        initDrill(sub, kb);
    }

    function closePracticeModal() {
        const modal = document.getElementById('course-modal-overlay');
        if (modal) {
            // Cleanup ESC listener if it exists
            if (modal._handleEsc) {
                window.removeEventListener('keydown', modal._handleEsc);
            }
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);

            // Clean up typed keys listener? 
            // The initDrill's handleGlobalKeydown might persist... 
            // Ideally initDrill should return a cleanup function or we manually remove the listener.
            // For now, initDrill adds a listener that checks for input existence. 
            // Since input is removed with modal, the listener effectively deactivates itself or we should allow it to detach.
        }
    }

    /**
     * Helper: Update Sidebar Active State
     */
    function updateSidebarActiveState(subId) {
        // Remove active class from all
        document.querySelectorAll('.cp-lesson-item').forEach(el => el.classList.remove('active'));
        // Add to current
        const current = document.querySelector(`.cp-lesson-item[data-sub-id="${subId}"]`);
        if (current) {
            current.classList.add('active');
            // Scroll into view if needed
            current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    /**
     * Initialize Drill with Typing Engine
     */
    function initDrill(sub, kb = null) {
        if (!window.TM_ENGINE) {
            console.error('[TM_COURSE] TM_ENGINE not found');
            return;
        }

        console.log('[TM_COURSE] Bridging with TM_ENGINE for sub-lesson:', sub.id);

        // --- ADAPTIVE WEAK KEY BOOSTER ---
        let drillText = sub.text || '';
        let isBoosterActive = false;

        if (sub.type === 'practice' && progress.weakKeys && Object.keys(progress.weakKeys).length > 0) {
            const sorted = Object.entries(progress.weakKeys)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(entry => entry[0]);

            if (sorted.length > 0) {
                const boosterFragment = sorted.map(k => `${k}${k}${k} ${k}${k} ${k}`).join(' ');
                drillText += ' ' + boosterFragment;
                isBoosterActive = true;
            }
        }

        if (isBoosterActive) {
            const arena = document.querySelector('.modal-arena');
            if (arena) {
                const badge = document.createElement('div');
                badge.className = 'booster-badge';
                badge.innerHTML = '⚡ Booster';
                arena.appendChild(badge);
            }
        }

        TM_ENGINE.loadCustomText(drillText, `Lesson ${progress.currentLesson}: ${sub.title}`, {
            duration: sub.duration || 300,
            elements: {
                text: 'course-text-display',
                wpm: 'course-wpm',
                accuracy: 'course-accuracy',
                errors: 'course-errors',
                input: 'course-typing-input'
            },
            onComplete: (results) => {
                console.log('[TM_COURSE] Drill complete, results:', results);
                document.removeEventListener('keydown', handleGlobalKeydown);

                let stars = 0;
                if (results.accuracy >= sub.starThresholds[3]) stars = 3;
                else if (results.accuracy >= sub.starThresholds[2]) stars = 2;
                else if (results.accuracy >= sub.starThresholds[1]) stars = 1;

                completeSubLesson(sub.id, {
                    wpm: results.wpm,
                    accuracy: results.accuracy,
                    stars: stars,
                    mistakesDict: results.mistakesDict
                });
            }
        });

        // Keyboard Hint Logic
        const input = document.getElementById('course-typing-input');
        if (kb && input) {
            if (sub.text && sub.text.length > 0) kb.setNextKey(sub.text[0]);
            input.addEventListener('input', () => {
                const val = input.value;
                if (val.length < drillText.length) kb.setNextKey(drillText[val.length]);
                else kb.setNextKey(null);
            });
        }

        // Focus the input
        setTimeout(() => {
            const input = document.getElementById('course-typing-input');
            if (input) input.focus();
        }, 100);

        // Global keydown handler to refocus input
        function handleGlobalKeydown(e) {
            const input = document.getElementById('course-typing-input');
            if (!input) {
                document.removeEventListener('keydown', handleGlobalKeydown);
                return;
            }

            // Don't interfere if user is typing in another input (e.g. search, chat)
            if (e.target.tagName === 'INPUT' && e.target !== input) return;
            if (e.target.tagName === 'TEXTAREA') return;

            // If input exists but isn't focused, focus it
            if (document.activeElement !== input) {
                input.focus();
            }
        }

        // Attach global listener
        document.addEventListener('keydown', handleGlobalKeydown);

        // Clean up listener when aborting
        const abortBtn = document.getElementById('abort-practice');
        if (abortBtn) {
            const originalClick = abortBtn.onclick; // Preserve existing if any (though we added via addEventListener)
            abortBtn.addEventListener('click', () => {
                document.removeEventListener('keydown', handleGlobalKeydown);
            });
        }
    }

    /**
     * Complete a sub-lesson and move forward
     */
    function completeSubLesson(subId, results = null) {
        console.log('[TM_COURSE] Completing sub-lesson:', subId);

        const stars = results?.stars || 0;
        const passed = stars > 0;

        // Only save to progress if passed
        if (passed) {
            const existing = progress.completedSubLessons.find(c => c.id === subId);
            if (existing) {
                if (results && stars > existing.stars) {
                    progress.totalStars += (stars - existing.stars);
                    existing.stars = stars;
                    existing.wpm = results.wpm;
                    existing.accuracy = results.accuracy;
                }
            } else {
                progress.completedSubLessons.push({
                    id: subId,
                    stars: stars,
                    wpm: results?.wpm || 0,
                    accuracy: results?.accuracy || 0,
                    date: new Date().toISOString()
                });
                progress.totalStars += stars;
                updateDailyGoal();
                updateStreak();
            }

            // Check for achievements
            if (window.TM_ACHIEVEMENTS) {
                TM_ACHIEVEMENTS.checkUnlocks(progress);
            }

            saveProgress();
            syncProgressToFirestore();

            // Refresh sidebar to show checkmarks
            renderCourseNavigation();
        }

        // Aggregate Weak Keys (even if failed, we want to track errors)
        if (results && results.mistakesDict) {
            if (!progress.weakKeys) progress.weakKeys = {};
            for (let char in results.mistakesDict) {
                progress.weakKeys[char] = (progress.weakKeys[char] || 0) + results.mistakesDict[char];
            }
        }

        // Show result screen
        const nextSubId = getNextSubLessonId(subId);
        showCompletionScreen(subId, nextSubId, results, passed);
    }

    // ... (getNextSubLessonId remains unchanged) ...

    /**
     * Show Course Completion Certificate
     */
    function showCertificate() {
        // Target dynamic content
        const container = document.getElementById('cp-dynamic-content');
        if (!container) return initCoursePlayer(); // Safety

        const course = currentCourse;
        const totalSubs = course.totalSubLessons;
        const completedSubs = progress.completedSubLessons.length;

        // Calculate average stats
        const avgWPM = Math.round(progress.completedSubLessons.reduce((a, b) => a + b.wpm, 0) / completedSubs) || 0;
        const avgAcc = Math.round(progress.completedSubLessons.reduce((a, b) => a + b.accuracy, 0) / completedSubs) || 0;

        container.innerHTML = `
            <div class="certificate-screen">
                <div class="certificate-container">
                    <div class="cert-border">
                        <div class="cert-header">
                            <div class="cert-logo">🏆</div>
                            <h1>CERTIFICATE OF COMPLETION</h1>
                            <p>This is to certify that</p>
                        </div>
                        
                        <div class="cert-body">
                            <h2 class="cert-user-name">${userName}</h2>
                            <p>has successfully completed the</p>
                            <h3 class="cert-course-name">${course.name}</h3>
                            <p>with outstanding performance and dedication.</p>
                        </div>
                        
                        <div class="cert-stats">
                            <div class="cert-stat">
                                <span class="cert-stat-label">Average Speed</span>
                                <span class="cert-stat-value">${avgWPM} WPM</span>
                            </div>
                            <div class="cert-stat">
                                <span class="cert-stat-label">Final Accuracy</span>
                                <span class="cert-stat-value">${avgAcc}%</span>
                            </div>
                            <div class="cert-stat">
                                <span class="cert-stat-label">Date Completed</span>
                                <span class="cert-stat-value">${new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                        
                        <div class="cert-footer">
                            <div class="cert-signature">
                                <div class="sig-line"></div>
                                <span>Course Instructor</span>
                            </div>
                            <div class="cert-seal">
                                <div class="seal-inner">TM</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cert-actions">
                    <button class="btn-primary" onclick="window.print()">🖨️ Print Certificate</button>
                    <button class="btn-secondary" id="cert-back">Back to Dashboard</button>
                </div>
            </div>
        `;

        document.getElementById('cert-back').addEventListener('click', showCourseDashboard);
    }

    function showCompletionScreen(subId, nextSubId, results, passed) {
        // Target dynamic content
        const container = document.getElementById('cp-dynamic-content');
        if (!container) {
            // Fallback if player isn't initialized
            initCoursePlayer();
            setTimeout(() => showCompletionScreen(subId, nextSubId, results, passed), 0);
            return;
        }

        const title = passed ? "Great Job!" : "Lesson Failed";
        const subtitle = passed ? "Sub-lesson complete" : "Minimum accuracy not met";
        const confetti = passed ? '<div class="confetti">🎉</div>' : '<div class="confetti">⚠️</div>';

        container.innerHTML = `
            <div class="completion-screen">
                <div class="completion-card ${passed ? 'success' : 'failed'}">
                    ${confetti}
                    <h2>${title}</h2>
                    <p>${subtitle}</p>
                    
                    ${results ? `
                        <div class="result-stats">
                            <div class="res-stat">
                                <span>Speed</span>
                                <strong>${results.wpm} WPM</strong>
                            </div>
                            <div class="res-stat">
                                <span>Accuracy</span>
                                <strong>${results.accuracy}%</strong>
                            </div>
                            <div class="res-stars">
                                ${Array(3).fill(0).map((_, i) => i < results.stars ? '⭐' : '☆').join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="completion-actions">
                        ${passed && nextSubId ?
                `<button class="btn-primary" id="next-sub-btn">Next Sub-lesson →</button>` :
                ''
            }
                        <button class="btn-primary" id="retry-btn">🔄 Retry Lesson</button>
                        <button class="btn-secondary" id="back-dash-btn">Back to Dashboard</button>
                    </div>
                </div>
            </div>
        `;

        if (passed && nextSubId) document.getElementById('next-sub-btn').addEventListener('click', () => playSubLesson(nextSubId));
        document.getElementById('retry-btn').addEventListener('click', () => playSubLesson(subId));
        document.getElementById('back-dash-btn').addEventListener('click', showCourseDashboard);
    }

    /**
     * Show Lesson Completion
     */
    function showLessonCompletion(lessonId, results) {
        // Just show dashboard/overview
        alert(`Congratulations! You've finished Lesson ${lessonId}!`);
        showCourseDashboard();
    }

    /**
     * Update Daily Goal
     */
    function updateDailyGoal() {
        const today = new Date().toDateString();
        if (progress.dailyGoal.date !== today) {
            progress.dailyGoal.date = today;
            progress.dailyGoal.completed = 1;
        } else {
            progress.dailyGoal.completed++;
        }

        // Celebrate reaching daily goal
        if (progress.dailyGoal.completed === progress.dailyGoal.target) {
            if (window.TM_ACHIEVEMENTS) {
                TM_ACHIEVEMENTS.showAchievementToast({
                    title: 'Daily Goal Reached!',
                    desc: 'You completed 3 lessons today',
                    icon: '🎯'
                });
            }
            if (window.TM_ENGINE) {
                const state = TM_ENGINE.getState();
                state.xp += 100;
                TM_ENGINE.refreshDashboard();
            }
        }
    }

    /**
     * Update Streak Logic
     */
    function updateStreak() {
        const now = new Date();
        const lastDate = progress.lastCompletionDate ? new Date(progress.lastCompletionDate) : null;
        const todayStr = now.toDateString();

        if (!lastDate) {
            progress.streak = 1;
        } else {
            const diffTime = Math.abs(now - lastDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (todayStr === lastDate.toDateString()) {
                // Already did a lesson today, don't increment streak
            } else if (diffDays === 1) {
                progress.streak++;
                // Bonus for streak
                if (window.TM_ENGINE) {
                    const state = TM_ENGINE.getState();
                    state.xp += 10 * progress.streak;
                    TM_ENGINE.refreshDashboard();
                }
            } else {
                progress.streak = 1;
            }
        }
        progress.lastCompletionDate = now.toISOString();
    }

    /**
     * Show course settings
     */
    function showCourseSettings() {
        // TODO: Implement settings modal
        alert('Settings - Coming soon!');
    }

    // --- Public API ---
    return {
        init,
        startLesson,
        saveProgress,
        getProgress: () => progress,
        getCurrentCourse: () => currentCourse,
        playSubLesson,
        resumeCourse,
        initCoursePlayer
    };
})();

// Expose to window
window.TM_COURSE = TM_COURSE;
