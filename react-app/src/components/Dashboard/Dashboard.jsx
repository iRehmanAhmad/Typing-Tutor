import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import AdUnit from '../Ads/AdUnit';
import BroadcastBanner from './BroadcastBanner';
import TacticalTip from './TacticalTip';
import SEO from '../Layout/SEO';

const Dashboard = () => {
    const { user } = useAuth();
    const { progress } = useProgress();

    return (
        <div className="space-y-6">
            <SEO
                title="Command Dashboard"
                description="Track your typing progress, view daily missions, and monitor your tactical performance."
            />
            <BroadcastBanner />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                {/* Main Dashboard Content */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-bg-tertiary p-8 rounded-3xl border border-border shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black mb-2 text-text-primary">Welcome Back, {user?.displayName || 'Friend'}! 👋</h2>
                            <p className="text-text-secondary max-w-xl">Ready to continue your journey to typing mastery? Your accuracy has improved by 4% this week.</p>
                        </div>
                        <div className="absolute right-[-20px] bottom-[-20px] text-[160px] opacity-[0.03] rotate-[15deg] font-black group-hover:rotate-0 transition-transform duration-700 text-text-primary">TYPING</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-card p-6 rounded-2xl border border-border">
                            <p className="text-xs font-black text-text-muted uppercase tracking-widest mb-1">Current Streak</p>
                            <p className="text-3xl font-black text-orange-500">{progress?.streak || 0} <small className="text-sm font-bold">Days</small></p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl border border-border">
                            <p className="text-xs font-black text-text-muted uppercase tracking-widest mb-1">Total Experience</p>
                            <p className="text-3xl font-black text-accent">{progress?.xp || 0} <small className="text-sm font-bold">XP</small></p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl border border-border">
                            <p className="text-xs font-black text-text-muted uppercase tracking-widest mb-1">Achievements</p>
                            <p className="text-3xl font-black text-purple-500">{progress?.unlockedAchievements?.length || 0} <small className="text-sm font-bold">Unlocked</small></p>
                        </div>
                    </div>

                    <TacticalTip />
                </div>

                {/* Sidebar Ad Unit */}
                <div className="hidden lg:block lg:col-span-1 sticky top-24">
                    <AdUnit
                        slotId="dashboard_skyscraper"
                        format="skyscraper"
                        label="Sponsor"
                        className="shadow-xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
