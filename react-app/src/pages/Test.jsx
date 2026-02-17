import React, { useState, useEffect } from 'react';
import TypingArena from '../features/arena/TypingArena';
import CompetitionTables from '../features/arena/CompetitionTables';
import ResultModal from '../features/arena/ResultModal';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { usePlatform } from '../context/PlatformContext';
import { AnimatePresence } from 'framer-motion';
import SEO from '../layouts/SEO';

const Metric = ({ label, value, unit, accent = "text-text-primary", cluster, compact }) => (
    <div className={`flex flex-col items-center justify-center ${cluster ? (compact ? 'min-w-[50px]' : 'min-w-[80px]') : 'text-right'}`}>
        <p className={`font-black text-text-muted uppercase tracking-widest leading-none ${compact ? 'text-[11px] mb-1' : 'text-[11px] mb-1.5'}`}>{label}</p>
        <p className={`font-black tracking-tighter leading-none ${accent} ${compact ? 'text-xl' : 'text-4xl'}`}>
            {value}
            <small className={`opacity-40 ml-0.5 uppercase ${compact ? 'text-[11px]' : 'text-xs'}`}>{unit}</small>
        </p>
    </div>
);

const AdUnit = ({ type = "leaderboard", className = "" }) => (
    <div className={`relative group overflow-hidden bg-bg-secondary border border-border/40 rounded-3xl p-4 flex items-center justify-center min-h-[100px] transition-all hover:border-accent/30 ${className}`}>
        <div className="absolute top-2 left-4 flex items-center gap-2">
            <span className="w-1 h-1 bg-accent/40 rounded-full animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40 group-hover:opacity-100 transition-opacity">Sponsored</span>
        </div>
        <div className="flex flex-col items-center">
            <div className="text-[11px] font-black uppercase tracking-widest text-text-muted/20 absolute -rotate-12 scale-150 pointer-events-none select-none">
                Google Ads Placement 728x90
            </div>
            <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="text-[11px] font-black border border-accent/20 px-3 py-1 rounded text-accent bg-accent/5 tracking-tighter">
                    PREMIUM DATA STREAM ADVERTISING
                </div>
                <div className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] opacity-40">
                    Revenue Optimized Engagement Area
                </div>
            </div>
        </div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent/10 rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent/10 rounded-bl-3xl" />
    </div>
);

