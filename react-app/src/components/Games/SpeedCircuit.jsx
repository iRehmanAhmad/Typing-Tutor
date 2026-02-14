import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypingEngine } from '../../hooks/useTypingEngine';
import TypingArena from '../Arena/TypingArena';
import { useAuth } from '../../context/AuthContext';
import { useLeaderboard } from '../../hooks/useLeaderboard';

// --- Bot Configuration ---
const OPPONENTS = [
    { id: 'bot_1', name: 'Viper [AI]', wpm: 90, color: 'text-red-500', bg: 'bg-red-500', icon: '🏎️' },
    { id: 'bot_2', name: 'Ghost [AI]', wpm: 65, color: 'text-purple-500', bg: 'bg-purple-500', icon: '🚔' },
    { id: 'bot_3', name: 'Unit-734', wpm: 45, color: 'text-blue-500', bg: 'bg-blue-500', icon: '🚙' }
];

const RACE_TEXTS = [
    "The data stream is encrypted with a quantum key. You must type simultaneously to bypass the firewall. Speed is the only variable that matters now. Initiation sequence starting in three seconds.",
    "Pursuit is active. Extract the payload and evade capture. The neural link is unstable so precision is required to maintain velocity. Do not let the interceptors overtake your position.",
    "System breach detected. Counter-measures are deploying. We need to override the mainframe access codes manually. Fast fingers save lives in this sector. drive the signal home."
];

