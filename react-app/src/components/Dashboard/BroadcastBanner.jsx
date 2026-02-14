import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { motion, AnimatePresence } from 'framer-motion';

const BroadcastBanner = () => {
    const { config, loading } = usePlatform();

    if (loading || !config?.broadcast?.alert) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
            >
                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-2xl flex items-center gap-4 relative">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center text-accent animate-pulse">
                        📡
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-0.5">Global System Alert</p>
                        <p className="text-sm font-bold text-text-primary tracking-tight leading-tight">
                            {config.broadcast.alert}
                        </p>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 hover:opacity-100 transition-opacity cursor-default">
                        <span className="text-[8px] font-black uppercase text-accent border border-accent/30 px-2 py-0.5 rounded">Live Stream</span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BroadcastBanner;
