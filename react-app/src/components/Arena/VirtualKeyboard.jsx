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
        if (key === 'Backspace') return 'w-[80px]';
        if (key === 'Tab') return 'w-[60px]';
        if (key === 'Caps') return 'w-[75px]';
        if (key === 'Enter') return 'w-[85px]';
        if (key === 'Shift') return 'w-[105px]';
        if (key === 'Space') return 'flex-1 min-w-[300px]';
        return 'w-12 h-12';
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
        <div className="bg-bg-secondary p-6 rounded-3xl border border-border shadow-2xl flex flex-col gap-2 select-none">
            {layout.map((row, ridx) => (
                <div key={ridx} className="flex gap-2 justify-center">
                    {row.map((key, kidx) => {
                        const active = pressedKey === key.toLowerCase() || (key === 'Space' && pressedKey === ' ');
                        const hint = isHint(key);

                        return (
                            <div
                                key={kidx}
                                className={`
                                    ${getKeyType(key)} h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-75
                                    ${active ? 'bg-accent text-white scale-95 shadow-inner' : 'bg-bg-tertiary text-text-muted border border-white/5'}
                                    ${hint && !active ? 'border-accent text-accent shadow-[0_0_15px_rgba(99,102,241,0.3)] animate-pulse' : ''}
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
