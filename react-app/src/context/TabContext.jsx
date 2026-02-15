import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const TabContext = createContext();

export const useTabs = () => useContext(TabContext);

export const TabProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState('home');
    const backHandlersRef = useRef([]);

    const changeTab = (tabId) => {
        setActiveTab(tabId);
        window.scrollTo(0, 0); // Reset scroll on tab change
    };

    const registerBackHandler = useCallback((handler) => {
        backHandlersRef.current.push(handler);
        return () => {
            backHandlersRef.current = backHandlersRef.current.filter(h => h !== handler);
        };
    }, []);

    const handleBackAction = useCallback((e, source) => {
        // Find the last registered handler (most specific component)
        const handler = backHandlersRef.current[backHandlersRef.current.length - 1];
        if (handler) {
            const handled = handler(source);
            if (handled) {
                if (e) {
                    if (e.type === 'popstate') {
                        // Prevent browser from truly going back if we handled it internally
                        window.history.pushState(null, '', window.location.href);
                    }
                    if (e.preventDefault) e.preventDefault();
                }
                return true;
            }
        }
        return false;
    }, []);

    // Global listener for tab switching
    React.useEffect(() => {
        const handler = (e) => {
            if (e.detail) changeTab(e.detail);
        };
        window.addEventListener('switchTab', handler);

        const onPopState = (e) => {
            handleBackAction(e, 'popstate');
        };

        const onKeyDown = (e) => {
            // Only intercept Backspace if not in an input/textarea
            if (e.key === 'Backspace') {
                const target = e.target;
                const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
                if (!isInput) {
                    if (handleBackAction(e, 'keydown')) {
                        e.preventDefault();
                    }
                }
            }
        };

        window.addEventListener('popstate', onPopState);
        window.addEventListener('keydown', onKeyDown);

        // Initial state for history management
        window.history.pushState(null, '', window.location.href);

        return () => {
            window.removeEventListener('switchTab', handler);
            window.removeEventListener('popstate', onPopState);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [handleBackAction]);

    return (
        <TabContext.Provider value={{ activeTab, changeTab, registerBackHandler }}>
            {children}
        </TabContext.Provider>
    );
};
