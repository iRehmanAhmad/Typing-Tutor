/**
 * Typing Master - Sound Manager
 * ----------------------------
 * Synthesizes mechanical keyboard sounds using Web Audio API.
 * No external assets required.
 */

const TM_SOUND = (function () {
    let audioCtx = null;
    let masterGain = null;
    let currentProfile = localStorage.getItem('tm_sound_profile') || 'off'; // off, linear, clicky, tactile

    function init() {
        if (audioCtx) return;

        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            masterGain = audioCtx.createGain();
            masterGain.connect(audioCtx.destination);
            masterGain.gain.value = 0.3; // Default volume
        } catch (e) {
            console.warn('Web Audio API not supported', e);
        }
    }

    function playKeySound() {
        if (currentProfile === 'off') return;
        if (!audioCtx) init();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        switch (currentProfile) {
            case 'linear': playLinear(); break;
            case 'clicky': playClicky(); break;
            case 'tactile': playTactile(); break;
        }
    }

    function playLinear() {
        // Linear: Smooth, low-frequency "thud"
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    }

    function playClicky() {
        // Clicky: High-frequency "click" + white noise burst
        const noise = audioCtx.createBufferSource();
        const bufferSize = audioCtx.sampleRate * 0.05;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        noise.buffer = buffer;
        const gain = audioCtx.createGain();

        gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

        // Filter to make it "clickier"
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 2000;

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        noise.start();
    }

    function playTactile() {
        // Tactile: Mid-frequency "clack"
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    }

    function setProfile(profile) {
        currentProfile = profile;
        localStorage.setItem('tm_sound_profile', profile);
    }

    function getProfile() {
        return currentProfile;
    }

    function playError() {
        if (currentProfile === 'off') return;
        if (!audioCtx) init();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.15);

        gain.gain.setValueAtTime(masterGain.gain.value * 1.5, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    }

    return {
        init,
        playKeySound,
        playError,
        setProfile,
        getProfile
    };
})();

window.TM_SOUND = TM_SOUND;
