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
            // Functional state update approach to handle array merging
            const currentProgress = progress;
            const updatedCompletedSubLessons = [...(currentProgress.completedSubLessons || [])];

            if (newData.completedSubLessons) {
                newData.completedSubLessons.forEach(newSub => {
                    const existingIdx = updatedCompletedSubLessons.findIndex(s => s.id === newSub.id);
                    if (existingIdx > -1) {
                        // Update if higher stars
                        if (newSub.stars > updatedCompletedSubLessons[existingIdx].stars) {
                            updatedCompletedSubLessons[existingIdx] = newSub;
                        }
                    } else {
                        updatedCompletedSubLessons.push(newSub);
                    }
                });
            }

            const updatedWeakKeys = { ...(currentProgress.weakKeys || {}) };
            if (newData.weakKeys) {
                Object.entries(newData.weakKeys).forEach(([key, count]) => {
                    updatedWeakKeys[key] = (updatedWeakKeys[key] || 0) + count;
                });
            }

            const finalData = {
                ...newData,
                completedSubLessons: updatedCompletedSubLessons,
                weakKeys: updatedWeakKeys,
                xp: (currentProgress.xp || 0) + (newData.xp || 0),
                lastUpdated: new Date().toISOString()
            };

            await setDoc(userDocRef, finalData, { merge: true });
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