const Sparkline = ({ values = [], height = 20, width = 60 }) => {
    if (values.length < 2) return <div style={{ height, width }} className="opacity-10 bg-accent/20 rounded-sm" />;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const points = values.map((v, i) => {
        const x = (i / (values.length - 1)) * width;
        const y = height - ((v - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');
    return (
        <svg width={width} height={height} className="overflow-visible">
            <path d={`M ${points}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/40" />
        </svg>
    );
};

const TestView = ({ isVisible = true }) => {
    const { user, login } = useAuth();
    const { updateProgress } = useProgress();
    const { latest, daily, monthly, submitResult } = useLeaderboard('test_arena');
    const { isAdActive } = usePlatform();
    const [difficulty, setDifficulty] = useState('normal');

    const difficultyText = {
        easy: "The small cat sat on the mat. It was a very sunny day in the park.",
        normal: "The quick brown fox jumps over the lazy dog with remarkable speed. Persistence is key to mastery.",
        difficult: "function execute(task) { return task.map(t => t.id === 0x4F ? null : t); } // Tactical Mode 0.1"
    };

    const onComplete = (results) => {
        const actualCPM = results.correctCount;
        const sessionData = {
            wpm: results.netWPM,
            accuracy: results.accuracy,
            mistakes: results.mistakes,
            cpm: actualCPM,
            mode: difficulty,
            userName: user?.displayName || 'Guest',
            typedWords: Math.round(results.correctCount / 5),
            typedChars: results.charCount
        };

        updateProgress({
            xp: Math.round(results.netWPM * results.accuracy / 10),
            weakKeys: results.mistakes,
            sessionResult: sessionData
        });

        submitResult({
            name: user?.displayName || 'Guest',
            wpm: results.netWPM,
            cpm: actualCPM,
            accuracy: results.accuracy,
            words: Math.round(results.correctCount / 5),
            chars: results.charCount,
            uid: user?.uid || 'guest',
            mode: difficulty,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    };

    const {
        isRunning,
        timeLeft,
        currentIndex,
        typedChars,
        correctChars,
        accuracyMap,
        results,
        handleKey,
        reset
    } = useTypingEngine(difficultyText[difficulty], 60, onComplete);

    const isActive = isRunning && currentIndex > 0;

    useEffect(() => {
        if (!isVisible) return;
        const handleKeyDown = (e) => { if (e.key === 'Escape') reset(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [reset, isVisible]);

    useEffect(() => { reset(); }, [difficulty, reset]);

    const currentWPM = Math.round((correctChars / 5) / ((60 - timeLeft) / 60) || 0);

    const sparklineData = React.useMemo(() => [...Array(10)].map(() => 40 + Math.random() * 20), []);

    return (
        <div className="relative max-w-6xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-10">
            <SEO
                title="Speed Test | How fast do you type?"
                description="Test your typing speed and see how you rank against other students worldwide."
            />
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            {isAdActive('top_banner') && (
                <AdUnit className={`${isActive ? 'opacity-0 scale-95 h-0 overflow-hidden' : 'opacity-100'} transition-all duration-700 relative z-10`} />
            )}
            <div className={`relative z-10 transition-all duration-700 flex flex-col md:flex-row items-center gap-4 bg-bg-secondary/50 p-2 rounded-3xl border border-border backdrop-blur-xl ${isActive ? 'opacity-10 blur-md scale-95' : 'opacity-100'}`}>
                <div className="flex items-center gap-4 flex-1 w-full md:w-auto px-2">
                    <h2 className="text-xl font-black tracking-tighter text-text-primary border-r border-border pr-4 hidden lg:block">SPEED <span className="text-accent">TEST</span></h2>
                    {!user && (
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-accent/5 border border-accent/20 rounded-lg animate-pulse">
                            <span className="text-xs">👋</span>
                            <button onClick={login} className="text-[11px] font-black uppercase tracking-widest text-accent hover:underline">Log In</button>
                        </div>
                    )}
                </div>
                <div className="flex bg-bg-primary rounded-2xl p-1 gap-1 border border-border/50 shadow-inner">
                    <Metric cluster compact label="TIME" value={timeLeft} unit="S" accent="text-accent" />
                    <div className="w-[1px] h-6 bg-border self-center mx-1" />
                    <div className="flex items-center">
                        <Metric cluster compact label="WPM" value={currentWPM} accent="text-text-primary" />
                        <div className="pr-2 pt-2"><Sparkline values={sparklineData} /></div>
                    </div>
                    <div className="w-[1px] h-6 bg-border self-center mx-1" />
                    <Metric cluster compact label="ACC" value={typedChars ? Math.round((correctChars / typedChars) * 100) : 100} unit="%" accent="text-green-500" />
                </div>
            </div>
            <div className={`relative z-10 transition-all duration-700 flex flex-col items-center justify-center gap-3 px-4 py-4 bg-bg-primary/30 rounded-2xl border border-border/50 ${isActive ? 'opacity-0 h-0 overflow-hidden -mt-4' : 'opacity-100'}`}>
                <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_8px_#eab308]" />
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">Select Difficulty:</p>
                </div>
                <div className="flex gap-2">
                    {['easy', 'normal', 'difficult'].map(mode => (
                        <button key={mode} onClick={() => setDifficulty(mode)} className={`px-8 py-2 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all border ${difficulty === mode ? 'bg-accent text-background border-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] scale-105' : 'bg-bg-secondary text-text-muted border-border hover:border-accent hover:text-text-primary'}`}>{mode}</button>
                    ))}
                </div>
            </div>
            <div className={`relative z-10 transition-all duration-500 transform ${isActive ? 'scale-105 -mt-8' : ''}`}>
                <TypingArena text={difficultyText[difficulty]} currentIndex={currentIndex} accuracyMap={accuracyMap} handleKey={handleKey} isRunning={isRunning} isFocusMode={isActive} currentWPM={currentWPM} isActive={isVisible} />
                <AnimatePresence>
                    {isActive && (
                        <motion.button initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onClick={reset} className="absolute -right-4 -top-4 w-14 h-14 bg-red-600 text-white rounded-2xl shadow-[0_10px_30px_rgba(220,38,38,0.4)] flex flex-col items-center justify-center border-2 border-white/20 hover:scale-110 active:scale-95 transition-transform z-50 group">
                            <span className="font-black text-xl leading-none">✕</span>
                            <span className="text-[11px] font-black uppercase tracking-tighter mt-1 opacity-60 group-hover:opacity-100">STOP</span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
            <div className={`relative z-10 space-y-4 transition-opacity duration-700 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex flex-col items-center gap-2">
                    <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.4em] flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-border" />
                        LIVE RANKINGS
                        <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-border" />
                    </h3>
                    <button onClick={reset} className="text-[11px] font-black text-accent/40 uppercase tracking-[0.2em] hover:text-accent hover:underline transition-all">Restart Speed Test (ESC)</button>
                </div>
                {isAdActive('content') && (
                    <AdUnit className="bg-accent/[0.02] border-accent/5" />
                )}
                <CompetitionTables
                    latestResults={latest.map(r => ({ ...r, isMe: r.uid === user?.uid }))}
                    dailyTop={daily.map(r => ({ ...r, isMe: r.uid === user?.uid }))}
                    monthlyTop={monthly.map(r => ({ ...r, isMe: r.uid === user?.uid }))}
                />
            </div>
            <ResultModal results={results} onRetry={reset} onClose={reset} />
        </div>
    );
};

export default TestView;
