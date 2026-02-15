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
                : 'text-text-muted hover:text-text-primary hover:bg-text-primary/10'}
        `}
    >
        {children}
    </button>
);

const Navbar = () => {
    const { user, login, logout } = useAuth();
    const { activeTab, changeTab } = useTabs();
    const { progress } = useProgress();
    const [deferredPrompt, setDeferredPrompt] = React.useState(null);

    React.useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    return (
        <header className="py-2 border-b border-border bg-background sticky top-0 z-[100] backdrop-blur-md">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => changeTab('home')}>
                        <div className="relative flex items-center justify-center">
                            <span className="text-2xl animate-float">⌨️</span>
                            <span className="absolute -top-1 -right-1 text-[10px] animate-sparkle">✨</span>
                        </div>
                        <h1 className="text-xl tracking-tighter uppercase flex items-center">
                            <span className="font-bold text-text-primary">Typing</span>
                            <span className="font-black bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">Master</span>
                        </h1>
                    </div>

                    <nav className="hidden md:flex items-center gap-1 bg-bg-secondary p-1 rounded-2xl border border-border shadow-sm">
                        <NavButton active={activeTab === 'home'} onClick={() => changeTab('home')}>Home</NavButton>
                        <NavButton active={activeTab === 'course'} onClick={() => changeTab('course')}>Learn Typing</NavButton>
                        <NavButton active={activeTab === 'practice'} onClick={() => changeTab('practice')}>Typing Practice</NavButton>
                        <NavButton active={activeTab === 'games'} onClick={() => changeTab('games')}>Typing Games</NavButton>
                        <NavButton active={activeTab === 'test'} onClick={() => changeTab('test')}>Speed Test</NavButton>
                        <NavButton active={activeTab === 'stats'} onClick={() => changeTab('stats')}>My Progress</NavButton>
                        <NavButton active={activeTab === 'admin'} onClick={() => changeTab('admin')}>Admin</NavButton>
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
                            Log In / Start
                        </button>
                    )}
                    {deferredPrompt && (
                        <button
                            onClick={handleInstall}
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-secondary border border-accent/20 hover:bg-accent/10 transition-colors group"
                            title="Install App"
                        >
                            <span className="text-sm">⬇️</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-accent">Install</span>
                        </button>
                    )}
                </div>
            </div>
        </header >
    );
};

export default Navbar;
