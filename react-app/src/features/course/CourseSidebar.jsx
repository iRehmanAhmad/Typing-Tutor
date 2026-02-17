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
        <div className="bg-bg-secondary/50 border border-border rounded-3xl h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar shadow-2xl backdrop-blur-md flex flex-col">
            {/* Sidebar Header */}
            <div className="p-5 border-b border-border/50 sticky top-0 bg-bg-secondary/95 z-10 backdrop-blur-xl shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-[11px] text-accent uppercase tracking-[0.3em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                        Curriculum Dossier
                    </h3>
                    <span className="text-[11px] font-black text-text-muted/50 border border-white/5 px-2 py-0.5 rounded uppercase tracking-tighter">Verified</span>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-accent via-accent/20 to-transparent" />
            </div>

            <div className="p-3 space-y-8 relative">
                {/* Vertical Progress Line Connector */}
                <div className="absolute left-[30px] top-8 bottom-8 w-[1px] bg-gradient-to-b from-accent/20 via-border to-accent/20 pointer-events-none" />

                {course.lessons.map((lesson, idx) => {
                    const isUnlocked = isLessonUnlocked(lesson.id);
                    const lessonCompletedCount = lesson.subLessons.filter(s => isSubLessonCompleted(s.id)).length;
                    const isAllCompleted = lessonCompletedCount === lesson.subLessons.length;

                    return (
                        <div key={lesson.id} className="space-y-4 relative">
                            {/* Lesson Topic Header */}
                            <div className="pl-10 relative">
                                {/* Lesson Circle Marker */}
                                <div className={`
                                    absolute left-[-5px] top-[2px] w-4 h-4 rounded-full border-2 z-10 flex items-center justify-center transition-all duration-500
                                    ${isAllCompleted ? 'bg-green-500 border-green-500 scale-110' :
                                        isUnlocked ? 'bg-bg-primary border-accent' : 'bg-bg-tertiary border-border opacity-50'}
                                `}>
                                    {isAllCompleted ? (
                                        <span className="text-bg-primary text-[11px] font-black">✓</span>
                                    ) : (
                                        <div className={`w-1 h-1 rounded-full ${isUnlocked ? 'bg-accent animate-pulse' : 'bg-text-muted'}`} />
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${isUnlocked ? 'text-accent' : 'text-text-muted opacity-50'}`}>
                                            Sequence {lesson.id}
                                        </span>
                                        {!isUnlocked && (
                                            <span className="text-[11px] font-black text-white/20 uppercase tracking-widest bg-white/5 px-2 rounded">Locked</span>
                                        )}
                                    </div>
                                    <h4 className={`text-[12px] font-black uppercase tracking-tight leading-tight ${isUnlocked ? 'text-text-primary' : 'text-text-muted opacity-40'}`}>
                                        {lesson.title}
                                    </h4>
                                </div>
                            </div>

                            {/* Sub-Lessons (Topics) */}
                            <div className="space-y-1 pl-8">
                                {lesson.subLessons.map((sub) => {
                                    const isSubCompleted = isSubLessonCompleted(sub.id);
                                    const isActive = activeSubLessonId === sub.id;

                                    return (
                                        <button
                                            key={sub.id}
                                            disabled={!isUnlocked}
                                            onClick={() => onSelectSubLesson(sub)}
                                            className={`
                                                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group relative overflow-hidden
                                                ${isActive
                                                    ? 'bg-accent/10 border-border shadow-[inset_0_0_20px_rgba(var(--accent-rgb),0.05)]'
                                                    : 'hover:bg-white/5 border-transparent'}
                                                ${!isUnlocked ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}
                                            `}
                                        >
                                            {/* Left Trim for Active State */}
                                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" />}

                                            <div className={`
                                                w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300
                                                ${isSubCompleted ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                                                    isActive ? 'bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]' : 'bg-bg-tertiary'}
                                            `} />

                                            <div className="flex flex-col min-w-0">
                                                <span className={`text-[11px] font-bold truncate uppercase tracking-wide leading-none ${isActive ? 'text-accent' : isUnlocked ? 'text-text-secondary group-hover:text-text-primary' : 'text-text-muted'}`}>
                                                    {sub.title}
                                                </span>
                                            </div>

                                            {isActive && (
                                                <div className="absolute right-3 flex items-center gap-1">
                                                    <span className="text-[11px] font-black text-accent uppercase tracking-tighter animate-pulse">Engaged</span>
                                                </div>
                                            )}
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
