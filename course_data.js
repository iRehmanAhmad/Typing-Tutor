/**
 * Typing Master - Course Data
 * ---------------------------------------
 * Contains all course definitions, lessons, and sub-lessons
 */

const COURSES = {
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
                            <h2>Welcome to Touch Typing!</h2>
                            <p>Touch typing is a method of typing without looking at the keyboard. Your fingers will learn to find the keys by muscle memory.</p>
                            <h3>Why Touch Typing?</h3>
                            <ul>
                                <li>⚡ Type faster - up to 3x your current speed</li>
                                <li>🎯 Fewer errors - muscle memory is more accurate</li>
                                <li>👀 Keep your eyes on the screen</li>
                                <li>💪 Less fatigue - proper finger placement reduces strain</li>
                            </ul>
                            <h3>The Home Row</h3>
                            <p>The home row is the foundation. Your fingers will rest on these keys:</p>
                            <p><strong>Left hand:</strong> A S D F</p>
                            <p><strong>Right hand:</strong> J K L ;</p>
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
                            <h2>Understanding Your Results</h2>
                            <p>After each practice drill, you'll see several metrics:</p>
                            <h3>📊 Key Metrics</h3>
                            <ul>
                                <li><strong>WPM (Words Per Minute):</strong> Your typing speed. Average is 40 WPM, good is 60+ WPM</li>
                                <li><strong>CPM (Characters Per Minute):</strong> Raw character count per minute</li>
                                <li><strong>Accuracy:</strong> Percentage of correct keystrokes. Aim for 95%+</li>
                                <li><strong>Errors:</strong> Number of mistakes made</li>
                            </ul>
                            <h3>⭐ Star Ratings</h3>
                            <p>Earn stars based on your accuracy:</p>
                            <ul>
                                <li>⭐ 1 Star: 90% accuracy</li>
                                <li>⭐⭐ 2 Stars: 95% accuracy</li>
                                <li>⭐⭐⭐ 3 Stars: 98% accuracy</li>
                            </ul>
                        `
                    },
                    {
                        id: '1.4',
                        title: 'Key drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'aaa sss ddd fff jjj kkk lll ;;; asdf jkl; fdsa ;lkj aaa sss ddd fff jjj kkk lll ;;; asdf jkl; fdsa ;lkj',
                        tutorialText: 'aaa sss ddd fff jjj kkk lll ;;;'
                    },
                    {
                        id: '1.5',
                        title: 'Tip: Typing tests (Online)',
                        type: 'info',
                        duration: 180,
                        content: `
                            <h2>💡 Tip: Practice Regularly</h2>
                            <p>The key to mastering touch typing is consistent practice!</p>
                            <h3>Best Practices:</h3>
                            <ul>
                                <li>🕐 Practice 15-30 minutes daily</li>
                                <li>🎯 Focus on accuracy first, speed will come naturally</li>
                                <li>🧘 Take breaks every 20 minutes to avoid fatigue</li>
                                <li>📈 Track your progress - celebrate small wins!</li>
                            </ul>
                            <h3>Online Typing Tests</h3>
                            <p>After completing this course, test your skills on:</p>
                            <ul>
                                <li>MonkeyType.com</li>
                                <li>10FastFingers.com</li>
                                <li>TypeRacer.com</li>
                            </ul>
                        `
                    },
                    {
                        id: '1.6',
                        title: 'Word drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'sad lad fad dad ask flask flaskask dad fad lad sad ask flask flask ask sad lad fad dad ask flask',
                        tutorialText: 'sad lad fad dad ask flask'
                    },
                    {
                        id: '1.7',
                        title: 'Paragraph drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'a sad lad; a sad dad; ask a lad; a flask; a lass; dad ask; lad fall; dad fall; ask a lass; a sad lad; a sad dad; ask a lad; a flask; a lass',
                        tutorialText: 'a sad lad; a sad dad; ask a lad'
                    }
                ]
            },
            // Lesson 2 - Keys E and I
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
                    },
                    {
                        id: '2.2',
                        title: 'Optimal duration',
                        type: 'info',
                        duration: 180,
                        content: `
                            <h2>⏱️ Optimal Practice Duration</h2>
                            <p>Each sub-lesson is designed to be 3-5 minutes long. This is the sweet spot for learning!</p>
                            <h3>Why 3-5 Minutes?</h3>
                            <ul>
                                <li>🧠 Maintains focus and concentration</li>
                                <li>💪 Prevents finger fatigue</li>
                                <li>📈 Allows for multiple practice sessions per day</li>
                                <li>🎯 Keeps you motivated with quick wins</li>
                            </ul>
                            <p>Don't rush! Quality practice is better than quantity.</p>
                        `
                    },
                    {
                        id: '2.3',
                        title: 'Word drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['e', 'i', 'a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'idea idle field slide slide field idea idle slide field idea idle field slide idea idle field slide',
                        tutorialText: 'idea idle field slide'
                    },
                    {
                        id: '2.4',
                        title: 'Sentence drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['e', 'i', 'a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'a kid fell; a lass said; a field; a slide; a kid said; a lass fell; a field slide; a kid fell; a lass said',
                        tutorialText: 'a kid fell; a lass said'
                    },
                    {
                        id: '2.5',
                        title: 'Tip: Typing Meter',
                        type: 'info',
                        duration: 180,
                        content: `
                            <h2>📊 Understanding the Typing Meter</h2>
                            <p>During practice, you'll see a real-time typing meter showing your current performance.</p>
                            <h3>What to Watch:</h3>
                            <ul>
                                <li>🟢 <strong>Green zone:</strong> Great accuracy! Keep it up!</li>
                                <li>🟡 <strong>Yellow zone:</strong> Good, but room for improvement</li>
                                <li>🔴 <strong>Red zone:</strong> Slow down and focus on accuracy</li>
                            </ul>
                            <p>Remember: Accuracy first, speed second!</p>
                        `
                    },
                    {
                        id: '2.6',
                        title: 'Paragraph drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['e', 'i', 'a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'a kid asked a lass; a lass said; a field is idle; a slide fell; ask a kid; a lass is sad; a field is idle; a slide fell; ask a kid; a lass is sad',
                        tutorialText: 'a kid asked a lass; a lass said'
                    }
                ]
            },
            // Lesson 3 - Keys R and U
            {
                id: 3,
                title: 'Keys R and U',
                description: 'Master the index finger reaches for R and U',
                subLessons: [
                    {
                        id: '3.1',
                        title: 'New keys: R and U',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['r', 'u'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'rrr uuu rrr uuu red rud rue rug red rud rue rug user user rule rule sure sure user rule sure',
                        tutorialText: 'rrr uuu rrr uuu'
                    },
                    {
                        id: '3.2',
                        title: 'Word drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['r', 'u'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'rule rude rug red user sure drawer drawer sure user red rug rude rule drawer sure user red',
                        tutorialText: 'rule rude rug red'
                    },
                    {
                        id: '3.3',
                        title: 'Ergonomics',
                        type: 'info',
                        duration: 180,
                        content: `
                            <h2>🧘 Ergonomics: Sit Up Straight!</h2>
                            <p>Proper posture is essential for long-term comfort and speed.</p>
                            <ul>
                                <li>📏 <strong>Elbows:</strong> Keep them at a 90-degree angle</li>
                                <li>🖥️ <strong>Eyes:</strong> Level with the top of your monitor</li>
                                <li>👣 <strong>Feet:</strong> Flat on the floor</li>
                                <li>⌨️ <strong>Wrists:</strong> Straight, not resting on the desk</li>
                            </ul>
                        `
                    },
                    {
                        id: '3.4',
                        title: 'Sentence drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['r', 'u'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'a user is sure; a rude rule; a red rug; a sure rule; a rude user; a red drawer; a sure rug',
                        tutorialText: 'a user is sure'
                    },
                    {
                        id: '3.5',
                        title: 'Paragraph drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['r', 'u'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'the red rug is sure; a rude user asked; a rule is rude; a drawer is red; the user is sure; the rug is red',
                        tutorialText: 'the red rug is sure'
                    }
                ]
            },
            // Lesson 4 - Keys T and O
            {
                id: 4,
                title: 'Keys T and O',
                description: 'Reach for T and O with your index and ring fingers',
                subLessons: [
                    {
                        id: '4.1',
                        title: 'New keys: T and O',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['t', 'o'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'ttt ooo ttt ooo toy took tool foot toy took tool foot out out root root boot boot out root boot',
                        tutorialText: 'ttt ooo ttt ooo'
                    },
                    {
                        id: '4.2',
                        title: 'Word drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['t', 'o'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'took tool root boot out foot toy door door toy foot out boot root tool took door toy foot out',
                        tutorialText: 'took tool root boot'
                    },
                    {
                        id: '4.3',
                        title: 'Tip: Progress reports',
                        type: 'info',
                        duration: 180,
                        content: `
                            <h2>📈 Visualizing Your Growth</h2>
                            <p>We track every keystroke to provide detailed progress reports.</p>
                            <p>The course dashboard updates after every sub-lesson to show your accuracy and speed trends.</p>
                            <p>💡 Check your <strong>Total Stars</strong> to see how many lessons you've mastered!</p>
                        `
                    },
                    {
                        id: '4.4',
                        title: 'Sentence drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['t', 'o'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'the tool is too old; a root took root; out of the door; a toy for the kid; the boot is red; a foot in a door',
                        tutorialText: 'the tool is too old'
                    },
                    {
                        id: '4.5',
                        title: 'Paragraph drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['t', 'o'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'the tool took root in the field; a kid took a toy out of the door; the boot is red and old; out of the door took a foot; the tool is too old for the kid',
                        tutorialText: 'the tool took root in the field'
                    }
                ]
            },
            // Lesson 5 - Capital Letters and Period
            {
                id: 5,
                title: 'Capital Letters and Period',
                description: 'Learn the Shift key and the period (.)',
                subLessons: [
                    {
                        id: '5.1',
                        title: 'New keys: Shift and Period',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['Shift', '.'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'A. S. D. F. J. K. L. ;. A. S. D. F. J. K. L. ;. All. Ask. Dad. Feel. Just. Keep. Look. All. Ask. Dad. Feel. Just. Keep. Look.',
                        tutorialText: 'A. S. D. F.'
                    },
                    {
                        id: '5.2',
                        title: 'Word drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['Shift', '.'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'Ask. Dad. Feel. Just. Keep. Look. All. Said. Field. Idle. Slide. Life. Door. Book. Root. Boot. Tool. Took. Foot. Toy.',
                        tutorialText: 'Ask. Dad. Feel. Just.'
                    },
                    {
                        id: '5.3',
                        title: 'Tip: Shift Key',
                        type: 'info',
                        duration: 180,
                        content: `
                            <h2>⌨️ Mastering the Shift Key</h2>
                            <p>To type a capital letter, hold down the <strong>Shift</strong> key with your pinky while pressing the letter with the other hand.</p>
                            <ul>
                                <li>🖐️ Use <strong>Left Shift</strong> for right-hand keys (J, K, L, etc.)</li>
                                <li>🖐️ Use <strong>Right Shift</strong> for left-hand keys (A, S, D, F, etc.)</li>
                            </ul>
                            <p>This "opposite hand" technique is the fastest way to type capitals!</p>
                        `
                    },
                    {
                        id: '5.4',
                        title: 'Sentence drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['Shift', '.'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'Dad said all is well. A kid fell. The field is idle. Just look at the door. Life is a field. Keep the book.',
                        tutorialText: 'Dad said all is well.'
                    },
                    {
                        id: '5.5',
                        title: 'Paragraph drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['Shift', '.'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'Dad said all is well. The field is idle and a kid fell. Just look at the door and keep the book. Life is a field for all. A lass asked a kid.',
                        tutorialText: 'Dad said all is well.'
                    }
                ]
            },
            // Lesson 6 - Keys C and Comma
            {
                id: 6,
                title: 'Keys C and Comma',
                description: 'Master the middle finger reach for C and the comma (,)',
                subLessons: [
                    {
                        id: '6.1',
                        title: 'New keys: C and Comma',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['c', ','],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'ccc ,,, ccc ,,, cat ice cold cake, face case core, rice nice race, ice cold, rice nice, face case',
                        tutorialText: 'ccc ,,, ccc ,,, cat ice'
                    },
                    {
                        id: '6.2',
                        title: 'Word drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['c', ','],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'cat, cold, cake, ice, rice, nice, case, face, cool, call, lick, lock, rock, rack, back, black, card, hard',
                        tutorialText: 'cat, cold, cake, ice'
                    },
                    {
                        id: '6.3',
                        title: 'Tip: Finger placement',
                        type: 'info',
                        duration: 180,
                        content: `
                            <h2>📍 Finger Placement for C and Comma</h2>
                            <p>For the 'C' key and the comma ',', use your middle fingers.</p>
                            <ul>
                                <li><strong>Left middle finger:</strong> Reaches down for 'C' (from 'D')</li>
                                <li><strong>Right middle finger:</strong> Reaches down for the comma ',' (from 'K')</li>
                            </ul>
                            <p>💡 Keep your other fingers on the home row to maintain your position!</p>
                        `
                    }
                ]
            },
            // Lesson 7 - Keys G, H and Apostrophe
            {
                id: 7,
                title: 'Keys G, H and Apostrophe',
                description: 'Master the lateral index moves for G and H',
                subLessons: [
                    {
                        id: '7.1',
                        title: 'New keys: G and H',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['g', 'h', "'"],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: "ggg hhh ggg hhh get high gold hand, glad glass good help, don't can't it's he's, get high gold hand",
                        tutorialText: 'ggg hhh ggg hhh'
                    },
                    {
                        id: '7.2',
                        title: 'Word drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['g', 'h', "'"],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: "get gold high hand glass light great hill hall head hold, he's she's don't can't it's, hold head hill",
                        tutorialText: "get gold high hand"
                    }
                ]
            },
            // Lesson 8 - Keys V, N and Question Mark
            {
                id: 8,
                title: 'Keys V, N and Question Mark',
                description: 'Master the downward index moves for V and N',
                subLessons: [
                    {
                        id: '8.1',
                        title: 'New keys: V and N',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['v', 'n', '?'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: "vvv nnn vvv nnn van now very night, give view even need, is it? was he? can results? van now",
                        tutorialText: 'vvv nnn vvv nnn'
                    }
                ]
            },
            // Lesson 9 - Keys W and M
            {
                id: 9,
                title: 'Keys W and M',
                description: 'Master the ring finger for W and index for M',
                subLessons: [
                    {
                        id: '9.1',
                        title: 'New keys: W and M',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['w', 'm'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'www mmm www mmm win man wet mud, web mid was more, swim time wall make, win man wet mud',
                        tutorialText: 'www mmm www mmm'
                    },
                    {
                        id: '9.2',
                        title: 'Word drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['w', 'm'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'win wet was web swim wall man mud mid more time make, woman work world small music move, work world more',
                        tutorialText: 'win wet was web'
                    }
                ]
            },
            // Lesson 10 - Keys Q and P
            {
                id: 10,
                title: 'Keys Q and P',
                description: 'Master the pinky finger reaches for Q and P',
                subLessons: [
                    {
                        id: '10.1',
                        title: 'New keys: Q and P',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['q', 'p'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'qqq ppp qqq ppp quit play quick part, page quest pull quite, keep space open point, quit play quick',
                        tutorialText: 'qqq ppp qqq ppp'
                    },
                    {
                        id: '10.2',
                        title: 'Word drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['q', 'p'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'quit quick quest quite page play part pull space open point power people paper prompt pocket proud',
                        tutorialText: 'quit quick quest quite'
                    }
                ]
            },
            // Lesson 11 - Keys B and Y
            {
                id: 11,
                title: 'Keys B and Y',
                description: 'Master the index finger reaches for B and Y',
                subLessons: [
                    {
                        id: '11.1',
                        title: 'New keys: B and Y',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['b', 'y'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'bbb yyy bbb yyy boy big yes you, back yellow blue year, baby buy by body, boy big yes you',
                        tutorialText: 'bbb yyy bbb yyy'
                    },
                    {
                        id: '11.2',
                        title: 'Word drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['b', 'y'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'boy big back blue book baby buy by body yes you year yellow young yesterday beyond busy beautiful',
                        tutorialText: 'boy big back blue'
                    }
                ]
            },
            // Lesson 12 - Keys Z and X
            {
                id: 12,
                title: 'Keys Z and X',
                description: 'Final keys and course completion!',
                subLessons: [
                    {
                        id: '12.1',
                        title: 'New keys: Z and X',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['z', 'x'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'zzz xxx zzz xxx zebra box size, next zero fix jazz, pizza extra lazy exam, zebra box size',
                        tutorialText: 'zzz xxx zzz xxx'
                    },
                    {
                        id: '12.2',
                        title: 'Word drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['z', 'x'],
                        minAccuracy: 80,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'zebra box size next zero fix jazz pizza extra lazy exam exercise oxygen luxury puzzle exit explore',
                        tutorialText: 'zebra box size next'
                    },
                    {
                        id: '12.3',
                        title: 'Review: All keys',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['abcdefghijklmnopqrstuvwxyz', '.', ',', "'", '?'],
                        minAccuracy: 85,
                        starThresholds: { 1: 90, 2: 95, 3: 98 },
                        text: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. Jackdaws love my big sphinx of quartz.',
                        tutorialText: 'The quick brown fox'
                    },
                    {
                        id: '12.4',
                        title: 'Course Mastery assessment',
                        type: 'practice',
                        duration: 600, // 10 minutes
                        targetKeys: ['all'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'This is the final assessment for the Basic Typing Course. Success here proves your dedication and mastery of touch typing. You have learned all the keys, proper posture, and high-speed techniques. Keep practicing and your speed will continue to grow every day. Congratulations on reaching this milestone!',
                        tutorialText: 'Final Mastery Assessment'
                    },
                    {
                        id: '12.5',
                        title: 'Official Graduation',
                        type: 'completion_final',
                        duration: 0
                    }
                ]
            }
        ]
    },

    speed: {
        id: 'speed',
        name: 'Speed Building Course',
        description: 'Enhance your typing speed',
        totalLessons: 6,
        totalSubLessons: 31,
        lessons: [
            {
                id: 1,
                title: 'Strengthen the Home Row',
                description: 'Refine your home row technique for maximum speed',
                subLessons: [
                    {
                        id: 's1.1',
                        title: 'Course overview',
                        type: 'info',
                        duration: 180,
                        content: `
                            <h2>⚡ Welcome to Speed Building!</h2>
                            <p>This course is designed for typists who already know the keyboard layout but want to increase their raw speed and accuracy.</p>
                            <h3>What we'll focus on:</h3>
                            <ul>
                                <li>💪 <strong>Finger Strength:</strong> Targeted drills for specific fingers</li>
                                <li>🌊 <strong>Fluidity:</strong> Reducing pauses between words</li>
                                <li>✨ <strong>Accuracy:</strong> Maintaining precision at high speeds</li>
                                <li>🧠 <strong>Muscle Memory:</strong> Deepening your connection to the keys</li>
                            </ul>
                            <p>Ready to break your current speed record? Let's go!</p>
                        `
                    },
                    {
                        id: 's1.2',
                        title: 'Home row refresher',
                        type: 'practice',
                        duration: 180,
                        targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'aaaa ssss dddd ffff jjjj kkkk llll ;;;; asdf jkl; fdsa ;lkj asdf jkl; asdf jkl; fdsa ;lkj',
                        tutorialText: 'asdf jkl;'
                    },
                    {
                        id: 's1.3',
                        title: 'Speed phrases: A F J',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['a', 'f', 'j'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'a lad as a fad; a fall as a fall; a fad as a fall; a lad as a fall; a fad as a lad; a fall as a fad',
                        tutorialText: 'a lad as a fad'
                    },
                    {
                        id: 's1.4',
                        title: 'Speed phrases: D K',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['d', 'k'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'dad as a kid; a kid asks dad; dad as a kid; a kid asks dad; dad as a kid; a kid asks dad',
                        tutorialText: 'dad as a kid'
                    },
                    {
                        id: 's1.5',
                        title: 'Speed phrases: S L',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['s', 'l'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'all as a lass; a lass as all; all as a lass; a lass as all; all as a lass; a lass as all',
                        tutorialText: 'all as a lass'
                    },
                    {
                        id: 's1.6',
                        title: 'Home row fluency',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['asdfjkl;'],
                        minAccuracy: 92,
                        starThresholds: { 1: 94, 2: 96, 3: 98 },
                        text: 'a lad asks a lass; dad said all is well; a kid fell; ask dad for a fall; all dads ask kids; a fad is safe',
                        tutorialText: 'a lad asks a lass'
                    }
                ]
            },
            {
                id: 2,
                title: 'Train the Index Finger Keys',
                description: 'Sharpen your reaches for the most active fingers',
                subLessons: [
                    {
                        id: 's2.1',
                        title: 'Index key warm-up',
                        type: 'practice',
                        duration: 180,
                        targetKeys: ['r', 't', 'y', 'u', 'g', 'h', 'v', 'b', 'n', 'm'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'rt yu gh vb nm rt yu gh vb nm rt yu gh vb nm rt yu gh vb nm rt yu gh vb nm',
                        tutorialText: 'rt yu gh vb nm'
                    },
                    {
                        id: 's2.2',
                        title: 'Quick phrases: R T Y U',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['r', 't', 'y', 'u'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'try your trust; true trust; try true; trust your; try your; true trust; try true; trust your',
                        tutorialText: 'try your trust'
                    },
                    {
                        id: 's2.3',
                        title: 'Quick phrases: G H',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['g', 'h'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'high highly; high highly; highly high; high highly; highly high; high highly; highly high',
                        tutorialText: 'high highly'
                    },
                    {
                        id: 's2.4',
                        title: 'Quick phrases: V B N M',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['v', 'b', 'n', 'm'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'mvn bvn mvn bvn; mvn bvn mvn bvn; mvn bvn mvn bvn; mvn bvn mvn bvn; mvn bvn mvn bvn',
                        tutorialText: 'mvn bvn'
                    },
                    {
                        id: 's2.5',
                        title: 'Index speed drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['rtyughvbmn'],
                        minAccuracy: 92,
                        starThresholds: { 1: 94, 2: 96, 3: 98 },
                        text: 'the very big bug; the very big bug; the very big bug; the very big bug; the very big bug',
                        tutorialText: 'the very big bug'
                    }
                ]
            },
            {
                id: 3,
                title: 'Improve Middle Finger Reach',
                description: 'Enhance accuracy and speed for the longest reaching fingers',
                subLessons: [
                    {
                        id: 's3.1',
                        title: 'Middle key review',
                        type: 'practice',
                        duration: 180,
                        targetKeys: ['e', 'c', 'i', ','],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'ec i, ec i, ec i, ec i, ec i, ec i, ec i, ec i, ec i, ec i, ec i, ec i, ec i, ec i, ec i, ec i,',
                        tutorialText: 'ec i,'
                    },
                    {
                        id: 's3.2',
                        title: 'Phrases: E and I',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['e', 'i'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'ice ice; ice ice; ice ice; ice ice; ice ice; ice ice; ice ice; ice ice; ice ice; ice ice; ice ice',
                        tutorialText: 'ice ice'
                    },
                    {
                        id: 's3.3',
                        title: 'Phrases: C',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['c'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'clock clock; clock clock; clock clock; clock clock; clock clock; clock clock; clock clock',
                        tutorialText: 'clock clock'
                    },
                    {
                        id: 's3.4',
                        title: 'Middle speed drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['eci,'],
                        minAccuracy: 92,
                        starThresholds: { 1: 94, 2: 96, 3: 98 },
                        text: 'nice ice cake; nice ice cake; nice ice cake; nice ice cake; nice ice cake; nice ice cake',
                        tutorialText: 'nice ice cake'
                    },
                    {
                        id: 's3.5',
                        title: 'Extended middle drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['eci,'],
                        minAccuracy: 92,
                        starThresholds: { 1: 94, 2: 96, 3: 98 },
                        text: 'ice cold rice is nice; cake is nice with ice; nice ice cold cake; rice is nice for all; cold ice in a cake',
                        tutorialText: 'ice cold rice is nice'
                    }
                ]
            },
            {
                id: 4,
                title: 'Build Ring Finger Control',
                description: 'Strengthen the ring fingers for tricky reaches',
                subLessons: [
                    {
                        id: 's4.1',
                        title: 'Ring key review',
                        type: 'practice',
                        duration: 180,
                        targetKeys: ['w', 'x', 'o', '.'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'wx o. wx o. wx o. wx o. wx o. wx o. wx o. wx o. wx o. wx o. wx o. wx o. wx o. wx o.',
                        tutorialText: 'wx o.'
                    },
                    {
                        id: 's4.2',
                        title: 'Phrases: W and O',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['w', 'o'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'wow who; wow who; wow who; wow who; wow who; wow who; wow who; wow who; wow who',
                        tutorialText: 'wow who'
                    },
                    {
                        id: 's4.3',
                        title: 'Phrases: X',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['x'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'fox fox; fox fox; fox fox; fox fox; fox fox; fox fox; fox fox; fox fox; fox fox; fox fox',
                        tutorialText: 'fox fox'
                    },
                    {
                        id: 's4.4',
                        title: 'Ring speed drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['wxo.'],
                        minAccuracy: 92,
                        starThresholds: { 1: 94, 2: 96, 3: 98 },
                        text: 'low fox wow; low fox wow; low fox wow; low fox wow; low fox wow; low fox wow; low fox wow',
                        tutorialText: 'low fox wow'
                    },
                    {
                        id: 's4.5',
                        title: 'Extended ring drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['wxo.'],
                        minAccuracy: 92,
                        starThresholds: { 1: 94, 2: 96, 3: 98 },
                        text: 'low fox wow on the wall; who is on the wall; wow look at the fox; the fox is low on the wall',
                        tutorialText: 'low fox wow on the wall'
                    }
                ]
            },
            {
                id: 5,
                title: 'Master Little Finger Keys',
                description: 'Train your pinkies for high-speed accuracy',
                subLessons: [
                    {
                        id: 's5.1',
                        title: 'Pinky key review',
                        type: 'practice',
                        duration: 180,
                        targetKeys: ['q', 'z', 'p'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'qz p qz p qz p qz p qz p qz p qz p qz p qz p qz p qz p qz p qz p qz p qz p qz p',
                        tutorialText: 'qz p'
                    },
                    {
                        id: 's5.2',
                        title: 'Phrases: Q and P',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['q', 'p'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'quit play; quit play; quit play; quit play; quit play; quit play; quit play; quit play; quit play',
                        tutorialText: 'quit play'
                    },
                    {
                        id: 's5.3',
                        title: 'Phrases: Z',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['z'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'jazz jazz; jazz jazz; jazz jazz; jazz jazz; jazz jazz; jazz jazz; jazz jazz; jazz jazz; jazz jazz',
                        tutorialText: 'jazz jazz'
                    },
                    {
                        id: 's5.4',
                        title: 'Pinky speed drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['qzp'],
                        minAccuracy: 92,
                        starThresholds: { 1: 94, 2: 96, 3: 98 },
                        text: 'quit jazz play; quit jazz play; quit jazz play; quit jazz play; quit jazz play; quit jazz play',
                        tutorialText: 'quit jazz play'
                    },
                    {
                        id: 's5.5',
                        title: 'Pinky rhythm drill',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['qzp'],
                        minAccuracy: 92,
                        starThresholds: { 1: 94, 2: 96, 3: 98 },
                        text: 'quick pizza for the jazz player; quit the jazz player; jazz player quit the pizza',
                        tutorialText: 'quick pizza'
                    }
                ]
            },
            {
                id: 6,
                title: 'High-Frequency Word Training',
                description: 'Drill the most common English words for maximum efficiency',
                subLessons: [
                    {
                        id: 's6.1',
                        title: 'Top 50 common words',
                        type: 'practice',
                        duration: 180,
                        targetKeys: ['all'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'the be to of and a in that have i it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me',
                        tutorialText: 'the be to of'
                    },
                    {
                        id: 's6.2',
                        title: 'Everyday words',
                        type: 'practice',
                        duration: 180,
                        targetKeys: ['all'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'when make can like time no just him know take people into year your good some could them see other than then now look only come its over also back after use two how our work first well way even new want',
                        tutorialText: 'when make can'
                    },
                    {
                        id: 's6.3',
                        title: 'Sentence flow practice',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['all'],
                        minAccuracy: 95,
                        starThresholds: { 1: 96, 2: 98, 3: 99 },
                        text: 'the quick brown fox jumps over the lazy dog. it is what it is and it will be what it will be. you can make it if you really try hard enough.',
                        tutorialText: 'Sentence flow'
                    },
                    {
                        id: 's6.4',
                        title: 'Tricky spelling words',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['all'],
                        minAccuracy: 92,
                        starThresholds: { 1: 94, 2: 96, 3: 98 },
                        text: 'separate definitely believe receive occur accommodate achieve across acquire address argument business calendar committee comparison curiosity',
                        tutorialText: 'separate definitely'
                    },
                    {
                        id: 's6.5',
                        title: 'Final speed assessment',
                        type: 'practice',
                        duration: 600,
                        targetKeys: ['all'],
                        minAccuracy: 96,
                        starThresholds: { 1: 97, 2: 98, 3: 99 },
                        text: 'This is the final speed assessment for the Speed Building Course. You have mastered the fingers, the reaches, and the most common words in the English language. Your dedication to improving your typing speed is commendable. Keep this momentum going as you move into specialized tracks like the Developer Course. Congratulations on completing this challenging track!',
                        tutorialText: 'Final Speed Assessment'
                    },
                    {
                        id: 's6.6',
                        title: 'Speed Building Graduation',
                        type: 'completion_final',
                        duration: 0
                    }
                ]
            }
        ]
    },

    developer: {
        id: 'developer',
        name: 'Developer Course',
        description: 'Master coding-specific typing',
        totalLessons: 8,
        totalSubLessons: 43,
        lessons: [
            {
                id: 1,
                title: 'Brackets & Parentheses Mastery',
                description: 'Master the most common punctuation in programming',
                subLessons: [
                    {
                        id: 'd1.1',
                        title: 'Developer course overview',
                        type: 'info',
                        duration: 180,
                        content: `
                            <h2>💻 Welcome, Developer!</h2>
                            <p>This course is specifically designed for programmers. We won't focus on just words, but on the characters you use every day in code.</p>
                            <h3>What we'll master:</h3>
                            <ul>
                                <li>📦 <strong>Brackets:</strong> (), [], {}, <></li>
                                <li>✨ <strong>Special Symbols:</strong> _, -, =, +, *, /, &, |</li>
                                <li>📝 <strong>String Literals:</strong> ', ", \`</li>
                                <li>⚙️ <strong>Operators:</strong> ==, !=, &&, ||, =></li>
                                <li>🐍 <strong>Code Patterns:</strong> JS, Python, and HTML/CSS snippets</li>
                            </ul>
                            <p>Proper reach for these symbols is the secret to high-speed coding!</p>
                        `
                    },
                    {
                        id: 'd1.2',
                        title: 'Round brackets ( )',
                        type: 'practice',
                        duration: 180,
                        targetKeys: ['(', ')'],
                        minAccuracy: 90,
                        starThresholds: { 1: 92, 2: 95, 3: 98 },
                        text: '( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( )',
                        tutorialText: '( )'
                    },
                    {
                        id: 'd1.3',
                        title: 'Square brackets [ ]',
                        type: 'practice',
                        duration: 180,
                        targetKeys: ['[', ']'],
                        minAccuracy: 90,
                        starThresholds: { 1: 92, 2: 95, 3: 98 },
                        text: '[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]',
                        tutorialText: '[ ]'
                    },
                    {
                        id: 'd1.4',
                        title: 'Curly braces { }',
                        type: 'practice',
                        duration: 180,
                        targetKeys: ['{', '}'],
                        minAccuracy: 90,
                        starThresholds: { 1: 92, 2: 95, 3: 98 },
                        text: '{ } { } { } { } { } { } { } { } { } { } { } { } { } { } { } { } { } { } { } { }',
                        tutorialText: '{ }'
                    },
                    {
                        id: 'd1.5',
                        title: 'Angle brackets < >',
                        type: 'practice',
                        duration: 180,
                        targetKeys: ['<', '>'],
                        minAccuracy: 90,
                        starThresholds: { 1: 92, 2: 95, 3: 98 },
                        text: '< > < > < > < > < > < > < > < > < > < > < > < > < > < > < > < > < > < > < > < >',
                        tutorialText: '< >'
                    },
                    {
                        id: 'd1.6',
                        title: 'Mixed brackets combo',
                        type: 'practice',
                        duration: 300,
                        targetKeys: ['()[]{}<>'],
                        minAccuracy: 88,
                        starThresholds: { 1: 90, 2: 94, 3: 97 },
                        text: '() [] {} <> ( ) [ ] { } < > ([]) {<>} ({[]}) <()> [()] {()} <[]> [<{}>]',
                    },
                    {
                        id: 2,
                        title: 'Special Characters & Symbols',
                        description: 'Master the symbols that make logic work',
                        subLessons: [
                            {
                                id: 'd2.1',
                                title: 'Underscore _ and Dash -',
                                type: 'practice',
                                duration: 180,
                                targetKeys: ['_', '-'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '_ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ -',
                                tutorialText: '_ -'
                            },
                            {
                                id: 'd2.2',
                                title: 'Equals = and Plus +',
                                type: 'practice',
                                duration: 180,
                                targetKeys: ['=', '+'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '= + = + = + = + = + = + = + = + = + = + = + = + = + = + = + = + = + = +',
                                tutorialText: '= +'
                            },
                            {
                                id: 'd2.3',
                                title: 'Asterisk * and Slash /',
                                type: 'practice',
                                duration: 180,
                                targetKeys: ['*', '/'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '* / * / * / * / * / * / * / * / * / * / * / * / * / * / * / * / * / * /',
                                tutorialText: '* /'
                            },
                            {
                                id: 'd2.4',
                                title: 'Ampersand & and Pipe |',
                                type: 'practice',
                                duration: 180,
                                targetKeys: ['&', '|'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '& | & | & | & | & | & | & | & | & | & | & | & | & | & | & | & | & | & |',
                                tutorialText: '& |'
                            },
                            {
                                id: 'd2.5',
                                title: 'Dollar $ and Percent %',
                                type: 'practice',
                                duration: 180,
                                targetKeys: ['$', '%'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '$ % $ % $ % $ % $ % $ % $ % $ % $ % $ % $ % $ % $ % $ % $ % $ % $ % $ %',
                                tutorialText: '$ %'
                            },
                            {
                                id: 'd2.6',
                                title: 'Symbol combination drill',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['all-symbols'],
                                minAccuracy: 88,
                                starThresholds: { 1: 90, 2: 94, 3: 97 },
                                text: '_- _- += += */ */ &| &| $% $% _-+= */&| $%_- +=*/ &|$% _-*/+&$| %-=_+*/&|$%',
                                tutorialText: 'Symbol combo'
                            }
                        ]
                    },
                    {
                        id: 3,
                        title: 'Quotes & String Literals',
                        description: 'Master the syntax for strings and template literals',
                        subLessons: [
                            {
                                id: 'd3.1',
                                title: 'Single quotes \'',
                                type: 'practice',
                                duration: 180,
                                targetKeys: ["'"],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: "' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' '",
                                tutorialText: "'"
                            },
                            {
                                id: 'd3.2',
                                title: 'Double quotes "',
                                type: 'practice',
                                duration: 180,
                                targetKeys: ['"'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '" " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " "',
                                tutorialText: '"'
                            },
                            {
                                id: 'd3.3',
                                title: 'Backticks `',
                                type: 'practice',
                                duration: 180,
                                targetKeys: ['`'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` `',
                                tutorialText: '`'
                            },
                            {
                                id: 'd3.4',
                                title: 'String literal patterns',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ["'\"`"],
                                minAccuracy: 88,
                                starThresholds: { 1: 90, 2: 94, 3: 97 },
                                text: "'hello' \"world\" `template` 'it\'s' \"don't\" `val: ${x}` '123' \"abc\" `def` 'ghj' \"klm\"",
                                tutorialText: 'String patterns'
                            },
                            {
                                id: 'd3.5',
                                title: 'Template strings drill',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['`${}`'],
                                minAccuracy: 88,
                                starThresholds: { 1: 90, 2: 94, 3: 97 },
                                text: '`${name}` `${id}` `${1 + 1}` `${items.length}` `${user.email}` `${data[i]}`',
                                tutorialText: 'Template strings'
                            }
                        ]
                    },
                    {
                        id: 4,
                        title: 'Operators & Comparisons',
                        description: 'Drill the symbolic logic operators used in coding',
                        subLessons: [
                            {
                                id: 'd4.1',
                                title: 'Comparison operators',
                                type: 'practice',
                                duration: 180,
                                targetKeys: ['==', '=', '!', '<', '>'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '== === != !== <= >= < > == === != !== <= >= < > == === != !== <= >= < >',
                                tutorialText: '== === != !=='
                            },
                            {
                                id: 'd4.2',
                                title: 'Logical operators',
                                type: 'practice',
                                duration: 180,
                                targetKeys: ['&', '|', '!'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '&& || ! && || ! && || ! && || ! && || ! && || ! && || ! && || ! && || !',
                                tutorialText: '&& || !'
                            },
                            {
                                id: 'd4.3',
                                title: 'Arrow functions & dots',
                                type: 'practice',
                                duration: 180,
                                targetKeys: ['=', '>', '.'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '=> . => . => . => . => . => . => . => . => . => . => . => . => . => .',
                                tutorialText: '=> .'
                            },
                            {
                                id: 'd4.4',
                                title: 'Increment & Decrement',
                                type: 'practice',
                                duration: 180,
                                targetKeys: ['+', '-'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '++ -- += -= ++ -- += -= ++ -- += -= ++ -- += -= ++ -- += -= ++ -- += -=',
                                tutorialText: '++ -- += -='
                            },
                            {
                                id: 'd4.5',
                                title: 'Operator speed drill',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['all-operators'],
                                minAccuracy: 88,
                                starThresholds: { 1: 90, 2: 94, 3: 97 },
                                text: 'i++ count-- x += 1 y -= 1 a === b c != d x && y || z !valid (a > b) ? t : f',
                                tutorialText: 'Operator drill'
                            }
                        ]
                    },
                    {
                        id: 5,
                        title: 'JavaScript/TypeScript Patterns',
                        description: 'Common structural patterns in modern web development',
                        subLessons: [
                            {
                                id: 'd5.1',
                                title: 'Object literals',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['{', '}', ':'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '{ id: 1 } { name: "test" } { active: true } { val: null } { x: 0, y: 0 }',
                                tutorialText: 'Object literals'
                            },
                            {
                                id: 'd5.2',
                                title: 'Array patterns',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['[', ']', ','],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '[1, 2, 3] ["a", "b", "c"] [true, false] [[1], [2]] arr[0] list[i] items.push(x)',
                                tutorialText: 'Array patterns'
                            },
                            {
                                id: 'd5.3',
                                title: 'Function declarations',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['(', ')', '{', '}'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: 'function init() {} function main(args) {} const start = () => {} async exec()',
                                tutorialText: 'Functions'
                            },
                            {
                                id: 'd5.4',
                                title: 'Class basics',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['class', '{', '}'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: 'class User {} class Page extends Base {} constructor(props) {} super(props)',
                                tutorialText: 'Classes'
                            },
                            {
                                id: 'd5.5',
                                title: 'ES6 Modules',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['import', 'export', '{', '}'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: 'import { x } from "mod"; export const y = 1; export default App; import * as fs',
                                tutorialText: 'Modules'
                            }
                        ]
                    },
                    {
                        id: 6,
                        title: 'Python Code Patterns',
                        description: 'Unique Python syntax and common structural patterns',
                        subLessons: [
                            {
                                id: 'd6.1',
                                title: 'Indentation & Colons',
                                type: 'practice',
                                duration: 180,
                                targetKeys: [':'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: 'def func(): if True: for i in x: while True: try: except Exception: finally:',
                                tutorialText: 'Colons'
                            },
                            {
                                id: 'd6.2',
                                title: 'List comprehensions',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['[', ']', 'for', 'in'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '[x for x in list] [i.name for i in items if i.ok] [val for val in data]',
                                tutorialText: 'Comprehensions'
                            },
                            {
                                id: 'd6.3',
                                title: 'Dictionaries',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['{', '}', ':'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '{"id": 1} {"name": "python"} {"v": 3.9} dict["key"] data.get("val", 0)',
                                tutorialText: 'Dictionaries'
                            },
                            {
                                id: 'd6.4',
                                title: 'f-strings',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['f', '"', '{', '}'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: 'f"hello {name}" f"val: {v:.2f}" f"id: {user_id}" f"{items[0].title()}"',
                                tutorialText: 'f-strings'
                            },
                            {
                                id: 'd6.5',
                                title: 'Pythonic patterns drill',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['all-python'],
                                minAccuracy: 88,
                                starThresholds: { 1: 90, 2: 94, 3: 97 },
                                text: 'with open("f.txt") as f: data = f.read() lambda x: x*2 map(str, list(range(10)))',
                                tutorialText: 'Pythonic patterns'
                            }
                        ]

                    },
                    {
                        id: 7,
                        title: 'HTML/CSS Typing',
                        description: 'Master the tags, attributes, and styles for web development',
                        subLessons: [
                            {
                                id: 'd7.1',
                                title: 'HTML tags',
                                type: 'practice',
                                duration: 180,
                                targetKeys: ['<', '>', '/'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '<div> </div> <p> </p> <span> </span> <section> </section> <ul> <li> </li> </ul>',
                                tutorialText: 'HTML tags'
                            },
                            {
                                id: 'd7.2',
                                title: 'Attributes',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['=', '"'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: 'class="tm-btn" id="header" href="https://example.com" src="img.png" style="color:red"',
                                tutorialText: 'Attributes'
                            },
                            {
                                id: 'd7.3',
                                title: 'CSS selectors',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['.', '#', ':', '>', '+'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '.tm-btn-primary #main-nav div:hover p > span section + article aside .active',
                                tutorialText: 'CSS Selectors'
                            },
                            {
                                id: 'd7.4',
                                title: 'Style properties',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['{', '}', ';', ':'],
                                minAccuracy: 90,
                                starThresholds: { 1: 92, 2: 95, 3: 98 },
                                text: '{ display: flex; } { color: #333; } { border: 1px solid #ccc; } { margin: 10px; }',
                                tutorialText: 'CSS styles'
                            },
                            {
                                id: 'd7.5',
                                title: 'Layout patterns drill',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['all-html-css'],
                                minAccuracy: 88,
                                starThresholds: { 1: 90, 2: 94, 3: 97 },
                                text: '<div class="flex"> <span id="label">Text</span> </div> @media (max-width: 600px) {}',
                                tutorialText: 'HTML/CSS drill'
                            }
                        ]
                    },
                    {
                        id: 8,
                        title: 'Real Code Speed Challenge',
                        description: 'Final assessment: typing real code snippets at high speed',
                        subLessons: [
                            {
                                id: 'd8.1',
                                title: 'JS full function drill',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['all'],
                                minAccuracy: 92,
                                starThresholds: { 1: 94, 2: 96, 3: 98 },
                                text: 'async function fetchData(url) { try { const resp = await fetch(url); return await resp.json(); } catch (e) { console.error(e); } }',
                                tutorialText: 'JS function'
                            },
                            {
                                id: 'd8.2',
                                title: 'CSS component drill',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['all'],
                                minAccuracy: 92,
                                starThresholds: { 1: 94, 2: 96, 3: 98 },
                                text: '.tm-card { background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 1.5rem; }',
                                tutorialText: 'CSS component'
                            },
                            {
                                id: 'd8.3',
                                title: 'Python script drill',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['all'],
                                minAccuracy: 92,
                                starThresholds: { 1: 94, 2: 96, 3: 98 },
                                text: 'import requests\n\ndef main():\n    url = "https://api.github.com"\n    r = requests.get(url)\n    print(r.status_code)\n\nif __name__ == "__main__":\n    main()',
                                tutorialText: 'Python script'
                            },
                            {
                                id: 'd8.4',
                                title: 'React/JSX snippet drill',
                                type: 'practice',
                                duration: 300,
                                targetKeys: ['all'],
                                minAccuracy: 92,
                                starThresholds: { 1: 94, 2: 96, 3: 98 },
                                text: 'const Item = ({ name, active }) => (\n  <div className={active ? "active" : ""}>\n    <h3>{name}</h3>\n  </div>\n);',
                                tutorialText: 'React/JSX'
                            },
                            {
                                id: 'd8.5',
                                title: 'Final Developer Assessment',
                                type: 'practice',
                                duration: 600,
                                targetKeys: ['all'],
                                minAccuracy: 95,
                                starThresholds: { 1: 96, 2: 97, 3: 98 },
                                text: 'This is the final challenge for the Developer Course. You have mastered brackets, symbols, quotes, operators, and common patterns in JavaScript, Python, and CSS. Typing code requires precision and rhythm. You have proven that you can handle the most complex characters without looking at your keyboard. Keep practicing to maintain your elite coding speed. Congratulations, Developer!',
                                tutorialText: 'Developer Assessment'
                            },
                            {
                                id: 'd8.6',
                                title: 'Developer Graduation',
                                type: 'completion_final',
                                duration: 0
                            }
                        ]
                    }
                ]
            }

        ]
    }


};

// Expose to window
window.COURSES = COURSES;
