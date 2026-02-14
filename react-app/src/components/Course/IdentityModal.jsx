import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

const IdentityModal = ({ isOpen, onClose, onComplete }) => {
    const { user, login } = useAuth();
    const { progress, updateProgress } = useProgress();
    const [nameInput, setNameInput] = useState('');
    const [step, setStep] = useState('check'); // 'check', 'input', 'confirm'

    useEffect(() => {
        if (isOpen) {
            if (user) {
                // Case 3: Logged-in User
                onComplete(); // Auto-start
            } else {
                const savedName = localStorage.getItem('guest_name');
                if (savedName) {
                    setNameInput(savedName);
                    setStep('confirm'); // Case 2: Returning Guest
                } else {
                    setStep('input'); // Case 1: First-time User
                }
            }
        }
    }, [isOpen, user]);

    const handleGuestContinue = () => {
        if (!nameInput.trim()) return;
        localStorage.setItem('guest_name', nameInput);
        // Update context with guest name if no user is logged in
        if (!user) {
            updateProgress({ ...progress, username: nameInput });
        }
        onComplete();
    };

    const handleChangeName = () => {
        setStep('input');
        setNameInput('');
    };

    const handleGoogleLogin = async () => {
        try {
            await login();
            onComplete();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    if (!isOpen || user) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />

                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="w-full max-w-md bg-bg-secondary border border-accent/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(var(--accent-rgb),0.2)] relative overflow-hidden"
                >
                    {/* Decorative Scanner Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent animate-scanline opacity-50" />

                    <div className="text-center space-y-6">
                        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-accent/10 border border-accent/30 text-3xl mb-2">
                            👤
                        </div>

                        {step === 'input' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-text-primary">
                                        Identify Yourself
                                    </h2>
                                    <p className="text-sm text-text-muted mt-2">
                                        Enter your operative name to begin the simulation.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={nameInput}
                                        onChange={(e) => setNameInput(e.target.value)}
                                        placeholder="Enter Codename..."
                                        className="w-full bg-bg-tertiary border border-border focus:border-accent outline-none px-4 py-3 rounded-xl text-center font-bold text-lg placeholder:text-white/10 transition-colors"
                                        autoFocus
                                    />

                                    <button
                                        onClick={handleGuestContinue}
                                        disabled={!nameInput.trim()}
                                        className="w-full py-3 rounded-xl bg-accent text-background font-black uppercase tracking-widest hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Initialize Session
                                    </button>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-border"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-bg-secondary px-2 text-text-muted">Or Secure Login</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGoogleLogin}
                                    className="w-full py-3 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                                >
                                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                                    Continue with Google
                                </button>

                                <p className="text-[10px] text-text-muted opacity-60">
                                    * Login required for cloud save & official certification.
                                </p>
                            </div>
                        )}

                        {step === 'confirm' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-text-primary">
                                        Welcome Back
                                    </h2>
                                    <p className="text-sm text-text-muted mt-2">
                                        Resuming session as <span className="text-accent font-bold">"{nameInput}"</span>?
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleGuestContinue}
                                        className="w-full py-3 rounded-xl bg-accent text-background font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]"
                                    >
                                        Resume Mission
                                    </button>

                                    <button
                                        onClick={handleChangeName}
                                        className="w-full py-3 rounded-xl bg-bg-tertiary border border-border text-text-secondary font-bold uppercase tracking-wide hover:bg-bg-tertiary/80 transition-all text-xs"
                                    >
                                        Change Identity
                                    </button>
                                </div>

                                <div className="pt-4 border-t border-border/50">
                                    <button
                                        onClick={handleGoogleLogin}
                                        className="text-xs text-text-muted hover:text-text-primary underline decoration-dotted underline-offset-4 transition-colors"
                                    >
                                        Login to sync progress across devices
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default IdentityModal;
