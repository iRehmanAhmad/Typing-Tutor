import React, { useState, useEffect } from 'react';

const VirtualKeyboard = ({ activeChar }) => {
    const [pressedKey, setPressedKey] = useState(null);

    const layout = [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
        ['Space']
    ];

    const symbolMap = {
        '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
        '_': '-', '+': '=', '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/'
    };

    useEffect(() => {
        const handleDown = (e) => setPressedKey(e.key.toLowerCase());
        const handleUp = () => setPressedKey(null);
        window.addEventListener('keydown', handleDown);
        window.addEventListener('keyup', handleUp);
        return () => {
            window.removeEventListener('keydown', handleDown);
            window.removeEventListener('keyup', handleUp);
        };
    }, []);

    const getKeyType = (key) => {
        if (key === 'Backspace') return 'w-[70px]';
        if (key === 'Tab') return 'w-[50px]';
        if (key === 'Caps') return 'w-[65px]';
        if (key === 'Enter') return 'w-[75px]';
        if (key === 'Shift') return 'w-[90px]';
        if (key === 'Space') return 'flex-1 min-w-[250px]';
        return 'w-10 h-10';
    };

    const isHint = (key) => {
        if (!activeChar) return false;
        const target = activeChar.toLowerCase();
        if (target === ' ' && key === 'Space') return true;

        // Handle shift characters
        const isShiftNeeded = /[A-Z!@#$%^&*()_+{}|:"<>?~]/.test(activeChar);
        if (key === 'Shift' && isShiftNeeded) return true;

        if (symbolMap[activeChar] === key) return true;
        return target === key.toLowerCase();
    };

    return (
        <div className="bg-bg-secondary p-4 md:p-5 rounded-3xl border border-border shadow-2xl flex flex-col gap-1.5 select-none">
            {layout.map((row, ridx) => (
                <div key={ridx} className="flex gap-1.5 justify-center">
                    {row.map((key, kidx) => {
                        const active = pressedKey === key.toLowerCase() || (key === 'Space' && pressedKey === ' ');
                        const hint = isHint(key);

                        return (
                            <div
                                key={kidx}
                                className={`
                                    ${getKeyType(key)} h-10 rounded-lg flex items-center justify-center text-[11px] md:text-xs font-black transition-all duration-75
                                    ${active ? 'bg-accent text-white scale-95 shadow-inner' : 'bg-bg-tertiary text-text-muted border border-white/5'}
                                    ${hint && !active ? 'border-accent text-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] animate-pulse' : ''}
                                `}
                            >
                                {key === 'Space' ? '' : key}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default VirtualKeyboard;
