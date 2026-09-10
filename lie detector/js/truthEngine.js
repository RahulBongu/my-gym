const TruthEngine = {
    currentTruth: 100,
    isPrankActive: false,
    conclusions: {
        stable: "Subject demonstrates cohesive baseline symmetry. Metric flow paths normal.",
        unstable: "Minor vocal pitch deviation / stress variance captured. Tracking vector anomalies...",
        deceptive: "Biometric correlation failures isolated. Deception indices exceeding predictable threshold arrays."
    },

    calculateMetrics(audioIntensity, emotions) {
        if (this.isPrankActive) return;

        // Mathematical variance weight engine
        let stressWeight = (emotions.angry * 0.4) + (emotions.fear * 0.5) + (audioIntensity * 0.3);
        
        if (stressWeight > 25) {
            this.currentTruth -= (stressWeight * 0.05);
        } else {
            this.currentTruth += 0.3;
        }

        // Clamp boundaries
        this.currentTruth = Math.max(28, Math.min(99, this.currentTruth));
        this.updateDOM(emotions);
    },

    updateDOM(emotions) {
        const ratingEl = document.getElementById('truth-rating');
        const diagEl = document.getElementById('ai-conclusion');
        const statusEl = document.getElementById('status-text');

        ratingEl.innerText = `${Math.floor(this.currentTruth)}%`;

        // Update Expression Element DOM bars dynamically 
        for (const [key, value] of Object.entries(emotions)) {
            let bar = document.getElementById(`bar-${key}`);
            let text = document.getElementById(`val-${key}`);
            if (bar && text) {
                let curVal = parseFloat(text.innerText) || 0;
                let interpolated = curVal + (value - curVal) * 0.25; // Linear smoothing interpolation
                text.innerText = `${Math.floor(interpolated)}%`;
                bar.style.width = `${interpolated}%`;
            }
        }

        // Adaptive HUD Color Logic Shifts
        if (this.currentTruth < 55) {
            ratingEl.style.color = "var(--magenta)";
            diagEl.innerText = this.conclusions.deceptive;
            statusEl.innerText = "CRITICAL RISK IDENTIFIED";
            statusEl.parentElement.style.color = "var(--magenta)";
        } else if (this.currentTruth < 78) {
            ratingEl.style.color = "#ffaa00";
            diagEl.innerText = this.conclusions.unstable;
            statusEl.innerText = "SURGENCE DETECTED";
            statusEl.parentElement.style.color = "#ffaa00";
        } else {
            ratingEl.style.color = "var(--cyan)";
            diagEl.innerText = this.conclusions.stable;
            statusEl.innerText = "TRACKING STABLE";
            statusEl.parentElement.style.color = "var(--green)";
        }
    },

    triggerPrank(alarmSound) {
        this.isPrankActive = true;
        alarmSound.currentTime = 0;
        alarmSound.play().catch(() => {});
        
        document.getElementById('prank-overlay').style.display = 'flex';
        document.body.classList.add('shake');
        
        setTimeout(() => this.killPrank(alarmSound), 5000);
    },

    killPrank(alarmSound) {
        this.isPrankActive = false;
        alarmSound.pause();
        document.getElementById('prank-overlay').style.display = 'none';
        document.body.classList.remove('shake');
        this.currentTruth = 99;
    }
};