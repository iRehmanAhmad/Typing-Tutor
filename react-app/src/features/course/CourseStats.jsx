import React from 'react';
import { useProgress } from '../../context/ProgressContext';

const CourseStats = () => {
    const { progress } = useProgress();

    return (
        <div className="space-y-6">
            {/* Operational Metrics */}
            <div className="bg-bg-secondary/50 border border-border rounded-3xl p-5 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-[0.02] transform rotate-12 pointer-events-none">
                    <span className="text-6xl font-black text-text-primary">DATA</span>
                </div>

                <h3 className="font-black text-[11px] text-accent uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    Operational Metrics
                </h3>

                <div className="grid grid-cols-2 gap-3 relative z-10">
                    <AchievementCard icon="🔥" label="Active Streak" value={`${progress?.streak || 0}d`} color="text-orange-500" />
                    <AchievementCard icon="⭐" label="Commendations" value={progress?.totalStars || 0} color="text-yellow-400" />
                    <AchievementCard icon="🏆" label="Class Rank" value={progress?.rank || 'Novice'} color="text-accent" />
                    <AchievementCard icon="⚡" label="Peak Velocity" value={`${progress?.bestWpm || 0}`} unit="WPM" color="text-green-400" />
                </div>
            </div>

            {/* Target Acquisition (Focus Keys) */}
            <div className="bg-bg-secondary/50 border border-border rounded-3xl p-5 backdrop-blur-md">
                <h3 className="font-black text-[11px] text-red-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    Target Acquisition
                </h3>

                <div className="flex flex-wrap gap-2">
                    {Object.entries(progress?.weakKeys || {}).length > 0 ? (
                        Object.entries(progress.weakKeys).slice(0, 6).map(([key, count]) => (
                            <div key={key} className="bg-bg-tertiary/30 border border-white/5 px-3 py-2 rounded-xl text-center min-w-[50px] relative overflow-hidden group hover:border-red-500/30 transition-colors">
                                <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <p className="text-sm font-black text-red-400 relative z-10">{key}</p>
                                <p className="text-[11px] text-text-muted relative z-10">{count}x</p>
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center py-4 border border-dashed border-white/10 rounded-xl">
                            <p className="text-[11px] text-text-muted uppercase tracking-widest opacity-50">No Targets Identified</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AchievementCard = ({ icon, label, value, unit, color }) => (
    <div className="bg-bg-tertiary/30 border border-white/5 p-3 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group relative overflow-hidden">
        {/* Holographic Edge */}
        <div className="absolute inset-0 border border-transparent group-hover:border-white/10 rounded-2xl transition-colors pointer-events-none" />

        <span className="text-lg mb-1 filter drop-shadow-lg transform group-hover:scale-110 transition-transform">{icon}</span>
        <p className="text-[11px] font-black text-text-muted uppercase tracking-widest leading-none mb-1 opacity-70">{label}</p>
        <div className="flex items-baseline gap-1">
            <p className={`font-black text-lg ${color} drop-shadow-sm`}>{value}</p>
            {unit && <span className="text-[11px] font-bold text-text-muted">{unit}</span>}
        </div>
    </div>
);

export default CourseStats;
