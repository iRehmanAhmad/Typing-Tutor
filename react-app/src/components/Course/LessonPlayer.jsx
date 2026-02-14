import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypingEngine } from '../../hooks/useTypingEngine';
import TypingArena from '../Arena/TypingArena';
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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-background flex flex-col items-center p-8 overflow-y-auto"
        >
            <div className="w-full max-w-5xl">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <span className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-2 block">Lesson Player</span>
                        <h2 className="text-4xl font-black tracking-tighter italic uppercase">{subLesson.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition"
                    >
                        ✕
                    </button>
                </div>

                {isPractice ? (
                    <div className="space-y-8">
                        <div className="flex justify-center gap-12">
                            <Metric label="TIME LEFT" value={engine.timeLeft} unit="s" />
                            <Metric label="SPEED" value={Math.round((engine.correctChars / 5) / ((subLesson.duration - engine.timeLeft) / 60) || 0)} unit="WPM" />
                            <Metric label="ACCURACY" value={engine.typedChars ? Math.round((engine.correctChars / engine.typedChars) * 100) : 100} unit="%" />
                        </div>

                        <TypingArena
                            text={subLesson.text}
                            currentIndex={engine.currentIndex}
                            handleKey={engine.handleKey}
                            isRunning={engine.isRunning}
                        />

                        <div className="bg-bg-secondary p-8 rounded-[40px] border border-border text-center">
                            <h4 className="text-xs font-black text-text-muted uppercase tracking-widest mb-4">Tutorial Goal</h4>
                            <p className="text-lg font-bold">{subLesson.tutorialText}</p>
                        </div>

                        <ResultModal
                            results={engine.results}
                            onRetry={engine.reset}
                            onClose={onClose}
                        />
                    </div>
                ) : subLesson.type === 'completion_final' ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-8 animate-in zoom-in duration-1000">
                        <span className="text-8xl">🎓</span>
                        <div>
                            <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-2">Congratulations!</h2>
                            <p className="text-xl text-text-muted">You have successfully mastered the Basic Typing Course.</p>
                        </div>
                        <button
                            onClick={() => onComplete({ accuracy: 100, netWPM: 0, mistakes: {} })}
                            className="px-12 py-6 bg-white text-black font-black rounded-3xl hover:bg-gray-200 transition scale-110 shadow-[0_20px_40px_rgba(255,255,255,0.2)]"
                        >
                            CLAIM GRADUATION CERTIFICATE
                        </button>
                    </div>
                ) : (
                    <div className="bg-bg-secondary p-12 rounded-[40px] border border-border">
                        <div
                            className="prose prose-invert prose-p:text-text-muted prose-h2:text-3xl prose-h2:font-black prose-h2:italic prose-h2:tracking-tighter prose-h2:uppercase max-w-none"
                            dangerouslySetInnerHTML={{ __html: subLesson.content }}
                        />
                        <button
                            onClick={onClose}
                            className="mt-12 px-12 py-5 bg-accent text-white font-black rounded-2xl hover:bg-accent/80 transition active:scale-95"
                        >
                            FINISH MODULE
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const Metric = ({ label, value, unit }) => (
    <div className="text-center">
        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2">{label}</p>
        <p className="text-4xl font-black italic tracking-tighter">{value}<small className="text-sm not-italic opacity-50 ml-1">{unit}</small></p>
    </div>
);

export default LessonPlayer;
