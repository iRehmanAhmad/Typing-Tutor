/**
 * Typing Master - Firebase Auth & Persistence Module
 * -----------------------------------------------
 * This file handles user authentication and syncing 
 * certificates/history to the cloud for verification.
 */

// Firebase Configuration - REPLACE WITH YOUR CONFIG LATER
const firebaseConfig = {
    apiKey: "AIzaSyC5DRKItWQTHrPdUNFbONAbITHuLaQ7_bg",
    authDomain: "typing-master-bce79.firebaseapp.com",
    projectId: "typing-master-bce79",
    storageBucket: "typing-master-bce79.firebasestorage.app",
    messagingSenderId: "233722683367",
    appId: "1:233722683367:web:ee15ad102794bb54d16742"
};

// State for Auth
let userAuth = null;

// Initialize Firebase immediately on script load
if (typeof firebase !== 'undefined') {
    console.log("[TM_AUTH] Initializing Firebase at top level...");
    try {
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        console.log("[TM_AUTH] Firebase initialized successfully.");
    } catch (err) {
        if (err.code === 'app/duplicate-app') {
            console.log("[TM_AUTH] Firebase already initialized.");
            auth = firebase.auth();
            db = firebase.firestore();
        } else {
            console.error("[TM_AUTH] Firebase initialization failed:", err);
        }
    }
}

function initAuth(onAuthStateChanged) {
    if (!auth) {
        console.warn("Firebase not initialized yet. Retrying in initAuth...");
        if (typeof firebase !== 'undefined') {
            try {
                if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
                auth = firebase.auth();
                db = firebase.firestore();
            } catch (e) {
                console.error("Retry failed:", e);
                return;
            }
        } else {
            return;
        }
    }

    auth.onAuthStateChanged(user => {
        userAuth = user;
        if (user) {
            console.log("[TM_AUTH] User logged in:", user.uid, user.displayName || user.email);
        } else {
            console.log("[TM_AUTH] User logged out / Guest mode.");
        }
        if (onAuthStateChanged) onAuthStateChanged(user);
    });

    // Initialize DB module if present
    if (window.TM_DB) window.TM_DB.init();
}

/**
 * Login with Google
 */
async function loginWithGoogle() {
    if (!auth) return;

    if (window.location.protocol === 'file:') {
        alert("CRITICAL: Firebase Auth needs a server (http://localhost). Use VS Code Live Server.");
        return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.signInWithPopup(provider);
    } catch (err) {
        console.error("Login fail:", err);
    }
}

/**
 * Logout
 */
function logout() {
    if (auth) auth.signOut();
}

// Global Auth Object
window.TM_AUTH = {
    init: initAuth,
    login: loginWithGoogle,
    logout: logout,
    getUser: () => userAuth
};
