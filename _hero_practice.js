// Hero Practice Widget Logic
const HeroPractice = (function () {
    let sampleTexts = [
        "The quick brown fox jumps over the lazy dog with remarkable speed and agility.",
        "Practice makes perfect when you dedicate time to improving your typing skills.",
        "Technology evolves rapidly, and staying current requires continuous learning.",
        "Effective communication depends on clarity, precision, and proper timing.",
        "Success comes to those who persist through challenges and never give up.",
        "Innovation requires creativity, courage, and willingness to take risks.",
        "Quality matters more than quantity in almost every aspect of life.",
        "Knowledge shared is knowledge multiplied across communities and generations."
    ];

    let currentText = '';
    let typedChars = 0;
    let errors = 0;
    let startTime = null;
    let isTyping = false;

    const el = (id) => document.getElementById(id);

    function init() {
        const input = el('hero-typing-input');
        const refreshBtn = el('hero-refresh-text');

        if (!input) return;

        // Load initial text
        loadNewText();

        // Event listeners
        input.addEventListener('input', handleInput);
        input.addEventListener('focus', handleFocus);
        refreshBtn?.addEventListener('click', loadNewText);
    }

    function loadNewText() {
        const randomIndex = Math.floor(Math.random() * sampleTexts.length);
        currentText = sampleTexts[randomIndex];

        // Display text with highlighting
        displayText();

        // Reset stats
        resetStats();

        // Focus input
        el('hero-typing-input')?.focus();
    }

    function displayText() {
        const display = el('hero-text-display');
        if (!display) return;

        display.innerHTML = currentText.split('').map((char, idx) =>
            `<span id="hero-char-${idx}" class="hero-char">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
    }

    function handleFocus() {
        if (!isTyping) {
            displayText(); // Reset display when focusing
        }
    }

    function handleInput(e) {
        const input = e.target;
        const typed = input.value;

        // Start timer on first keystroke
        if (!startTime && typed.length === 1) {
            startTime = Date.now();
            isTyping = true;
        }

        // Update character highlighting
        updateDisplay(typed);

        // Calculate and update stats
        updateStats(typed);

        // Check if completed
        if (typed.length >= currentText.length) {
            completeTest(typed);
        }
    }

    function updateDisplay(typed) {
        for (let i = 0; i < currentText.length; i++) {
            const charEl = el(`hero-char-${i}`);
            if (!charEl) continue;

            if (i < typed.length) {
                if (typed[i] === currentText[i]) {
                    charEl.className = 'hero-char hero-char-correct';
                } else {
                    charEl.className = 'hero-char hero-char-wrong';
                }
            } else if (i === typed.length) {
                charEl.className = 'hero-char hero-char-current';
            } else {
                charEl.className = 'hero-char';
            }
        }
    }

    function updateStats(typed) {
        typedChars = typed.length;

        // Calculate errors
        errors = 0;
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] !== currentText[i]) errors++;
        }

        // Calculate WPM
        const timeElapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 0;
        const words = typedChars / 5; // Standard: 5 chars = 1 word
        const wpm = timeElapsed > 0 ? Math.round(words / timeElapsed) : 0;

        // Calculate accuracy
        const accuracy = typedChars > 0 ? Math.round(((typedChars - errors) / typedChars) * 100) : 100;

        // Calculate progress
        const progress = Math.round((typedChars / currentText.length) * 100);

        // Update display
        el('hero-wpm').textContent = wpm;
        el('hero-accuracy').textContent = accuracy + '%';
        el('hero-progress').textContent = progress + '%';

        // Color code accuracy
        const accuracyEl = el('hero-accuracy');
        if (accuracy >= 95) {
            accuracyEl.className = 'text-3xl font-black text-green-600';
        } else if (accuracy >= 85) {
            accuracyEl.className = 'text-3xl font-black text-yellow-600';
        } else {
            accuracyEl.className = 'text-3xl font-black text-red-600';
        }
    }

    function completeTest(typed) {
        isTyping = false;
        const input = el('hero-typing-input');

        // Brief pause then auto-load new text
        setTimeout(() => {
            if (input) input.value = '';
            loadNewText();
        }, 1500);
    }

    function resetStats() {
        typedChars = 0;
        errors = 0;
        startTime = null;
        isTyping = false;

        el('hero-wpm').textContent = '0';
        el('hero-accuracy').textContent = '100%';
        el('hero-progress').textContent = '0%';
        el('hero-accuracy').className = 'text-3xl font-black text-green-600';

        const input = el('hero-typing-input');
        if (input) input.value = '';
    }

    return {
        init
    };
})();

// Initialize Hero Practice on page load
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.hash === '' || window.location.hash === '#home') {
        HeroPractice.init();
    }
});
