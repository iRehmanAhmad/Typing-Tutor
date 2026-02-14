import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypingArena = ({ text, currentIndex, accuracyMap, handleKey, isRunning, isFocusMode, currentWPM = 0 }) => {
    const containerRef = useRef(null);

    // Heat Color Logic: Blue -> Green -> Gold
    const getHeatColor = () => {
        if (!isRunning) return 'border-border';
        if (currentWPM > 80) return 'border-accent shadow-[0_0_50px_rgba(var(--accent-rgb),0.2)]';
        if (currentWPM > 40) return 'border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.15)]';
        return 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]';
    };

    const getHeatText = () => {
        if (!isRunning) return '';
        if (currentWPM > 80) return 'text-accent';
        if (currentWPM > 40) return 'text-green-500';
        return 'text-blue-500';
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            handleKey(e.key);
            if (e.key === ' ' || e.key === 'Backspace') e.preventDefault();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKey]);

    const words = React.useMemo(() => {
        const result = [];
        let currentWord = [];
        text.split('').forEach((char, index) => {
            currentWord.push({ char, index });
            if (char === ' ') {
                result.push(currentWord);
                currentWord = [];
            }
        });
        if (currentWord.length > 0) result.push(currentWord);
        return result;
    }, [text]);

    return (
        <div
            ref={containerRef}
            className={`
                bg-bg-secondary backdrop-blur-xl border rounded-3xl p-10 relative font-mono text-3xl leading-relaxed select-none transition-all duration-700
                overflow-hidden flex flex-col
                ${getHeatColor()}
            `}
            style={{ maxHeight: '600px' }}
        >
            {/* Heat Status Indicator */}
            <AnimatePresence>
                {isRunning && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute top-4 left-6 flex items-center gap-2 z-20"
                    >
                        <span className={`w-1.5 h-1.5 rounded-full animate-ping ${currentWPM > 40 ? (currentWPM > 80 ? 'bg-accent' : 'bg-green-500') : 'bg-blue-500'}`} />
                        <span className={`text-[8px] font-black uppercase tracking-[0.3em] ${getHeatText()}`}>
                            {currentWPM > 80 ? 'ELITE STREAK' : (currentWPM > 40 ? 'PERFORMANCE NOMINAL' : 'INITIALIZING STREAM')}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-wrap gap-y-4 content-start overflow-y-auto custom-scrollbar pr-4 pb-10 h-full">
                {words.map((word, wordIndex) => (
                    <div key={wordIndex} className="flex gap-x-[1px]">
                        {word.map(({ char, index }) => {
                            let status = 'pending';
                            if (index < currentIndex) status = accuracyMap?.[index] === false ? 'incorrect' : 'correct';
                            else if (index === currentIndex) status = 'current';

                            let opacity = 1;
                            if (isFocusMode && index > currentIndex) {
                                const distance = Math.abs(index - currentIndex);
                                if (distance > 20) opacity = 0.3;
                                else if (distance > 10) opacity = 0.6;
                            }

                            return (
                                <span
                                    key={index}
                                    style={{ opacity: status === 'pending' ? opacity : 1 }}
                                    className={`
                                        relative transition-all duration-300
                                        ${status === 'correct' ? 'text-accent' : ''}
                                        ${status === 'incorrect' ? 'text-red-500 bg-red-500/10 rounded-sm' : ''}
                                        ${status === 'current' ? 'text-text-primary' : ''}
                                        ${status === 'pending' ? 'text-text-muted' : ''}
                                    `}
                                >
                                    {status === 'current' && (
                                        <div className="absolute inset-0 pointer-events-none">
                                            {!isRunning && currentIndex === 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0.3, scale: 0.95 }}
                                                    animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                    className="absolute -inset-2 bg-accent/20 rounded-lg blur-md"
                                                />
                                            )}
                                            <motion.div
                                                layoutId="caret"
                                                className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.8)]"
                                                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                            />
                                            {!isRunning && currentIndex === 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-accent text-background px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] shadow-xl shadow-accent/40 z-[100]"
                                                >
                                                    TYPE HERE TO START
                                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rotate-45" />
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TypingArena;
