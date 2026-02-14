import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Components ---

const GameCard = ({ title, description, icon, color, onClick, isLocked, tag }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        disabled={isLocked}
        className={`
            relative overflow-hidden rounded-3xl p-6 text-left border transition-all h-full flex flex-col group
            ${isLocked
                ? 'bg-bg-secondary/20 border-border/50 opacity-50 grayscale cursor-not-allowed'
                : 'bg-bg-secondary/50 border-border hover:border-accent hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)]'}
        `}
    >
        <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            {tag && (
                <span className="px-2 py-1 rounded-md bg-bg-tertiary text-[10px] font-black uppercase tracking-wider text-text-muted border border-border/50">
                    {tag}
                </span>
            )}
        </div>

        <h3 className="text-xl font-black italic uppercase tracking-tighter text-text-primary mb-2">
            {title}
        </h3>
        <p className="text-xs font-bold text-text-muted leading-relaxed mb-4">
            {description}
        </p>

        {/* Tactical Corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent -mr-8 -mt-8 rotate-45 pointer-events-none" />

        {/* Play Button Indicator */}
        <div className="mt-auto flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            <span className="text-[10px] font-black uppercase tracking-widest">Init Protocol</span>
            <span>→</span>
        </div>
    </motion.button>
);

import SpeedCircuit from '../Games/SpeedCircuit';
import ThreatNeutralization from '../Games/ThreatNeutralization';
import SEO from '../Layout/SEO';

// --- Main View ---

const GamesView = () => {
    const [mode, setMode] = useState('dashboard'); // 'dashboard', 'active_race', 'active_survival'

    // Placeholder Logic for Game Start
    const handleStartGame = (gameMode) => {
        setMode(gameMode);
    };

    const handleBack = () => {
        setMode('dashboard');
    };

    return (
        <div className="max-w-7xl mx-auto min-h-[80vh] flex flex-col">
            <SEO
                title="Tactical Operations | Arcade"
                description="Engage in high-stakes typing games. Race in Speed Circuit or defend the mainframe in Threat Neutralization."
            />
            {/* Header */}
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                {mode === 'dashboard' ? (
                    <div className="text-center md:text-left space-y-2">
                        <h1 className="text-4xl font-black italic text-text-primary tracking-tighter uppercase">
                            Tactical Arcade
                        </h1>
                        <p className="text-text-muted font-bold text-sm uppercase tracking-widest">
                            High-Stakes Simulations // Competitive & Survival
                        </p>
                    </div>
                ) : (
                    <button onClick={handleBack} className="text-text-muted hover:text-accent transition-colors flex items-center gap-2">
                        <span className="text-xl">←</span>
                        <span className="text-sm font-bold uppercase tracking-widest">Back to Arcade</span>
                    </button>
                )}
            </header>

            {/* Dashboard Mode */}
            {mode === 'dashboard' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <GameCard
                            title="Speed Circuit"
                            description="Data Exfiltration Protocol. Race against elite counter-operatives to decrypt the payload before time runs out."
                            icon="🏎️"
                            color="bg-orange-500/10 text-orange-500"
                            tag="PvE Race"
                            onClick={() => handleStartGame('active_race')}
                        />

                        <GameCard
                            title="Threat Neutralization"
                            description="Mainframe Defense. Eliminate incoming threat vectors (words) before they breach the firewall."
                            icon="🛡️"
                            color="bg-purple-500/10 text-purple-500"
                            tag="Survival"
                            onClick={() => handleStartGame('active_survival')}
                        />
                    </div>

                    {/* Coming Soon Section */}
                    <div className="max-w-4xl mx-auto pt-8 border-t border-border/30">
                        <h3 className="text-xs font-black uppercase tracking-widest text-text-muted mb-6 text-center">Classified Operations (Coming Soon)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <GameCard
                                title="Code Breaker"
                                description="Decrypt binary streams in real-time."
                                icon="🔓"
                                color="bg-emerald-500/10 text-emerald-500"
                                isLocked={true}
                                tag="Puzzle"
                            />
                            <GameCard
                                title="Rhythm Strike"
                                description="Type to the beat of the tactical synthwave."
                                icon="🎵"
                                color="bg-pink-500/10 text-pink-500"
                                isLocked={true}
                                tag="Rhythm"
                            />
                            <GameCard
                                title="Global Conflict"
                                description="Live multiplayer territory control."
                                icon="🌍"
                                color="bg-blue-500/10 text-blue-500"
                                isLocked={true}
                                tag="PvP MMO"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Active Game Modes */}
            {mode === 'active_race' && (
                <SpeedCircuit onAbort={handleBack} />
            )}

            {mode === 'active_survival' && (
                <ThreatNeutralization onAbort={handleBack} />
            )}
        </div>
    );
};

export default GamesView;
