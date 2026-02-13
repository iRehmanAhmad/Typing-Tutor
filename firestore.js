/**
 * Typing Master - Firestore Database Module
 * ---------------------------------------
 * Handles all cloud data persistence: Certificates, 
 * User Profiles, History, and Coupons.
 */

const TM_DB = (function () {
    let db = null;

    function init() {
        if (db) return; // Already initialized
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            db = firebase.firestore();
            console.log("[TM_DB] Firestore initialized successfully.");
        } else {
            console.warn("[TM_DB] Cannot initialize Firestore: Firebase App not ready.");
        }
    }

    /**
     * Save Certificate to Firestore
     */
    async function saveCert(certData) {
        if (!db) return false;
        const user = window.TM_AUTH?.getUser();
        if (!user) return false;

        try {
            await db.collection('certificates').doc(certData.id).set({
                ...certData,
                uid: user.uid,
                verified: true,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        } catch (err) {
            console.error("DB: Save Certificate failed:", err);
            return false;
        }
    }

    /**
     * Fetch Certificate for Verification
     */
    async function getCert(certId) {
        if (!db) return null;
        try {
            const doc = await db.collection('certificates').doc(certId).get();
            return doc.exists ? doc.data() : null;
        } catch (err) {
            console.error("DB: Fetch Certificate failed:", err);
            return null;
        }
    }

    /**
     * Validate Coupon Code
     */
    async function getCoupon(code) {
        if (!db) return null;
        try {
            const doc = await db.collection('coupons').doc(code.toUpperCase()).get();
            if (doc.exists) {
                const data = doc.data();
                return data.isActive !== false ? data : null;
            }
            return null;
        } catch (err) {
            console.error("DB: Coupon lookup failed:", err);
            return null;
        }
    }

    /**
     * Update User Profile (Streak, XP, etc.)
     */
    async function updateUserProfile(uid, data) {
        if (!db) {
            console.warn("[TM_DB] Cannot update profile: Database not initialized.");
            return;
        }
        try {
            console.log("[TM_DB] Updating user profile for:", uid, data);
            await db.collection('users').doc(uid).set(data, { merge: true });
            console.log("[TM_DB] User profile updated successfully.");
        } catch (err) {
            console.error("[TM_DB] Update User Profile failed:", err);
        }
    }

    /**
     * Fetch Global Leaderboard (Top 10 by XP)
     */
    async function getLeaderboard(limit = 10) {
        console.log("[TM_DB] getLeaderboard called, db status:", !!db);
        if (!db) return [];
        try {
            console.log("[TM_DB] Querying users collection...");
            const snapshot = await db.collection('users')
                .orderBy('xp', 'desc')
                .limit(limit)
                .get();
            console.log("[TM_DB] Query successful, docs count:", snapshot.docs.length);

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (err) {
            if (err.code === 'permission-denied') {
                console.warn("DB: Leaderboard access denied. Check your Firestore Security Rules.");
            } else {
                console.error("DB: Fetch Leaderboard failed:", err);
            }
            return [];
        }
    }

    /**
     * Seed Mock Leaderboard Data (Demo Only)
     */
    async function seedLeaderboard() {
        if (!db) return;
        const mockUsers = [
            { id: 'MOCK_01', username: 'SpeedDemon_99', xp: 2450, rank: 'Pro', avatar: '⚡', lastUpdated: new Date().toISOString() },
            { id: 'MOCK_02', username: 'Typing_Ninja', xp: 2100, rank: 'Elite', avatar: '🥷', lastUpdated: new Date().toISOString() },
            { id: 'MOCK_03', username: 'Keyboard_Cat', xp: 1850, rank: 'Advanced', avatar: '🐱', lastUpdated: new Date().toISOString() },
            { id: 'MOCK_04', username: 'Turbo_Typer', xp: 1600, rank: 'Advanced', avatar: '🚀', lastUpdated: new Date().toISOString() },
            { id: 'MOCK_05', username: 'Alpha_Keys', xp: 1350, rank: 'Intermediate', avatar: '🦁', lastUpdated: new Date().toISOString() },
            { id: 'MOCK_06', username: 'Ghost_Writer', xp: 1100, rank: 'Intermediate', avatar: '👻', lastUpdated: new Date().toISOString() },
            { id: 'MOCK_07', username: 'Zen_Master', xp: 950, rank: 'Beginner', avatar: '🧘', lastUpdated: new Date().toISOString() },
            { id: 'MOCK_08', username: 'Pixel_Pusher', xp: 800, rank: 'Beginner', avatar: '🎮', lastUpdated: new Date().toISOString() },
            { id: 'MOCK_09', username: 'Cyber_Scribe', xp: 650, rank: 'Novice', avatar: '🤖', lastUpdated: new Date().toISOString() },
            { id: 'MOCK_10', username: 'Home_Row_Hero', xp: 500, rank: 'Novice', avatar: '🦸', lastUpdated: new Date().toISOString() }
        ];

        console.log("[TM_DB] Seeding mock leaderboard data...");
        try {
            const batch = db.batch();
            mockUsers.forEach(user => {
                const ref = db.collection('users').doc(user.id);
                batch.set(ref, user, { merge: true });
            });
            await batch.commit();
            console.log("[TM_DB] Seeding complete! 10 mock users added.");
            return true;
        } catch (err) {
            console.error("[TM_DB] Seeding failed:", err);
            return false;
        }
    }

    return {
        init,
        saveCert,
        getCert,
        getCoupon,
        updateUserProfile,
        getLeaderboard,
        seedLeaderboard
    };
})();

// Re-expose to window
window.TM_DB = TM_DB;
