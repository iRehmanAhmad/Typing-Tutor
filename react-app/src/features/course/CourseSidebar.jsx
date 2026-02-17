import React from 'react';
import { useProgress } from '../../context/ProgressContext';

const CourseSidebar = ({ course, onSelectSubLesson, activeSubLessonId, onBack }) => {
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
        <div className="h-full bg-bg-secondary border-r border-border overflow-y-auto custom-scrollbar flex flex-col w-full">
            {/* Simple Header */}
            <div className="p-4 bg-bg-secondary sticky top-0 z-10 flex items-center gap-3">
                <button
                    onClick={onBack}
                    className="p-1.5 hover:bg-bg-tertiary rounded-lg text-text-muted hover:text-text-primary transition-colors"
                    title="Back to Courses"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h3 className="font-bold text-lg text-text-primary truncate">
                    {course.name || 'Course Content'}
                </h3>
            </div>

            <div className="flex-1 py-2">
                {course.lessons.map((lesson, idx) => {
                    const isUnlocked = isLessonUnlocked(lesson.id);

                    return (
                        <div key={lesson.id} className="mb-1">
                            {/* Lesson Title */}
                            <div className={`px-4 py-2 font-semibold text-sm ${isUnlocked ? 'text-text-primary' : 'text-text-muted opacity-50'}`}>
                                {lesson.title}
                            </div>

                            {/* Sub-Lessons List */}
                            <div className="flex flex-col">
                                {lesson.subLessons.map((sub) => {
                                    const isSubCompleted = isSubLessonCompleted(sub.id);
                                    const isActive = activeSubLessonId === sub.id;

                                    return (
                                        <button
                                            key={sub.id}
                                            disabled={!isUnlocked}
                                            onClick={() => onSelectSubLesson(sub)}
                                            className={`
                                                w-full text-left px-6 py-2 text-[13px] transition-colors border-l-4
                                                ${isActive
                                                    ? 'bg-accent/10 border-accent text-text-primary font-medium'
                                                    : 'border-transparent hover:bg-bg-tertiary hover:border-text-muted/50 text-text-secondary'}
                                                ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : ''}
                                            `}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{sub.title}</span>
                                                {isSubCompleted && (
                                                    <span className="text-green-500 text-xs">✓</span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CourseSidebar;
