import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CompetitionTables = ({ latestResults = [], dailyTop = [], monthlyTop = [] }) => {
    const [activeTab, setActiveTab] = useState('latest');

    const tabs = [
        { id: 'latest', label: 'Latest Results', icon: '🕓' },
        { id: 'daily', label: 'Daily Top 10', icon: '📅' },
        { id: 'monthly', label: 'Monthly Top 10', icon: '🗓️' }
    ];

    const getActiveData = () => {
        if (activeTab === 'latest') return latestResults;
        if (activeTab === 'daily') return dailyTop;
        return monthlyTop;
    };

    return (
        <div className="bg-bg-secondary border border-border rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Ultra-Compact Tab Header */}
            <div className="flex bg-bg-primary/50 border-b border-border p-1 gap-1">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all
                            ${activeTab === tab.id
                                ? 'bg-accent text-background shadow-md'
                                : 'text-text-muted hover:bg-bg-tertiary hover:text-text-primary'}
                        `}
                    >
                        <span className="text-xs">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* High-Density Table Content */}
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-bg-primary/30">
                            <th className="px-4 py-2 text-[8px] font-black text-text-muted uppercase tracking-[0.2em] border-b border-border w-12 text-center">#</th>
                            <th className="px-4 py-2 text-[8px] font-black text-text-muted uppercase tracking-[0.2em] border-b border-border">Name</th>
                            <th className="px-4 py-2 text-[8px] font-black text-text-muted uppercase tracking-[0.2em] border-b border-border">Time</th>
                            <th className="px-4 py-2 text-[8px] font-black text-text-muted uppercase tracking-[0.2em] border-b border-border">Typed</th>
                            <th className="px-4 py-2 text-[8px] font-black text-text-muted uppercase tracking-[0.2em] border-b border-border w-20">Accuracy</th>
                            <th className="px-4 py-2 text-[8px] font-black text-text-muted uppercase tracking-[0.2em] border-b border-border text-accent">WPM</th>
                            <th className="px-4 py-2 text-[8px] font-black text-text-muted uppercase tracking-[0.2em] border-b border-border text-accent">CPM</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/10">
                        <AnimatePresence>
                            {getActiveData().length > 0 ? (
                                getActiveData().map((result, idx) => (
                                    <motion.tr
                                        key={idx}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className={`
                                            hover:bg-bg-primary/20 transition-all group relative
                                            ${idx === 0 ? 'bg-accent/[0.04] shadow-[inset_3px_0_0_0_#eab308]' : ''}
                                            ${idx === 1 ? 'bg-accent/[0.03] shadow-[inset_3px_0_0_0_#94a3b8]' : ''}
                                            ${idx === 2 ? 'bg-accent/[0.02] shadow-[inset_3px_0_0_0_#92400e]' : ''}
                                            ${result.isMe ? 'bg-accent/[0.05] border-l-2 border-l-accent' : ''}
                                        `}
                                    >
                                        <td className="px-4 py-1.5 text-center">
                                            {idx === 0 && <span className="text-lg filter drop-shadow-sm">🥇</span>}
                                            {idx === 1 && <span className="text-lg filter drop-shadow-sm">🥈</span>}
                                            {idx === 2 && <span className="text-lg filter drop-shadow-sm">🥉</span>}
                                            {idx > 2 && <span className="font-black italic text-text-muted text-[10px]">{idx + 1}</span>}
                                        </td>
                                        <td className="px-4 py-1.5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[8px] border shadow-xs
                                                    ${idx === 0 ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-600' : ''}
                                                    ${idx === 1 ? 'bg-slate-400/10 border-slate-400/50 text-slate-500' : ''}
                                                    ${idx === 2 ? 'bg-orange-800/10 border-orange-800/50 text-orange-900' : ''}
                                                    ${idx > 2 ? 'bg-bg-tertiary border-border text-text-muted' : ''}
                                                `}>
                                                    {result.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`font-bold text-[11px] leading-tight ${idx < 3 ? 'text-text-primary' : 'text-text-secondary'} group-hover:text-accent`}>
                                                        {result.name}
                                                    </span>
                                                    {result.isMe && (
                                                        <span className="text-[6px] font-black tracking-[0.1em] text-accent uppercase leading-none">Verified</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-1.5 text-[10px] font-medium text-text-muted">{result.time}</td>
                                        <td className="px-4 py-1.5 text-[10px] font-black text-text-secondary italic">
                                            {result.words}<span className="text-text-muted opacity-30 not-italic font-medium mx-0.5">/</span>{result.chars}
                                        </td>
                                        <td className={`px-4 py-1.5 text-[10px] font-black ${result.accuracy >= 98 ? 'text-green-500' : 'text-text-primary'}`}>
                                            {result.accuracy}%
                                        </td>
                                        <td className={`px-4 py-1.5 text-lg font-black italic tracking-tighter ${idx < 3 ? 'text-accent' : 'text-accent/70'}`}>
                                            {result.wpm}
                                        </td>
                                        <td className="px-4 py-1.5 text-sm font-black italic tracking-tighter text-text-primary/70">{result.cpm}</td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr className="h-20">
                                    <td colSpan="8" className="text-center text-[9px] font-black uppercase tracking-widest opacity-20">
                                        Offline
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompetitionTables;
