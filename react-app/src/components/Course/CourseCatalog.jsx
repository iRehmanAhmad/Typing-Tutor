import React from 'react';
import { motion } from 'framer-motion';
import { COURSES } from '../../data/courseData';

const CourseCard = ({ course, onSelect, index }) => {
    const isLocked = course.id === 'pro'; // Mock locking for now

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
                group relative overflow-hidden rounded-3xl border border-border bg-bg-secondary/50 backdrop-blur-sm
                hover:border-accent/50 transition-all duration-300 flex flex-col h-full
                ${isLocked ? 'opacity-60 grayscale' : 'hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.15)] hover:bg-bg-secondary'}
            `}
        >
            {/* Tactical Grid Background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-bg-tertiary/50 border border-white/5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-text-muted">
                        Level {index + 1}
                    </div>
                    {isLocked && <span className="text-xl">🔒</span>}
                </div>

                <h3 className="text-2xl font-black italic text-text-primary mb-2 uppercase tracking-tight group-hover:text-accent transition-colors">
                    {course.name}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                    {course.description}
                </p>

                <div className="space-y-3">
                    <div className="flex items-center gap-4 text-[11px] font-bold text-text-muted uppercase tracking-wide">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-accent rounded-full" />
                            {course.totalLessons} Modules
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-accent rounded-full" />
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
                                : 'bg-accent text-background border border-transparent hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent/20'}
                        `}
                    >
                        {isLocked ? 'Classified' : 'Initialize Course'}
                        {!isLocked && <span className="group-hover/btn:translate-x-1 transition-transform text-lg leading-none">→</span>}

                        {!isLocked && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:animate-shimmer" />}
                    </button>
                </div>
            </div>

            {/* Tactical Corners */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/5 rounded-tr-3xl group-hover:border-accent/20 transition-colors" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/5 rounded-bl-3xl group-hover:border-accent/20 transition-colors" />
        </motion.div>
    );
};

const CourseCatalog = ({ onSelectCourse }) => {
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="text-center space-y-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/5 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-4"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Training Modules Online
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-black italic text-text-primary tracking-tighter uppercase relative inline-block">
                    Select Your Mission
                    <span className="absolute -right-6 -top-2 text-6xl text-accent/10 pointer-events-none select-none">01</span>
                </h1>

                <p className="text-text-muted max-w-2xl mx-auto text-sm font-medium leading-relaxed">
                    Choose a specialized training protocol to enhance your neural-motor interface.
                    Unlock advanced tiers by completing basic certification.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(COURSES).map((course, index) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        index={index}
                        onSelect={onSelectCourse}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseCatalog;
