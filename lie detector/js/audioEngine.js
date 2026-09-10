class AudioEngine {
    constructor() {
        this.context = null;
        this.analyser = null;
        this.dataArray = [];
        this.pitchHistory = Array(35).fill(40);
        this.chartInstance = null;
    }

    init(stream) {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        const source = this.context.createMediaStreamSource(stream);
        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = 256;
        source.connect(this.analyser);
        
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.initChart();
    }

    initChart() {
        const ctx = document.getElementById('pitch-chart').getContext('2d');
        this.chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(35).fill(''),
                datasets: [{
                    data: this.pitchHistory,
                    borderColor: '#00f0ff',
                    borderWidth: 1.5,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: 'rgba(0, 240, 255, 0.03)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { display: false } }
                }
            }
        });
    }

    renderSpectrogram(canvas, ctx) {
        this.analyser.getByteFrequencyData(this.dataArray);
        ctx.fillStyle = 'rgba(3, 7, 18, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let barWidth = (canvas.width / this.dataArray.length) * 1.5;
        let x = 0;

        for (let i = 0; i < this.dataArray.length; i++) {
            let val = this.dataArray[i];
            let barHeight = (val / 255) * canvas.height * 0.8;
            ctx.fillStyle = `rgba(0, 240, 255, ${val / 230})`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
            x += barWidth;
        }
    }

    getIntensity() {
        if (!this.analyser) return 0;
        let sum = 0;
        this.dataArray.forEach(v => sum += v);
        let avg = sum / this.dataArray.length;
        
        // Push and cascade updates down tracking chart array
        this.pitchHistory.push(Math.min(100, Math.max(15, avg * 2.2 + (Math.random() * 12))));
        this.pitchHistory.shift();
        this.chartInstance.update('none');
        
        return avg;
    }
}