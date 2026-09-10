document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const landing = document.getElementById('landing-screen');
    const dashboard = document.getElementById('dashboard-screen');
    const webcam = document.getElementById('webcam');
    const faceCanvas = document.getElementById('face-overlay');
    const faceCtx = faceCanvas.getContext('2d');
    const waveCanvas = document.getElementById('waveform-canvas');
    const waveCtx = waveCanvas.getContext('2d');

    const soundClick = document.getElementById('snd-click');
    const soundAlarm = document.getElementById('snd-alarm');

    const audioModule = new AudioEngine();
    let streamRef = null;

    startBtn.addEventListener('click', async () => {
        soundClick.currentTime = 0;
        soundClick.play().catch(() => {});

        try {
            streamRef = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            webcam.srcObject = streamRef;
        } catch (e) {
            alert("App Initialization Error: This UI experience requires standard Web Media streaming device permissions.");
            return;
        }

        // Cinematic Screen Transition Engine via GSAP
        gsap.to(landing, { opacity: 0, duration: 0.4, onComplete: () => {
            landing.classList.add('hidden');
            dashboard.classList.remove('hidden');
            gsap.fromTo(dashboard, { opacity: 0 }, { opacity: 1, duration: 0.4 });
            
            audioModule.init(streamRef);
            handleResize();
            window.requestAnimationFrame(renderLoop);
        }});
    });

    function handleResize() {
        faceCanvas.width = faceCanvas.parentElement.clientWidth;
        faceCanvas.height = faceCanvas.parentElement.clientHeight;
        waveCanvas.width = waveCanvas.parentElement.clientWidth;
        waveCanvas.height = waveCanvas.parentElement.clientHeight;
    }
    window.addEventListener('resize', handleResize);

    // Main 60FPS Synchronized Rendering Pipeline Execution
    function renderLoop(timestamp) {
        if (dashboard.classList.contains('hidden')) return;

        audioModule.renderSpectrogram(waveCanvas, waveCtx);
        FaceEngine.renderOverlay(faceCanvas, faceCtx, timestamp);

        let audioIntensity = audioModule.getIntensity();
        let simulatedEmotions = FaceEngine.getSimulatedEmotions(timestamp);

        TruthEngine.calculateMetrics(audioIntensity, simulatedEmotions);

        window.requestAnimationFrame(renderLoop);
    }

    // Interactive Action Triggers
    document.getElementById('btn-recalibrate').addEventListener('click', () => {
        soundClick.currentTime = 0; soundClick.play().catch(() => {});
        TruthEngine.currentTruth = 99;
        document.getElementById('ai-conclusion').innerText = "CALIBRATING QUANTUM PARITY BASES...";
    });

    document.getElementById('btn-fullscreen').addEventListener('click', () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
    });

    // Prank Shortcut Listener Configuration (Shift + L)
    window.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.key.toLowerCase() === 'l') {
            if (!TruthEngine.isPrankActive) {
                TruthEngine.triggerPrank(soundAlarm);
            }
        }
    });
});