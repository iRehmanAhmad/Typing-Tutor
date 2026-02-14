import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const themes = [
    { id: 'indigo-flux', name: 'Indigo Flux', primary: '#818CF8', bg: '#0F172A' },
    { id: 'cyber-tactical', name: 'Cyber Tactical', primary: '#4ADE80', bg: '#0B0F19' },
    { id: 'black-ops', name: 'Black Ops', primary: '#EF4444', bg: '#0A0A0A' },
    { id: 'elite-command', name: 'Elite Command', primary: '#F59E0B', bg: '#121212' },
    { id: 'w3-classic', name: 'W3 Classic', primary: '#04AA6D', bg: '#FFFFFF' }
];

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('tactical-theme') || 'indigo-flux';
    });

    useEffect(() => {
        localStorage.setItem('tactical-theme', currentTheme);
        // Remove all theme classes
        document.body.classList.remove(...themes.map(t => `theme-${t.id}`));
        // Add current theme class
        document.body.classList.add(`theme-${currentTheme}`);
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
