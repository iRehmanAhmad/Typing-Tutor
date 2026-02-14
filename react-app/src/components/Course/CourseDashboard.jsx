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
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Mission Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-bg-secondary/50 p-6 rounded-3xl border border-border backdrop-blur-xl">
                <div>
                    <h2 className="text-2xl font-black tracking-tighter italic uppercase text-text-primary flex items-center gap-3">
                        <span className="w-2 h-8 bg-accent rounded-sm shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" />
                        MISSION CONTROL
                    </h2>
                    <p className="text-text-muted text-xs font-bold tracking-widest uppercase mt-1 ml-5">
                        OPERATIVE: <span className="text-accent">{progress?.username || 'RECRUIT'}</span> // STATUS: ACTIVE
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] mb-2">Campaign Mastery</p>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1.5 h-6 rounded-sm transition-all duration-500 ${(i / 20) * 100 < calculateOverallProgress()
                                            ? 'bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]'
                                            : 'bg-bg-tertiary/50'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-2xl font-black italic tracking-tighter text-accent">{Math.round(calculateOverallProgress())}%</span>
                    </div>
                </div>
            </div>

            {/* Tactical Course Map */}
            <div className="bg-bg-secondary/80 border border-border rounded-[30px] p-8 relative overflow-hidden group shadow-2xl backdrop-blur-md">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] transform rotate-12 pointer-events-none select-none">
                    <span className="text-[120px] font-black text-text-primary">INTEL</span>
                </div>

                <div className="flex items-center justify-between mb-8 relative z-10">
                    <h3 className="font-black text-[10px] text-accent uppercase tracking-[0.3em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                        Active Operations
                    </h3>
                    <div className="text-[9px] font-black text-text-muted uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                        Sector: Alpha
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-12 relative z-10 py-8">
                    {course.lessons.map((lesson, idx) => {
                        const isCompleted = progress?.completedSubLessons?.filter(c =>
                            lesson.subLessons.some(s => s.id === c.id)
                        ).length === lesson.subLessons.length && lesson.subLessons.length > 0;

                        const isUnlocked = idx === 0 || course.lessons[idx - 1].subLessons.every(sub =>
                            progress?.completedSubLessons?.some(c => c.id === sub.id)
                        );

                        return (
                            <React.Fragment key={lesson.id}>
                                <div className="relative group/node">
                                    <motion.button
                                        whileHover={isUnlocked ? { scale: 1.1 } : {}}
                                        whileTap={isUnlocked ? { scale: 0.95 } : {}}
                                        onClick={() => isUnlocked && onSelectLesson(lesson)}
                                        className={`
                                            w-20 h-20 rounded-2xl flex flex-col items-center justify-center transition-all relative z-10 border-2
                                            ${isCompleted
                                                ? 'bg-green-500/10 border-green-500 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.2)]'
                                                : ''}
                                            ${!isCompleted && isUnlocked
                                                ? 'bg-accent/10 border-accent text-accent shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)] animate-pulse-soft'
                                                : ''}
                                            ${!isUnlocked
                                                ? 'bg-bg-tertiary/20 border-white/5 text-text-muted opacity-40 cursor-not-allowed'
                                                : ''}
                                        `}
                                    >
                                        <span className="text-[10px] uppercase tracking-widest font-black mb-1">Lesson</span>
                                        <span className="text-2xl font-black italic">{lesson.id}</span>

                                        {/* Holographic Scanline */}
                                        {isUnlocked && (
                                            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scanline opacity-30" />
                                            </div>
                                        )}
                                    </motion.button>

                                    {/* Connection Line */}
                                    {idx < course.lessons.length - 1 && (
                                        <div className={`absolute top-1/2 -right-12 w-12 h-[2px] -translate-y-1/2 ${isUnlocked && isCompleted ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-bg-tertiary'}`} />
                                    )}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Priority Directive Card */}
                <div className="bg-gradient-to-br from-accent/5 to-transparent border border-accent/20 rounded-3xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                    </div>

                    <h4 className="font-black text-[10px] mb-3 text-accent uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                        Priority Directive
                    </h4>

                    <div className="space-y-4">
                        <div>
                            <p className="text-2xl font-black italic text-text-primary uppercase leading-none mb-1">
                                {nextStep ? `Lesson ${nextStep.sub.id}` : 'All Objectives Clear'}
                            </p>
                            <p className="text-xs text-text-muted font-bold uppercase tracking-wide">
                                {nextStep ? nextStep.sub.title : 'Stand by for further orders.'}
                            </p>
                        </div>

                        {nextStep && (
                            <button
                                onClick={() => onSelectLesson(nextStep.lesson)}
                                className="w-full py-4 bg-accent text-background text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-accent-secondary transition-all shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group/btn"
                            >
                                Execute Mission
                                <span className="text-lg group-hover/btn:translate-x-1 transition-transform">→</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Operations Metrics Card */}
                <div className="bg-bg-secondary border border-border rounded-3xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-green-500/5" />

                    <div>
                        <h4 className="font-black text-[10px] mb-2 text-text-muted uppercase tracking-[0.2em]">Operational Target</h4>
                        <div className="flex items-end gap-2 mb-1">
                            <span className="text-4xl font-black italic text-text-primary tracking-tighter">40</span>
                            <span className="text-xs font-bold text-text-muted mb-1.5">WPM</span>
                        </div>
                        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wide opacity-60">Required for Certification</p>
                    </div>

                    <div className="space-y-2 mt-6">
                        <div className="flex justify-between text-[9px] font-black text-text-muted uppercase tracking-widest">
                            <span>Current: {progress?.bestWpm || 0}</span>
                            <span>Target: 40</span>
                        </div>
                        <div className="h-2 w-full bg-bg-tertiary rounded-full overflow-hidden relative">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, ((progress?.bestWpm || 0) / 40) * 100)}%` }}
                                className="h-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] relative z-10"
                            />
                            {/* Target Marker */}
                            <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-white/20 z-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDashboard;
