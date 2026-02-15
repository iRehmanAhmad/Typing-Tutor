import React, { useState } from 'react';
import { useTheme, themes } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const TacticalSwitcher = () => {
    const { currentTheme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const activeThemeData = themes.find(t => t.id === currentTheme);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-text-primary/10 border border-text-primary/10 rounded-xl hover:bg-text-primary/20 transition"
                title="Tactical Switcher"
            >
                <div
                    className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                    style={{ backgroundColor: activeThemeData?.primary || '#818CF8' }}
                />
                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Appearance</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-[60]"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-56 bg-bg-tertiary border border-border rounded-2xl shadow-2xl p-2 z-[70]"
                        >
                            <div className="px-3 py-2 border-b border-border mb-2">
                                <p className="text-[10px] font-black text-text-muted uppercase tracking-tighter leading-none">Choose Theme</p>
                            </div>
                            <div className="space-y-1">
                                {themes.map((theme) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => {
                                            setTheme(theme.id);
                                            setIsOpen(false);
                                        }}
                                        className={`
                                            w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all
                                            ${currentTheme === theme.id ? 'bg-text-primary/10 border border-text-primary/5' : 'hover:bg-text-primary/5'}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-4 h-4 rounded-full border border-black/20"
                                                style={{ backgroundColor: theme.primary }}
                                            />
                                            <span className="text-xs font-bold">{theme.name}</span>
                                        </div>
                                        {currentTheme === theme.id && (
                                            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TacticalSwitcher;
