// Settings Modal Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');
    const focusToggle = document.getElementById('focus-toggle');

    // Open settings modal
    if (settingsToggle) {
        settingsToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            settingsModal.classList.remove('hidden');
        });
    }

    // Close settings modal
    if (closeSettings) {
        closeSettings.addEventListener('click', function () {
            settingsModal.classList.add('hidden');
        });
    }

    // Close modal when clicking outside
    if (settingsModal) {
        settingsModal.addEventListener('click', function (e) {
            if (e.target === settingsModal) {
                settingsModal.classList.add('hidden');
            }
        });
    }

    // Focus mode toggle
    if (focusToggle) {
        focusToggle.addEventListener('change', function () {
            document.body.classList.toggle('focus-mode', this.checked);
            if (typeof settings !== 'undefined') {
                settings.focus = this.checked;
            }
        });
    }

    // Sound Profile Selector
    const soundSelect = document.getElementById('sound-profile-select');
    if (soundSelect) {
        // Initialize from localStorage
        const savedProfile = localStorage.getItem('tm_sound_profile') || 'off';
        soundSelect.value = savedProfile;

        soundSelect.addEventListener('change', function () {
            if (window.TM_SOUND) {
                TM_SOUND.setProfile(this.value);
                // Play a test sound to confirm
                TM_SOUND.playKeySound();
            }
        });
    }
});
