import React from 'react';
import { useProgress } from '../../context/ProgressContext';

const CourseSidebar = ({ course, onSelectSubLesson, activeSubLessonId }) => {
    const { progress } = useProgress();

    const isSubLessonCompleted = (id) => {
        return progress.completedSubLessons?.some(c => c.id === id);
    };

    const isLessonUnlocked = (lessonId) => {
        if (lessonId === 1) return true;
        const prevLessonId = lessonId - 1;
        const prevLesson = course.lessons.find(l => l.id === prevLessonId);
        return prevLesson?.subLessons.every(sub => isSubLessonCompleted(sub.id));
    };

    return (
        <div className="bg-bg-secondary border border-border rounded-3xl h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
            <div className="p-4 border-b border-border">
                <h3 className="font-black text-xs text-text-muted uppercase tracking-widest">Course Curriculum</h3>
            </div>
            <div className="p-2 space-y-4">
                {course.lessons.map((lesson) => (
                    <div key={lesson.id} className="space-y-1">
                        <div className="px-3 py-2 flex items-center justify-between">
                            <span className="text-[10px] font-black text-accent/50 uppercase">Lesson {lesson.id}</span>
                            {!isLessonUnlocked(lesson.id) && <span className="text-[10px]">🔒</span>}
                        </div>
                        <h4 className="px-3 text-sm font-bold truncate mb-2">{lesson.title}</h4>
                        <div className="space-y-1">
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
                                            w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all
                                            ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-bg-tertiary'}
                                            ${isLocked ? 'opacity-40 grayscale cursor-not-allowed' : ''}
                                        `}
                                    >
                                        <div className={`
                                            w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0
                                            ${isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-bg-tertiary border border-white/5 text-text-muted'}
                                            ${isActive ? 'bg-white/20 border-transparent text-white' : ''}
                                        `}>
                                            {isCompleted ? '✓' : '○'}
                                        </div>
                                        <span className="text-xs font-semibold truncate">{sub.title}</span>
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
