export const COURSES = {
    basic: {
        id: 'basic',
        name: 'Basic Typing Course',
        description: 'Learn touch typing from scratch',
        totalLessons: 12,
        totalSubLessons: 70,
        lessons: [
            {
                id: 1,
                title: 'The Home Row',
                description: 'Learn the foundation of touch typing',
                subLessons: [
                    {
                        id: '1.1',
                        title: 'Touch typing basics',
                        type: 'info',
                        duration: 180,
                        content: `
                            <h2 class="text-2xl font-bold mb-4">Welcome to Touch Typing!</h2>
                            <p class="mb-4">Touch typing is a method of typing without looking at the keyboard. Your fingers will learn to find the keys by muscle memory.</p>
                            <h3 class="text-xl font-bold mb-2">Why Touch Typing?</h3>
                            <ul class="list-disc pl-5 mb-4 space-y-1">
                                <li>⚡ Type faster - up to 3x your current speed</li>
                                <li>🎯 Fewer errors - muscle memory is more accurate</li>
                                <li>👀 Keep your eyes on the screen</li>
                                <li>💪 Less fatigue - proper finger placement reduces strain</li>
                            </ul>
                            <h3 class="text-xl font-bold mb-2">The Home Row</h3>
                            <p class="mb-2">The home row is the foundation. Your fingers will rest on these keys:</p>
                            <p class="mb-1"><strong>Left hand:</strong> A S D F</p>
                            <p class="mb-4"><strong>Right hand:</strong> J K L ;</p>
                            <p>Your index fingers should rest on F and J (they have small bumps!)</p>
                        `
                    },
                    {
                        id: '1.2',
                        title: 'New keys: Home row',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'asdf jkl; asdf jkl; fdsa ;lkj asdf jkl; fdsa ;lkj asdf jkl; asdf jkl; fdsa ;lkj asdf jkl; fdsa ;lkj asdf jkl; asdf jkl; fdsa ;lkj',
                        tutorialText: 'a a a s s s d d d f f f j j j k k k l l l ; ; ;'
                    },
                    {
                        id: '1.3',
                        title: 'Understanding results',
                        type: 'info',
                        duration: 180,
                        content: `
                            <h2 class="text-2xl font-bold mb-4">Understanding Your Results</h2>
                            <p class="mb-4">After each practice drill, you'll see several metrics:</p>
                            <h3 class="text-xl font-bold mb-2">📊 Key Metrics</h3>
                            <ul class="list-disc pl-5 mb-4 space-y-1">
                                <li><strong>WPM (Words Per Minute):</strong> Your typing speed.</li>
                                <li><strong>CPM (Characters Per Minute):</strong> Raw character count per minute</li>
                                <li><strong>Accuracy:</strong> Percentage of correct keystrokes. Aim for 95%+</li>
                            </ul>
                            <h3 class="text-xl font-bold mb-2">⭐ Star Ratings</h3>
                            <p>Earn stars based on your accuracy:</p>
                            <ul class="list-disc pl-5 mb-4 space-y-1">
                                <li>⭐ 1 Star: 90% accuracy</li>
                                <li>⭐⭐ 2 Stars: 95% accuracy</li>
                                <li>⭐⭐⭐ 3 Stars: 98% accuracy</li>
                            </ul>
                        `
                    }
                ]
            },
            {
                id: 2,
                title: 'Keys E and I',
                description: 'Expand your reach to E and I',
                subLessons: [
                    {
                        id: '2.1',
                        title: 'New keys: E and I',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['e', 'i', 'a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'eee iii eee iii fed kid led lid fed kid led lid idea idea idle idle field field idea idle field',
                        tutorialText: 'eee iii eee iii'
                    }
                ]
            }
        ]
    }
};

export const getCourseById = (id) => COURSES[id];

export const getLessonById = (courseId, lessonId) => {
    const course = COURSES[courseId];
    return course?.lessons.find(l => l.id === lessonId);
};
