import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { Line, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
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
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const StatsView = () => {
    const { progress } = useProgress();
    const history = progress.history || [];

    const wpmData = {
        labels: history.map((_, i) => i + 1),
        datasets: [{
            label: 'WPM Trend',
            data: history.map(h => h.wpm),
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: '#6366f1'
        }]
    };

    const accuracyData = {
        labels: history.map((_, i) => i + 1),
        datasets: [{
            label: 'Accuracy %',
            data: history.map(h => h.accuracy),
            backgroundColor: 'rgba(34, 197, 94, 0.5)',
            borderRadius: 8
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                cornerRadius: 12
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#64748b' }
            },
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#64748b' }
            }
        }
    };

    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
                <span className="text-6xl">📊</span>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">No Statistics Yet</h2>
                <p className="text-text-muted max-w-sm">Complete a few practice tests or lessons to see your progress visualized here.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter italic uppercase">Performance Analytics</h2>
                    <p className="text-text-muted font-medium">Deep dive into your typing progression journey.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <StatMetric label="AVERAGE SPEED" value={Math.round(history.reduce((a, b) => a + b.wpm, 0) / history.length)} unit="WPM" />
                <StatMetric label="AVG ACCURACY" value={Math.round(history.reduce((a, b) => a + b.accuracy, 0) / history.length)} unit="%" />
                <StatMetric label="TOTAL SESSIONS" value={history.length} unit="TESTS" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-bg-secondary border border-border rounded-[40px] p-8">
                    <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-8">Speed Evolution (WPM)</h3>
                    <div className="h-64">
                        <Line data={wpmData} options={options} />
                    </div>
                </div>
                <div className="bg-bg-secondary border border-border rounded-[40px] p-8">
                    <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-8">Accuracy Consistency (%)</h3>
                    <div className="h-64">
                        <Bar data={accuracyData} options={options} />
                    </div>
                </div>
            </div>

            <div className="bg-bg-secondary border border-border rounded-[40px] p-8 overflow-hidden relative">
                <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-8">Recent History</h3>
                <div className="space-y-4">
                    {history.slice(-5).reverse().map((h, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-bg-tertiary/30 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent font-black">
                                    {h.wpm}
                                </div>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-tight">{h.lessonId ? `Lesson ${h.lessonId}` : 'Practice Session'}</p>
                                    <p className="text-[10px] text-text-muted uppercase">{new Date(h.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-black text-green-400">{h.accuracy}% ACC</p>
                                <p className="text-[10px] text-text-muted uppercase">{(Object.values(h.mistakes || {}).reduce((a, b) => a + b, 0))} ERRORS</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const StatMetric = ({ label, value, unit }) => (
    <div className="bg-bg-secondary border border-border rounded-3xl p-6 text-center">
        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2">{label}</p>
        <p className="text-4xl font-black italic tracking-tighter">{value}<small className="text-sm not-italic opacity-50 ml-1">{unit}</small></p>
    </div>
);

export default StatsView;
