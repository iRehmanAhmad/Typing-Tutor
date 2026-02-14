import React from 'react';
import { useProgress } from '../../context/ProgressContext';

const CourseSidebar = ({ course, onSelectSubLesson, activeSubLessonId }) => {
    const { progress } = useProgress();

    const isSubLessonCompleted = (id) => {
        return progress?.completedSubLessons?.some(c => c.id === id);
    };

    const isLessonUnlocked = (lessonId) => {
        const lessonIndex = course.lessons.findIndex(l => l.id === lessonId);
        if (lessonIndex === 0) return true;

        const prevLesson = course.lessons[lessonIndex - 1];
        return prevLesson?.subLessons?.every(sub => isSubLessonCompleted(sub.id));
    };

    return (
        <div className="bg-bg-secondary/50 border border-border rounded-3xl h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar shadow-2xl backdrop-blur-md flex flex-col">
            <div className="p-5 border-b border-border/50 sticky top-0 bg-bg-secondary/95 z-10 backdrop-blur-xl shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-[10px] text-accent uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                        Curriculum Dossier
                    </h3>
                    <span className="text-[9px] font-black text-text-muted/50 border border-white/5 px-1.5 py-0.5 rounded">V.2.0</span>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-accent/50 to-transparent" />
            </div>

            <div className="p-2 space-y-6">
                {course.lessons.map((lesson) => (
                    <div key={lesson.id} className="space-y-1">
                        <div className="px-3 py-1 flex items-center justify-between group/lesson-header">
                            <span className="text-[9px] font-black text-text-muted/50 uppercase tracking-widest group-hover/lesson-header:text-accent transition-colors">
                                Sequence {lesson.id}
                            </span>
                            {!isLessonUnlocked(lesson.id) && (
                                <span className="text-[9px] uppercase tracking-widest text-red-500/50 font-black flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full" /> Locked
                                </span>
                            )}
                        </div>

                        <h4 className="px-3 text-[11px] font-black uppercase tracking-wider truncate mb-2 text-text-primary/90 border-l-2 border-accent/20 pl-2">
                            {lesson.title}
                        </h4>

                        <div className="space-y-[1px]">
                            {lesson.subLessons.map((sub) => {
                                const isCompleted = isSubLessonCompleted(sub.id);
                                const isActive = activeSubLessonId === sub.id;
                                const isLocked = !isLessonUnlocked(lesson.id);

                                return (
                                    <button
                                        key={sub.id}
                                        disabled={isLocked}
                                        onClick={() => onSelectSubLesson(sub)}
                                        className={`
                                            w-full flex items-center gap-3 px-3 py-2.5 mx-1 rounded-lg text-left transition-all group relative overflow-hidden
                                            ${isActive
                                                ? 'bg-accent/10 text-accent border-l-2 border-accent'
                                                : 'text-text-secondary hover:bg-white/5 border-l-2 border-transparent hover:border-white/10'}
                                            ${isLocked ? 'opacity-30 grayscale cursor-not-allowed hover:bg-transparent' : ''}
                                        `}
                                    >
                                        {/* Scanline Effect for Active Item */}
                                        {isActive && <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent animate-scanline opacity-20 pointer-events-none" />}

                                        <div className={`
                                            w-3 h-3 rounded-[1px] flex items-center justify-center text-[7px] flex-shrink-0 transition-colors
                                            ${isCompleted
                                                ? 'bg-green-500 text-bg-primary shadow-[0_0_5px_rgba(34,197,94,0.5)]'
                                                : 'bg-bg-tertiary border border-white/10 text-transparent'}
                                            ${isActive && !isCompleted ? 'border-accent bg-accent/20 text-transparent' : ''}
                                        `}>
                                            {isCompleted && '✓'}
                                        </div>

                                        <div className="flex flex-col min-w-0">
                                            <span className={`text-[10px] font-bold truncate leading-none uppercase tracking-wide ${isActive ? 'text-accent' : ''}`}>
                                                {sub.title}
                                            </span>
                                        </div>

                                        {isActive && (
                                            <div className="absolute right-2 w-1 h-1 bg-accent rounded-full animate-blink" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseSidebar;
