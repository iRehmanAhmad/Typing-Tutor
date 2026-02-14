import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { motion } from 'framer-motion';

const CourseDashboard = ({ course, onSelectLesson }) => {
    const { progress } = useProgress();

    const calculateOverallProgress = () => {
        if (!course.totalSubLessons) return 0;
        return (progress.completedSubLessons?.length || 0) / course.totalSubLessons * 100;
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase text-white">
                        Welcome back, {progress.username || 'Student'}! 👋
                    </h2>
                    <p className="text-text-muted font-medium">Ready to continue your typing journey?</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Overall Mastery</p>
                    <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-bg-tertiary rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${calculateOverallProgress()}%` }}
                                className="h-full bg-accent shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                            />
                        </div>
                        <span className="text-xl font-black italic tracking-tighter">{Math.round(calculateOverallProgress())}%</span>
                    </div>
                </div>
            </div>

            {/* Visual Course Map */}
            <div className="bg-bg-secondary border border-border rounded-[40px] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 transform rotate-12 pointer-events-none">
                    <span className="text-[120px] font-black">PROGRESS</span>
                </div>

                <h3 className="font-black text-xs text-text-muted uppercase tracking-[0.2em] mb-8">Learning Path</h3>

                <div className="flex flex-wrap items-center justify-center gap-8 relative z-10 py-4">
                    {course.lessons.map((lesson, idx) => {
                        const isCompleted = progress.completedSubLessons?.filter(c =>
                            lesson.subLessons.some(s => s.id === c.id)
                        ).length === lesson.subLessons.length && lesson.subLessons.length > 0;

                        const isUnlocked = idx === 0 || course.lessons[idx - 1].subLessons.every(sub =>
                            progress.completedSubLessons?.some(c => c.id === sub.id)
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
                                        ${!isCompleted && isUnlocked ? 'bg-accent text-white shadow-[0_10px_20px_rgba(99,102,241,0.3)]' : ''}
                                        ${!isUnlocked ? 'bg-bg-tertiary text-text-muted border border-white/5 opacity-50 cursor-not-allowed' : ''}
                                    `}
                                >
                                    {isCompleted ? '✓' : lesson.id}
                                    {isUnlocked && !isCompleted && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center animate-bounce">
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
                    <h4 className="font-black text-sm mb-2 italic">NEXT BEST ACTION</h4>
                    <p className="text-sm text-text-muted mb-4 leading-relaxed">Continue with Lesson 1.2 to master the home row keys.</p>
                    <button className="px-6 py-3 bg-white text-black text-xs font-black rounded-xl hover:bg-gray-200 transition">
                        RESUME COURSE
                    </button>
                </div>
                <div className="bg-bg-secondary border border-border rounded-3xl p-6 flex flex-col justify-between">
                    <div>
                        <h4 className="font-black text-sm mb-2 italic text-text-muted uppercase">COURSE GOAL</h4>
                        <p className="text-lg font-bold leading-tight uppercase tracking-tight">Reach 40 WPM with 96% Accuracy</p>
                    </div>
                    <div className="h-1 w-full bg-bg-tertiary rounded-full overflow-hidden mt-4">
                        <div className="h-full bg-green-500 w-[70%]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDashboard;
