import React, { useState, useEffect } from 'react';
import CourseSidebar from '../Course/CourseSidebar';
import CourseDashboard from '../Course/CourseDashboard';
import CourseStats from '../Course/CourseStats';
import LessonPlayer from '../Course/LessonPlayer';
import CertificateGenerator from '../Course/CertificateGenerator';
import CourseCatalog from '../Course/CourseCatalog';
import IdentityModal from '../Course/IdentityModal';
import { useProgress } from '../../context/ProgressContext';
import { useAuth } from '../../context/AuthContext';
import { useTabs } from '../../context/TabContext';
import { usePlatform } from '../../context/PlatformContext';
import SEO from '../Layout/SEO';
import { AnimatePresence, motion } from 'framer-motion';

const CourseView = () => {
    const { progress } = useProgress();
    const { user } = useAuth();
    const [selectedCourse, setSelectedCourse] = useState(null); // The active course
    const [pendingCourse, setPendingCourse] = useState(null); // Staged course selection
    const [showIdentityModal, setShowIdentityModal] = useState(false);
    const [activeSubLesson, setActiveSubLesson] = useState(null);

    const handleSelectSubLesson = (subLesson) => {
        setActiveSubLesson(subLesson);
    };

    const handleSelectLesson = (lesson) => {
        setActiveSubLesson(lesson.subLessons[0]);
    };

    const handleCourseSelect = (course) => {
        const guestName = localStorage.getItem('guest_name');
        if (user || guestName) {
            setSelectedCourse(course);
        } else {
            setPendingCourse(course);
            setShowIdentityModal(true);
        }
    };

    const handleIdentityComplete = () => {
        setShowIdentityModal(false);
        if (pendingCourse) {
            setSelectedCourse(pendingCourse);
            setPendingCourse(null);
        }
    };

    const handleBackToCatalog = () => {
        setSelectedCourse(null);
        setPendingCourse(null);
    };

    return (
        <div className="relative max-w-7xl mx-auto space-y-6">
            <SEO
                title={activeSubLesson ? `Lesson ${activeSubLesson.id}: ${activeSubLesson.title}` : "Tactical Training Academy"}
                description="Structured typing courses to improve your speed and accuracy. Master the keyboard with military precision."
            />
            {/* Identity Verification Modal */}
            <IdentityModal
                isOpen={showIdentityModal}
                onClose={() => setShowIdentityModal(false)}
                onComplete={handleIdentityComplete}
            />
            {/* Tactical Grid Background Overlay (Local to this tab) */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <AnimatePresence mode="wait">
                {!selectedCourse ? (
                    <motion.div
                        key="catalog"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 h-full overflow-y-auto custom-scrollbar"
                    >
                        <CourseCatalog onSelectCourse={handleCourseSelect} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 flex gap-6 h-full"
                    >
                        {/* Left Column: Sidebar (20-25%) */}
                        <div className="w-[280px] xl:w-[320px] flex-shrink-0 flex flex-col gap-4">
                            <button
                                onClick={handleBackToCatalog}
                                className="px-4 py-3 rounded-xl bg-bg-secondary border border-border text-xs font-black uppercase tracking-widest hover:bg-bg-tertiary transition-all flex items-center gap-3 group relative overflow-hidden shadow-lg"
                            >
                                <div className="absolute inset-0 bg-red-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                                Abort Mission
                            </button>
                            <CourseSidebar
                                course={selectedCourse}
                                onSelectSubLesson={handleSelectSubLesson}
                                activeSubLessonId={activeSubLesson?.id}
                            />
                        </div>

                        {/* Center Column: Main Content (60-70%) */}
                        <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar px-2">
                            <CourseDashboard
                                course={selectedCourse}
                                onSelectLesson={handleSelectLesson}
                            />
                        </div>

                        {/* Right Column: Ads & Stats (15-20%) */}
                        <div className="w-[300px] xl:w-[340px] flex-shrink-0 space-y-6">
                            {/* Ad Placeholder (Tactical Intel) */}
                            <div className="bg-bg-secondary/30 border border-border rounded-3xl p-4 min-h-[250px] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
                                <div className="absolute top-2 right-2 text-[8px] font-black text-text-muted uppercase tracking-widest border border-white/10 px-1 rounded">
                                    Sponsored Intel
                                </div>
                                <div className="h-full flex items-center justify-center text-text-muted/20 font-black uppercase tracking-widest text-center">
                                    Ad Unit<br />(Tactical Placement)
                                </div>
                            </div>

                            <CourseStats />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {activeSubLesson && (
                    <LessonPlayer
                        subLesson={activeSubLesson}
                        onClose={() => setActiveSubLesson(null)}
                    />
                )}
            </AnimatePresence>

            {/* Final Graduation Certificate */}
            <AnimatePresence>
                {(selectedCourse && progress?.completedSubLessons?.length >= selectedCourse.totalSubLessons) && (
                    <CertificateGenerator
                        username={progress.username || 'Operative'}
                        courseName={selectedCourse.name}
                        date={progress.lastUpdated}
                        wpm={progress.bestWpm || 0}
                        accuracy={progress.accuracy || 98}
                        onClose={() => {
                            // Certificate logic: maybe reset or redirect
                            setSelectedCourse(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CourseView;
