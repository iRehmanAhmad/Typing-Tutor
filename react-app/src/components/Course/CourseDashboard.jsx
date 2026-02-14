import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { motion } from 'framer-motion';

const CourseDashboard = ({ course, onSelectLesson }) => {
    const { progress } = useProgress();

    const calculateOverallProgress = () => {
        if (!course?.totalSubLessons) return 0;
        return (progress?.completedSubLessons?.length || 0) / course.totalSubLessons * 100;
    };

    const getNextStep = () => {
        for (const lesson of course.lessons) {
            for (const sub of lesson.subLessons) {
                if (!progress?.completedSubLessons?.some(c => c.id === sub.id)) {
                    return { lesson, sub };
                }
            }
        }
        return null;
    };

    const nextStep = getNextStep();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase text-text-primary">
                        Welcome back, {progress?.username || 'Student'}! 👋
                    </h2>
                    <p className="text-text-muted font-medium">Ready to continue your typing journey?</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Overall Mastery</p>
                    <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-bg-tertiary rounded-full overflow-hidden border border-border">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${calculateOverallProgress()}%` }}
                                className="h-full bg-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]"
                            />
                        </div>
                        <span className="text-xl font-black italic tracking-tighter text-text-primary">{Math.round(calculateOverallProgress())}%</span>
                    </div>
                </div>
            </div>

            {/* Visual Course Map */}
            <div className="bg-bg-secondary border border-border rounded-[40px] p-8 relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-5 transform rotate-12 pointer-events-none">
                    <span className="text-[120px] font-black text-text-primary">PROGRESS</span>
                </div>

                <h3 className="font-black text-xs text-text-muted uppercase tracking-[0.2em] mb-8">Learning Path</h3>

                <div className="flex flex-wrap items-center justify-center gap-8 relative z-10 py-4">
                    {course.lessons.map((lesson, idx) => {
                        const isCompleted = progress?.completedSubLessons?.filter(c =>
                            lesson.subLessons.some(s => s.id === c.id)
                        ).length === lesson.subLessons.length && lesson.subLessons.length > 0;

                        const isUnlocked = idx === 0 || course.lessons[idx - 1].subLessons.every(sub =>
                            progress?.completedSubLessons?.some(c => c.id === sub.id)
                        );

                        return (
                            <React.Fragment key={lesson.id}>
                                <motion.button
                                    whileHover={isUnlocked ? { scale: 1.1 } : {}}
                                    whileTap={isUnlocked ? { scale: 0.95 } : {}}
                                    onClick={() => isUnlocked && onSelectLesson(lesson)}
                                    className={`
                                        w-16 h-16 rounded-3xl flex items-center justify-center text-xl font-black transition-all relative
                                        ${isCompleted ? 'bg-green-500 text-white shadow-[0_10px_20px_rgba(34,197,94,0.3)]' : ''}
                                        ${!isCompleted && isUnlocked ? 'bg-accent text-background shadow-[0_10px_20px_rgba(var(--accent-rgb),0.3)]' : ''}
                                        ${!isUnlocked ? 'bg-bg-tertiary text-text-muted border border-border opacity-50 cursor-not-allowed' : ''}
                                    `}
                                >
                                    {isCompleted ? '✓' : lesson.id}
                                    {isUnlocked && !isCompleted && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-background rounded-full flex items-center justify-center animate-bounce shadow-lg">
                                            <div className="w-2 h-2 bg-accent rounded-full" />
                                        </div>
                                    )}
                                </motion.button>
                                {idx < course.lessons.length - 1 && (
                                    <div className={`w-8 h-[2px] rounded-full ${isUnlocked && isCompleted ? 'bg-green-500' : 'bg-bg-tertiary'}`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-accent/20 to-transparent border border-accent/20 rounded-3xl p-6">
                    <h4 className="font-black text-sm mb-2 italic text-text-primary">NEXT BEST ACTION</h4>
                    <p className="text-sm text-text-muted mb-4 leading-relaxed">
                        {nextStep
                            ? `Continue with Lesson ${nextStep.sub.id}: ${nextStep.sub.title}`
                            : 'Congratulations! You have topped the course leaderboard.'}
                    </p>
                    {nextStep && (
                        <button
                            onClick={() => onSelectLesson(nextStep.lesson)}
                            className="px-6 py-3 bg-accent text-background text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition active:scale-95 shadow-xl"
                        >
                            RESUME COURSE
                        </button>
                    )}
                </div>
                <div className="bg-bg-secondary border border-border rounded-3xl p-6 flex flex-col justify-between shadow-lg">
                    <div>
                        <h4 className="font-black text-sm mb-2 italic text-text-muted uppercase">COURSE GOAL</h4>
                        <p className="text-lg font-bold leading-tight uppercase tracking-tight text-text-primary">Reach 40 WPM with 96% Accuracy</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black text-text-muted">
                            <span>CURRENT: {progress?.bestWpm || 0} WPM</span>
                            <span>GOAL: 40 WPM</span>
                        </div>
                        <div className="h-1.5 w-full bg-bg-tertiary rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, ((progress?.bestWpm || 0) / 40) * 100)}%` }}
                                className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDashboard;
