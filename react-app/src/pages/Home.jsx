import React from 'react';
import Dashboard from '../features/dashboard/Dashboard';

const HomeView = () => {
    return (
        <div className="space-y-8">
            <Dashboard />
            <div className="bg-accent/10 p-6 rounded-2xl border border-accent/20 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-lg text-text-primary">Next Goal: Pro Master Certificate</h3>
                    <p className="text-sm text-text-secondary">You need 140 more XP and 95% average accuracy.</p>
                </div>
                <button className="bg-accent px-6 py-2 rounded-xl font-bold text-sm">View Path</button>
            </div>
        </div>
    );
};

export default HomeView;
