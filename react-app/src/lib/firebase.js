import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC5DRKItWQTHrPdUNFbONAbITHuLaQ7_bg",
    authDomain: "typing-master-bce79.firebaseapp.com",
    projectId: "typing-master-bce79",
    storageBucket: "typing-master-bce79.firebasestorage.app",
    messagingSenderId: "233722683367",
    appId: "1:233722683367:web:ee15ad102794bb54d16742"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
