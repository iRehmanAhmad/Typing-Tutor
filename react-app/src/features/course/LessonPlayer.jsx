import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypingEngine } from '../../hooks/useTypingEngine';
import TypingArena from '../Arena/TypingArena';
import VirtualKeyboard from '../Arena/VirtualKeyboard';
import ResultModal from '../Arena/ResultModal';
import { useProgress } from '../../context/ProgressContext';

const LessonPlayer = ({ subLesson, onClose, isInline = false }) => {
    const { updateProgress } = useProgress();

    const onComplete = (results) => {
        // Update progress including the specific sub-lesson completion
        updateProgress({
            xp: Math.round(results.netWPM * results.accuracy / 10),
            weakKeys: results.mistakes,
            completedSubLessons: [{ id: subLesson.id, stars: results.accuracy >= 98 ? 3 : results.accuracy >= 95 ? 2 : 1 }],
            sessionResult: {
                wpm: results.netWPM,
                accuracy: results.accuracy,
                mistakes: results.mistakes,
                lessonId: subLesson.id
            }
        });
    };

    const isPractice = subLesson.type === 'practice';
    // Always call the hook, passing safe defaults if not practice to avoid conditional hook errors
    const engine = useTypingEngine(
        isPractice ? subLesson.text : "",
        isPractice ? subLesson.duration : 0,
        isPractice ? onComplete : () => { }
    );

    // Prevent background scroll only when player is NOT inline (i.e. modal mode)
    useEffect(() => {
        if (!isInline) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = 'auto'; };
        }
    }, [isInline]);

    const content = (
        <>
            {/* Backdrop Blur - Only for Modal Mode */}
            {!isInline && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[99998] bg-black/60 backdrop-blur-md"
                    onClick={onClose}
                />
            )}

            <motion.div
                initial={isInline ? { opacity: 0, y: 10 } : { opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={isInline ? { opacity: 0, y: 10 } : { opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={isInline
                    ? "w-full flex flex-col items-center"
                    : "fixed inset-0 z-[99999] flex flex-col items-center p-4 md:p-8 overflow-y-auto"
                }
                onClick={(e) => !isInline && e.stopPropagation()}
            >
                <div className={`w-full ${isInline ? "" : "max-w-5xl"} bg-bg-primary/95 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl ${isInline ? "p-3 md:p-4" : "p-6 md:p-8"}`}>
                    {/* Consolidated HUD - Unified Header & Metrics */}
                    <div className={`flex items-center gap-4 ${isInline ? "mb-4" : "mb-8"}`}>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                <span className="text-[11px] font-black text-accent uppercase tracking-[0.2em] flex items-center gap-1">
                                    <span className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                                    Now Learning
                                </span>
                                {isPractice && (
                                    <div className="text-[11px] font-black text-text-muted uppercase tracking-widest bg-bg-secondary px-1.5 py-0.5 rounded border border-border">
                                        Practice
                                    </div>
                                )}
                            </div>
                            <h2 className={`${isInline ? "text-lg" : "text-3xl md:text-4xl"} font-black tracking-tighter uppercase text-text-primary leading-none truncate`}>
                                {subLesson.title}
                            </h2>
                        </div>

                        {/* Metrics HUD Inlined */}
                        {isPractice && (
                            <div className={`flex items-center ${isInline ? "bg-bg-secondary/50 border border-border/30 rounded-xl px-4 py-1.5 gap-6" : "gap-12"} flex-shrink-0`}>
                                <Metric label="TIME" value={engine.timeLeft} unit="S" accent="text-accent" isCompact={isInline} />
                                <Metric label="SPEED" value={engine.currentWPM} unit="WPM" accent="text-text-primary" isCompact={isInline} />
                                <Metric label="ACCURACY" value={engine.typedChars ? Math.round((engine.correctChars / engine.typedChars) * 100) : 100} unit="%" accent="text-green-500" isCompact={isInline} />
                            </div>
                        )}

                        <button
                            onClick={onClose}
                            className={`${isInline ? "p-2 px-3 text-[11px]" : "p-3 rounded-xl text-xs"} rounded-lg border border-border bg-bg-secondary font-black uppercase tracking-widest hover:bg-bg-tertiary transition-all flex items-center gap-2 group relative overflow-hidden shadow-lg h-fit flex-shrink-0`}
                        >
                            <div className="absolute inset-0 bg-red-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                            <span className="group-hover:-translate-x-1 transition-transform relative z-10">←</span>
                            <span className="relative z-10">{isInline ? "Exit" : "Leave"}</span>
                        </button>
                    </div>

                    {isPractice ? (
                        <div className={`${isInline ? "space-y-4" : "space-y-8"} animate-in slide-in-from-bottom duration-500`}>
                            {/* Previous Metrics Row Removed */}

                            <TypingArena
                                text={subLesson.text}
                                currentIndex={engine.currentIndex}
                                accuracyMap={engine.accuracyMap}
                                handleKey={engine.handleKey}
                                isRunning={engine.isRunning}
                                isFocusMode={engine.isRunning && engine.currentIndex > 0}
                                isCompact={isInline}
                            />

                            <div className={`grid grid-cols-1 ${isInline ? "" : "lg:grid-cols-3"} gap-4`}>
                                <div className={isInline ? "" : "lg:col-span-2"}>
                                    <VirtualKeyboard activeChar={subLesson.text[engine.currentIndex]} />
                                </div>
                                <div className={`bg-bg-secondary ${isInline ? "p-4 py-3" : "p-8"} rounded-2xl border border-border text-center shadow-xl relative overflow-hidden flex flex-col justify-center`}>
                                    <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                                    <h4 className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] mb-2 font-black">Goal</h4>
                                    <p className={`${isInline ? "text-sm" : "text-lg"} font-bold text-text-primary mb-1 leading-tight`}>{subLesson.tutorialText}</p>
                                    <div className={`${isInline ? "mt-2 pt-2" : "mt-4 pt-4"} border-t border-border/30`}>
                                        <p className="text-[11px] text-accent font-black uppercase tracking-widest">Goal: {subLesson.minAccuracy}% Accuracy</p>
                                    </div>
                                </div>
                            </div>

                            <ResultModal
                                results={engine.results}
                                onRetry={engine.reset}
                                onClose={onClose}
                            />
                        </div>
                    ) : subLesson.type === 'completion_final' ? (
                        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6 animate-in zoom-in duration-1000">
                            <div className="relative">
                                <span className={`${isInline ? "text-7xl" : "text-9xl"}`}>🎓</span>
                                <div className="absolute inset-0 bg-accent/20 blur-[100px] -z-10" />
                            </div>
                            <div>
                                <h2 className={`${isInline ? "text-3xl" : "text-6xl"} font-black tracking-tighter uppercase mb-2 text-white`}>Course Completed!</h2>
                                <p className={`${isInline ? "text-sm" : "text-xl"} text-text-muted max-w-lg mx-auto leading-relaxed`}>Excellent work! You have finished this course.</p>
                            </div>
                            <button
                                onClick={() => onComplete({ accuracy: 100, netWPM: 0, mistakes: {} })}
                                className={`${isInline ? "px-8 py-3" : "px-12 py-6 scale-110"} bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition shadow-[0_20px_60px_rgba(255,255,255,0.1)] active:scale-95`}
                            >
                                CLAIM CERTIFICATE
                            </button>
                        </div>
                    ) : (
                        <div className={`${isInline ? "p-5" : "p-8 md:p-12"} bg-bg-secondary rounded-2xl border border-border shadow-2xl animate-in fade-in slide-in-from-bottom duration-700 text-left`}>
                            <div
                                className={`prose prose-invert prose-p:text-text-muted ${isInline ? "prose-p:text-sm prose-h2:text-2xl prose-h2:mb-4" : "prose-p:text-lg prose-h2:text-4xl prose-h2:mb-8"} prose-p:leading-relaxed prose-h2:font-black prose-h2:tracking-tighter prose-h2:uppercase prose-li:text-text-secondary max-w-none`}
                                dangerouslySetInnerHTML={{ __html: subLesson.content }}
                            />
                            <button
                                onClick={onClose}
                                className={`mt-8 w-full sm:w-auto ${isInline ? "px-10 py-3 text-xs" : "px-16 py-5"} bg-gradient-to-r from-accent to-purple-600 text-white font-black rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg relative overflow-hidden group`}
                            >
                                <span className="relative z-10 uppercase tracking-widest font-black">Finish Lesson</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );

    return isInline ? content : createPortal(content, document.body);
};

const Metric = ({ label, value, unit, accent = "text-text-primary", isCompact = false }) => (
    <div className="text-center flex-1">
        <p className={`${isCompact ? "text-[11px]" : "text-[11px]"} font-black text-text-muted uppercase tracking-[0.2em] mb-1 font-black`}>{label}</p>
        <p className={`${isCompact ? "text-2xl" : "text-5xl"} font-black tracking-tighter ${accent}`}>
            {value}
            <small className={`${isCompact ? "text-[11px]" : "text-base"} opacity-40 ml-1 font-bold uppercase tracking-widest`}>{unit}</small>
        </p>
    </div>
);

export default LessonPlayer;
