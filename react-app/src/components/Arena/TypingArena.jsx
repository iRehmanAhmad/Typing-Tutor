import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TypingArena = ({ text, currentIndex, accuracyMap, handleKey, isRunning, isFocusMode }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            handleKey(e.key);
            if (e.key === ' ' || e.key === 'Backspace') e.preventDefault();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKey]);

    const chars = text.split('').map((char, i) => {
        let status = 'pending';
        if (i < currentIndex) status = accuracyMap?.[i] === false ? 'incorrect' : 'correct';
        else if (i === currentIndex) status = 'current';

        let opacity = 1;
        if (isFocusMode && i > currentIndex) {
            const distance = Math.abs(i - currentIndex);
            if (distance > 20) opacity = 0.3;
            else if (distance > 10) opacity = 0.6;
        }

        return { char, i, status, opacity };
    });

    return (
        <div
            ref={containerRef}
            className={`
                bg-bg-secondary backdrop-blur-xl border border-border rounded-3xl p-10 min-h-[320px] relative font-mono text-3xl leading-relaxed select-none transition-all duration-700
                ${isFocusMode ? 'shadow-[0_0_50px_rgba(var(--accent-rgb),0.1)]' : 'shadow-2xl'}
            `}
        >
            <div className="relative z-10 flex flex-wrap gap-x-[1px]">
                {chars.map(({ char, i, status, opacity }) => (
                    <span
                        key={i}
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
                ))}
            </div>
        </div>
    );
};

export default TypingArena;
