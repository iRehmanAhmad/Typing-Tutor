/**
 * Typing Master - Achievements & Gamification Module
 * -----------------------------------------------
 * Handles achievement unlocking, streaks, and daily goals.
 */

const TM_ACHIEVEMENTS = (function () {
    const REGISTRY = [
        {
            id: 'welcome',
            title: 'Hello World',
            desc: 'Start your journey',
            icon: '👋',
            check: (prog) => prog.completedSubLessons.length >= 1
        },
        {
            id: 'home-row-hero',
            title: 'Home Row Hero',
            desc: '3 Stars on all Home Row drills',
            icon: '🏠',
            check: (prog) => {
                const homeRowDrills = ['1.2', '1.4', '1.6', '1.7'];
                return homeRowDrills.every(id => {
                    const completed = prog.completedSubLessons.find(c => c.id === id);
                    return completed && completed.stars >= 3;
                });
            }
        },
        {
            id: 'speed-demon-30',
            title: 'Speed Demon',
            desc: 'Reach 30 WPM',
            icon: '⚡',
            check: (prog) => prog.completedSubLessons.some(c => c.wpm >= 30)
        },
        {
            id: 'speed-demon-50',
            title: 'Elite Typist',
            desc: 'Reach 50 WPM',
            icon: '🚀',
            check: (prog) => prog.completedSubLessons.some(c => c.wpm >= 50)
        },
        {
            id: 'accuracy-ace',
            title: 'Accuracy Ace',
            desc: '100% Accuracy in a drill',
            icon: '🎯',
            check: (prog) => prog.completedSubLessons.some(c => c.accuracy === 100)
        },
        {
            id: 'daily-grinder',
            title: 'Daily Grinder',
            desc: 'Complete 3 lessons in one day',
            icon: '⚙️',
            check: (prog) => prog.dailyGoal.completed >= 3
        },
        {
            id: 'streak-3',
            title: 'Consistent',
            desc: '3-day practice streak',
            icon: '🔥',
            check: (prog) => prog.streak >= 3
        },
        {
            id: 'streak-7',
            title: 'Dedicated',
            desc: '7-day practice streak',
            icon: '🐲',
            check: (prog) => prog.streak >= 7
        }
    ];

    /**
     * Check and unlock new achievements
     */
    function checkUnlocks(progress) {
        if (!progress.unlockedAchievements) progress.unlockedAchievements = [];

        let newlyUnlocked = [];

        REGISTRY.forEach(ach => {
            if (!progress.unlockedAchievements.includes(ach.id)) {
                if (ach.check(progress)) {
                    progress.unlockedAchievements.push(ach.id);
                    newlyUnlocked.push(ach);

                    // Award XP bonus via the main engine if available
                    if (window.TM_ENGINE) {
                        const state = TM_ENGINE.getState();
                        state.xp += 50;
                        TM_ENGINE.refreshDashboard();
                    }
                }
            }
        });

        if (newlyUnlocked.length > 0) {
            newlyUnlocked.forEach(ach => showAchievementToast(ach));
            return true; // Progress changed
        }
        return false;
    }

    /**
     * Show achievement unlock toast
     */
    function showAchievementToast(ach) {
        console.log('[TM_ACHIEVEMENTS] Unlocked:', ach.title);

        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.innerHTML = `
            <div class="ach-toast-icon">${ach.icon}</div>
            <div class="ach-toast-content">
                <div class="ach-toast-title">Achievement Unlocked!</div>
                <div class="ach-toast-name">${ach.title}</div>
            </div>
        `;

        document.body.appendChild(toast);

        // Sound effect if available
        if (window.TM_SOUND) TM_SOUND.playNotificationSound?.();

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    }

    /**
     * Get all achievement details
     */
    function getAllAchievements() {
        return REGISTRY;
    }

    return {
        checkUnlocks,
        getAllAchievements,
        showAchievementToast
    };
})();

// Expose to window
window.TM_ACHIEVEMENTS = TM_ACHIEVEMENTS;
