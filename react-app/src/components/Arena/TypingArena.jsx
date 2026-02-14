import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TypingArena = ({ text, currentIndex, mistakesMap, handleKey, isRunning }) => {
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

    // Split text into characters with metadata
    const chars = text.split('').map((char, i) => {
        let status = 'pending';
        if (i < currentIndex) {
            // In a real app, we'd store correctness per index. 
            // For now, let's assume if it's passed, it was typed.
            status = 'typed';
        } else if (i === currentIndex) {
            status = 'current';
        }
        return { char, i, status };
    });

    return (
        <div
            ref={containerRef}
            className="bg-card backdrop-blur-xl border border-border rounded-3xl p-8 min-h-[300px] relative font-mono text-2xl leading-relaxed select-none overflow-hidden"
        >
            <div className="relative z-10 flex flex-wrap gap-x-[1px]">
                {chars.map(({ char, i, status }) => (
                    <span
                        key={i}
                        className={`
                            relative transition-colors duration-150
                            ${status === 'typed' ? 'text-indigo-400' : ''}
                            ${status === 'current' ? 'text-white' : 'text-text-muted'}
                        `}
                    >
                        {status === 'current' && (
                            <motion.div
                                layoutId="caret"
                                className="absolute left-0 top-0 w-[2px] h-full bg-accent shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        )}
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </div>
            {!isRunning && currentIndex === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-20">
                    <p className="text-accent font-bold animate-pulse">Start typing to begin...</p>
                </div>
            )}
        </div>
    );
};

export default TypingArena;
