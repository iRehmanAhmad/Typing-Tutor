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
        <div className="bg-bg-secondary border border-border rounded-3xl h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar shadow-2xl">
            <div className="p-4 border-b border-border sticky top-0 bg-bg-secondary z-10 backdrop-blur-md">
                <h3 className="font-black text-[10px] text-text-muted uppercase tracking-[0.2em]">Course Curriculum</h3>
            </div>
            <div className="p-1.5 space-y-4">
                {course.lessons.map((lesson) => (
                    <div key={lesson.id} className="space-y-1">
                        <div className="px-2.5 py-2 flex items-center justify-between">
                            <span className="text-[10px] font-black text-accent/50 uppercase tracking-tighter">Lesson {lesson.id}</span>
                            {!isLessonUnlocked(lesson.id) && <span className="text-[10px] opacity-40">🔒</span>}
                        </div>
                        <h4 className="px-2.5 text-xs font-black uppercase tracking-tight truncate mb-2 text-text-primary">{lesson.title}</h4>
                        <div className="space-y-0.5">
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
                                            w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all group
                                            ${isActive ? 'bg-accent text-background shadow-[0_5px_15px_rgba(var(--accent-rgb),0.3)]' : 'hover:bg-bg-tertiary'}
                                            ${isLocked ? 'opacity-30 grayscale cursor-not-allowed' : ''}
                                        `}
                                    >
                                        <div className={`
                                            w-4 h-4 rounded-full flex items-center justify-center text-[8px] flex-shrink-0
                                            ${isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-bg-tertiary border border-white/5 text-text-muted'}
                                            ${isActive ? 'bg-background/20 border-transparent text-background' : ''}
                                        `}>
                                            {isCompleted ? '✓' : '•'}
                                        </div>
                                        <span className={`text-[11px] font-bold truncate ${isActive ? 'text-background' : 'text-text-secondary group-hover:text-text-primary'}`}>
                                            {sub.title}
                                        </span>
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
