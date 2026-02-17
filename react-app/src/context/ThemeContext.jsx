import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const themes = [
    { id: 'indigo-flux', name: 'Ocean Blue (Default)', primary: '#818CF8', bg: '#0F172A' },
    { id: 'cyber-tactical', name: 'Emerald Green', primary: '#4ADE80', bg: '#0B0F19' },
    { id: 'black-ops', name: 'Midnight Red', primary: '#EF4444', bg: '#0A0A0A' },
    { id: 'elite-command', name: 'Classic Gold', primary: '#F59E0B', bg: '#121212' },
    { id: 'w3-classic', name: 'Standard Light', primary: '#04AA6D', bg: '#FFFFFF' }
];

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('tactical-theme') || 'w3-classic';
    });

    useEffect(() => {
        localStorage.setItem('tactical-theme', currentTheme);
        // Remove all potential theme classes
        const allThemeClasses = themes.map(t => `theme-${t.id}`);
        document.documentElement.classList.remove(...allThemeClasses);
        document.documentElement.classList.remove('theme-default');
        // Add current theme class
        document.documentElement.classList.add(`theme-${currentTheme}`);
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
