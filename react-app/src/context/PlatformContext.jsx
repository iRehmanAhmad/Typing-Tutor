import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const PlatformContext = createContext();

export const usePlatform = () => useContext(PlatformContext);

export const PlatformProvider = ({ children }) => {
    const [config, setConfig] = useState({
        adUnits: [
            { id: 'top_banner', name: 'Test Arena Top', active: true, provider: 'Google Ads' },
            { id: 'sidebar', name: 'Learning Sidebar', active: true, provider: 'Custom Partner' }
        ],
        broadcast: {
            alert: 'System Online: All sectors operational.',
            tip: 'Tip: Use the anchor keys (F & J) to maintain tactical alignment.'
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const configRef = doc(db, 'config', 'platform');
        const unsub = onSnapshot(configRef, (snap) => {
            if (snap.exists()) {
                setConfig(snap.data());
            }
            setLoading(false);
        });

        return () => unsub();
    }, []);

    const isAdActive = (adId) => {
        const unit = config.adUnits.find(u => u.id === adId);
        return unit ? unit.active : false;
    };

    return (
        <PlatformContext.Provider value={{ config, isAdActive, loading }}>
            {children}
        </PlatformContext.Provider>
    );
};
