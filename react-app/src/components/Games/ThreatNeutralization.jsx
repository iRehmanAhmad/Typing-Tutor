import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Tactical Word Data ---
const WORD_POOL = [
    'FIREWALL', 'ENCRYPTION', 'UPLINK', 'MAINFRAME', 'DATABASE', 'PROTOCOL',
    'MALWARE', 'SYSLOG', 'NETWORK', 'BACKDOOR', 'SERVER', 'TERMINAL',
    'QUANTUM', 'ROUTER', 'PACKET', 'OVERRIDE', 'BITCOIN', 'ETHICAL',
    'KERNEL', 'PROCESS', 'THREADS', 'VIRTUAL', 'SANDBOX', 'PAYLOAD',
    'INTRUSION', 'SCANNING', 'HACKING', 'RECOVERY', 'FIREWIRE', 'ETHERNET'
];

// --- Particle Component ---
const ParticleBurst = ({ x, y, color = 'bg-cyan-400' }) => {
    const particles = useMemo(() => [...Array(12)].map((_, i) => ({
        id: i,
        angle: (i / 12) * Math.PI * 2,
        dist: 40 + Math.random() * 40,
        size: 2 + Math.random() * 4
    })), []);

    return (
        <div className="absolute inset-0 pointer-events-none" style={{ left: `${x}%`, top: `${y}%` }}>
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                        x: Math.cos(p.angle) * p.dist,
                        y: Math.sin(p.angle) * p.dist,
                        opacity: 0,
                        scale: 0
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`absolute rounded-full ${color}`}
                    style={{ width: p.size, height: p.size }}
                />
            ))}
        </div>
    );
};

