import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypingEngine } from '../../hooks/useTypingEngine';
import TypingArena from '../Arena/TypingArena';
import VirtualKeyboard from '../Arena/VirtualKeyboard';
import ResultModal from '../Arena/ResultModal';
import { useProgress } from '../../context/ProgressContext';

const LessonPlayer = ({ subLesson, onClose }) => {
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
    const engine = isPractice ? useTypingEngine(subLesson.text, subLesson.duration, onComplete) : null;

    // Prevent background scroll when player is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

    const content = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-[99999] bg-background flex flex-col items-center p-8 overflow-y-auto"
            style={{ backgroundColor: 'var(--bg-primary)' }} // Force solid background
        >
            <div className="w-full max-w-5xl">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <span className="text-xs font-black text-accent uppercase tracking-[0.3em] mb-2 block animate-pulse">Tactical Session Active</span>
                        <h2 className="text-4xl font-black tracking-tighter italic uppercase text-text-primary">{subLesson.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-accent/50 transition duration-300"
                    >
                        <span className="text-white text-xl">✕</span>
                    </button>
                </div>

                {isPractice ? (
                    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
                        <div className="flex justify-center gap-1">
                            <div className="bg-bg-secondary p-1 rounded-[32px] border border-border shadow-2xl flex items-center gap-1 backdrop-blur-xl">
                                <div className="flex bg-bg-primary rounded-[28px] p-6 gap-12 min-w-[500px] border border-border/50">
                                    <Metric label="TIME LEFT" value={engine.timeLeft} unit="S" accent="text-accent" />
                                    <div className="w-[1px] h-10 bg-border self-center" />
                                    <Metric label="SPEED" value={engine.currentWPM} unit="WPM" accent="text-text-primary" />
                                    <div className="w-[1px] h-10 bg-border self-center" />
                                    <Metric label="ACCURACY" value={engine.typedChars ? Math.round((engine.correctChars / engine.typedChars) * 100) : 100} unit="%" accent="text-green-500" />
                                </div>
                            </div>
                        </div>

                        <TypingArena
                            text={subLesson.text}
                            currentIndex={engine.currentIndex}
                            accuracyMap={engine.accuracyMap}
                            handleKey={engine.handleKey}
                            isRunning={engine.isRunning}
                            isFocusMode={engine.isRunning && engine.currentIndex > 0}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <VirtualKeyboard activeChar={subLesson.text[engine.currentIndex]} />
                            </div>
                            <div className="bg-bg-secondary p-8 rounded-[40px] border border-border text-center shadow-2xl relative overflow-hidden flex flex-col justify-center">
                                <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                                <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">Mastery Mission</h4>
                                <p className="text-lg font-bold text-text-primary mb-2 leading-tight">{subLesson.tutorialText}</p>
                                <div className="mt-4 pt-4 border-t border-border">
                                    <p className="text-[10px] text-accent font-black uppercase tracking-widest">Goal: {subLesson.minAccuracy}% Accuracy Required</p>
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
                    <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-8 animate-in zoom-in duration-1000">
                        <div className="relative">
                            <span className="text-9xl">🎓</span>
                            <div className="absolute inset-0 bg-accent/20 blur-[100px] -z-10" />
                        </div>
                        <div>
                            <h2 className="text-6xl font-black italic tracking-tighter uppercase mb-4 text-white">Course Mastered</h2>
                            <p className="text-xl text-text-muted max-w-lg mx-auto leading-relaxed">You have successfully decrypted the Basic Typing Course secrets. Your tactical expertise is now certified.</p>
                        </div>
                        <button
                            onClick={() => onComplete({ accuracy: 100, netWPM: 0, mistakes: {} })}
                            className="px-12 py-6 bg-white text-black font-black rounded-3xl hover:bg-gray-200 transition scale-110 shadow-[0_20px_60px_rgba(255,255,255,0.2)] active:scale-105"
                        >
                            CLAIM GRADUATION CERTIFICATE
                        </button>
                    </div>
                ) : (
                    <div className="bg-bg-secondary p-12 rounded-[40px] border border-border shadow-2xl animate-in fade-in slide-in-from-bottom duration-700">
                        <div
                            className="prose prose-invert prose-p:text-text-muted prose-p:text-lg prose-p:leading-relaxed prose-h2:text-4xl prose-h2:font-black prose-h2:italic prose-h2:tracking-tighter prose-h2:uppercase prose-h2:mb-8 prose-li:text-text-secondary max-w-none"
                            dangerouslySetInnerHTML={{ __html: subLesson.content }}
                        />
                        <button
                            onClick={onClose}
                            className="mt-12 w-full sm:w-auto px-16 py-5 bg-accent text-background font-black rounded-2xl hover:bg-accent/80 transition active:scale-95 shadow-[0_10px_30px_rgba(var(--accent-rgb),0.3)]"
                        >
                            ACKNOWLEDGE & COMPLETE
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );

    return createPortal(content, document.body);
};

const Metric = ({ label, value, unit, accent = "text-text-primary" }) => (
    <div className="text-center flex-1">
        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-2">{label}</p>
        <p className={`text-5xl font-black italic tracking-tighter ${accent}`}>
            {value}
            <small className="text-base not-italic opacity-40 ml-2 font-bold uppercase tracking-widest">{unit}</small>
        </p>
    </div>
);

export default LessonPlayer;
