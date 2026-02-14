import { useState, useEffect, useCallback, useRef } from 'react';

export const useTypingEngine = (text, duration = 60, onComplete) => {
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typedChars, setTypedChars] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [mistakesMap, setMistakesMap] = useState({});
    const [wpmSamples, setWpmSamples] = useState([]);
    const [results, setResults] = useState(null);

    const timerRef = useRef(null);
    const startTimeRef = useRef(null);
    const lastSampleTimeRef = useRef(null);

    const reset = useCallback(() => {
        setIsRunning(false);
        setIsPaused(false);
        setTimeLeft(duration);
        setCurrentIndex(0);
        setTypedChars(0);
        setCorrectChars(0);
        setMistakes(0);
        setMistakesMap({});
        setWpmSamples([]);
        setResults(null);
        if (timerRef.current) clearInterval(timerRef.current);
    }, [duration]);

    const finish = useCallback(() => {
        setIsRunning(false);
        if (timerRef.current) clearInterval(timerRef.current);

        const netWPM = Math.round(Math.max(0, (correctChars / 5) / (duration / 60)));
        const grossWPM = Math.round((typedChars / 5) / (duration / 60));
        const accuracy = typedChars ? Math.round((correctChars / typedChars) * 100) : 0;

        // Calculate Consistency
        const samples = wpmSamples.length > 0 ? wpmSamples : [netWPM];
        const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
        const squareDiffs = samples.map(v => Math.pow(v - avg, 2));
        const variance = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
        const stdDev = Math.sqrt(variance);
        const consistency = avg > 0 ? Math.max(0, Math.min(100, Math.round(100 - (stdDev / avg) * 100))) : 100;

        const finalResults = {
            grossWPM,
            netWPM,
            accuracy,
            consistency,
            mistakes: mistakesMap,
            samples
        };

        setResults(finalResults);
        if (onComplete) onComplete(finalResults);
    }, [correctChars, typedChars, duration, mistakesMap, wpmSamples, onComplete]);

    const start = useCallback(() => {
        if (isRunning) return;
        setIsRunning(true);
        setIsPaused(false);
        startTimeRef.current = Date.now();
        lastSampleTimeRef.current = Date.now();

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    finish();
                    return 0;
                }

                // Sample WPM every second
                const now = Date.now();
                if (now - lastSampleTimeRef.current >= 1000) {
                    const elapsedSec = (now - startTimeRef.current) / 1000;
                    const currentWPM = Math.round((correctChars / 5) / (elapsedSec / 60));
                    setWpmSamples(prevSamples => [...prevSamples, currentWPM]);
                    lastSampleTimeRef.current = now;
                }

                return prev - 1;
            });
        }, 1000);
    }, [isRunning, finish, correctChars]);

    const handleKey = useCallback((key) => {
        if (isPaused) return;
        if (!isRunning && currentIndex === 0 && key.length === 1) {
            start();
        }
        if (!isRunning) return;

        if (key === 'Backspace') {
            if (currentIndex > 0) {
                // We don't historically track correctness per index here easily without a buffer state
                // but for React we can handle this better. 
                // For now, simplified backspace:
                setCurrentIndex(prev => prev - 1);
            }
            return;
        }

        if (key.length !== 1) return;

        const expected = text[currentIndex];
        setTypedChars(prev => prev + 1);

        if (key === expected) {
            setCorrectChars(prev => prev + 1);
        } else {
            setMistakes(prev => prev + 1);
            const keyLabel = expected === ' ' ? 'Space' : expected;
            setMistakesMap(prev => ({
                ...prev,
                [keyLabel]: (prev[keyLabel] || 0) + 1
            }));
        }

        setCurrentIndex(prev => prev + 1);
        if (currentIndex + 1 >= text.length) {
            finish();
        }
    }, [isRunning, isPaused, currentIndex, text, start, finish]);

    useEffect(() => {
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, []);

    return {
        isRunning,
        isPaused,
        timeLeft,
        currentIndex,
        typedChars,
        correctChars,
        mistakes,
        results,
        handleKey,
        start,
        reset,
        setIsPaused
    };
};
