import React from 'react';
import { motion } from 'framer-motion';

const CertificateGenerator = ({ username, date, courseName, onClose }) => {
    return (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white text-black w-full max-w-4xl rounded-[40px] p-12 relative shadow-[0_0_100px_rgba(255,255,255,0.1)]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #f8fafc 0%, #ffffff 100%)',
                    border: '15px solid #111'
                }}
            >
                <div className="border-4 border-black p-8 text-center space-y-8">
                    <div className="space-y-2">
                        <span className="text-sm font-black tracking-[0.5em] uppercase text-gray-400">Tactical Typing Master</span>
                        <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Certificate of Excellence</h1>
                        <div className="h-1 w-24 bg-black mx-auto mt-4" />
                    </div>

                    <p className="text-xl font-medium text-gray-600 max-w-lg mx-auto leading-relaxed">
                        This document officially certifies that the student recognized below has demonstrated exceptional proficiency and technical mastery in touch typing.
                    </p>

                    <div className="py-8">
                        <span className="text-xs font-bold uppercase text-gray-400 block mb-2">Presented To</span>
                        <h2 className="text-5xl font-black underline decoration-4 underline-offset-8">{username || 'N/A'}</h2>
                    </div>

                    <div className="py-4">
                        <span className="text-xs font-bold uppercase text-gray-400 block mb-2">For Successfully Completing</span>
                        <h3 className="text-2xl font-black italic uppercase tracking-tight">{courseName}</h3>
                    </div>

                    <div className="flex justify-between items-end pt-12">
                        <div className="text-left">
                            <p className="text-xs font-bold uppercase text-gray-400">Date Issued</p>
                            <p className="font-black">{new Date(date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-center px-8 py-4 border-2 border-dashed border-gray-300 rounded-2xl">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none block mb-1">Official Seal</span>
                            <span className="text-4xl">🏆</span>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold uppercase text-gray-400">Verification ID</p>
                            <p className="font-mono text-xs font-black">{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-4 no-print">
                    <button
                        onClick={() => window.print()}
                        className="px-8 py-4 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition active:scale-95"
                    >
                        PRINT / SAVE PDF
                    </button>
                    <button
                        onClick={onClose}
                        className="px-8 py-4 bg-gray-100 text-black font-black rounded-2xl hover:bg-gray-200 transition border border-gray-200"
                    >
                        RETURN TO DASHBOARD
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default CertificateGenerator;
