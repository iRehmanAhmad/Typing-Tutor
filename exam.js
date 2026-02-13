/**
 * Typing Master - Certification Exam Module
 * ----------------------------------------
 * Handles the 5-minute professional exam, anti-cheat guards,
 * payment modal, and certificate issuance.
 */

const TM_EXAM = (function () {
    let examActive = false;
    let pendingScores = null;
    let examPrice = 5.00;

    function init() {
        // Wire up exam-specific UI
        const payCancel = document.getElementById('pay-cancel');
        if (payCancel) {
            payCancel.addEventListener('click', cancelPayment);
        }

        const applyBtn = document.getElementById('apply-coupon');
        if (applyBtn) {
            applyBtn.addEventListener('click', handleCouponApply);
        }

        const startBtn = document.getElementById('start-cert');
        if (startBtn) {
            startBtn.addEventListener('click', startExam);
        }

        const demoBtn = document.getElementById('view-cert-demo');
        if (demoBtn) {
            demoBtn.addEventListener('click', showDemoCertificate);
        }

        const certClose = document.getElementById('cert-close');
        if (certClose) {
            certClose.addEventListener('click', () => {
                document.getElementById('cert-modal')?.classList.remove('show');
            });
        }

        // Anti-Cheat Listeners
        window.addEventListener('blur', handleFocusLoss);
        window.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') handleFocusLoss();
        });
    }

    function startExam() {
        const nameInput = document.getElementById('full');
        const emailInput = document.getElementById('email');
        const durationSelect = document.getElementById('cert-duration');

        if (!nameInput.value.trim() || !emailInput.value.trim()) {
            alert("Please provide your full name and email for the certificate.");
            return;
        }

        // Setup Exam State
        examActive = true;
        focusWarnings = 0;
        const dur = parseInt(durationSelect.value) || 300;

        // Load Professional Exam Text
        const examText = "Professional typing assessments require both high speed and exceptional accuracy. By maintaining a steady rhythm and minimizing errors, candidates demonstrate technical proficiency suitable for administrative and data entry roles. This certification validates your ability to handle complex documentation with standard five-keystroke precision under timed conditions. Success is achieved through consistent practice and proper ergonomic posture at the workstation.";

        if (window.TM_ENGINE) {
            // Override engine duration for exam
            const clock = document.getElementById('duration');
            if (clock) {
                // We shouldn't necessarily change the dropdown, but the internal duration
                // TM_ENGINE.resetAll() uses the dropdown value, so we'll set it first
                clock.value = dur;
            }

            TM_ENGINE.showTab('test');
            TM_ENGINE.loadCustomText(examText, "Official Professional Certification Exam");
            TM_ENGINE.startTest(); // Start immediately for exam
        }
    }

    function isExamMode() { return examActive; }
    function setExamMode(active) { examActive = active; }

    /**
     * Strategic Anti-Cheat: Tab Switch Detection
     */
    let focusWarnings = 0;
    function handleFocusLoss() {
        if (!examActive) return;
        focusWarnings++;
        if (focusWarnings >= 2) {
            alert("EXAM INVALIDATED: Multiple tab switches detected. Please restart the exam.");
            window.location.reload();
        } else {
            alert("WARNING: Tab switching is NOT allowed during the exam! One more switch will invalidate your test.");
        }
    }

    function showDemoCertificate() {
        if (!window.issueCertificateAfterPass) {
            alert("Certificate system is still initializing. Please try again in a moment.");
            return;
        }

        // Mock scores for demo
        const demoScores = {
            name: "John Doe (Demo)",
            wpm: 75,
            netWPM: 72,
            accuracy: 98,
            duration: 60,
            date: new Date().toLocaleDateString(),
            id: "DEMO-1234-5678"
        };

        window.issueCertificateAfterPass(demoScores);
    }

    /**
     * Initialize Safepay Button
     */
    function initSafepay(amount = 5.00) {
        if (typeof safepay === 'undefined') return;
        const container = document.getElementById('safepay-button-container');
        if (container) container.innerHTML = '';

        safepay.Button.render({
            env: 'sandbox',
            amount: amount,
            currency: 'USD',
            client: {
                'sandbox': 'sec_765f0883-7186-4554-8e36-969473855593',
                'production': ''
            },
            payment: { amount: amount, currency: 'USD' },
            onPayment: function (data) {
                document.getElementById('pay-modal')?.classList.remove('show');
                if (pendingScores) {
                    issueCertificate(pendingScores);
                    pendingScores = null;
                }
            }
        }, '#safepay-button-container');
    }

    /**
     * Handle Coupon Application (Async via Firestore)
     */
    async function handleCouponApply() {
        const codeInput = document.getElementById('coupon-code');
        const msg = document.getElementById('coupon-msg');
        const btn = document.getElementById('apply-coupon');
        if (!codeInput || !msg || !btn || !window.TM_DB) return;

        const code = codeInput.value.trim().toUpperCase();
        if (!code) return;

        btn.disabled = true;
        btn.textContent = "Checking...";
        msg.classList.add('hidden');

        const coupon = await TM_DB.getCoupon(code);

        btn.disabled = false;
        btn.textContent = "Apply";
        msg.classList.remove('hidden', 'text-emerald-600', 'text-rose-600');

        if (coupon) {
            const basePrice = 5.00;
            if (coupon.type === 'percentage') {
                examPrice = basePrice * (1 - (coupon.discount / 100));
            } else if (coupon.type === 'flat') {
                examPrice = Math.max(0, basePrice - coupon.discount);
            }

            msg.textContent = `Applied: ${coupon.discount}${coupon.type === 'percentage' ? '%' : '$'} Off!`;
            msg.classList.add('text-emerald-600');

            if (examPrice <= 0) {
                const container = document.getElementById('safepay-button-container');
                if (container) {
                    container.innerHTML = '<button id="claim-free-cert" class="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold shadow-lg animate-pop">Claim Free Certificate 🚀</button>';
                    document.getElementById('claim-free-cert')?.addEventListener('click', () => {
                        document.getElementById('pay-modal')?.classList.remove('show');
                        if (pendingScores) { issueCertificate(pendingScores); pendingScores = null; }
                    });
                }
            } else {
                initSafepay(examPrice);
            }
        } else {
            msg.textContent = "Invalid or Expired Code";
            msg.classList.add('text-rose-600');
        }
    }

    function cancelPayment() {
        document.getElementById('pay-modal')?.classList.remove('show');
        examPrice = 5.00;
        const msg = document.getElementById('coupon-msg'); if (msg) msg.classList.add('hidden');
        const cinp = document.getElementById('coupon-code'); if (cinp) cinp.value = '';

        if (pendingScores && window.showStandardResults) {
            window.showStandardResults(pendingScores);
            pendingScores = null;
        }
    }

    /**
     * Issue Final Certificate
     */
    function issueCertificate(scores) {
        if (!window.issueCertificateAfterPass) return;
        window.issueCertificateAfterPass(scores);
    }

    return {
        init,
        isExamMode,
        setExamMode,
        handleFocusLoss,
        initSafepay,
        setPendingScores: (s) => { pendingScores = s; }
    };
})();

window.TM_EXAM = TM_EXAM;
