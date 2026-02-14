import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePlatform } from '../../context/PlatformContext';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../Layout/SEO';
import { db } from '../../config/firebase';
import { doc, onSnapshot, updateDoc, setDoc, collection, getDocs, query, limit } from 'firebase/firestore';

const AdminHQ = ({ onBack }) => {
    const [activeModule, setActiveModule] = useState('overview');
    const [stats, setStats] = useState({
        wordsTyped: 0,
        operatives: 0,
        certificates: 0,
        adClicks: 0
    });

    const [platformConfig, setPlatformConfig] = useState({
        adUnits: [
            { id: 'top_banner', name: 'Test Arena Top', active: true, provider: 'Google Ads' },
            { id: 'sidebar', name: 'Learning Sidebar', active: true, provider: 'Custom Partner' }
        ],
        broadcast: {
            alert: 'System Online: All sectors operational.',
            tip: 'Tip: Use the anchor keys (F & J) to maintain tactical alignment.'
        }
    });

    const [recentLogs, setRecentLogs] = useState([]);

    // Sync Platform Config
    useEffect(() => {
        const configRef = doc(db, 'config', 'platform');
        const unsub = onSnapshot(configRef, (snap) => {
            if (snap.exists()) {
                setPlatformConfig(snap.data());
            } else {
                // Initialize if missing
                setDoc(configRef, platformConfig);
            }
        });

        // Fetch some basic stats (limited for performance)
        const recentQuery = query(collection(db, 'leaderboards'), limit(5));
        const unsubLogs = onSnapshot(recentQuery, (snap) => {
            setRecentLogs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => {
            unsub();
            unsubLogs();
        };
    }, []);

    const toggleAd = async (adId) => {
        const newUnits = platformConfig.adUnits.map(unit =>
            unit.id === adId ? { ...unit, active: !unit.active } : unit
        );
        const configRef = doc(db, 'config', 'platform');
        await updateDoc(configRef, { adUnits: newUnits });
    };

    const updateBroadcast = async (newData) => {
        const configRef = doc(db, 'config', 'platform');
        await updateDoc(configRef, { broadcast: { ...platformConfig.broadcast, ...newData } });
    };

    const modules = [
        { id: 'overview', name: 'Field Intel', icon: '📊' },
        { id: 'cms', name: 'Mission CMS', icon: '📁' },
        { id: 'ads', name: 'Intel Ops (Ads)', icon: '🛡️' },
        { id: 'broadcast', name: 'Broadcast', icon: '📡' }
    ];

    return (
        <div className="min-h-screen bg-background p-8">
            <SEO
                title="Command Center"
                description="Administrative control panel for platform management and analytics."
            />
            <div className="max-w-7xl mx-auto flex gap-6">
                {/* Sidebar */}
                <div className="w-64 bg-bg-secondary border border-border rounded-3xl p-6 flex flex-col gap-3 h-fit sticky top-8">
                    <h2 className="text-xs font-black text-text-muted uppercase tracking-[0.3em] mb-2">Command Center</h2>
                    {modules.map(mod => (
                        <button
                            key={mod.id}
                            onClick={() => setActiveModule(mod.id)}
                            className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl border transition-all
                                ${activeModule === mod.id
                                    ? 'bg-purple-500 text-white border-purple-400 shadow-[0_10px_30px_rgba(168,85,247,0.3)]'
                                    : 'bg-bg-secondary/40 border-border/10 text-text-muted hover:bg-bg-secondary hover:border-border hover:text-text-primary'
                                }
                            `}
                        >
                            <span className="text-xl">{mod.icon}</span>
                            <span className="font-bold uppercase tracking-widest text-[10px]">{mod.name}</span>
                        </button>
                    ))}

                    <div className="mt-auto p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                        <p className="text-[9px] font-black text-red-500 uppercase tracking-widest text-center">Threat Level: Minimal</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-bg-secondary/40 border border-border rounded-3xl p-8 relative overflow-hidden backdrop-blur-sm">
                    {/* Background Grid Decoration */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                    <AnimatePresence mode="wait">
                        {activeModule === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Words Typed', val: recentLogs.reduce((acc, l) => acc + (l.chars || 0), 0) * 12, color: 'text-cyan-400' },
                                        { label: 'Active Operatives', val: recentLogs.length * 3, color: 'text-purple-400' },
                                        { label: 'Certs Issued', val: Math.floor(recentLogs.length / 2), color: 'text-orange-400' },
                                        { label: 'Ad Performance', val: platformConfig.adUnits.filter(u => u.active).length * 15, color: 'text-green-400' }
                                    ].map((s, i) => (
                                        <div key={i} className="bg-bg-primary/50 p-6 rounded-2xl border border-border group hover:border-accent transition-all">
                                            <p className="text-[10px] font-black text-text-muted uppercase mb-2">{s.label}</p>
                                            <p className={`text-3xl font-black tabular-nums ${s.color}`}>{s.val.toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Real-time Engagement Stream</h3>
                                    <div className="grid gap-2">
                                        {recentLogs.map((log, i) => (
                                            <div key={log.id} className="bg-bg-primary/20 border border-border/40 p-3 rounded-xl flex justify-between items-center text-[10px]">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                                    <span className="font-bold text-text-primary uppercase">{log.name}</span>
                                                    <span className="text-text-muted">intercepted {log.gameId === 'speed_circuit' ? 'Circuit' : 'Mainframe'}</span>
                                                </div>
                                                <div className="flex gap-4 font-black">
                                                    <span className="text-accent">{log.wpm || log.score} {log.wpm ? 'WPM' : 'PTS'}</span>
                                                    <span className="text-text-muted opacity-40">{log.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                        {recentLogs.length === 0 && (
                                            <div className="h-20 flex items-center justify-center border border-dashed border-border rounded-xl opacity-20 text-[10px] uppercase font-black tracking-widest">
                                                No incoming data streams...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeModule === 'ads' && (
                            <motion.div
                                key="ads"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h2 className="text-xl font-black uppercase text-text-primary">Intel Monetization</h2>
                                        <p className="text-xs text-text-muted mt-1">Manage platform-wide ad units and sponsorships.</p>
                                    </div>
                                    <button className="px-4 py-2 rounded-lg bg-accent text-white font-bold text-[10px] uppercase tracking-widest">Connect Provider</button>
                                </div>

                                <div className="grid gap-3">
                                    {platformConfig.adUnits.map(unit => (
                                        <div key={unit.id} className="bg-bg-primary/60 p-4 rounded-xl border border-border flex justify-between items-center group hover:bg-bg-primary transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-2 h-2 rounded-full ${unit.active ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500'}`} />
                                                <div>
                                                    <p className="font-bold text-sm text-text-primary">{unit.name}</p>
                                                    <p className="text-[10px] text-text-muted font-black uppercase tracking-wider">{unit.provider}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="px-3 py-1.5 rounded-lg bg-bg-tertiary text-[10px] font-black uppercase text-text-muted hover:text-text-primary transition-colors">Configure</button>
                                                <button
                                                    onClick={() => toggleAd(unit.id)}
                                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${unit.active ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'}`}
                                                >
                                                    {unit.active ? 'Disable' : 'Enable'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeModule === 'broadcast' && (
                            <motion.div
                                key="broadcast"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-black uppercase text-text-primary">Broadcast Console</h2>

                                <div className="space-y-4">
                                    <div className="bg-bg-primary/50 p-6 rounded-2xl border border-border space-y-4">
                                        <label className="block text-[10px] font-black text-text-muted uppercase tracking-widest">System Alert Banner</label>
                                        <input
                                            type="text"
                                            defaultValue={platformConfig.broadcast.alert}
                                            onBlur={(e) => updateBroadcast({ alert: e.target.value })}
                                            className="w-full bg-bg-secondary border border-border px-4 py-3 rounded-xl text-sm font-bold text-accent outline-none focus:border-accent/50"
                                        />
                                    </div>

                                    <div className="bg-bg-primary/50 p-6 rounded-2xl border border-border space-y-4">
                                        <label className="block text-[10px] font-black text-text-muted uppercase tracking-widest">Tactical Tip of the Day</label>
                                        <textarea
                                            defaultValue={platformConfig.broadcast.tip}
                                            onBlur={(e) => updateBroadcast({ tip: e.target.value })}
                                            className="w-full bg-bg-secondary border border-border px-4 py-3 rounded-xl text-sm font-medium text-text-primary outline-none focus:border-accent/50 min-h-[100px]"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeModule === 'cms' && (
                            <motion.div
                                key="cms"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex flex-col items-center justify-center h-full space-y-4"
                            >
                                <div className="text-4xl">🗄️</div>
                                <h3 className="font-black uppercase tracking-widest text-text-primary">Curriculum Database</h3>
                                <p className="text-xs text-text-muted text-center max-w-sm">Connect your Supabase project using the credentials in .env to enable dynamic mission management.</p>
                                <button className="mt-4 px-6 py-2 rounded-xl bg-purple-500 text-white font-black text-xs uppercase tracking-tighter shadow-lg shadow-purple-500/20">Sync with Mainframe</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AdminHQ;
