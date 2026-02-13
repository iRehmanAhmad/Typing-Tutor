/**
 * SVG Hand Animation System for Typing Master
 * Provides visual finger guidance with animated SVG hands
 */

const TM_HANDS = (function () {

    const FINGER_POSITIONS = {
        // Left hand
        'pinky-l': {
            homeKey: 'a',
            restX: 40, restY: 60,
            color: '#ef4444',
            label: 'L-Pinky'
        },
        'ring-l': {
            homeKey: 's',
            restX: 60, restY: 55,
            color: '#f59e0b',
            label: 'L-Ring'
        },
        'middle-l': {
            homeKey: 'd',
            restX: 80, restY: 50,
            color: '#10b981',
            label: 'L-Middle'
        },
        'index-l': {
            homeKey: 'f',
            restX: 100, restY: 55,
            color: '#3b82f6',
            label: 'L-Index'
        },
        'thumb': {
            homeKey: 'space',
            restX: 125, restY: 95,
            color: '#8b5cf6',
            label: 'Thumb'
        },

        // Right hand
        'index-r': {
            homeKey: 'j',
            restX: 150, restY: 55,
            color: '#3b82f6',
            label: 'R-Index'
        },
        'middle-r': {
            homeKey: 'k',
            restX: 170, restY: 50,
            color: '#10b981',
            label: 'R-Middle'
        },
        'ring-r': {
            homeKey: 'l',
            restX: 190, restY: 55,
            color: '#f59e0b',
            label: 'R-Ring'
        },
        'pinky-r': {
            homeKey: ';',
            restX: 210, restY: 60,
            color: '#ef4444',
            label: 'R-Pinky'
        }
    };

    function init() {
        createHandsSVG();
    }

    function createHandsSVG() {
        const container = document.getElementById('hands-container');
        if (!container) {
            console.warn('TM_HANDS: hands-container element not found');
            return;
        }

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 250 120');
        svg.setAttribute('class', 'hands-svg');
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '10';

        // Create finger elements
        Object.entries(FINGER_POSITIONS).forEach(([fingerId, config]) => {
            const finger = createFingerElement(fingerId, config);
            svg.appendChild(finger);
        });

        container.innerHTML = '';
        container.appendChild(svg);
    }

    function createFingerElement(fingerId, config) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('id', `finger-${fingerId}`);
        group.setAttribute('class', 'finger-indicator');

        // Glow effect (outer circle)
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', config.restX);
        glow.setAttribute('cy', config.restY);
        glow.setAttribute('r', '12');
        glow.setAttribute('fill', config.color);
        glow.setAttribute('opacity', '0');
        glow.setAttribute('class', 'finger-glow');

        // Finger circle (main indicator)
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', config.restX);
        circle.setAttribute('cy', config.restY);
        circle.setAttribute('r', '6');
        circle.setAttribute('fill', config.color);
        circle.setAttribute('opacity', '0.7');
        circle.setAttribute('class', 'finger-dot');

        // Label text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', config.restX);
        text.setAttribute('y', config.restY + 25);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#64748b');
        text.setAttribute('font-size', '7');
        text.setAttribute('font-weight', '600');
        text.setAttribute('opacity', '0.5');
        text.setAttribute('class', 'finger-label');
        text.textContent = config.label;

        group.appendChild(glow);
        group.appendChild(circle);
        group.appendChild(text);

        return group;
    }

    function highlightFinger(fingerType) {
        if (!FINGER_POSITIONS[fingerType]) return;

        // Remove previous highlights
        document.querySelectorAll('.finger-indicator').forEach(f => {
            f.classList.remove('active');
        });

        // Highlight target finger
        const finger = document.getElementById(`finger-${fingerType}`);
        if (finger) {
            finger.classList.add('active');

            // Pulse animation on glow
            const glow = finger.querySelector('.finger-glow');
            if (glow) {
                glow.style.transition = 'opacity 0.3s ease-out';
                glow.setAttribute('opacity', '0.4');

                setTimeout(() => {
                    glow.setAttribute('opacity', '0');
                }, 600);
            }
        }
    }

    function animateKeyPress(fingerType, targetKeyElement) {
        const finger = document.getElementById(`finger-${fingerType}`);
        if (!finger || !targetKeyElement) return;

        const config = FINGER_POSITIONS[fingerType];
        if (!config) return;

        const vkContainer = document.getElementById('vk-container');
        if (!vkContainer) return;

        const keyRect = targetKeyElement.getBoundingClientRect();
        const containerRect = vkContainer.getBoundingClientRect();

        // Calculate relative position in SVG coordinates
        const scaleX = 250 / containerRect.width;
        const scaleY = 120 / containerRect.height;

        const targetX = (keyRect.left - containerRect.left + keyRect.width / 2) * scaleX;
        const targetY = (keyRect.top - containerRect.top + keyRect.height / 3) * scaleY;

        const circle = finger.querySelector('.finger-dot');
        const glow = finger.querySelector('.finger-glow');

        if (!circle || !glow) return;

        // Animate to key position
        circle.style.transition = 'all 0.15s ease-out';
        glow.style.transition = 'all 0.15s ease-out';

        circle.setAttribute('cx', targetX);
        circle.setAttribute('cy', targetY);
        circle.setAttribute('r', '5'); // Slightly smaller when pressed

        glow.setAttribute('cx', targetX);
        glow.setAttribute('cy', targetY);
        glow.setAttribute('opacity', '0.6');

        // Return to home position
        setTimeout(() => {
            circle.style.transition = 'all 0.2s ease-in';
            glow.style.transition = 'all 0.2s ease-in';

            circle.setAttribute('cx', config.restX);
            circle.setAttribute('cy', config.restY);
            circle.setAttribute('r', '6');

            glow.setAttribute('cx', config.restX);
            glow.setAttribute('cy', config.restY);
            glow.setAttribute('opacity', '0');
        }, 200);
    }

    function reset() {
        // Reset all fingers to home position
        Object.entries(FINGER_POSITIONS).forEach(([fingerId, config]) => {
            const finger = document.getElementById(`finger-${fingerId}`);
            if (!finger) return;

            const circle = finger.querySelector('.finger-dot');
            const glow = finger.querySelector('.finger-glow');

            if (circle) {
                circle.setAttribute('cx', config.restX);
                circle.setAttribute('cy', config.restY);
                circle.setAttribute('r', '6');
            }

            if (glow) {
                glow.setAttribute('cx', config.restX);
                glow.setAttribute('cy', config.restY);
                glow.setAttribute('opacity', '0');
            }
        });
    }

    return {
        init,
        highlightFinger,
        animateKeyPress,
        reset
    };
})();

window.TM_HANDS = TM_HANDS;
