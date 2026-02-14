import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ResultModal = ({ results, onRetry, onClose }) => {
    if (!results) return null;

    const chartData = {
        labels: results.samples.map((_, i) => i + 1),
        datasets: [{
            label: 'WPM',
            data: results.samples,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#6366f1',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#1e293b',
                titleColor: '#94a3b8',
                bodyColor: '#f8fafc',
                padding: 12,
                cornerRadius: 12
            }
        },
        scales: {
            x: { display: false },
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#64748b', font: { size: 10 } }
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl">
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-bg-secondary border border-border rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden"
            >
                <div className="p-8 space-y-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-black mb-2 italic tracking-tighter">SESSION SUMMARY</h2>
                        <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatItem label="NET SPEED" value={results.netWPM} unit="WPM" color="text-accent" />
                        <StatItem label="ACCURACY" value={results.accuracy} unit="%" color="text-green-400" />
                        <StatItem label="CONSISTENCY" value={results.consistency} unit="%" color="text-purple-400" />
                        <StatItem label="GROSS" value={results.grossWPM} unit="WPM" color="text-text-muted" />
                    </div>

                    <div className="bg-bg-tertiary/50 rounded-3xl p-6 border border-white/5">
                        <h3 className="text-xs font-black text-text-muted uppercase tracking-widest mb-4">Speed Flow</h3>
                        <div className="h-40">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onRetry}
                            className="flex-1 py-5 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition active:scale-95"
                        >
                            RETRY SESSION
                        </button>
                        <button
                            onClick={onClose}
                            className="px-8 py-5 bg-bg-tertiary text-white font-black rounded-2xl border border-white/5 hover:bg-bg-secondary transition"
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const StatItem = ({ label, value, unit, color }) => (
    <div className="bg-bg-tertiary/30 p-4 rounded-2xl border border-white/5 text-center">
        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-2xl font-black ${color}`}>{value} <small className="text-xs opacity-50 uppercase">{unit}</small></p>
    </div>
);

export default ResultModal;