const SpeedCircuit = ({ onAbort }) => {
    const [gameState, setGameState] = useState('briefing'); // 'briefing', 'racing', 'finished'
    const [countdown, setCountdown] = useState(3);
    const [botProgress, setBotProgress] = useState({ bot_1: 0, bot_2: 0, bot_3: 0 });
    const [playerFinished, setPlayerFinished] = useState(false);
    const [raceResult, setRaceResult] = useState(null);
    const { user } = useAuth();
    const { submitResult } = useLeaderboard('speed_circuit');
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [screenShake, setScreenShake] = useState(false);
    const overtookBots = useRef(new Set());

    const [raceText] = useState(() => RACE_TEXTS[Math.floor(Math.random() * RACE_TEXTS.length)]);

    const {
        currInput,
        handleKey,
        currentIndex,
        correctChars,
        accuracy,
        isRunning,
        reset,
        accuracyMap,
        wpm: engineWPM
    } = useTypingEngine(raceText, 300, null);

    useEffect(() => {
        if (gameState === 'racing') {
            if (!startTime) setStartTime(Date.now());
            const interval = setInterval(() => {
                setElapsedTime((Date.now() - (startTime || Date.now())) / 1000);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [gameState, startTime]);

    const currentWPM = useMemo(() => {
        if (elapsedTime <= 0) return 0;
        return Math.round((correctChars / 5) / (elapsedTime / 60));
    }, [correctChars, elapsedTime]);

    useEffect(() => {
        if (gameState === 'briefing') {
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev === 1) {
                        setGameState('racing');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameState]);

    useEffect(() => {
        if (gameState !== 'racing') return;
        const interval = setInterval(() => {
            setBotProgress(prev => {
                const newProgress = {};
                OPPONENTS.forEach(bot => {
                    const variance = (Math.random() * 10) - 5;
                    const effectiveWPM = bot.wpm + variance;
                    const next = Math.min(100, (prev[bot.id] || 0) + (((effectiveWPM * 5) / 60) / raceText.length) * 100 * 0.1);
                    newProgress[bot.id] = next;
                });
                return newProgress;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [gameState, raceText.length]);

    const playerProgress = Math.min(100, (correctChars / raceText.length) * 100);

    useEffect(() => {
        OPPONENTS.forEach(bot => {
            if (playerProgress > botProgress[bot.id] && !overtookBots.current.has(bot.id) && botProgress[bot.id] > 5) {
                overtookBots.current.add(bot.id);
                setScreenShake(true);
                setTimeout(() => setScreenShake(false), 300);
            }
        });
    }, [playerProgress, botProgress]);

    useEffect(() => {
        if (gameState !== 'racing') return;
        if (playerProgress >= 100 || Object.values(botProgress).some(p => p >= 100)) finishRace();
    }, [playerProgress, botProgress, gameState]);

    const finishRace = () => {
        setGameState('finished');
        setPlayerFinished(true);

        let rank = 1;
        OPPONENTS.forEach(bot => {
            if (botProgress[bot.id] > playerProgress) rank++;
            else if (botProgress[bot.id] >= 100 && playerProgress < 100) rank++;
        });
        setRaceResult(rank);

        submitResult({
            name: user?.displayName || 'Guest',
            uid: user?.uid || 'guest',
            wpm: currentWPM,
            accuracy: accuracy,
            rank: rank,
            words: Math.round(correctChars / 5),
            chars: correctChars,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    };

    const handleReset = () => {
        reset();
        setGameState('briefing');
        setCountdown(3);
        setBotProgress({ bot_1: 0, bot_2: 0, bot_3: 0 });
        setPlayerFinished(false);
        setRaceResult(null);
        setStartTime(null);
        setElapsedTime(0);
        overtookBots.current.clear();
    };

    const handleRaceInput = (key) => {
        if (gameState === 'briefing' && key.length === 1) {
            setGameState('racing');
            handleKey(key);
            return;
        }
        if (gameState === 'racing') handleKey(key);
    };

    return (
        <motion.div animate={screenShake ? { x: [-2, 2, -2, 2, 0], y: [-1, 1, -1, 1, 0] } : {}} transition={{ duration: 0.2 }} className="h-full flex flex-col gap-6 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center bg-bg-secondary/50 p-4 rounded-2xl border border-border">
                <div className="flex items-center gap-4">
                    <button onClick={onAbort} className="w-8 h-8 flex items-center justify-center rounded-lg bg-bg-tertiary hover:bg-accent hover:text-white transition-colors">←</button>
                    <div>
                        <h2 className="font-black italic uppercase text-lg leading-none text-orange-500">Speed Circuit</h2>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{gameState === 'briefing' ? 'System Check...' : gameState === 'finished' ? 'Operation Complete' : 'Extraction in Progress'}</p>
                    </div>
                </div>
                <div className="text-right">
                    {gameState === 'briefing' ? <span className="text-4xl font-black text-accent animate-pulse">{countdown}</span> : (
                        <div className="flex gap-6">
                            <div className="text-right"><p className="text-[10px] font-black text-text-muted uppercase">Rank</p><p className="text-xl font-black text-text-primary">{raceResult ? `#${raceResult}` : '...'}</p></div>
                            <div className="text-right"><p className="text-[10px] font-black text-text-muted uppercase">Velocity</p><div className="flex items-baseline gap-1"><p className={`text-xl font-black transition-all ${currentWPM > 80 ? 'text-yellow-400 drop-shadow-[0_0_8px_#fac904]' : 'text-accent'}`}>{currentWPM}</p><span className="text-xs text-text-muted font-black uppercase">WPM</span></div></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-bg-secondary border border-border rounded-3xl p-6 space-y-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div className="relative h-8 bg-bg-tertiary rounded-xl overflow-visible flex items-center px-2">
                    <motion.div className="absolute top-1/2 -translate-y-[62%] left-0 z-20 drop-shadow-lg flex flex-col items-center" animate={{ left: `${playerProgress}%` }} transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
                        <AnimatePresence>
                            {currentWPM > 40 && (
                                <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: Math.min(0.6, (currentWPM - 40) / 100), scaleX: 1 + (currentWPM / 100), x: -40 }} exit={{ opacity: 0 }} className="absolute right-full top-1/2 -translate-y-1/2 h-4 w-20 bg-gradient-to-r from-transparent to-cyan-400 rounded-full blur-sm pointer-events-none origin-right" />
                            )}
                        </AnimatePresence>
                        <span className="text-6xl inline-block -scale-x-100 filter drop-shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)]">🏎️</span>
                        <div className="absolute -top-8 text-[10px] font-black uppercase text-accent bg-bg-primary px-1 rounded shadow-sm whitespace-nowrap border border-accent/20">YOU</div>
                    </motion.div>
                    <div className="w-full h-1.5 bg-border/50 rounded-full overflow-hidden"><motion.div className="h-full bg-accent relative" style={{ width: `${playerProgress}%` }}><div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/30 to-transparent" /></motion.div></div>
                </div>
                {OPPONENTS.map(bot => (
                    <div key={bot.id} className="relative h-6 bg-bg-tertiary/50 rounded-lg overflow-visible flex items-center px-2 opacity-80 mt-6">
                        <motion.div className="absolute top-1/2 -translate-y-[58%] left-0 z-10 grayscale hover:grayscale-0 transition-all" animate={{ left: `${botProgress[bot.id] || 0}%` }}><span className="text-4xl inline-block -scale-x-100">{bot.icon}</span></motion.div>
                        <div className="w-full h-1 bg-border/30 rounded-full overflow-hidden"><motion.div className="h-full ${bot.bg}" style={{ width: `${botProgress[bot.id] || 0}%` }} /></div>
                    </div>
                ))}
            </div>
            <div className="flex-1 relative">
                {gameState === 'finished' && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-bg-primary/95 backdrop-blur-xl rounded-3xl space-y-6 border border-border/50">
                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-2">
                            <h1 className="text-5xl font-black italic uppercase text-accent tracking-tighter drop-shadow-[0_0_20px_#fac904]">
                                {raceResult === 1 ? '🥇 VICTORY' : raceResult === 2 ? '🥈 2ND PLACE' : raceResult === 3 ? '🥉 3RD PLACE' : '❌ ELIMINATED'}
                            </h1>
                            <p className="text-text-muted font-black uppercase tracking-[0.3em] text-xs">Operational Parameters Exceeded</p>
                        </motion.div>
                        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                            <div className="bg-bg-tertiary p-4 rounded-2xl border border-border text-center"><p className="text-[10px] font-black text-text-muted uppercase">Avg Velocity</p><p className="text-2xl font-black text-text-primary">{currentWPM} <span className="text-xs uppercase">WPM</span></p></div>
                            <div className="bg-bg-tertiary p-4 rounded-2xl border border-border text-center"><p className="text-[10px] font-black text-text-muted uppercase">Accuracy</p><p className="text-2xl font-black text-text-primary">{accuracy}%</p></div>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={onAbort} className="px-8 py-3 rounded-xl bg-bg-secondary text-text-primary font-bold uppercase hover:bg-bg-tertiary transition-all border border-border">Return to Base</button>
                            <button onClick={handleReset} className="px-8 py-3 rounded-xl bg-accent text-background font-black uppercase hover:shadow-[0_0_20px_#fac904] transition-all">Re-Deploy</button>
                        </div>
                    </div>
                )}
                <TypingArena text={raceText} currentIndex={currentIndex} accuracyMap={accuracyMap} handleKey={handleRaceInput} isRunning={gameState === 'racing'} isFocusMode={gameState === 'racing'} currentWPM={currentWPM} />
            </div>
        </motion.div>
    );
};

export default SpeedCircuit;
