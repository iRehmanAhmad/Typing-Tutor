import React from 'react';
import { useTabs } from '../context/TabContext';

const Sidebar = () => {
    const { activeTab, changeTab } = useTabs();

    const menuItems = [
        { id: 'home', label: 'Dashboard', icon: '🏠' },
        { id: 'course', label: 'Academy', icon: '🎓' },
        { id: 'practice', label: 'Practice', icon: '🎯' },
        { id: 'test', label: 'Test', icon: '📝' },
        { id: 'games', label: 'Games', icon: '🕹️' },
        { id: 'stats', label: 'Profile', icon: '👤' },
        { id: 'admin', label: 'Admin', icon: '⚙️' }
    ];

    return (
        <aside className="fixed left-0 top-[60px] h-[calc(100vh-60px)] w-64 bg-[#f1f1f1] border-r border-[#e0e0e0] flex flex-col z-50">
            {/* Navigation links below topbar */}
            <nav className="flex-1 py-4 overflow-y-auto">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => changeTab(item.id)}
                        className={`w-full text-left px-6 py-3 flex items-center gap-3 text-sm font-medium transition-colors
                            ${activeTab === item.id
                                ? 'bg-white text-[#04AA6D] border-l-4 border-[#04AA6D]'
                                : 'text-[#333] hover:bg-[#ddd]'
                            }
                        `}
                    >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Footer / Ad area in sidebar if needed */}
            <div className="p-4 bg-white border-top border-[#e0e0e0] text-center">
                <p className="text-[11px] text-[#999] font-bold uppercase tracking-widest">W3 Utility v2.0</p>
            </div>
        </aside>
    );
};

export default Sidebar;
