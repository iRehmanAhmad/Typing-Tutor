import React, { useState, useEffect } from 'react';
import CourseSidebar from '../features/course/CourseSidebar';
import CourseDashboard from '../features/course/CourseDashboard';
import CourseStats from '../features/course/CourseStats';
import LessonPlayer from '../features/course/LessonPlayer';
import CertificateGenerator from '../features/course/CertificateGenerator';
import CourseCatalog from '../features/course/CourseCatalog';
import IdentityModal from '../features/course/IdentityModal';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useTabs } from '../context/TabContext';
import { usePlatform } from '../context/PlatformContext';
import SEO from '../layouts/SEO';
import { AnimatePresence, motion } from 'framer-motion';

const CourseView = () => {
    const { progress } = useProgress();
    const { user } = useAuth();
    const { activeTab, registerBackHandler } = useTabs();
    const { config } = usePlatform();
    const [selectedCourse, setSelectedCourse] = useState(null); // The active course
    const [pendingCourse, setPendingCourse] = useState(null); // Staged course selection
    const [showIdentityModal, setShowIdentityModal] = useState(false);
    const [activeSubLesson, setActiveSubLesson] = useState(null);

    // Navigation back handlers
    useEffect(() => {
        const unregister = registerBackHandler((source) => {
            if (activeSubLesson) {
                // IMPORTANT: If we are in a lesson, only allow 'popstate' (browser back) to exit.
                // Prevent physical 'Backspace' (keydown) from accidentally quitting the lesson.
                if (source === 'keydown') return false;

                setActiveSubLesson(null);
                return true;
            }
            if (selectedCourse) {
                setSelectedCourse(null);
                setPendingCourse(null);
                return true;
            }
            return false;
        });
        return unregister;
    }, [activeSubLesson, selectedCourse, registerBackHandler]);

    const handleSelectSubLesson = (subLesson) => {
        window.history.pushState({ type: 'lesson', id: subLesson.id }, '');
        setActiveSubLesson(subLesson);
    };

    const handleSelectLesson = (lesson) => {
        if (lesson.subLessons?.length > 0) {
            handleSelectSubLesson(lesson.subLessons[0]);
        }
    };

    const handleCourseSelect = (course) => {
        const guestName = localStorage.getItem('guest_name');
        if (user || guestName) {
            window.history.pushState({ type: 'course', id: course.id }, '');
            setSelectedCourse(course);
        } else {
            setPendingCourse(course);
            setShowIdentityModal(true);
        }
    };

    const handleIdentityComplete = () => {
        setShowIdentityModal(false);
        if (pendingCourse) {
            window.history.pushState({ type: 'course', id: pendingCourse.id }, '');
            setSelectedCourse(pendingCourse);
            setPendingCourse(null);
        }
    };

    const handleBackToCatalog = () => {
        setSelectedCourse(null);
        setPendingCourse(null);
    };

    return (
        <div className="relative w-full max-w-[1600px] mx-auto space-y-6 px-4">
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
                        className="relative z-10 flex flex-col xl:flex-row gap-6 h-full"
                    >
                        {/* Left Column: Sidebar (Fixed Width) */}
                        <div className="w-full xl:w-[260px] 2xl:w-[280px] flex-shrink-0 h-full">
                            <CourseSidebar
                                course={selectedCourse}
                                onSelectSubLesson={handleSelectSubLesson}
                                activeSubLessonId={activeSubLesson?.id}
                                onBack={handleBackToCatalog}
                            />
                        </div>

                        {/* Center Column: Main Content (Fluid) */}
                        <div className="flex-1 min-w-0 h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar px-2">
                            <AnimatePresence mode="wait">
                                {activeSubLesson ? (
                                    <motion.div
                                        key={`lesson-${activeSubLesson.id}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="h-full"
                                    >
                                        <LessonPlayer
                                            subLesson={activeSubLesson}
                                            onClose={() => setActiveSubLesson(null)}
                                            isInline
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="dashboard"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <CourseDashboard
                                            course={selectedCourse}
                                            onSelectLesson={(lesson) => {
                                                // Default to first sub-lesson
                                                if (lesson.subLessons?.length > 0) {
                                                    setActiveSubLesson(lesson.subLessons[0]);
                                                }
                                            }}
                                            onSelectSubLesson={handleSelectSubLesson}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right Column: Ads & Stats (Fixed Width) */}
                        <div className="w-full xl:w-[280px] 2xl:w-[300px] flex-shrink-0 space-y-6">
                            {/* Ad Placeholder (Tactical Intel) */}
                            <div className="bg-gradient-to-br from-bg-secondary/80 to-bg-secondary/30 border border-border rounded-3xl p-6 min-h-[300px] relative overflow-hidden group shadow-xl">
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />
                                <div className="absolute top-3 right-3 text-[11px] font-black text-white/20 uppercase tracking-[.3em] border border-white/5 px-2 py-0.5 rounded backdrop-blur-sm">
                                    Sponsored Intel
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <div className="w-10 h-1 bg-accent/30 rounded-full" />
                                    <h4 className="text-xs font-black text-text-primary uppercase tracking-[.2em]">Tactical Gear Upgrade</h4>
                                    <div className="aspect-square bg-bg-tertiary/50 rounded-2xl border border-white/5 flex items-center justify-center p-4 group-hover:bg-bg-tertiary transition-all duration-500">
                                        <span className="text-4xl filter drop-shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]">⌨️</span>
                                    </div>
                                    <p className="text-[11px] text-text-muted font-bold leading-relaxed">
                                        Enhance your typing velocity with professional mechanical precision. Explore the latest in tactical input hardware.
                                    </p>
                                    <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95">
                                        Initialize Recon
                                    </button>
                                </div>

                                {/* Decorative Scanline */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-20 -translate-y-[100%] group-hover:translate-y-[200%] transition-transform duration-[1500ms] pointer-events-none" />
                            </div>

                            <CourseStats />
                        </div>
                    </motion.div>
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
