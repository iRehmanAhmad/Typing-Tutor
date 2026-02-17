import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypingArena = forwardRef(({ text, currentIndex, accuracyMap, handleKey, isRunning, isFocusMode, currentWPM = 0, isCompact = false, isActive = true }, ref) => {
    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    useImperativeHandle(ref, () => containerRef.current, []);

    const focusInput = () => {
        if (isMobile && inputRef.current) {
            inputRef.current.focus();
        } else if (containerRef.current) {
            containerRef.current.focus();
        }
    };

    const handleContainerClick = () => {
        focusInput();
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value.length > 0) {
            handleKey(value.slice(-1));
        }
        e.target.value = '';
    };

    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            if (isMobile) return;
            handleKey(e.key);
            if (e.key === ' ' || e.key === 'Backspace') e.preventDefault();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKey, isActive, isMobile]);

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
        <>
            {isMobile && (
                <input
                    ref={inputRef}
                    type="text"
                    className="opacity-0 absolute pointer-events-none"
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                            handleKey('Backspace');
                        }
                        e.preventDefault();
                    }}
                    inputMode="text"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                />
            )}
            <div
                ref={containerRef}
                tabIndex={0}
                onClick={handleContainerClick}
                aria-label="Typing area. Press keys to type."
                className={`
                    bg-bg-secondary backdrop-blur-xl border rounded-3xl relative font-mono select-none transition-all duration-700 outline-none focus:ring-2 focus:ring-accent/50
                    overflow-hidden flex flex-col
                    ${isCompact ? 'p-4 text-xl md:text-2xl leading-relaxed' : 'p-6 md:p-10 text-3xl leading-relaxed'}
                    ${getHeatColor()}
                `}
                style={{ maxHeight: isCompact ? '280px' : '600px' }}
            >
            {/* Heat Status Indicator */}
            <AnimatePresence>
                {isRunning && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className={`absolute flex items-center gap-2 z-20 ${isCompact ? 'top-2 left-4' : 'top-4 left-6'}`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full animate-ping ${currentWPM > 40 ? (currentWPM > 80 ? 'bg-accent' : 'bg-green-500') : 'bg-blue-500'}`} />
                        <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${getHeatText()}`}>
                            {currentWPM > 80 ? 'FAST TYPING!' : (currentWPM > 40 ? 'KEEP GOING!' : 'READY...')}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`relative z-10 flex flex-wrap gap-y-2 md:gap-y-4 content-start overflow-y-auto custom-scrollbar pr-2 md:pr-4 h-full ${isCompact ? 'pb-4' : 'pb-10'}`}>
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
                                                    className={`absolute left-1/2 -track-x-1/2 whitespace-nowrap bg-accent text-background px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] shadow-xl shadow-accent/40 z-[100] ${isCompact ? '-top-12' : '-top-14'}`}
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
        </>
    );
});

export default TypingArena;
