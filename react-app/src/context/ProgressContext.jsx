import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
    const { user } = useAuth();
    const [progress, setProgress] = useState({
        xp: 0,
        streak: 0,
        completedSubLessons: [],
        unlockedAchievements: [],
        weakKeys: {},
        lastUpdated: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setProgress({
                xp: 0,
                streak: 0,
                completedSubLessons: [],
                unlockedAchievements: [],
                weakKeys: {},
                lastUpdated: null
            });
            setLoading(false);
            return;
        }

        const userDocRef = doc(db, 'users', user.uid);

        // Listen for real-time updates
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
                setProgress(doc.data());
            }
            setLoading(false);
        });

        return unsubscribe;
    }, [user]);

    const updateProgress = async (newData) => {
        if (!user) return;
        const userDocRef = doc(db, 'users', user.uid);
        try {
            await setDoc(userDocRef, {
                ...newData,
                lastUpdated: new Date().toISOString()
            }, { merge: true });
        } catch (err) {
            console.error("Error updating progress:", err);
        }
    };

    const value = {
        progress,
        updateProgress,
        loading
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};
