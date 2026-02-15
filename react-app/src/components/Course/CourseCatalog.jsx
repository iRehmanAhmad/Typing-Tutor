import React from 'react';
import { motion } from 'framer-motion';
import { COURSES } from '../../data/courseData';
import AdUnit from '../Ads/AdUnit';

const CourseCard = ({ course, onSelect, index }) => {
    const isLocked = false; // Unlocked for user access
    const progress = 0; // TODO: Get from progress context
    const isStarted = progress > 0;

    // Course type icons
    const courseIcons = {
        basic: '🎯',
        speed: '⚡',
        dev: '💻',
        pro: '👔'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
            whileHover={{ y: -4 }}
            className={`
                group relative overflow-hidden rounded-3xl border border-border bg-bg-secondary/50 backdrop-blur-sm
                transition-all duration-300 flex flex-col h-full
                ${isLocked
                    ? 'opacity-60 grayscale cursor-not-allowed'
                    : 'hover:border-accent/50 hover:shadow-[0_0_40px_rgba(var(--accent-rgb),0.2)] hover:bg-bg-secondary cursor-pointer'}
            `}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity" />

            {/* Progress Bar (if started) */}
            {isStarted && !isLocked && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-bg-tertiary overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-accent to-purple-500"
                    />
                </div>
            )}

            <div className="p-6 flex-1 flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-bg-tertiary/50 border border-white/5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-text-muted">
                            Level {index + 1}
                        </div>
                        {isStarted && !isLocked && (
                            <div className="bg-accent/10 border border-accent/20 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-accent">
                                {progress}%
                            </div>
                        )}
                    </div>
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {isLocked ? '🔒' : courseIcons[course.id] || '📚'}
                    </span>
                </div>

                <h3 className="text-2xl font-black text-text-primary mb-2 uppercase tracking-tight group-hover:text-accent transition-colors">
                    {course.name}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                    {course.description}
                </p>

                <div className="space-y-3">
                    <div className="flex items-center gap-4 text-[11px] font-bold text-text-muted uppercase tracking-wide">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                            {course.totalLessons} Modules
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-purple-500 rounded-full animate-pulse" />
                            {course.totalSubLessons * 5} Min
                        </span>
                    </div>

                    <button
                        onClick={() => !isLocked && onSelect(course)}
                        disabled={isLocked}
                        className={`
                            w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all
                            flex items-center justify-center gap-2 relative overflow-hidden group/btn
                            ${isLocked
                                ? 'bg-bg-tertiary text-text-muted cursor-not-allowed border border-white/5'
                                : 'bg-gradient-to-r from-accent to-purple-600 text-white border border-transparent hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent/30'}
                        `}
                    >
                        <span className="relative z-10">
                            {isLocked ? 'Classified' : isStarted ? 'Continue Mission' : 'Initialize Course'}
                        </span>
                        {!isLocked && <span className="group-hover/btn:translate-x-1 transition-transform text-lg leading-none relative z-10">→</span>}

                        {!isLocked && (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Enhanced Tactical Corners */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/5 rounded-tr-3xl group-hover:border-accent/30 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white/5 rounded-bl-3xl group-hover:border-accent/30 transition-all duration-300" />

            {/* Corner Accents */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
};

const CourseCatalog = ({ onSelectCourse }) => {
    // Insert Ad into Grid Logic
    const renderGrid = () => {
        const items = [];
        const courses = Object.values(COURSES);

        courses.forEach((course, index) => {
            items.push(
                <CourseCard
                    key={course.id}
                    course={course}
                    index={index}
                    onSelect={onSelectCourse}
                />
            );

            // Inject Ad after the second course (index 1)
            if (index === 1) {
                items.push(
                    <AdUnit
                        key="ad-grid"
                        slotId="catalog_grid"
                        format="card"
                        className="h-full min-h-[300px]"
                        label="Sponsored Content"
                    />
                );
            }
        });
        return items;
    };

    return (
        <div className="w-full min-h-screen p-2 md:p-4 lg:p-6 space-y-4 animate-in fade-in duration-500 flex flex-col -mt-8">
            {/* Header */}
            <div className="text-center space-y-2 pt-0 pb-0 relative z-10 w-full max-w-4xl mx-auto">
                {/* Decorative Background Number */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] md:text-[140px] font-black text-text-primary/5 pointer-events-none select-none z-0 leading-none">
                    01
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-[0.3em] mb-2"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        Start Learning
                    </motion.div>

                    <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tighter uppercase mb-2">
                        Choose a Course
                    </h1>

                    <p className="text-text-muted max-w-xl mx-auto text-xs md:text-sm font-medium leading-relaxed">
                        Improve your typing speed and accuracy. Complete lessons to unlock new levels.
                    </p>
                </div>
            </div>

            {/* Header Ad Leaderboard - Slightly Smaller for density */}
            <div className="w-full flex justify-center -mt-2">
                <AdUnit slotId="catalog_header" format="banner" className="w-full max-w-3xl scale-90 origin-top" />
            </div>

            {/* Grid - Full Viewport Adaptive */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 content-start pb-4">
                {renderGrid()}
            </div>
        </div>
    );
};

export default CourseCatalog;
