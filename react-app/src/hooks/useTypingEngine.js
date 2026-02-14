import { useState, useEffect, useCallback, useRef } from 'react';

export const useTypingEngine = (text, duration = 60, onComplete) => {
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typedChars, setTypedChars] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [accuracyMap, setAccuracyMap] = useState({}); // { index: boolean }
    const [mistakesMap, setMistakesMap] = useState({});
    const [wpmSamples, setWpmSamples] = useState([]);
    const [results, setResults] = useState(null);

    const [currentWPM, setCurrentWPM] = useState(0);

    const timerRef = useRef(null);
    const startTimeRef = useRef(null);
    const lastSampleTimeRef = useRef(null);

    // Use refs for counters to avoid stale closures in intervals
    const correctCharsRef = useRef(0);
    const typedCharsRef = useRef(0);
    const mistakesMapRef = useRef({});
    const accuracyMapRef = useRef({});

    const reset = useCallback(() => {
        setIsRunning(false);
        setIsPaused(false);
        setTimeLeft(duration);
        setCurrentIndex(0);
        setTypedChars(0);
        setCorrectChars(0);
        setMistakes(0);
        setMistakesMap({});
        setAccuracyMap({});
        setWpmSamples([]);
        setResults(null);
        setCurrentWPM(0);
        correctCharsRef.current = 0;
        typedCharsRef.current = 0;
        mistakesMapRef.current = {};
        accuracyMapRef.current = {};
        if (timerRef.current) clearInterval(timerRef.current);
    }, [duration]);

    const finish = useCallback(() => {
        setIsRunning(false);
        if (timerRef.current) clearInterval(timerRef.current);

        const now = Date.now();
        const elapsedSec = startTimeRef.current ? (now - startTimeRef.current) / 1000 : duration;
        const effectiveTime = Math.max(1, elapsedSec); // Avoid division by zero

        const netWPM = Math.round(Math.max(0, (correctCharsRef.current / 5) / (effectiveTime / 60)));
        const grossWPM = Math.round((typedCharsRef.current / 5) / (effectiveTime / 60));
        const accuracy = typedCharsRef.current ? Math.round((correctCharsRef.current / typedCharsRef.current) * 100) : 0;

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
            mistakes: mistakesMapRef.current,
            samples,
            charCount: typedCharsRef.current,
            correctCount: correctCharsRef.current
        };

        setCurrentWPM(netWPM);
        setResults(finalResults);
        if (onComplete) onComplete(finalResults);
    }, [duration, wpmSamples, onComplete]);

    const start = useCallback(() => {
        if (isRunning) return;
        setIsRunning(true);
        setIsPaused(false);
        startTimeRef.current = Date.now();
        lastSampleTimeRef.current = Date.now();

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                const now = Date.now();
                const currentElapsed = (now - startTimeRef.current) / 1000;
                const activeWPM = Math.round((correctCharsRef.current / 5) / (Math.max(1, currentElapsed) / 60));
                setCurrentWPM(activeWPM);

                if (prev <= 1) {
                    finish();
                    return 0;
                }

                // Sample WPM every second
                if (now - lastSampleTimeRef.current >= 1000) {
                    setWpmSamples(prevSamples => [...prevSamples, activeWPM]);
                    lastSampleTimeRef.current = now;
                }

                return prev - 1;
            });
        }, 1000);
    }, [isRunning, finish]);

    const handleKey = useCallback((key) => {
        if (isPaused) return;
        if (!isRunning && currentIndex === 0 && key.length === 1) {
            start();
        }
        if (!isRunning) return;

        if (key === 'Backspace') {
            if (currentIndex > 0) {
                const prevIndex = currentIndex - 1;
                // If we are moving back, check if the char we're leaving was correct
                if (accuracyMapRef.current[prevIndex]) {
                    correctCharsRef.current = Math.max(0, correctCharsRef.current - 1);
                    setCorrectChars(correctCharsRef.current);
                }

                // Keep the mistake in accuracyMap even if backspaced? 
                // Usually persistent errors stay red even if you fix them in "hard" modes,
                // but for standard practice, we just move the pointer.
                setCurrentIndex(prev => prev - 1);
            }
            return;
        }

        if (key.length !== 1) return;

        const expected = text[currentIndex];
        typedCharsRef.current += 1;
        setTypedChars(typedCharsRef.current);

        if (key === expected) {
            correctCharsRef.current += 1;
            setCorrectChars(correctCharsRef.current);
            accuracyMapRef.current[currentIndex] = true;
        } else {
            setMistakes(prev => prev + 1);
            const keyLabel = expected === ' ' ? 'Space' : expected;
            mistakesMapRef.current[keyLabel] = (mistakesMapRef.current[keyLabel] || 0) + 1;
            setMistakesMap({ ...mistakesMapRef.current });
            accuracyMapRef.current[currentIndex] = false;
        }

        setAccuracyMap({ ...accuracyMapRef.current });
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
        typedChars: typedCharsRef.current,
        correctChars: correctCharsRef.current,
        mistakes,
        accuracyMap,
        currentWPM,
        results,
        handleKey,
        start,
        reset,
        setIsPaused
    };
};
