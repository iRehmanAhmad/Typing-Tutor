import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useTabs } from '../context/TabContext';
import {
    Home,
    GraduationCap,
    Target,
    FileText,
    Gamepad2,
    User,
    Settings,
    LogOut,
    Zap,
    TrendingUp
} from 'lucide-react';

const Topbar = () => {
    const { user, logout } = useAuth();
    const { progress } = useProgress();
    const { activeTab, changeTab } = useTabs();

    const menuItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'course', label: 'Academy', icon: GraduationCap },
        { id: 'practice', label: 'Practice', icon: Target },
        { id: 'test', label: 'Test', icon: FileText },
        { id: 'games', label: 'Games', icon: Gamepad2 },
        { id: 'stats', label: 'Profile', icon: User },
        { id: 'admin', label: 'Admin', icon: Settings }
    ];

    return (
        <div className="fixed top-4 left-4 right-4 z-[60] flex justify-center pointer-events-none">
            <header className="w-full max-w-7xl h-[64px] glass-effect rounded-2xl flex items-center justify-between px-6 shadow-lg pointer-events-auto border border-white/20">
                {/* Left: Brand + Navigation */}
                <div className="flex items-center gap-6">
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => changeTab('home')}
                    >
                        <div className="bg-emerald-500 text-white w-9 h-9 flex items-center justify-center rounded-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                            <Zap size={20} fill="currentColor" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-base font-extrabold text-[#0f172a] tracking-tight leading-none">TypingMaster</h1>
                            <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.2em]">PRO MAX</p>
                        </div>
                    </div>

                    <nav className="hidden lg:flex items-center gap-1 ml-4 border-l border-slate-200 pl-6">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => changeTab(item.id)}
                                    className={`relative px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 group cursor-pointer
                                        ${isActive
                                            ? 'text-emerald-600 bg-emerald-50'
                                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                        }
                                    `}
                                >
                                    <Icon size={16} className={isActive ? 'text-emerald-500' : 'text-slate-400 group-hover:text-slate-600'} />
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: User Stats & profile */}
                <div className="flex items-center gap-4">
                    {user && (
                        <div className="hidden xl:flex items-center gap-4 bg-slate-50/50 px-4 py-1.5 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={14} className="text-emerald-500" />
                                <span className="text-[11px] font-bold text-slate-500 uppercase">XP</span>
                                <span className="text-sm font-extrabold text-slate-900">{progress?.xp || 0}</span>
                            </div>
                            <div className="w-px h-4 bg-slate-200" />
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold text-slate-500 uppercase">LVL</span>
                                <span className="text-sm font-extrabold text-slate-900">{Math.floor((progress?.xp || 0) / 1000) + 1}</span>
                            </div>
                        </div>
                    )}

                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-900 leading-none mb-1">{user.displayName || 'Learner'}</p>
                                <button
                                    onClick={logout}
                                    className="text-[11px] font-bold text-rose-500 uppercase hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                    <LogOut size={10} />
                                    Sign Out
                                </button>
                            </div>
                            <div className="relative cursor-pointer group" onClick={() => changeTab('stats')}>
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    className={`w-10 h-10 rounded-xl border-2 transition-all duration-200 p-0.5 object-cover
                                        ${activeTab === 'stats' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white group-hover:border-slate-300'}
                                    `}
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                            </div>
                        </div>
                    ) : (
                        <button className="pm-button-primary text-[11px] uppercase tracking-widest py-2">
                            Sign In
                        </button>
                    )}
                </div>
            </header>
        </div>
    );
};

export default Topbar;
