import React from 'react';
import { usePlatform } from '../../context/PlatformContext';

const TacticalTip = ({ className = "" }) => {
    const { config } = usePlatform();

    if (!config?.broadcast?.tip) return null;

    return (
        <div className={`bg-bg-secondary/50 border border-border p-4 rounded-2xl flex items-start gap-4 ${className}`}>
            <div className="text-2xl mt-1 opacity-60">💡</div>
            <div>
                <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] mb-1">HQ Tactical Tip</p>
                <p className="text-xs font-medium text-text-secondary leading-relaxed">
                    {config.broadcast.tip}
                </p>
            </div>
        </div>
    );
};

export default TacticalTip;
