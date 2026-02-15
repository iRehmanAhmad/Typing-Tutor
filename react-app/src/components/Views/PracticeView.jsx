import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingArena from '../Arena/TypingArena';
import { useTypingEngine } from '../../hooks/useTypingEngine';
import { useProgress } from '../../context/ProgressContext';
import { usePlatform } from '../../context/PlatformContext';
import SEO from '../Layout/SEO';
import ResultModal from '../Arena/ResultModal';

// --- Components ---

const DrillCard = ({ title, description, icon, color, onClick, isLocked }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        disabled={isLocked}
        className={`
            relative overflow-hidden rounded-3xl p-6 text-left border transition-all h-full flex flex-col
            ${isLocked
                ? 'bg-bg-secondary/20 border-border/50 opacity-50 grayscale cursor-not-allowed'
                : 'bg-bg-secondary/50 border-border hover:border-accent hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)]'
            }
`}
    >
        <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-2xl ${color}`}>
            {icon}
        </div>
        <h3 className="text-xl font-black uppercase tracking-tighter text-text-primary mb-2">
            {title}
        </h3>
        <p className="text-xs font-bold text-text-muted leading-relaxed">
            {description}
        </p>

        {/* Tactical Corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-text-primary/5 to-transparent -mr-8 -mt-8 rotate-45" />
    </motion.button>
);

const AdUnit = ({ className = "" }) => (
    <div className={`relative overflow-hidden bg-bg-secondary border border-border/40 rounded-3xl p-4 flex items-center justify-center min-h-[250px] ${className}`}>
        <div className="absolute top-2 left-4 flex items-center gap-2">
            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-text-muted opacity-40">Sponsored Intel</span>
        </div>
        <div className="text-center space-y-2 opacity-30">
            <div className="text-4xl">📡</div>
            <div className="text-[8px] font-black uppercase tracking-widest text-text-muted">
                Tactical Ad Stream<br />300x600
            </div>
        </div>
    </div>
);

// --- Main View ---

const PracticeView = () => {
    const { progress } = useProgress();
    const { isMobile } = usePlatform();
    const [mode, setMode] = useState('dashboard'); // 'dashboard', 'precision', 'custom', 'zen'
    const [customText, setCustomText] = useState('');
    const [generatedText, setGeneratedText] = useState('');

    // --- Generators ---

    // --- Generators ---

    const [zenModeId, setZenModeId] = useState('flow');

    // --- Data Streams ---
    const zenContent = [
        { id: 'flow', title: '🌊 Standard Flow State', category: 'flow', content: "The state of flow is a mental state of operation in which a person performing an activity is fully immersed in a feeling of energized focus, full involvement, and enjoyment in the process of the activity. In essence, flow is characterized by complete absorption in what one does, and a resulting loss in one's sense of space and time. To achieve this state, one must find a balance between the challenge of the task and their own skill level. If the task is too easy, boredom sets in. If it is too hard, anxiety takes over. But in the sweet spot, the mind becomes clear, distractions fade away, and the action becomes effortless. Keep typing, keep breathing, and let the words flow through you like water.".repeat(5) },

        // Classics
        { id: 'gibson', title: '📚 Neuromancer (Gibson)', category: 'story', content: "The sky above the port was the color of television, tuned to a dead channel. It was not like the other days, where the sun shone bright and the birds sang. This was a day of reckoning." },
        { id: 'austen', title: '📚 Pride and Prejudice', category: 'story', content: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters." },
        { id: 'wells', title: '📚 War of the Worlds', category: 'story', content: "No one would have believed in the last years of the nineteenth century that this world was being watched keenly and closely by intelligences greater than man's and yet as mortal as his own; that as men busied themselves about their various concerns they were scrutinised and studied, perhaps almost as narrowly as a man with a microscope might scrutinise the transient creatures that swarm and multiply in a drop of water." },
        { id: 'doyle', title: '📚 Scandal in Bohemia', category: 'story', content: "To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind." },
        { id: 'melville', title: '📚 Moby Dick', category: 'story', content: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation." },
        { id: 'carroll', title: '📚 Alice in Wonderland', category: 'story', content: "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, 'and what is the use of a book,' thought Alice 'without pictures or conversation?'" },
        { id: 'dickens', title: '📚 Tale of Two Cities', category: 'story', content: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair." },
        { id: 'wells_time', title: '📚 The Time Machine', category: 'story', content: "The mystery was gone; but the amazement was doubled. The stars were extinguished here and there in the sky, and just as the sun should have risen, there came a breath of wind from the east that chilled us. And then, slowly, the sun came up, pale and clear and small." },
        { id: 'tolkien', title: '📚 The Hobbit', category: 'story', content: "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort." },
        { id: 'kafka', title: '📚 The Metamorphosis', category: 'story', content: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections." },

        // Facts
        { id: 'honey', title: '🧠 Fact: Ancient Honey', category: 'fact', content: "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and are still perfectly edible. The chemical composition of honey, being low in water and high in sugar, creates an environment where bacteria cannot thrive." },
        { id: 'octopus', title: '🧠 Biology: Octopus Hearts', category: 'fact', content: "Octopuses have three hearts. Two pump blood to the gills, while the third pumps it to the rest of the body. When an octopus swims, the heart that pumps blood to the body stops beating, which explains why they prefer to crawl rather than swim, as swimming exhausts them quickly." },
        { id: 'venus', title: '🧠 Space: Venusian Day', category: 'fact', content: "A day on Venus is longer than a year on Venus. It takes Venus 243 Earth days to complete one rotation on its axis, but only 225 Earth days to orbit the Sun. This means that if you were on Venus, you would wait longer for the sun to rise again than you would for a year to pass." },
        { id: 'stars', title: '🧠 Space: Star Count', category: 'fact', content: "There are more stars in the universe than grains of sand on all the Earth's beaches. Astronomers estimate there are at least 100 billion galaxies in the observable universe, each containing billions of stars. The total number is mind-bogglingly vast." },
        { id: 'war', title: '🧠 History: Shortest War', category: 'fact', content: "The shortest war in history lasted only 38 minutes. It was fought between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered effectively immediately after the British bombardment began, making it the quickest conflict on record." },
        { id: 'smell', title: '🧠 Biology: Olfactory Power', category: 'fact', content: "The human nose can detect about one trillion smells. Previously, it was believed that humans could only distinguish about 10,000 scents, but recent research suggests our olfactory system is far more sensitive and capable than we ever realized." },
        { id: 'lightning', title: '🧠 Nature: Lightning Energy', category: 'fact', content: "A bolt of lightning contains enough energy to toast 100,000 slices of bread. A typical lightning flash is about 300 million Volts and about 30,000 Amps. That is a massive amount of energy released in a fraction of a second." }
    ];


    const generateWeakKeyText = () => {
        const weakKeys = Object.keys(progress?.weakKeys || {});
        if (weakKeys.length === 0) return "You have no weak keys recorded yet. Complete more lessons to unlock Precision Protocol.";

        const commonWords = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"];

        const targetWords = commonWords.filter(word => weakKeys.some(k => word.includes(k)));
        const pool = targetWords.length > 5 ? targetWords : commonWords;
        return Array(40).fill(0).map(() => pool[Math.floor(Math.random() * pool.length)]).join(' ');
    };

    const generateZenText = () => {
        const selected = zenContent.find(c => c.id === zenModeId);
        return selected ? selected.content : zenContent[0].content;
    };

    // --- Effects ---

    useEffect(() => {
        if (mode === 'active_zen') {
            setGeneratedText(generateZenText());
            reset();
        }
    }, [zenModeId]);

    const handleStartValues = (selectedMode) => {
        if (selectedMode === 'precision') {
            setGeneratedText(generateWeakKeyText());
            setMode('active_precision');
        } else if (selectedMode === 'zen') {
            setGeneratedText(generateZenText());
            setMode('active_zen');
        } else if (selectedMode === 'custom') {
            setMode('setup_custom');
        }
    };

    const handleConfirmCustom = () => {
        if (!customText.trim()) return;
        setGeneratedText(customText);
        setMode('active_custom');
    };

    const handleBack = () => {
        setMode('dashboard');
        reset();
    };

    // --- Engine ---

    // We only initialize the engine when we have text
    const {
        isRunning,
        timeLeft,
        currentIndex,
        typedChars,
        correctChars,
        accuracyMap,
        results,
        handleKey,
        reset
    } = useTypingEngine(generatedText, mode === 'active_zen' ? 3600 : 60, null);

    const currentWPM = Math.round((correctChars / 5) / (((mode === 'active_zen' ? 3600 : 60) - timeLeft) / 60) || 0);

    return (
        <div className="max-w-7xl mx-auto min-h-[80vh] flex flex-col relative">
            <SEO
                title="Firing Range | Custom Drills"
                description="Hone your skills with targeted drills. Focus on weak keys, custom text, or enter Zen Mode for flow state training."
            />

            {/* Header Area */}

            {/* Dashboard Mode */}
            {mode === 'dashboard' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 py-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-black text-text-primary tracking-tighter uppercase">
                            Practice Area
                        </h1>
                        <p className="text-text-muted font-bold text-sm uppercase tracking-widest">
                            Improve Your Typing // Free Practice
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <DrillCard
                            title="Weak Key Practice"
                            description="Focus on the keys you find most difficult."
                            icon="🎯"
                            color="bg-red-500/10 text-red-500"
                            onClick={() => handleStartValues('precision')}
                        />

                        <DrillCard
                            title="Custom Text"
                            description="Type anything you want. Paste articles, code, or notes."
                            icon="📝"
                            color="bg-blue-500/10 text-blue-500"
                            onClick={() => handleStartValues('custom')}
                        />
                        <DrillCard
                            title="Relaxed Typing"
                            description="Endless practice without pressure. Just focus on the words."
                            icon="🧘"
                            color="bg-green-500/10 text-green-500"
                            onClick={() => handleStartValues('zen')}
                        />
                    </div>

                    {/* Native Grid Ad */}
                    <div className="max-w-5xl mx-auto mt-8 border border-border/30 rounded-2xl p-4 bg-bg-secondary/30 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-accent/10 p-2 rounded-lg">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-text-primary uppercase text-xs tracking-wider">Sponsored Training</h4>
                                <p className="text-[10px] text-text-muted">Learn new skills with our training partners.</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-text-primary text-bg-primary text-[10px] font-black uppercase tracking-widest rounded-lg">
                            Open
                        </button>
                    </div>
                </div>
            )}

            {/* Custom Setup Mode */}
            {mode === 'setup_custom' && (
                <div className="max-w-2xl mx-auto py-12 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <h2 className="text-2xl font-black uppercase">Input Custom Data</h2>
                    <textarea
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="Paste your text here..."
                        className="w-full h-64 bg-bg-secondary border border-border focus:border-accent p-6 rounded-2xl outline-none font-mono text-sm resize-none"
                    />
                    <div className="flex gap-4">
                        <button onClick={handleBack} className="flex-1 py-4 rounded-xl border border-border font-bold uppercase hover:bg-bg-secondary transition-colors">
                            Cancel
                        </button>
                        <button onClick={handleConfirmCustom} disabled={!customText} className="flex-1 py-4 rounded-xl bg-accent text-background font-black uppercase hover:brightness-110 transition-all disabled:opacity-50">
                            Start
                        </button>
                    </div>
                </div>
            )}

            {/* Active Drill Modes */}
            {(mode.startsWith('active')) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-6 h-full py-8"
                >
                    {/* Left: Content */}
                    <div className="flex-1 flex flex-col gap-6">
                        {/* Header */}
                        <div className="flex justify-between items-center bg-bg-secondary/50 p-4 rounded-2xl border border-border transition-all animate-in fade-in slide-in-from-top-2 relative">
                            <div className="flex items-center gap-4">
                                <button onClick={handleBack} className="w-8 h-8 flex items-center justify-center rounded-lg bg-bg-tertiary hover:bg-accent hover:text-white transition-colors z-10">
                                    ←
                                </button>
                                <div>
                                    <h2 className="font-black uppercase text-lg leading-none flex items-center gap-3">
                                        {mode === 'active_precision' ? 'Precision Protocol' : mode === 'active_zen' ? 'Zen Focus' : 'Sandbox'}
                                    </h2>
                                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                                        {mode === 'active_zen' ? 'Endurance Run' : 'Target Practice'}
                                    </p>
                                </div>
                            </div>

                            {/* Centered Zen Dropdown */}
                            {mode === 'active_zen' && (
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-64">
                                    <select
                                        value={zenModeId}
                                        onChange={(e) => setZenModeId(e.target.value)}
                                        className="w-full bg-bg-primary/80 backdrop-blur-sm border border-border/50 text-[10px] font-black uppercase tracking-widest rounded-lg px-4 py-2 outline-none focus:border-accent focus:text-accent cursor-pointer hover:bg-bg-secondary transition-colors text-left shadow-lg truncate appearance-none"
                                        style={{ textAlignLast: 'left' }}
                                    >
                                        <optgroup label="🌊 Standard">
                                            {zenContent.filter(c => c.category === 'flow').map(item => (
                                                <option key={item.id} value={item.id}>{item.title}</option>
                                            ))}
                                        </optgroup>
                                        <optgroup label="📚 Classics">
                                            {zenContent.filter(c => c.category === 'story').map(item => (
                                                <option key={item.id} value={item.id}>{item.title}</option>
                                            ))}
                                        </optgroup>
                                        <optgroup label="🧠 Intellectual">
                                            {zenContent.filter(c => c.category === 'fact').map(item => (
                                                <option key={item.id} value={item.id}>{item.title}</option>
                                            ))}
                                        </optgroup>
                                    </select>
                                </div>
                            )}

                            {/* Simple HUD */}
                            <div className="flex gap-6">
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-text-muted uppercase">Velocity</p>
                                    <p className="text-xl font-black text-accent">{currentWPM} <span className="text-xs text-text-muted">WPM</span></p>
                                </div>
                                {mode !== 'active_zen' && (
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-text-muted uppercase">Time</p>
                                        <p className="text-xl font-black text-text-primary">{timeLeft}s</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <TypingArena
                            text={generatedText}
                            currentIndex={currentIndex}
                            accuracyMap={accuracyMap}
                            handleKey={handleKey}
                            isRunning={isRunning}
                            isFocusMode={isRunning}
                            currentWPM={currentWPM}
                        />
                    </div>

                    {/* Right: Ad Column (Monetization) */}
                    <div className="w-[300px] flex-shrink-0 hidden xl:block">
                        <AdUnit className="h-full max-h-[600px]" />
                        <div className="mt-4 text-center">
                            <button className="text-[10px] font-bold text-text-muted uppercase hover:text-accent transition-colors">
                                Remove Ads (Premium)
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            <ResultModal
                results={results}
                onRetry={() => {
                    reset();
                }}
                onClose={handleBack}
            />
        </div>
    );
};

export default PracticeView;
