import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTabs } from '../../context/TabContext';
import { useProgress } from '../../context/ProgressContext';
import TacticalSwitcher from './TacticalSwitcher';

const NavButton = ({ id, active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`
            px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
            ${active
                ? 'bg-accent text-background shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)]'
                : 'text-text-muted hover:text-text-primary hover:bg-white/5'}
        `}
    >
        {children}
    </button>
);

const Navbar = () => {
    const { user, login, logout } = useAuth();
    const { activeTab, changeTab } = useTabs();
    const { progress } = useProgress();

    return (
        <header className="py-2 border-b border-border bg-background sticky top-0 z-[100] backdrop-blur-md">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl animate-pulse-soft">⌨️</span>
                        <h1 className="text-xl font-black tracking-tighter italic uppercase text-text-primary">Typing Master</h1>
                    </div>

                    <nav className="hidden md:flex items-center gap-1 bg-bg-secondary p-1 rounded-2xl border border-border shadow-sm">
                        <NavButton id="home" active={activeTab === 'home'} onClick={() => changeTab('home')}>Dashboard</NavButton>
                        <NavButton id="course" active={activeTab === 'course'} onClick={() => changeTab('course')}>Learning</NavButton>
                        <NavButton id="test" active={activeTab === 'test'} onClick={() => changeTab('test')}>Test Arena</NavButton>
                        <NavButton id="stats" active={activeTab === 'stats'} onClick={() => changeTab('stats')}>Stats Hub</NavButton>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <TacticalSwitcher />
                    {user ? (
                        <div className="flex items-center gap-3 px-4 py-2 bg-accent/10 border border-accent/20 rounded-2xl">
                            <div className="text-right hidden sm:block">
                                <p className="text-[11px] font-bold leading-none text-text-primary">{user.displayName || 'Learner'}</p>
                                <p className="text-[9px] text-accent font-black uppercase tracking-widest mt-1">{progress?.xp || 0} XP</p>
                            </div>
                            <button
                                onClick={logout}
                                className="w-8 h-8 rounded-full border border-border hover:border-accent transition overflow-hidden shadow-lg"
                            >
                                <img src={user.photoURL} alt="profile" className="w-full h-full object-cover" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={login}
                            className="bg-accent px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:translate-y-[-2px] transition shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] text-background"
                        >
                            Initialize Session
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
