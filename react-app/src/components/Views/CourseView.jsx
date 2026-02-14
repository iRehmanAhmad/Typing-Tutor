import React from 'react';

const CourseView = () => (
    <div className="space-y-6">
        <div className="bg-bg-secondary p-8 rounded-3xl border border-border">
            <h2 className="text-3xl font-black mb-2">🎓 Course Library</h2>
            <p className="text-text-secondary">Explore 50+ master lessons designed to take you from beginner to typing ninja.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-card p-6 rounded-2xl border border-border opacity-50">
                    <div className="w-12 h-12 bg-bg-tertiary rounded-xl mb-4"></div>
                    <div className="h-4 bg-bg-tertiary rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-bg-tertiary rounded w-1/2"></div>
                </div>
            ))}
        </div>
        <p className="text-center text-text-muted italic">Phase 4 will bring the full Course engine here...</p>
    </div>
);

export default CourseView;
