import React, { createContext, useContext, useState } from 'react';

const TabContext = createContext();

export const useTabs = () => useContext(TabContext);

export const TabProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState('home');

    const changeTab = (tabId) => {
        setActiveTab(tabId);
        window.scrollTo(0, 0); // Reset scroll on tab change
    };

    return (
        <TabContext.Provider value={{ activeTab, changeTab }}>
            {children}
        </TabContext.Provider>
    );
};
