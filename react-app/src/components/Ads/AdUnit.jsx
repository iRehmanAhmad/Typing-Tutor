import React from 'react';
import { usePlatform } from '../../context/PlatformContext';

const AdUnit = ({ slotId, format = 'auto', className = '', label = 'Advertisement' }) => {
    const { isAdActive } = usePlatform();
    const active = isAdActive(slotId);

    if (!active) return null;

    // Dimensions based on format
    const getDimensions = () => {
        switch (format) {
            case 'leaderboard': return 'h-[90px] w-full max-w-[728px]';
            case 'rectangle': return 'h-[250px] w-[300px]';
            case 'skyscraper': return 'h-[600px] w-[160px]';
            case 'banner': return 'h-[60px] w-full max-w-[468px]';
            case 'card': return 'aspect-video w-full';
            default: return 'h-full w-full';
        }
    };

    return (
        <div className={`relative overflow-hidden bg-bg-tertiary/30 border border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center p-4 ${getDimensions()} ${className}`}>

            {/* Ad Placeholder Content */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)' }}
            />

            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2 opacity-50">
                {label} • {slotId}
            </span>

            <div className="bg-bg-secondary border border-border px-4 py-2 rounded-lg">
                <p className="text-xs font-bold text-text-secondary">Space Reserved</p>
                <p className="text-[9px] text-text-muted">Google Ads / Partner</p>
            </div>

            {/* In production, this would be replaced by the actual ad script */}
            {/* <ins className="adsbygoogle" ... /> */}
        </div>
    );
};

export default AdUnit;
