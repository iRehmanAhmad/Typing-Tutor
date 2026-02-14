import React, { createContext, useContext, useState } from 'react';

const TabContext = createContext();

export const useTabs = () => useContext(TabContext);

export const TabProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState('home');

    const changeTab = (tabId) => {
        setActiveTab(tabId);
        window.scrollTo(0, 0); // Reset scroll on tab change
    };

    // Global listener for tab switching (useful for components outside the hierarchy)
    React.useEffect(() => {
        const handler = (e) => {
            if (e.detail) changeTab(e.detail);
        };
        window.addEventListener('switchTab', handler);
        return () => window.removeEventListener('switchTab', handler);
    }, []);

    return (
        <TabContext.Provider value={{ activeTab, changeTab }}>
            {children}
        </TabContext.Provider>
    );
};
