import React from 'react';

const TestView = () => (
    <div className="max-w-4xl mx-auto space-y-6 text-center py-12">
        <div className="text-6xl mb-6">⌨️</div>
        <h2 className="text-4xl font-black">Typing Speed Test</h2>
        <p className="text-xl text-text-secondary">Test your skills with our professional certification-grade typing engine.</p>
        <div className="py-8">
            <button className="bg-accent px-12 py-4 rounded-3xl font-black text-xl shadow-2xl hover:scale-105 transition">
                START TEST
            </button>
        </div>
        <p className="text-text-muted italic">Phase 3 will bring the high-performance typing engine here...</p>
    </div>
);

export default TestView;
