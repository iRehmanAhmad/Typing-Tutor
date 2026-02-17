import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { motion } from 'framer-motion';

const CourseDashboard = ({ course, onSelectLesson, onSelectSubLesson }) => {
    const { progress } = useProgress();

    const calculateOverallProgress = () => {
        if (!course?.totalSubLessons) return 0;
        return (progress?.completedSubLessons?.length || 0) / course.totalSubLessons * 100;
    };

    const isSubLessonCompleted = (subLessonId) => {
        return progress?.completedSubLessons?.some(c => c.id === subLessonId);
    };

    const isLessonUnlocked = (lessonIndex) => {
        if (lessonIndex === 0) return true;
        const previousLesson = course.lessons[lessonIndex - 1];
        return previousLesson.subLessons.every(sub =>
            isSubLessonCompleted(sub.id)
        );
    };

    return (
        <div className="space-y-4 animate-in fade-in duration-500 pb-10">
            {/* Mission Header - Compact */}
            <div className="bg-gradient-to-r from-bg-secondary/80 to-bg-secondary/50 p-4 rounded-2xl border border-border backdrop-blur-xl shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-black tracking-tighter uppercase text-text-primary flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-accent rounded-sm shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" />
                            {course.name}
                        </h2>
                        <p className="text-text-muted text-[11px] font-bold tracking-widest uppercase mt-0.5 ml-4">
                            STUDENT: <span className="text-accent">{progress?.username || 'NEW LEARNER'}</span> // Current Status: Learning
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">Course Progress</p>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {[...Array(15)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1 h-4 rounded-sm transition-all duration-500 ${(i / 15) * 100 < calculateOverallProgress()
                                            ? 'bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]'
                                            : 'bg-bg-tertiary/50'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-lg font-black tracking-tighter text-accent">{Math.round(calculateOverallProgress())}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lesson Cards - Compact */}
            <div className="space-y-3">
                {course.lessons.map((lesson, lessonIndex) => {
                    const isUnlocked = isLessonUnlocked(lessonIndex);
                    const completedSubLessons = lesson.subLessons.filter(sub =>
                        isSubLessonCompleted(sub.id)
                    ).length;
                    const totalSubLessons = lesson.subLessons.length;
                    const lessonProgress = totalSubLessons > 0 ? (completedSubLessons / totalSubLessons) * 100 : 0;
                    const isCompleted = lessonProgress === 100 && totalSubLessons > 0;

                    return (
                        <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: lessonIndex * 0.05 }}
                            className={`
                                relative overflow-hidden rounded-2xl border backdrop-blur-sm
                                transition-all duration-300
                                ${isUnlocked
                                    ? 'bg-bg-secondary/50 border-border hover:border-accent/40 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.1)]'
                                    : 'bg-bg-secondary/20 border-border/20 opacity-60 grayscale'
                                }
                            `}
                        >
                            {/* Progress Bar - Thinner */}
                            {isUnlocked && lessonProgress > 0 && (
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-bg-tertiary overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${lessonProgress}%` }}
                                        className={`h-full ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-accent to-purple-500'}`}
                                    />
                                </div>
                            )}

                            <div className="p-4 relative z-10">
                                {/* Lesson Header - Compact */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`
                                            w-10 h-10 rounded-xl flex items-center justify-center border-2 relative
                                            ${isCompleted
                                                ? 'bg-green-500/10 border-green-500 text-green-400'
                                                : isUnlocked
                                                    ? 'bg-accent/10 border-accent text-accent'
                                                    : 'bg-bg-tertiary/20 border-white/5 text-text-muted'
                                            }
                                        `}>
                                            <span className="text-lg font-black">{lesson.id}</span>
                                            {isCompleted && (
                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-[11px]">
                                                    ✓
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-base font-black uppercase text-text-primary leading-tight">
                                                {lesson.title}
                                            </h3>
                                            <p className="text-[11px] text-text-secondary font-medium">
                                                {lesson.description || `Master ${lesson.title.toLowerCase()} techniques`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[11px] font-black text-text-muted uppercase tracking-widest leading-none mb-1">
                                            Status
                                        </div>
                                        <div className="text-lg font-black text-accent leading-none">
                                            {completedSubLessons}/{totalSubLessons}
                                        </div>
                                    </div>
                                </div>

                                {/* Sub-Lessons Grid - Tighter */}
                                {totalSubLessons > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {lesson.subLessons.map((subLesson, subIndex) => {
                                            const isSubCompleted = isSubLessonCompleted(subLesson.id);
                                            const isSubUnlocked = isUnlocked && (subIndex === 0 || isSubLessonCompleted(lesson.subLessons[subIndex - 1].id));

                                            return (
                                                <button
                                                    key={subLesson.id}
                                                    onClick={() => isSubUnlocked && onSelectSubLesson(subLesson)}
                                                    disabled={!isSubUnlocked}
                                                    className={`
                                                        p-2.5 rounded-xl border text-left transition-all relative overflow-hidden group
                                                        ${isSubCompleted
                                                            ? 'bg-green-500/5 border-green-500/20 hover:bg-green-500/10'
                                                            : isSubUnlocked
                                                                ? 'bg-bg-tertiary/20 border-border/50 hover:border-accent/40 hover:bg-bg-tertiary/40'
                                                                : 'bg-bg-tertiary/10 border-border/10 opacity-50 cursor-not-allowed'
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <div className="flex items-center gap-1.5 min-w-0">
                                                            <span className={`
                                                                text-[11px] font-black uppercase tracking-widest
                                                                ${isSubCompleted ? 'text-green-400' : isSubUnlocked ? 'text-accent' : 'text-text-muted'}
                                                            `}>
                                                                {lessonIndex + 1}.{subIndex + 1}
                                                            </span>
                                                            {subLesson.type === 'practice' && (
                                                                <span className="text-[11px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-md font-black tracking-tighter uppercase whitespace-nowrap">
                                                                    Practice
                                                                </span>
                                                            )}
                                                        </div>
                                                        {isSubCompleted && (
                                                            <span className="text-green-400 text-xs">✓</span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs font-bold text-text-primary mb-1 truncate">
                                                        {subLesson.title}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-[11px] text-text-muted font-black tracking-widest uppercase">
                                                        <span>⏱ {subLesson.duration}s</span>
                                                        {subLesson.minAccuracy && (
                                                            <span className="text-accent/50">• 🎯 {subLesson.minAccuracy}%</span>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="p-4 bg-bg-tertiary/20 border border-dashed border-border rounded-xl text-center">
                                        <p className="text-[11px] text-text-muted font-black uppercase tracking-widest opacity-40">
                                            Coming Soon
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default CourseDashboard;
