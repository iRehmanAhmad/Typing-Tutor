import React, { useState } from 'react';
import CourseSidebar from '../Course/CourseSidebar';
import CourseDashboard from '../Course/CourseDashboard';
import CourseStats from '../Course/CourseStats';
import LessonPlayer from '../Course/LessonPlayer';
import { COURSES } from '../../data/courseData';
import { AnimatePresence } from 'framer-motion';

const CourseView = () => {
    const [selectedCourse] = useState(COURSES.basic);
    const [activeSubLesson, setActiveSubLesson] = useState(null);
    const [isDashboard, setIsDashboard] = useState(true);

    const handleSelectSubLesson = (subLesson) => {
        setActiveSubLesson(subLesson);
    };

    const handleSelectLesson = (lesson) => {
        // Auto-select first sub-lesson when clicking a map node
        setActiveSubLesson(lesson.subLessons[0]);
    };

    return (
        <div className="max-w-[1600px] mx-auto px-4 h-[calc(100vh-100px)]">
            <div className="flex gap-6 h-full">
                {/* Left Column: Sidebar */}
                <div className="w-[300px] flex-shrink-0">
                    <CourseSidebar
                        course={selectedCourse}
                        onSelectSubLesson={handleSelectSubLesson}
                        activeSubLessonId={activeSubLesson?.id}
                    />
                </div>

                {/* Center Column: Main Content */}
                <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar pr-2">
                    <CourseDashboard
                        course={selectedCourse}
                        onSelectLesson={handleSelectLesson}
                    />
                </div>

                {/* Right Column: Stats & Achievements */}
                <div className="w-[300px] flex-shrink-0">
                    <CourseStats />
                </div>
            </div>

            <AnimatePresence>
                {activeSubLesson && (
                    <LessonPlayer
                        subLesson={activeSubLesson}
                        onClose={() => setActiveSubLesson(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CourseView;
