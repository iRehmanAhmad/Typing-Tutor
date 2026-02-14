import React, { useState } from 'react';
import TypingArena from '../Arena/TypingArena';
import VirtualKeyboard from '../Arena/VirtualKeyboard';
import ResultModal from '../Arena/ResultModal';
import { useTypingEngine } from '../../hooks/useTypingEngine';
import { useProgress } from '../../context/ProgressContext';

const TestView = () => {
    const { updateProgress } = useProgress();
    const [text] = useState("The quick brown fox jumps over the lazy dog with remarkable speed and agility. Success comes to those who persist through challenges and never give up.");

    const onComplete = (results) => {
        updateProgress({
            xp: Math.round(results.netWPM * results.accuracy / 10),
            weakKeys: results.mistakes,
            sessionResult: {
                wpm: results.netWPM,
                accuracy: results.accuracy,
                mistakes: results.mistakes
            }
        });
    };

    const {
        isRunning,
        timeLeft,
        currentIndex,
        typedChars,
        correctChars,
        mistakes,
        results,
        handleKey,
        reset
    } = useTypingEngine(text, 60, onComplete);

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter italic">PRACTICE ARENA</h2>
                    <p className="text-text-muted font-medium">Standard English Words • 1 Minute</p>
                </div>
                <div className="flex gap-6">
                    <Metric label="TIME" value={timeLeft} unit="s" />
                    <Metric label="WPM" value={Math.round((correctChars / 5) / ((60 - timeLeft) / 60) || 0)} />
                    <Metric label="ACC" value={typedChars ? Math.round((correctChars / typedChars) * 100) : 100} unit="%" />
                </div>
            </div>

            <TypingArena
                text={text}
                currentIndex={currentIndex}
                handleKey={handleKey}
                isRunning={isRunning}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <VirtualKeyboard activeChar={text[currentIndex]} />
                </div>
                <div className="bg-bg-secondary p-6 rounded-3xl border border-border space-y-4">
                    <h3 className="text-xs font-black text-text-muted uppercase tracking-widest">Session Goals</h3>
                    <div className="space-y-3">
                        <GoalItem label="Speed" target="40 WPM" />
                        <GoalItem label="Accuracy" target="96%" />
                    </div>
                    <button
                        onClick={reset}
                        className="w-full py-4 bg-bg-tertiary rounded-2xl font-bold hover:bg-bg-secondary transition border border-white/5"
                    >
                        Reset Session (Esc)
                    </button>
                </div>
            </div>

            <ResultModal
                results={results}
                onRetry={reset}
                onClose={reset}
            />
        </div>
    );
};

const Metric = ({ label, value, unit }) => (
    <div className="text-right">
        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-3xl font-black italic tracking-tighter leading-none">{value}<small className="text-sm not-italic opacity-50 ml-1">{unit}</small></p>
    </div>
);

const GoalItem = ({ label, target }) => (
    <div className="flex justify-between items-center p-3 bg-bg-tertiary/50 rounded-xl border border-white/5">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs font-black text-accent">{target}</span>
    </div>
);

export default TestView;
