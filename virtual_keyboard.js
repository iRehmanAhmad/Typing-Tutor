/**
 * Virtual Keyboard Manager
 * Handles rendering and interactive state of the on-screen keyboard
 */
class VirtualKeyboard {
    constructor(containerId) {
        console.log('[VirtualKeyboard] Constructor called for:', containerId);
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('[VirtualKeyboard] Container not found:', containerId);
            return;
        }
        this.keys = {}; // Map of char -> element
        this.layout = [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
            ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
            ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
            ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
            ['Space']
        ];

        // Key mapping for physical key codes to visual keys
        this.codeMap = {
            'Backquote': '`', 'Minus': '-', 'Equal': '=', 'Backspace': 'Backspace',
            'Tab': 'Tab', 'BracketLeft': '[', 'BracketRight': ']', 'Backslash': '\\',
            'CapsLock': 'Caps', 'SemiColon': ';', 'Quote': "'", 'Enter': 'Enter',
            'ShiftLeft': 'Shift', 'ShiftRight': 'Shift',
            'Comma': ',', 'Period': '.', 'Slash': '/',
            'Space': 'Space'
        };

        this.render();
        this.bindEvents();
    }

    render() {
        console.log('[VirtualKeyboard] Rendering to container:', this.container);
        if (!this.container) return;
        this.container.innerHTML = '';
        this.container.classList.add('virtual-keyboard');

        this.layout.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'kb-row';

            row.forEach(key => {
                const keyDiv = document.createElement('div');
                keyDiv.className = `kb-key ${this.getKeyClass(key)}`;
                keyDiv.textContent = this.getKeyLabel(key);
                keyDiv.dataset.key = key.toLowerCase();

                // Store reference
                // Handle duplicate keys (Shift) by storing array or just one?
                // For simplicity, visual feedback on one is fine, or all matching.
                if (!this.keys[key.toLowerCase()]) {
                    this.keys[key.toLowerCase()] = [];
                }
                this.keys[key.toLowerCase()].push(keyDiv);

                rowDiv.appendChild(keyDiv);
            });

            this.container.appendChild(rowDiv);
        });
    }

    getKeyClass(key) {
        switch (key) {
            case 'Backspace': return 'key-backspace';
            case 'Tab': return 'key-tab';
            case 'Caps': return 'key-caps';
            case 'Enter': return 'key-enter';
            case 'Shift': return 'key-shift';
            case 'Space': return 'key-space';
            default: return 'key-standard';
        }
    }

    getKeyLabel(key) {
        if (key === 'Space') return '';
        if (key === 'Caps') return 'Caps Lock';
        return key;
    }

    bindEvents() {
        // Physical keyboard interaction
        document.addEventListener('keydown', (e) => this.highlightKey(e.key, 'active'));
        document.addEventListener('keyup', (e) => this.unhighlightKey(e.key, 'active'));
    }

    highlightKey(char, className) {
        let key = char.toLowerCase();
        // Map special codes if needed
        if (char === ' ') key = 'space';

        const elements = this.keys[key] || this.keys[this.mapCodeToKey(char)];
        if (elements) {
            elements.forEach(el => el.classList.add(className));
        }
    }

    unhighlightKey(char, className) {
        let key = char.toLowerCase();
        if (char === ' ') key = 'space';

        const elements = this.keys[key] || this.keys[this.mapCodeToKey(char)];
        if (elements) {
            elements.forEach(el => el.classList.remove(className));
        }
    }

    mapCodeToKey(char) {
        // Fallback for codes that don't match char directly (e.g. strict mapping)
        // Main Logic: 
        return char.toLowerCase();
    }

    // Guide the user to the next key
    setNextKey(char) {
        // diverse logic to handle shift chars?
        // e.g. if 'A', highlight Shift + a

        // Clear previous hint
        document.querySelectorAll('.kb-key.hint').forEach(el => el.classList.remove('hint'));

        if (!char) return;

        let key = char.toLowerCase();
        if (char === ' ') key = 'space';

        // Check for Shift requirement
        const isShift = /[A-Z!@#$%^&*()_+{}|:"<>?~]/.test(char);
        if (isShift) {
            const shifts = this.keys['shift'];
            if (shifts) shifts.forEach(el => el.classList.add('hint'));
        }

        // Map symbols to base keys
        const symbolMap = {
            '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
            '_': '-', '+': '=', '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/'
        };

        if (symbolMap[char]) key = symbolMap[char];

        const elements = this.keys[key];
        if (elements) {
            elements.forEach(el => el.classList.add('hint'));
        }
    }
}

// Expose
window.VirtualKeyboard = VirtualKeyboard;
