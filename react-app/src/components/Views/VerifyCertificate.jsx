import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

const VerifyCertificate = ({ certId }) => {
    const [cert, setCert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCert = async () => {
            if (!certId) {
                setError("No certificate ID provided.");
                setLoading(false);
                return;
            }

            try {
                const certRef = doc(db, 'certificates', certId);
                const snap = await getDoc(certRef);
                if (snap.exists()) {
                    setCert(snap.data());
                } else {
                    setError("Certificate not found in investigative database.");
                }
            } catch (err) {
                console.error(err);
                setError("Database connection error.");
            } finally {
                setLoading(false);
            }
        };

        fetchCert();
    }, [certId]);

    if (loading) return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs font-black text-text-muted uppercase tracking-[0.4em]">Verifying Authentication Signature...</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-2xl font-black text-red-500 uppercase tracking-tighter mb-2">Verification Failed</h1>
            <p className="text-text-muted text-sm max-w-md">{error}</p>
            <button
                onClick={() => window.location.href = '/'}
                className="mt-8 px-8 py-3 rounded-xl bg-bg-secondary border border-border text-xs font-black uppercase tracking-widest text-text-primary hover:bg-bg-tertiary transition-all"
            >
                Return to Command Terminal
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl w-full bg-bg-secondary border-2 border-accent/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10 overflow-hidden"
            >
                {/* Security Watermark */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none select-none">
                    <div className="text-8xl font-black italic -rotate-12">VERIFIED</div>
                </div>

                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-4xl border border-accent/20 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
                        🎖️
                    </div>

                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-accent uppercase tracking-[0.5em]">Typing Master Operations</p>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-text-primary uppercase">Certificate of Proficiency</h1>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div className="space-y-4">
                        <p className="text-xs text-text-muted uppercase tracking-widest font-black">This document confirms the tactical status of</p>
                        <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight underline decoration-accent/30 underline-offset-8 decoration-4">{cert.userName}</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-8">
                        {[
                            { label: 'Speed', val: cert.wpm, unit: 'WPM' },
                            { label: 'Accuracy', val: cert.accuracy, unit: '%' },
                            { label: 'Level', val: cert.level, unit: 'CORE' },
                            { label: 'Rank', val: cert.rank || 'Operative', unit: 'ST' }
                        ].map((s, i) => (
                            <div key={i} className="bg-bg-primary/50 p-4 rounded-2xl border border-border">
                                <p className="text-[8px] font-black text-text-muted uppercase tracking-widest mb-1">{s.label}</p>
                                <p className="text-xl font-black text-text-primary">{s.val}<small className="text-[10px] ml-0.5 opacity-40">{s.unit}</small></p>
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-border mt-8">
                        <div className="text-left space-y-1">
                            <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Digital ID Authentication</p>
                            <p className="text-xs font-mono text-accent">{certId}</p>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Issue Date</p>
                            <p className="text-xs font-bold text-text-primary">{cert.issueDate}</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <p className="mt-8 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] opacity-40">Typing Master Digital Verification Protocol v1.0.4</p>
        </div>
    );
};

export default VerifyCertificate;
