import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, login, logout } = useAuth();

    return (
        <nav className="bg-bg-secondary border-b border-border py-4 px-6 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-black text-white shadow-lg">T</div>
                <h1 className="text-xl font-bold tracking-tight">Typing Master <span className="text-xs font-normal text-text-muted">Pro</span></h1>
            </div>

            <div className="flex items-center gap-6">
                <button className="text-sm font-medium hover:text-accent transition">Home</button>
                <button className="text-sm font-medium hover:text-accent transition">Course</button>
                <button className="text-sm font-medium hover:text-accent transition">Test</button>

                {user ? (
                    <div className="flex items-center gap-4 border-l border-border pl-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold">{user.displayName || 'Learner'}</p>
                            <p className="text-[10px] text-accent font-black uppercase tracking-widest">Level 1</p>
                        </div>
                        <button
                            onClick={logout}
                            className="w-10 h-10 rounded-full border border-border hover:border-accent transition overflow-hidden"
                        >
                            <img src={user.photoURL} alt="profile" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={login}
                        className="bg-accent px-6 py-2 rounded-full font-bold text-sm hover:translate-y-[-2px] transition shadow-lg"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
