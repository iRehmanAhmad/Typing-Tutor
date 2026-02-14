import React from 'react';
import { useProgress } from '../../context/ProgressContext';

const CourseStats = () => {
    const { progress } = useProgress();

    return (
        <div className="space-y-6">
            <div className="bg-bg-secondary border border-border rounded-3xl p-6 space-y-4">
                <h3 className="font-black text-xs text-text-muted uppercase tracking-widest">Achievements</h3>
                <div className="grid grid-cols-2 gap-3">
                    <AchievementCard icon="🔥" label="Streak" value={`${progress.currentStreak || 0}d`} />
                    <AchievementCard icon="⭐" label="Stars" value={progress.totalStars || 0} />
                    <AchievementCard icon="🏆" label="Rank" value={progress.rank || 'Novice'} />
                    <AchievementCard icon="⚡" label="Max Speed" value={`${progress.bestWpm || 0}`} />
                </div>
            </div>

            <div className="bg-bg-secondary border border-border rounded-3xl p-6">
                <h3 className="font-black text-xs text-text-muted uppercase tracking-widest mb-4">Focus Keys</h3>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(progress.weakKeys || {}).length > 0 ? (
                        Object.entries(progress.weakKeys).slice(0, 6).map(([key, count]) => (
                            <div key={key} className="bg-bg-tertiary border border-white/5 px-3 py-2 rounded-xl text-center min-w-[50px]">
                                <p className="text-sm font-black text-accent">{key}</p>
                                <p className="text-[10px] text-text-muted">{count}x</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-text-muted italic">No data yet. Keep typing!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const AchievementCard = ({ icon, label, value }) => (
    <div className="bg-bg-tertiary/50 border border-white/5 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
        <span className="text-xl mb-1">{icon}</span>
        <p className="text-[10px] font-black text-text-muted uppercase tracking-tighter leading-none mb-1">{label}</p>
        <p className="font-black text-sm truncate w-full">{value}</p>
    </div>
);

export default CourseStats;