const ThreatNeutralization = ({ onAbort }) => {
    const [gameState, setGameState] = useState('briefing'); // 'briefing', 'active', 'gameover'
    const [activeWords, setActiveWords] = useState([]); // [{ id, word, x, y, speed }]
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('threat_high_score') || 0));
    const [shields, setShields] = useState(3);
    const [glitchEffect, setGlitchEffect] = useState(false);
    const [bursts, setBursts] = useState([]); // [{ id, x, y, color }]
    const [wave, setWave] = useState(1);
    const [waveAnimation, setWaveAnimation] = useState(false);
    const [invalidKeyTrigger, setInvalidKeyTrigger] = useState(0);

    const gameLoopRef = useRef(null);
    const spawnTimerRef = useRef(null);
    const inputRef = useRef(null);
    const nextIdRef = useRef(0);
    const scoreRef = useRef(0);

    // Maintain focus on input
    useEffect(() => {
        const interval = setInterval(() => {
            if (gameState === 'active' && inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);
        return () => clearInterval(interval);
    }, [gameState]);

    // Initial countdown for briefing
    const [countdown, setCountdown] = useState(3);
    useEffect(() => {
        if (gameState === 'briefing') {
            const t = setInterval(() => {
                setCountdown(c => {
                    if (c === 1) {
                        setGameState('active');
                        setWaveAnimation(true);
                        setTimeout(() => setWaveAnimation(false), 2000);
                        return 0;
                    }
                    return c - 1;
                });
            }, 1000);
            return () => clearInterval(t);
        }
    }, [gameState]);

    // Difficulty & Wave Logic
    useEffect(() => {
        const nextWaveScore = wave * 1500;
        if (score >= nextWaveScore) {
            setWave(w => w + 1);
            setWaveAnimation(true);
            setTimeout(() => setWaveAnimation(false), 2000);
        }
    }, [score, wave]);

    // Auto-clear input if the word it was matching is gone
    useEffect(() => {
        if (input && !activeWords.some(w => w.word.startsWith(input))) {
            setInput('');
        }
    }, [activeWords, input]);

    // Derived states
    const potentialTargets = useMemo(() => {
        if (!input) return [];
        return activeWords.filter(w => w.word.startsWith(input));
    }, [input, activeWords]);

    const isHardLocked = potentialTargets.length === 1;

    // Handle Strict Input via KeyDown
    const handleKeyDown = (e) => {
        if (gameState !== 'active') return;

        const key = e.key.toUpperCase();

        // Command Keys
        if (key === 'BACKSPACE' || key === ' ') {
            e.preventDefault();
            setInput('');
            return;
        }

        // Only allow A-Z
        if (key.length !== 1 || !/[A-Z]/.test(key)) {
            // Logic keys like Tab, Enter shouldn't trigger shiver but should be prevented
            if (key !== 'TAB' && key !== 'ENTER') e.preventDefault();
            return;
        }

        e.preventDefault(); // Always prevent default to keep strict controlled state

        const nextInput = input + key;
        const hasMatch = activeWords.some(w => w.word.startsWith(nextInput));

        if (hasMatch) {
            setInput(nextInput);

            // Check for immediate neutralization
            const matchIndex = activeWords.findIndex(w => w.word === nextInput);
            if (matchIndex !== -1) {
                const word = activeWords[matchIndex];

                // Trigger burst
                const burstId = Date.now();
                setBursts(prev => [...prev, { id: burstId, x: word.x, y: word.y, color: 'bg-cyan-400' }]);
                setTimeout(() => setBursts(prev => prev.filter(b => b.id !== burstId)), 700);

                // Update score & words
                const addedScore = word.word.length * 10 * wave;
                setScore(s => s + addedScore);
                scoreRef.current += addedScore;
                setActiveWords(prev => prev.filter((_, i) => i !== matchIndex));
                setInput('');
            }
        } else {
            // Invalid key shiver
            setInvalidKeyTrigger(prev => prev + 1);
        }
    };

    // Game Loop (Moving words)
    useEffect(() => {
        if (gameState !== 'active') return;

        const moveWords = () => {
            setActiveWords(prev => {
                let breached = false;
                const next = prev.map(w => ({ ...w, y: w.y + w.speed })).filter(w => {
                    if (w.y >= 105) {
                        breached = true;
                        return false;
                    }
                    return true;
                });

                if (breached) {
                    setShields(s => {
                        const nextS = s - 1;
                        if (nextS <= 0) {
                            setGameState('gameover');
                            return 0;
                        }
                        setGlitchEffect(true);
                        setTimeout(() => setGlitchEffect(false), 400);
                        return nextS;
                    });
                }
                return next;
            });
            gameLoopRef.current = requestAnimationFrame(moveWords);
        };

        gameLoopRef.current = requestAnimationFrame(moveWords);
        return () => cancelAnimationFrame(gameLoopRef.current);
    }, [gameState]);

    // Spawning words
    useEffect(() => {
        if (gameState !== 'active') return;

        const spawnWord = () => {
            const word = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
            const x = Math.floor(Math.random() * 70) + 15; // 15% to 85%

            // Difficulty scaling
            const baseSpeed = 0.12 + (wave * 0.03) + (score / 20000);
            const speed = baseSpeed + (Math.random() * 0.05);

            setActiveWords(prev => [...prev, {
                id: nextIdRef.current++,
                word,
                x,
                y: -10,
                speed
            }]);

            const nextSpawnDelay = Math.max(600, 2200 - (wave * 200) - (score / 100));
            spawnTimerRef.current = setTimeout(spawnWord, nextSpawnDelay);
        };

        spawnTimerRef.current = setTimeout(spawnWord, 1000);
        return () => clearTimeout(spawnTimerRef.current);
    }, [gameState, score, wave]);

    // Track High Score
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('threat_high_score', score);
        }
    }, [score, highScore]);

    return (
        <motion.div
            animate={glitchEffect ? { x: [-10, 10, -5, 5, 0], filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'] } : {}}
            transition={{ duration: 0.3 }}
            className={`h-full flex flex-col gap-6 relative overflow-hidden transition-colors duration-500 ${shields === 1 ? 'bg-red-500/5' : ''}`}
        >
            {/* Header HUD */}
            <div className="flex justify-between items-center bg-bg-secondary/50 p-4 rounded-2xl border border-border mt-2 backdrop-blur-md relative z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onAbort} className="w-8 h-8 flex items-center justify-center rounded-lg bg-bg-tertiary hover:bg-accent hover:text-white transition-colors">
                        ←
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-black italic uppercase text-lg leading-none text-purple-500">Threat Neutralization</h2>
                            <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded border border-purple-500/30 font-black">WAVE_{wave}</span>
                        </div>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mt-1">
                            {gameState === 'gameover' ? 'CRITICAL_FAILURE' : 'DEFENSE_ACTIVE'}
                        </p>
                    </div>
                </div>

                <div className="flex gap-12">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-text-muted uppercase mb-1">Mainframe Shields</p>
                        <div className="flex gap-2 justify-end">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={i < shields ? { opacity: 1, scale: 1 } : { opacity: 0.2, scale: 0.8 }}
                                    className={`w-8 h-2 rounded-full transition-all duration-500 ${i < shields ? 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]' : 'bg-red-500 shadow-none'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="text-right min-w-[80px]">
                        <p className="text-[10px] font-black text-text-muted uppercase">Tactical Score</p>
                        <p className="text-2xl font-black text-text-primary tabular-nums tracking-tighter">{score.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Game Arena */}
            <div className="flex-1 bg-bg-secondary border border-border rounded-3xl relative overflow-hidden group shadow-inner">
                {/* Background Grid Layer */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 3px 100%' }} />
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {/* HUD Background Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none overflow-hidden">
                    <h1 className="text-[25vw] font-black italic uppercase tracking-tighter transform -rotate-12 translate-y-10 whitespace-nowrap">
                        THREAT_LEVEL_{wave}
                    </h1>
                </div>

                {/* Particles */}
                {bursts.map(b => (
                    <ParticleBurst key={b.id} x={b.x} y={b.y} color={b.color} />
                ))}

                <AnimatePresence>
                    {activeWords.map((w) => {
                        const isCandidate = input.length > 0 && w.word.startsWith(input);
                        const isTargeted = isHardLocked && w.word.startsWith(input);
                        return (
                            <motion.div
                                key={w.id}
                                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                animate={{ opacity: 1, scale: 1, top: `${w.y}%`, left: `${w.x}%` }}
                                exit={{ scale: 2, opacity: 0 }}
                                className={`absolute -translate-x-1/2 flex flex-col items-center z-10 ${isTargeted ? 'z-20' : ''}`}
                            >
                                {/* Target Visuals */}
                                {isTargeted && (
                                    <motion.div
                                        initial={{ scale: 1.5, rotate: 0 }}
                                        animate={{ scale: 1.1, rotate: 90 }}
                                        className="absolute -inset-4 border-2 border-cyan-400 rounded-lg pointer-events-none z-20"
                                    />
                                )}

                                {isCandidate && !isTargeted && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute -inset-2 border border-orange-500/50 bg-orange-500/5 rounded-lg pointer-events-none"
                                    />
                                )}

                                <div className={`
                                    flex font-mono text-xl font-black tracking-widest px-4 py-1.5 rounded-lg border transition-all duration-200
                                    ${isTargeted ? 'bg-cyan-400/20 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-110' :
                                        isCandidate ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' :
                                            'bg-bg-primary/60 border-border/40 text-text-primary opacity-80'}
                                `}>
                                    {w.word.split('').map((char, i) => {
                                        const isTyped = (isTargeted || isCandidate) && i < input.length;
                                        return (
                                            <span
                                                key={i}
                                                className={`
                                                    transition-all duration-75
                                                    ${isTyped
                                                        ? isTargeted
                                                            ? 'text-white drop-shadow-[0_0_12px_cyan] scale-110'
                                                            : 'text-white/90 drop-shadow-[0_0_8px_white]'
                                                        : ''}
                                                `}
                                            >
                                                {char}
                                            </span>
                                        );
                                    })}
                                </div>

                                {/* Distance bar */}
                                <div className="w-full h-0.5 bg-border/30 mt-1 rounded-full overflow-hidden">
                                    <div className={`h-full transition-all ${w.y > 80 ? 'bg-red-500' : 'bg-accent/40'}`} style={{ width: `${w.y}%` }} />
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Overlays */}
                {gameState === 'briefing' && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary/90 backdrop-blur-xl">
                        <motion.span initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-9xl font-black text-purple-500 italic uppercase tabular-nums">{countdown}</motion.span>
                    </div>
                )}

                {gameState === 'gameover' && (
                    <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-bg-primary/95 backdrop-blur-2xl rounded-2xl space-y-8">
                        <h1 className="text-7xl font-black italic uppercase text-red-500 tracking-tighter">MAINFRAME_BREACHED</h1>
                        <p className="text-4xl font-black text-text-primary">SCORE: {score.toLocaleString()}</p>
                        <button onClick={() => {
                            setScore(0); scoreRef.current = 0; setShields(3); setWave(1); setActiveWords([]); setGameState('briefing'); setCountdown(3); setInput('');
                        }} className="px-10 py-4 rounded-xl bg-purple-500 text-white font-black uppercase hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]">RE_INITIALIZE</button>
                        <button onClick={onAbort} className="px-10 py-4 rounded-xl border border-border text-text-muted">ABORT</button>
                    </div>
                )}
            </div>

            {/* Input HUD */}
            <motion.div
                animate={invalidKeyTrigger > 0 ? { x: [-4, 4, -4, 4, 0] } : {}}
                className="relative group p-1 bg-border/20 rounded-3xl backdrop-blur-md"
            >
                <div className={`absolute inset-0 bg-purple-500/10 rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-md`} />
                <div className={`relative bg-bg-secondary/80 border-2 rounded-2xl overflow-hidden transition-all h-24 flex items-center ${invalidKeyTrigger > 0 ? 'border-red-500' : 'border-border group-focus-within:border-purple-500'}`}>
                    <input
                        ref={inputRef}
                        autoFocus
                        type="text"
                        value={input}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        spellCheck="false"
                        disabled={gameState !== 'active'}
                        placeholder={gameState === 'active' ? (isHardLocked ? "LOCKED_ON_TARGET" : "SCANNING_WELL...") : ""}
                        className={`w-full bg-transparent px-20 text-center text-5xl font-black tracking-[0.3em] outline-none transition-all ${isHardLocked ? 'text-cyan-400' : 'text-text-primary'}`}
                    />

                    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-4">
                        <span className="text-xs font-black text-text-muted tabular-nums">{input.length}_CHARS</span>
                        <div className={`w-3 h-3 rounded-full ${gameState === 'active' ? 'bg-purple-500 animate-pulse' : 'bg-bg-tertiary'}`} />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ThreatNeutralization;
