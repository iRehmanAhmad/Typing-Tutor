import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    addDoc,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';

export const useLeaderboard = (gameId = 'test_arena', count = 10) => {
    const [latest, setLatest] = useState([]);
    const [daily, setDaily] = useState([]);
    const [monthly, setMonthly] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const lbRef = collection(db, 'leaderboards');

        // Latest Query
        const latestQuery = query(
            lbRef,
            where('gameId', '==', gameId),
            orderBy('createdAt', 'desc'),
            limit(count)
        );

        // Daily Query (last 24h)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const dailyQuery = query(
            lbRef,
            where('gameId', '==', gameId),
            where('createdAt', '>=', Timestamp.fromDate(yesterday)),
            orderBy('createdAt', 'desc'),
            orderBy('wpm', 'desc'),
            limit(count)
        );

        // Monthly Query (last 30d)
        const lastMonth = new Date();
        lastMonth.setDate(lastMonth.getDate() - 30);
        const monthlyQuery = query(
            lbRef,
            where('gameId', '==', gameId),
            where('createdAt', '>=', Timestamp.fromDate(lastMonth)),
            orderBy('wpm', 'desc'),
            limit(count)
        );

        const unsubLatest = onSnapshot(latestQuery, (snap) => {
            setLatest(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        const unsubDaily = onSnapshot(dailyQuery, (snap) => {
            // Firestore doesn't allow inequality on one field and orderBy on another easily without composite indexes
            // We'll do a simple client-side sort for daily if needed, or stick to wpm if we have indexes.
            const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDaily(data.sort((a, b) => b.wpm - a.wpm));
        });

        const unsubMonthly = onSnapshot(monthlyQuery, (snap) => {
            setMonthly(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });

        return () => {
            unsubLatest();
            unsubDaily();
            unsubMonthly();
        };
    }, [gameId, count]);

    const submitResult = async (result) => {
        try {
            await addDoc(collection(db, 'leaderboards'), {
                ...result,
                gameId,
                createdAt: serverTimestamp()
            });
        } catch (err) {
            console.error("Error submitting result:", err);
        }
    };

    return { latest, daily, monthly, loading, submitResult };
};
