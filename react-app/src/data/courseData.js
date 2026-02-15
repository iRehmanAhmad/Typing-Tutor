export const COURSES = {
    basic: {
        id: 'basic',
        name: 'Basic Typing Course',
        description: 'Master touch typing with our comprehensive 12-lesson protocol.',
        totalLessons: 12,
        totalSubLessons: 72,
        lessons: [
            {
                id: 1,
                title: 'Home Row Essentials',
                description: 'Build the foundation of muscle memory.',
                subLessons: [
                    { id: '1.1', title: 'Typing posture & basics', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">The Foundation of Speed</h2><p class="mb-4">Sit up straight, feet flat, and curve your fingers over the home row. Your index fingers belong on <strong>F</strong> and <strong>J</strong>.</p><div class="bg-accent/10 p-4 rounded-xl border border-accent/20 mb-4"><h3 class="font-bold text-accent mb-2">Tactical Command:</h3><p>Feel for the raised bumps on F and J. These are your <strong>anchors</strong> in the dark.</p></div>' },
                    { id: '1.2', title: 'New keys: Home row set', type: 'practice', duration: 300, targetKeys: ['f', 'j'], text: 'f j f j ff jj ff jj fff jjj fff jjj fj fj fjfj jfjf ffff jjjj fj f j ff jj jf jf', tutorialText: 'f f f j j j fj fj fj' },
                    { id: '1.3', title: 'Reading performance stats', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Neural Analytics</h2><p class="mb-4">WPM measures your velocity. Accuracy measures your precision. Aim for <strong>98% accuracy</strong> before pushing for speed.</p>' },
                    { id: '1.4', title: 'Home row key practice', type: 'practice', duration: 300, targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'], text: 'asdf jkl; asdf jkl; fdsa ;lkj asdf jkl; fdsajkl; a; s l d k f j a;sl d k f j', tutorialText: 'asdf jkl; asdf jkl;' },
                    { id: '1.5', title: 'Tip: Online typing checkups', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Tactical Tip</h2><p>Consistency is key. Spend 15 minutes a day instead of 2 hours once a week. Muscle memory thrives on repetition.</p>' },
                    { id: '1.6', title: 'Home row word practice', type: 'practice', duration: 300, text: 'as dad add fall flask salad glad glass falls dads adds ask salad salsa slack', minAccuracy: 95 },
                    { id: '1.7', title: 'Short paragraph practice', type: 'practice', duration: 300, text: 'a lad had a salad. a glad dad had a flask. fall as a glass falls. dad adds salsa.' }
                ]
            },
            {
                id: 2,
                title: 'Introducing E and I',
                description: 'Reach up to the middle row keys.',
                subLessons: [
                    { id: '2.1', title: 'New keys: E and I', type: 'practice', duration: 300, targetKeys: ['e', 'i'], text: 'e i e i ee ii ee ii eee iii eee iii fei iej fei iej iei eie i e i e ii ee', tutorialText: 'eee iii eee iii' },
                    { id: '2.2', title: 'Smart practice timing', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">The Golden Ratio</h2><p>Practice for 20 minutes, then rest your eyes. Your brain consolidates muscle memory during these breaks.</p>' },
                    { id: '2.3', title: 'Word building drill', type: 'practice', duration: 300, text: 'fee die lid lee kid sea side ideal filled fields flies dies lies ice idea' },
                    { id: '2.4', title: 'Sentence flow practice', type: 'practice', duration: 300, text: 'a kid had a side. the ideal idea failed. she filled the fields. he died as he lied.' },
                    { id: '2.5', title: 'Tip: Speed & accuracy tracker', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Performance Tracking</h2><p>Watch your stats view. A steady accuracy line means you are ready to accelerate.</p>' },
                    { id: '2.6', title: 'Paragraph fluency drill', type: 'practice', duration: 300, text: 'the ideal lid failed to fill the ice. a side field was filled as he lied. he filled a glass side idea.' }
                ]
            },
            {
                id: 3,
                title: 'Adding R and U',
                description: 'Mastering the top row index fingers.',
                subLessons: [
                    { id: '3.1', title: 'New keys: R and U', type: 'practice', duration: 300, targetKeys: ['r', 'u'], text: 'r u r u rr uu rr uu rrr uuu rrr uuu fur jur rur uru rur uru ru ru rrr uuu', tutorialText: 'rrr uuu rrr uuu' },
                    { id: '3.2', title: 'Word speed drill', type: 'practice', duration: 300, text: 'fur rug rude fire rule true user read dear red used sure rise rider' },
                    { id: '3.3', title: 'Comfort and hand positioning', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Ergonomic Intel</h2><p>Keep your wrists floating or slightly resting. Never bury them in the desk. This allows for fluid movement to R and U.</p>' },
                    { id: '3.4', title: 'Sentence rhythm drill', type: 'practice', duration: 300, text: 'the ruler used a fire. a true rug rose. she used her user rule. red dear rise sure.' },
                    { id: '3.5', title: 'Paragraph accuracy drill', type: 'practice', duration: 300, text: 'a rude rider rose as a true fire user used a rug. the red ruler said the rule was sure. rise if you are sure.' },
                    { id: '3.6', title: 'Extended text practice', type: 'practice', duration: 300, text: 'read the rule and rise. the red fire user had a rude rug. sure as a true dear ruler, he rose and read.' },
                    { id: '3.7', title: 'Tip: Build a daily routine', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-2">Routine Check</h2><p>Type for 10 minutes every morning. It wakes up your neural pathways.</p>' }
                ]
            },
            {
                id: 4,
                title: 'Adding T and O',
                description: 'Expanding top row reaches.',
                subLessons: [
                    { id: '4.1', title: 'New keys: T and O', type: 'practice', duration: 300, targetKeys: ['t', 'o'], text: 't o t o tt oo tt oo ttt ooo ttt ooo tot oto tot oto to to tt oo ttt ooo', tutorialText: 'ttt ooo ttt ooo' },
                    { id: '4.2', title: 'Word repetition drill', type: 'practice', duration: 300, text: 'too toe rot dot lot pot top hot tot oat root foot door food mood' },
                    { id: '4.3', title: 'Sentence speed practice', type: 'practice', duration: 300, text: 'the top oat root was hot. dot the lot too pot. a foot door had food mood.' },
                    { id: '4.4', title: 'Tip: Tracking improvement', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Milestone Intel</h2><p>Hitting 30 WPM? You are now faster than the average hunt-and-peck typist. Keep going.</p>' },
                    { id: '4.5', title: 'Paragraph typing drill', type: 'practice', duration: 300, text: 'too pot hot tot. foot boot root door. oat boat goat coat. mood food wood good.' },
                    { id: '4.6', title: 'Long text drill', type: 'practice', duration: 300, text: 'the hot tot at the top of the root boat had an oat. a good food mood on the wood door was noted too.' }
                ]
            },
            {
                id: 5,
                title: 'Capital Letters & Full Stop',
                description: 'Grammar and sentence structure.',
                subLessons: [
                    { id: '5.1', title: 'New key: Shift control', type: 'practice', duration: 300, text: 'A S D F J K L E I R U T O', tutorialText: 'Hold Shift with opposite hand!' },
                    { id: '5.2', title: 'Capital sentence practice', type: 'practice', duration: 300, text: 'The Red Rose. A True Fire. Eat The Oat. Out Of Order.' },
                    { id: '5.3', title: 'New key: Period (.)', type: 'practice', duration: 300, targetKeys: ['.'], text: 'A. S. D. F. J. K. I. O. T. R. U.', tutorialText: 'The period is below L' },
                    { id: '5.4', title: 'Punctuation sentence drill', type: 'practice', duration: 300, text: 'The door opened. She sat down. It was hot. Red is cool.' },
                    { id: '5.5', title: 'Paragraph with capitals', type: 'practice', duration: 300, text: 'Trust the process. It is a long road. Speed will come later. Accuracy first always.' },
                    { id: '5.6', title: 'Text fluency drill', type: 'practice', duration: 300, text: 'I saw the red fox. It sat on a log. The sun was hot. Life is good today.' }
                ]
            },
            {
                id: 6,
                title: 'C Key & Comma Practice',
                description: 'Bottom row reaches.',
                subLessons: [
                    { id: '6.1', title: 'New keys: C and comma (,)', type: 'practice', duration: 300, targetKeys: ['c', ','], text: 'c , c , cc ,, cc ,, ccc ,,, ccc ,,, cur ,,, cur ,,, c c ,, cc ,, ccc ,,,', tutorialText: 'ccc ,,, ccc ,,,' },
                    { id: '6.2', title: 'Word drill with new keys', type: 'practice', duration: 300, text: 'cat, car, ice, rice, coat, cold, card, fact, case, face, nice, lice' },
                    { id: '6.3', title: 'Sentence punctuation practice', type: 'practice', duration: 300, text: 'I see a car, a cat, and a coat. It is cold, rice is nice.' },
                    { id: '6.4', title: 'Paragraph writing drill', type: 'practice', duration: 300, text: 'Look at the car, it is nice. Rice and ice are cold, but fact is card.' },
                    { id: '6.5', title: 'Extended typing drill', type: 'practice', duration: 300, text: 'Could you see the cat, the car, or the coat? Cases are clear, faces are nice.' }
                ]
            },
            {
                id: 7,
                title: 'G, H & Apostrophe',
                description: 'Index finger stretches.',
                subLessons: [
                    { id: '7.1', title: 'New keys: G and H', type: 'practice', duration: 300, targetKeys: ['g', 'h'], text: 'g h g h gg hh gg hh ggg hhh ggg hhh ghi hgh ghi hgh g h gh gh ggg hhh', tutorialText: 'ggg hhh ggg hhh' },
                    { id: '7.2', title: 'Word control drill', type: 'practice', duration: 300, text: 'gho hog hug high hill hall gold good glad great green ghost growth' },
                    { id: '7.3', title: 'New key: Apostrophe (\')', type: 'practice', duration: 300, targetKeys: ['\''], text: 'it\'s that\'s high\'s gold\'s hog\'s hill\'s ghost\'s growth\'s car\'s cat\'s', tutorialText: 'The apostrophe is next to ;' },
                    { id: '7.4', title: 'Sentence contraction practice', type: 'practice', duration: 300, text: 'It\'s a good hill. That\'s high gold. He\'s a great ghost.' },
                    { id: '7.5', title: 'Paragraph fluency practice', type: 'practice', duration: 300, text: 'He\'s high on the hill. It\'s gold and green. That\'s a great growth hog.' },
                    { id: '7.6', title: 'Full text drill', type: 'practice', duration: 300, text: 'The gold\'s high, it\'s great growth. Ghos are high hall hogs. Glad hall gold.' }
                ]
            },
            {
                id: 8,
                title: 'V, N & Question Mark',
                description: 'Expanding the bottom row.',
                subLessons: [
                    { id: '8.1', title: 'New keys: V and N', type: 'practice', duration: 300, targetKeys: ['v', 'n'], text: 'v n v n vv nn vv nn vvv nnn vvv nnn vin niv vin niv v n vn vn vvv nnn', tutorialText: 'vvv nnn vvv nnn' },
                    { id: '8.2', title: 'Word practice drill', type: 'practice', duration: 300, text: 'van vine view voice none nine near name night note nerve never' },
                    { id: '8.3', title: 'New key: Question mark (?)', type: 'practice', duration: 300, text: 'Who? What? When? How? Van? Vine? View? Night? Note? Near?' },
                    { id: '8.4', title: 'Question sentence practice', type: 'practice', duration: 300, text: 'What is your name? When is the night? Who has the vine view?' },
                    { id: '8.5', title: 'Paragraph typing drill', type: 'practice', duration: 300, text: 'None had a voice. Never the night note. Nerve is nice? Nine in vine.' },
                    { id: '8.6', title: 'Long text practice', type: 'practice', duration: 300, text: 'What note is near? Never a voice view in night. None had name?' }
                ]
            },
            {
                id: 9,
                title: 'W and M Keys',
                description: 'Final reaches: Left ring and right index.',
                subLessons: [
                    { id: '9.1', title: 'New keys: W and M', type: 'practice', duration: 300, targetKeys: ['w', 'm'], text: 'w m w m ww mm ww mm www mmm www mmm wim miw wim miw w m wm wm www mmm', tutorialText: 'www mmm www mmm' },
                    { id: '9.2', title: 'Word fluency drill', type: 'practice', duration: 300, text: 'win war wet way wood warm moon more man mind main mine move' },
                    { id: '9.3', title: 'Sentence smoothness drill', type: 'practice', duration: 300, text: 'The wood was wet. More men move in way. My Mind is warm.' },
                    { id: '9.4', title: 'Paragraph accuracy practice', type: 'practice', duration: 300, text: 'More men win war. Wet wood way move. Moon mind main mine more.' },
                    { id: '9.5', title: 'Extended text drill', type: 'practice', duration: 300, text: 'Win the war in way. Wet wood move main. My mind had more man.' }
                ]
            },
            {
                id: 10,
                title: 'Q and P Keys',
                description: 'Pinky finger top row stretches.',
                subLessons: [
                    { id: '10.1', title: 'New keys: Q and P', type: 'practice', duration: 300, targetKeys: ['q', 'p'], text: 'q p q p qq pp qq pp qqq ppp qqq ppp qip piq qip piq q p qp qp qqq ppp', tutorialText: 'qqq ppp qqq ppp' },
                    { id: '10.2', title: 'Word speed practice', type: 'practice', duration: 300, text: 'quit quick quiet queen part pack past page plan play plus' },
                    { id: '10.3', title: 'Sentence pacing drill', type: 'practice', duration: 300, text: 'Quick part plan. Quiet queen play. Plus pack past page quit.' },
                    { id: '10.4', title: 'Paragraph typing practice', type: 'practice', duration: 300, text: 'Part plan plus pack. Quick queen quit quiet. Play past page plan.' },
                    { id: '10.5', title: 'Long text fluency drill', type: 'practice', duration: 300, text: 'Quit quiet queen quick. Part plus plan pack. Past page play plus part.' }
                ]
            },
            {
                id: 11,
                title: 'B and Y Keys',
                description: 'Inner finger stretches.',
                subLessons: [
                    { id: '11.1', title: 'New keys: B and Y', type: 'practice', duration: 300, targetKeys: ['b', 'y'], text: 'b y b y bb yy bb yy bbb yyy bbb yyy biy yib biy yib b y by by bbb yyy', tutorialText: 'bbb yyy bbb yyy' },
                    { id: '11.2', title: 'Word accuracy drill', type: 'practice', duration: 300, text: 'boy by be but blue big black back body book bank better busy' },
                    { id: '11.3', title: 'Sentence flow practice', type: 'practice', duration: 300, text: 'Big black bank book. Busy body better be. Blue boy by bank.' },
                    { id: '11.4', title: 'Paragraph building drill', type: 'practice', duration: 300, text: 'Busy black body book. Big bank better be. Blue boy by back but.' },
                    { id: '11.5', title: 'Extended typing drill', type: 'practice', duration: 300, text: 'Black bank book big. Busy body better back. Blue boy but bank by.' }
                ]
            },
            {
                id: 12,
                title: 'Z and X Keys (Final Stage)',
                description: 'Mastering the full alphabet.',
                subLessons: [
                    { id: '12.1', title: 'New keys: Z and X', type: 'practice', duration: 300, targetKeys: ['z', 'x'], text: 'z x z x zz xx zz xx zzz xxx zzz xxx zix xiz zix xiz z x zx zx zzz xxx', tutorialText: 'zzz xxx zzz xxx' },
                    { id: '12.2', title: 'Word mastery drill', type: 'practice', duration: 300, text: 'zip zoo zero zone size box fix six tax next text' },
                    { id: '12.3', title: 'Sentence fluency practice', type: 'practice', duration: 300, text: 'Six big boxes. Zero tax next. Fix text size zoo. Zip text box.' },
                    { id: '12.4', title: 'Paragraph speed drill', type: 'practice', duration: 300, text: 'Zero size box fix. Six next text tax. Zip zoo box size fix.' },
                    { id: '12.5', title: 'Final text challenge', type: 'practice', duration: 300, text: 'The quick brown fox jumps over a lazy dog. This sentence uses every letter. Master it now.' },
                    { id: '12.6', title: 'Course completion summary', type: 'info', duration: 180, content: '<h2 class="text-3xl font-bold mb-4">Mission Accomplished</h2><p class="mb-4">You have mastered the basic alphabet. Your neural-motor interface is now calibrated for high-velocity output.</p><h3 class="text-xl font-bold mb-2">Next Protocol:</h3><p>Proceed to the Speed Booster for elite 100+ WPM drills.</p>' }
                ]
            }
        ]
    },
    speed: {
        id: 'speed',
        name: 'Speed Booster',
        description: 'Elite drills for 100+ WPM velocity, focusing on high-frequency transitions and burst speed.',
        totalLessons: 6,
        totalSubLessons: 32,
        lessons: [
            {
                id: 1,
                title: 'Strengthen the Home Row',
                description: 'Refine your anchors for maximum velocity.',
                subLessons: [
                    { id: '1.1', title: 'Course overview', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Speed Protocol v1</h2><p class="mb-4">This course is designed to push you past the 60 WPM plateau. We focus on <strong>finger independent bursts</strong> and <strong>high-frequency bigrams</strong>.</p>' },
                    { id: '1.2', title: 'Home row refresher', type: 'practice', duration: 300, targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'], text: 'asdf jkl; asdf jkl; fdsajkl; a;sldkfj f j d k s l a ;' },
                    { id: '1.3', title: 'Speed phrases with A F J', type: 'practice', duration: 300, text: 'a fad. falling fast. a glad lad. alfalfa salad. jaded dad. a glass flask.' },
                    { id: '1.4', title: 'Speed phrases with D K', type: 'practice', duration: 300, text: 'dark desk. duck kind. kissed disk. asked kid. ducked dock. kind kid.' },
                    { id: '1.5', title: 'Speed phrases with S L', type: 'practice', duration: 300, text: 'slow sail. small shell. salad leaf. salsa loss. less glass. sells silk.' },
                    { id: '1.6', title: 'Full-keyboard text practice', type: 'practice', duration: 300, text: 'The home row is the base. Speed starts with small steps. Focus on the flow of keys.' }
                ]
            },
            {
                id: 2,
                title: 'Train the Index Finger Keys',
                description: 'Master the most active fingers: G, H, R, T, Y, U, V, B, N, M.',
                subLessons: [
                    { id: '2.1', title: 'Index key warm-up', type: 'practice', duration: 300, targetKeys: ['g', 'h', 'r', 't', 'y', 'u', 'v', 'b', 'n', 'm'], text: 'rt yu gh vb nm rt yu gh vb nm rtyu ghvbnm rtyu ghvbnm' },
                    { id: '2.2', title: 'Quick phrases with R T Y U', type: 'practice', duration: 300, text: 'try your turn. truly rusty. trust your tutor. thirty truly. berry turn.' },
                    { id: '2.3', title: 'Quick phrases with G H', type: 'practice', duration: 300, text: 'high high. great growth. ghost guest. glad girl. rough high. huge high.' },
                    { id: '2.4', title: 'Quick phrases with V B N M', type: 'practice', duration: 300, text: 'very big move. blue moon. none better. brave boy. never mind. main move.' },
                    { id: '2.5', title: 'Full-keyboard speed drill', type: 'practice', duration: 300, text: 'Greater velocity requires index finger agility. Move from G to H and R to T with precision and speed.' }
                ]
            },
            {
                id: 3,
                title: 'Improve Middle Finger Reach',
                description: 'Mastering E, I, C, and the comma.',
                subLessons: [
                    { id: '3.1', title: 'Review E C I ,', type: 'practice', duration: 300, targetKeys: ['e', 'c', 'i', ','], text: 'eee iii ccc ,,, eiei cici ,,, eiee icii c e i , c e i ,' },
                    { id: '3.2', title: 'Practice phrases using E and I', type: 'practice', duration: 300, text: 'ice idea. ideal ice. indeed nice. elite ice. fine fire. idle time.' },
                    { id: '3.3', title: 'Practice phrases using C', type: 'practice', duration: 300, text: 'cold car. clear case. cool cat. nice cake. back card. fact check.' },
                    { id: '3.4', title: 'Full-paragraph typing drill', type: 'practice', duration: 300, text: 'Certain colors are cool, while others feel warm. Ice is cold, and rice is nice. It is a fact that cakes are good.' },
                    { id: '3.5', title: 'Extended text speed drill', type: 'practice', duration: 300, text: 'Consistency in every keystroke creates speed. Middle finger reaches are vital for common words like since, price, and elite.' }
                ]
            },
            {
                id: 4,
                title: 'Build Ring Finger Control',
                description: 'Mastering W, X, O, and the period.',
                subLessons: [
                    { id: '4.1', title: 'Review W X O .', type: 'practice', duration: 300, targetKeys: ['w', 'x', 'o', '.'], text: 'www xxx ooo ... wowo xoxo .... w x o . w x o .' },
                    { id: '4.2', title: 'Speed phrases with W and O', type: 'practice', duration: 300, text: 'wonder world. wood work. slow blow. snow show. work hard. now how.' },
                    { id: '4.3', title: 'Speed phrases with X', type: 'practice', duration: 300, text: 'next box. six fix. tax axle. extra text. expert fix. flex next.' },
                    { id: '4.4', title: 'Paragraph fluency drill', type: 'practice', duration: 300, text: 'Work on the world. Next six boxes. Extra wood work. How now brown cow. Text expert fix.' },
                    { id: '4.5', title: 'Long text practice', type: 'practice', duration: 300, text: 'Often we overwork our ring fingers by stiffening them. Relaxed movement to O and W brings fluid speed to your workflow.' }
                ]
            },
            {
                id: 5,
                title: 'Master Little Finger Keys',
                description: 'Strengthen Q, Z, and P.',
                subLessons: [
                    { id: '5.1', title: 'Review Q Z P', type: 'practice', duration: 300, targetKeys: ['q', 'z', 'p'], text: 'qqq zzz ppp qz pz qp zp qq zz pp q z p q z p' },
                    { id: '5.2', title: 'Fast phrases with Q and P', type: 'practice', duration: 300, text: 'quit quick. part pink. queen pace. plus plan. pack prize. pure pace.' },
                    { id: '5.3', title: 'Fast phrases with Z', type: 'practice', duration: 300, text: 'zero size. maze zone. lazy zoo. zip pizza. blaze size. dizzy buzz.' },
                    { id: '5.4', title: 'Paragraph accuracy drill', type: 'practice', duration: 300, text: 'Quick pink prize pack. Zero size pizza zone. Lazy queen quit pace. Plus plan pure pace.' },
                    { id: '5.5', title: 'Full text rhythm drill', type: 'practice', duration: 300, text: 'The pinky is often the weakest link. By mastering Q, Z, and P, you eliminate hesitation in your typing rhythm.' }
                ]
            },
            {
                id: 6,
                title: 'High-Frequency Word Training',
                description: 'Master the top 50 words and common spellings.',
                subLessons: [
                    { id: '6.1', title: 'Top 50 common words', type: 'practice', duration: 300, text: 'the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which' },
                    { id: '6.2', title: 'More everyday words', type: 'practice', duration: 300, text: 'time people year way well first very after life back across through against around before between during' },
                    { id: '6.3', title: 'Sentence flow practice', type: 'practice', duration: 300, text: 'What would you say about the first year of life? We have to go back through the way we came.' },
                    { id: '6.4', title: 'Tricky spelling words', type: 'practice', duration: 300, text: 'receive separate accommodate definite rhythm parallel necessary across embarrass achieve' },
                    { id: '6.5', title: 'Final speed text drill', type: 'practice', duration: 300, text: 'Speed is the result of thousands of small movements executed with perfect accuracy. You have now completed the Speed Booster protocol. Victory is yours.' }
                ]
            }
        ]
    },
    dev: {
        id: 'dev',
        name: 'Developer Typing Mastery',
        description: 'Elite training for technical precision. Master symbols, syntax, and logic blocks.',
        totalLessons: 12,
        totalSubLessons: 68,
        lessons: [
            {
                id: 1,
                title: 'Developer Home Row Foundation',
                description: 'Refining the home row for technical terminology.',
                subLessons: [
                    { id: '1.1', title: 'Developer typing basics', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Neural-Motor Syntax</h2><p class="mb-4">Standard typing uses dictionary words. Developer typing uses <strong>logic chunks</strong>. Your fingers must learn the cadence of code.</p>' },
                    { id: '1.2', title: 'Home row warm-up', type: 'practice', duration: 300, targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'], text: 'asdf jkl; asdf jkl; fdsajkl; a;sldkfj f j d k s l a ;' },
                    { id: '1.3', title: 'Key accuracy drill', type: 'practice', duration: 300, text: 'aaaa ssss dddd ffff jjjj kkkk llll ;;;; afjk dsl; afjk dsl;' },
                    { id: '1.4', title: 'Common dev words drill', type: 'practice', duration: 300, text: 'data code file stack null void true false main list array map set' },
                    { id: '1.5', title: 'Tip: Accuracy beats speed', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Tactical Tip</h2><p>In code, a single wrong symbol can break a system. <strong>99% accuracy</strong> is the only acceptable baseline.</p>' },
                    { id: '1.6', title: 'Paragraph drill (tech English)', type: 'practice', duration: 300, text: 'The array stores data in a stack. The main file nulls the list map set objects.' }
                ]
            },
            {
                id: 2,
                title: 'camelCase and Variables',
                description: 'Mastering the rhythm of modern naming conventions.',
                subLessons: [
                    { id: '2.1', title: 'New skill: camelCase typing', type: 'practice', duration: 300, text: 'userName isLoggedIn fetchData getStatus updateState renderView' },
                    { id: '2.2', title: 'Variable name drills', type: 'practice', duration: 300, text: 'const user = { name: "Antigravity" }; let isActive = true; var count = 0;' },
                    { id: '2.3', title: 'Short code words', type: 'practice', duration: 300, text: 'async await fetch axios props state theme auth login home logout' },
                    { id: '2.4', title: 'Sentence drill: dev naming', type: 'practice', duration: 300, text: 'The fetchData function set the isLoggedIn state to true and updated user.' },
                    { id: '2.5', title: 'Tip: Consistent rhythm', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-2">Steady State</h2><p>Don\'t rush the capital letter. Keep a steady beat to avoid shift-key errors.</p>' },
                    { id: '2.6', title: 'Text drill: clean identifiers', type: 'practice', duration: 300, text: 'const [status, setStatus] = useState("idle"); const handleAuth = (user) => { login(user); };' }
                ]
            },
            {
                id: 3,
                title: 'Numbers + Basic Operators',
                description: 'Navigating the top row and logic operators.',
                subLessons: [
                    { id: '3.1', title: 'Number row practice', type: 'practice', duration: 300, targetKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], text: '123 456 789 0 // 11 22 33 44 55 66 77 88 99 00 10101' },
                    { id: '3.2', title: 'Math operators: + - * /', type: 'practice', duration: 300, text: 'x + y; a - b; i * j; k / l; result = 5 * 10 / 2 + 100;' },
                    { id: '3.3', title: 'Assignment patterns: = == ===', type: 'practice', duration: 300, text: 'x = 10; x == "10"; x === 10; status = "active"; count += 1;' },
                    { id: '3.4', title: 'Expression drills', type: 'practice', duration: 300, text: 'if (x === 10) { y = count * 2; } else { y = count / 2; }' },
                    { id: '3.5', title: 'Tip: Avoid symbol mistakes', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Logic Safety</h2><p>Confusion between = and === is the most common logic bug. Type them with intention.</p>' },
                    { id: '3.6', title: 'Text drill: simple calculations', type: 'practice', duration: 300, text: 'const total = price * quantity; const discount = total - (total / 10); score = 0;' }
                ]
            },
            {
                id: 4,
                title: 'Brackets and Parentheses Mastery',
                description: 'The skeleton of structural code.',
                subLessons: [
                    { id: '4.1', title: 'New keys: ( ) { } [ ]', type: 'practice', duration: 300, targetKeys: ['(', ')', '{', '}', '[', ']'], text: '() {} [] ({[]}) () {} [] ( ) { } [ ] ( ( ) ) { { } } [ [ ] ]' },
                    { id: '4.2', title: 'Pair typing drills', type: 'practice', duration: 300, text: 'function() { } [0] { key: value } (item) => { return [item]; }' },
                    { id: '4.3', title: 'Function call patterns', type: 'practice', duration: 300, text: 'map(x => x * 2); filter(id => id !== null); console.log(data);' },
                    { id: '4.4', title: 'Nested bracket practice', type: 'practice', duration: 300, text: 'if (user) { if (user.isActive) { return { status: [1, 2, 3] }; } }' },
                    { id: '4.5', title: 'Tip: Always close brackets', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Structural integrity</h2><p>Unclosed brackets lead to compilation errors. Master the rhythm of typing both at once if your IDE allows.</p>' },
                    { id: '4.6', title: 'Paragraph drill: code blocks', type: 'practice', duration: 300, text: 'const render = (data) => { return ( <div> { data.map(item => <p>{item}</p>) } </div> ); };' }
                ]
            },
            {
                id: 5,
                title: 'Quotes, Strings, and Escapes',
                description: 'Verbatim text and template literals.',
                subLessons: [
                    { id: '5.1', title: 'Typing quotes: " \' `', type: 'practice', duration: 300, targetKeys: ['"', '\'', '`'], text: '"double" \'single\' `backtick` " \' ` " \' ` " \' `' },
                    { id: '5.2', title: 'String drills', type: 'practice', duration: 300, text: 'const s1 = "hello"; const s2 = \'world\'; const msg = `Count: ${count}`;' },
                    { id: '5.3', title: 'Template literal practice', type: 'practice', duration: 300, text: '`Status: ${active ? "Live" : "Offline"}` `User: ${user.name}`' },
                    { id: '5.4', title: 'Escape characters \\n \\t', type: 'practice', duration: 300, text: 'console.log("Line 1\\nLine 2"); \\t indented text \\"quoted\\"' },
                    { id: '5.5', title: 'Tip: Strings are error-prone', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Data Safety</h2><p>Typing " when you meant ` is a common pitfall in modern JS. Look at the key before you hit it.</p>' },
                    { id: '5.6', title: 'Text drill: real JS strings', type: 'practice', duration: 300, text: 'const query = `SELECT * FROM users WHERE name = "${userName}";`;' }
                ]
            },
            {
                id: 6,
                title: 'Punctuation for Code',
                description: 'The fine details of technical structure.',
                subLessons: [
                    { id: '6.1', title: 'Semicolon ; and colon :', type: 'practice', duration: 300, targetKeys: [';', ':'], text: '; : ; : ;;; ::: ;;; ::: :; :; ;: ;: ; : ; : ; :' },
                    { id: '6.2', title: 'Comma and dot drills', type: 'practice', duration: 300, text: 'user.name, user.id, user.email, array.pop(), array.push(val);' },
                    { id: '6.3', title: 'Object access: user.name', type: 'practice', duration: 300, text: 'data.items[0].id; response.data.user.profile.avatar.url;' },
                    { id: '6.4', title: 'JSON typing drill', type: 'practice', duration: 300, text: '{ "name": "Antigravity", "level": 10, "isPro": true, "skills": [] }' },
                    { id: '6.5', title: 'Tip: Small symbols matter', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Detailed Intel</h2><p>A missing comma in an object or a dot in a path will break your code. Slow down for nested paths.</p>' },
                    { id: '6.6', title: 'Text drill: structured code', type: 'practice', duration: 300, text: 'const config = { api: "http://dev.io", timeout: 5000, headers: { auth: true } };' }
                ]
            },
            {
                id: 7,
                title: 'Core JavaScript Keywords',
                description: 'The foundation of logic and flow.',
                subLessons: [
                    { id: '7.1', title: 'JS keyword warm-up', type: 'practice', duration: 300, text: 'const let var function return if else switch case break final' },
                    { id: '7.2', title: 'if / else / return drills', type: 'practice', duration: 300, text: 'if (x) { return true; } else { return false; }' },
                    { id: '7.3', title: 'for / while loop typing', type: 'practice', duration: 300, text: 'for (let i = 0; i < n; i++) { while (active) { break; } }' },
                    { id: '7.4', title: 'Sentence drill: code logic', type: 'practice', duration: 300, text: 'const result = switch(val) { case 1: return "ok"; default: break; };' },
                    { id: '7.5', title: 'Tip: Don’t rush keywords', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Syntax Speed</h2><p>Focus on fluid movement. Keywords like "function" should be one continuous motion.</p>' },
                    { id: '7.6', title: 'Text drill: full JS snippet', type: 'practice', duration: 300, text: 'const handle = (e) => { if (e.key === "Enter") { return save(); } else { return null; } };' }
                ]
            },
            {
                id: 8,
                title: 'Functions and Arrow Syntax',
                description: 'Mastering modern declaration patterns.',
                subLessons: [
                    { id: '8.1', title: 'function vs arrow typing', type: 'practice', duration: 300, text: 'function solve() { } const solve = () => { };' },
                    { id: '8.2', title: 'Parameter drills', type: 'practice', duration: 300, text: '(a, b) => a + b; function calculate(price, tax, discount) { }' },
                    { id: '8.3', title: 'Callback typing', type: 'practice', duration: 300, text: 'onClick={() => setOpen(true)} .then(res => res.json()) .catch(err => log(err))' },
                    { id: '8.4', title: 'Real snippet drill', type: 'practice', duration: 300, text: 'const [data, setData] = useState([]); useEffect(() => { loadData(); }, []);' },
                    { id: '8.5', title: 'Tip: Clean indentation', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Tactical Indent</h2><p>Use Tab or Space consistently. Indentation is the heartbeat of readable code.</p>' },
                    { id: '8.6', title: 'Text drill: functional code', type: 'practice', duration: 300, text: 'const Header = ({ title }) => { return ( <header> <h1>{title}</h1> </header> ); };' }
                ]
            },
            {
                id: 9,
                title: 'HTML Developer Typing',
                description: 'Mastering angle brackets and attributes.',
                subLessons: [
                    { id: '9.1', title: 'Angle brackets < >', type: 'practice', duration: 300, targetKeys: ['<', '>'], text: '< > < > << >> << >> <tag> </tag> <html> </html> <div> </div>' },
                    { id: '9.2', title: 'Tag typing drills', type: 'practice', duration: 300, text: '<div> <span> <p> <a> <button> <input /> <img /> <ul> <li> <ol>' },
                    { id: '9.3', title: 'Attributes practice', type: 'practice', duration: 300, text: 'className="flex" id="root" src={img} alt="logo" type="submit"' },
                    { id: '9.4', title: 'Form and input drills', type: 'practice', duration: 300, text: '<form onSubmit={handle}> <input type="text" value={val} /> </form>' },
                    { id: '9.5', title: 'Tip: Closing tags accuracy', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">HTML Intel</h2><p>A missing / in a self-closing tag (<img />) can break certain renderers. Use the full pair sync.</p>' },
                    { id: '9.6', title: 'Text drill: full HTML component', type: 'practice', duration: 300, text: '<div className="container p-4"> <h2 className="text-xl">Hero</h2> <button>Click</button> </div>' }
                ]
            },
            {
                id: 10,
                title: 'CSS Developer Typing',
                description: 'Brackets, properties, and values.',
                subLessons: [
                    { id: '10.1', title: 'CSS syntax warm-up', type: 'practice', duration: 300, text: '.class { } #id { } tag { } .btn:hover { } @media { }' },
                    { id: '10.2', title: 'Property:value drills', type: 'practice', duration: 300, text: 'display: flex; color: #fff; background: red; margin: 0 auto;' },
                    { id: '10.3', title: 'Class selector practice', type: 'practice', duration: 300, text: '.p-4 { padding: 1rem; } .m-2 { margin: 0.5rem; } .text-xl { font-size: 1.25rem; }' },
                    { id: '10.4', title: 'Layout snippet drill', type: 'practice', duration: 300, text: '.card { width: 100%; border: 1px solid #ccc; border-radius: 8px; }' },
                    { id: '10.5', title: 'Tip: Speed with precision', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Style Accuracy</h2><p>Don\'t forget the semicolon at the end of each property. CSS is forgiving, but standards aren\'t.</p>' },
                    { id: '10.6', title: 'Text drill: full CSS block', type: 'practice', duration: 300, text: '.hero { display: flex; align-items: center; justify-content: center; height: 100vh; }' }
                ]
            },
            {
                id: 11,
                title: 'Git & Terminal Commands',
                description: 'Mastering the command line interface.',
                subLessons: [
                    { id: '11.1', title: 'Command typing warm-up', type: 'practice', duration: 300, text: 'cd .. ls -la pwd mkdir touch rm -rf mv cp cat tail head' },
                    { id: '11.2', title: 'git add / commit drills', type: 'practice', duration: 300, text: 'git init; git add .; git commit -m "feat: login"; git push origin main;' },
                    { id: '11.3', title: 'npm install drills', type: 'practice', duration: 300, text: 'npm install; npm start; npm run build; npm test; npx vite;' },
                    { id: '11.4', title: 'Common CLI patterns', type: 'practice', duration: 300, text: 'git checkout -b feature/auth; git pull upstream main; git merge dev;' },
                    { id: '11.5', title: 'Tip: Terminal confidence', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Command Flow</h2><p>Terminal commands are often typed once and executed. Precision is vital to avoid destructive actions.</p>' },
                    { id: '11.6', title: 'Text drill: real workflow commands', type: 'practice', duration: 300, text: 'git commit -am "fix: typing bug"; npm run dev; open http://localhost:3000;' }
                ]
            },
            {
                id: 12,
                title: 'Pro-Level Code Typing Challenge',
                description: 'Full stack mastery simulations.',
                subLessons: [
                    { id: '12.1', title: 'Full-stack snippet warm-up', type: 'practice', duration: 300, text: 'const app = express(); app.get("/", (req, res) => res.send("OK"));' },
                    { id: '12.2', title: 'React component typing', type: 'practice', duration: 300, text: 'export default function App() { const [s, setS] = useState(0); return <div onClick={() => setS(s+1)}>{s}</div>; }' },
                    { id: '12.3', title: 'API fetch typing', type: 'practice', duration: 300, text: 'const res = await fetch("/api"); const data = await res.json(); log(data);' },
                    { id: '12.4', title: 'Debug-style typing', type: 'practice', duration: 300, text: 'if (!data) throw new Error("NullData"); debugger; console.trace();' },
                    { id: '12.5', title: 'Final speed test', type: 'practice', duration: 300, text: 'Developer Mastery Course complete. You can now type code, symbols, and syntax with elite accuracy and speed.' },
                    { id: '12.6', title: 'Developer typing certification', type: 'info', duration: 180, content: '<h2 class="text-3xl font-bold mb-4">Pro Dev Status</h2><p class="mb-4">You have mastered the developer keyboard syntax. Your neural-motor interface is now fully compatible with modern IDE workflows.</p>' }
                ]
            }
        ]
    },
    pro: {
        id: 'pro',
        name: 'Professional Dictation',
        description: 'Legal & Medical transcription standards. 99% accuracy required.',
        totalLessons: 12,
        totalSubLessons: 72,
        lessons: [
            {
                id: 1,
                title: 'Dictation Typing Foundations',
                description: 'The golden rules of professional transcription.',
                subLessons: [
                    { id: '1.1', title: 'What is professional dictation?', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Verbatim vs. Clean</h2><p class="mb-4">Professional typing isn\'t just speed. It\'s about <strong>formatting protocols</strong>. You must know when to transcribe "uhm" and when to clean it up.</p>' },
                    { id: '1.2', title: 'Accuracy-first warm-up', type: 'practice', duration: 300, text: 'The quick brown fox jumps over the lazy dog. Accuracy is the soul of transcription. Speed is nothing without precision.' },
                    { id: '1.3', title: 'Sentence punctuation basics', type: 'practice', duration: 300, text: 'Hello, world. This is a sentence; this is another clause. Are you ready? "Yes," she said.' },
                    { id: '1.4', title: 'Capitalization rules', type: 'practice', duration: 300, text: 'The President of the United States. I live in New York City. The doctor said, "Take two pills."' },
                    { id: '1.5', title: 'Tip: Consistency matters', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Style Guides</h2><p>Always follow the style guide. If the guide says "Internet" with a capital I, you type it that way every time.</p>' },
                    { id: '1.6', title: 'Short paragraph practice', type: 'practice', duration: 300, text: 'Dr. Smith entered the room. He looked at the chart and sighed. "We need to run more tests," he told the nurse.' }
                ]
            },
            {
                id: 2,
                title: 'Numbers, Dates, and Times',
                description: 'Precision with data and figures.',
                subLessons: [
                    { id: '2.1', title: 'Typing numbers correctly', type: 'practice', duration: 300, text: 'one two three 10 11 12 100 1,000 10,000 1.5 2.75 33% 50 percent' },
                    { id: '2.2', title: 'Dates and appointments', type: 'practice', duration: 300, text: 'January 1, 2023. 01/01/23. 12-25-2024. Monday, March 15th. The appointment is on Friday.' },
                    { id: '2.3', title: 'Time formats (AM/PM, 24-hour)', type: 'practice', duration: 300, text: '10:00 AM. 2:30 PM. 14:00 hours. 0800 military time. Ten o\'clock in the morning.' },
                    { id: '2.4', title: 'Financial amounts ($, Rs.)', type: 'practice', duration: 300, text: '$10.50. $1,000.00. Rs. 500. €20. £100. Fifty dollars and ten cents. 200 USD.' },
                    { id: '2.5', title: 'Tip: Avoid number errors', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Critical Data</h2><p>A dosage error of 10mg vs 100mg is fatal. A financial error of $100 vs $1000 is costly. Double-check all digits.</p>' },
                    { id: '2.6', title: 'Mixed dictation drill', type: 'practice', duration: 300, text: 'Patient arrived at 2:00 PM on January 15, 2023. The bill was $150.50. He paid Rs. 5000 in cash.' }
                ]
            },
            {
                id: 3,
                title: 'Professional Formatting Standards',
                description: 'Structuring documents for readability.',
                subLessons: [
                    { id: '3.1', title: 'Clean paragraph structure', type: 'practice', duration: 300, text: 'Paragraphs should be concise. Start a new topic? Start a new paragraph. Indent the first line if required.' },
                    { id: '3.2', title: 'Line breaks and spacing', type: 'practice', duration: 300, text: 'Line one.\nLine two.\n\nNew section starts here with double spacing.' },
                    { id: '3.3', title: 'Headings and titles', type: 'practice', duration: 300, text: 'SUBJECT: MEETING MINUTES\nDATE: October 5th\n\nATTENDEES:\n- John Doe\n- Jane Smith' },
                    { id: '3.4', title: 'Bullet and list formatting', type: 'practice', duration: 300, text: '- Item one\n- Item two\n- Item three\n1. First priority\n2. Second priority' },
                    { id: '3.5', title: 'Tip: Readability is key', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">White Space</h2><p>Use white space effectively. A wall of text is unreadable. Break it up with logical formatting.</p>' },
                    { id: '3.6', title: 'Document-style typing drill', type: 'practice', duration: 300, text: 'MEMORANDUM\n\nTO: All Staff\nFROM: Management\n\nPlease submit your timesheets by 5:00 PM on Friday.' }
                ]
            },
            {
                id: 4,
                title: 'Medical Transcription Basics',
                description: 'Introduction to clinical terminology.',
                subLessons: [
                    { id: '4.1', title: 'Medical typing overview', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Language of Medicine</h2><p>Medical terms are derived from Latin and Greek. Accuracy is non-negotiable. Learn the roots.</p>' },
                    { id: '4.2', title: 'Common medical terms practice', type: 'practice', duration: 300, text: 'hypertension diabetes diagnosis prognosis symptoms fracture inflammation acute chronic benign malignant' },
                    { id: '4.3', title: 'Patient history sentence drills', type: 'practice', duration: 300, text: 'Patient complains of chest pain. History of smoking. No known drug allergies. Father had heart disease.' },
                    { id: '4.4', title: 'Medication + dosage formatting', type: 'practice', duration: 300, text: 'Amoxicillin 500mg PO TID. Aspirin 81mg daily. Metformin 1000mg BID. IV fluids started.' },
                    { id: '4.5', title: 'Tip: Never guess terms', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Don\'t Guess</h2><p>If you hear "hypo" vs "hyper", it changes the meaning entirely. If unsure, flag it.</p>' },
                    { id: '4.6', title: 'Clinical paragraph practice', type: 'practice', duration: 300, text: 'ASSESSMENT: Acute bronchitis. PLAN: Azithromycin 250mg x 5 days. Push fluids. Follow up if symptoms worsen.' }
                ]
            },
            {
                id: 5,
                title: 'Medical Reports & SOAP Notes',
                description: 'Structuring clinical documentation.',
                subLessons: [
                    { id: '5.1', title: 'Structured note typing', type: 'practice', duration: 300, text: 'S: Subjective\nO: Objective\nA: Assessment\nP: Plan' },
                    { id: '5.2', title: 'SOAP format drills', type: 'practice', duration: 300, text: 'S: Patient states sore throat X 3 days.\nO: Temp 101.5, throat red.\nA: Strep pharyngitis.\nP: Antibiotics.' },
                    { id: '5.3', title: 'Lab values and measurements', type: 'practice', duration: 300, text: 'WBC 12.5. Hgb 14.0. Glucose 110. BP 120/80. HR 72. RR 16. O2 sat 98% on room air.' },
                    { id: '5.4', title: 'Discharge summary typing', type: 'practice', duration: 300, text: 'DISCHARGE DIAGNOSIS: Pneumonia. CONDITION: Stable. INSTRUCTIONS: Finish Meds. Call specific clinic.' },
                    { id: '5.5', title: 'Tip: Units must be exact', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Units Matter</h2><p>mg, mcg, kg, lbs. These are not interchangeable. Type exactly what is dictated.</p>' },
                    { id: '5.6', title: 'Full medical report drill', type: 'practice', duration: 300, text: 'CHIEF COMPLAINT: Abdominal pain.\nHPI: 45yo male presents with RLQ pain started this AM.\nPHYSICAL EXAM: Positive McBurney\'s sign.\nIMPRESSION: Appendicitis.' }
                ]
            },
            {
                id: 6,
                title: 'Legal Transcription Basics',
                description: 'Introduction to legal terminology.',
                subLessons: [
                    { id: '6.1', title: 'Legal typing overview', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Verbatim Record</h2><p>In legal transcription, every "um", "ah", and false start may need to be recorded depending on the jurisdiction.</p>' },
                    { id: '6.2', title: 'Courtroom vocabulary practice', type: 'practice', duration: 300, text: 'plaintiff defendant objection sustained overruled affidavit subpoena testimony verdict jury judge' },
                    { id: '6.3', title: 'Formal sentence structure', type: 'practice', duration: 300, text: 'Your Honor, may I approach the bench? The prosecution rests. The defense calls its first witness.' },
                    { id: '6.4', title: 'Names, titles, case references', type: 'practice', duration: 300, text: 'In the matter of State v. Jones. The Honorable Judge Brown presiding. Mr. Smith for the defense.' },
                    { id: '6.5', title: 'Tip: Professional tone required', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Neutrality</h2><p>You are a silent observer. Transcribe without bias, emotion, or editing of the facts.</p>' },
                    { id: '6.6', title: 'Legal paragraph drill', type: 'practice', duration: 300, text: 'Q: Where were you on the night of the 15th?\nA: I was at home.\nQ: Can you prove that?\nA: My wife was with me.' }
                ]
            },
            {
                id: 7,
                title: 'Contracts and Agreements Typing',
                description: 'Formatting complex legal documents.',
                subLessons: [
                    { id: '7.1', title: 'Clause formatting', type: 'practice', duration: 300, text: 'WHEREAS, the parties desire to enter into this Agreement; NOW, THEREFORE, it is agreed as follows:' },
                    { id: '7.2', title: 'Numbered sections typing', type: 'practice', duration: 300, text: '1.1 Term. The term of this Agreement shall be one year.\n1.2 Termination. Either party may terminate with notice.' },
                    { id: '7.3', title: 'Legal punctuation and commas', type: 'practice', duration: 300, text: 'The Seller, being the owner of the property, hereby agrees to sell...' },
                    { id: '7.4', title: 'Agreement paragraph drills', type: 'practice', duration: 300, text: 'INDEMNIFICATION. The Contractor agrees to indemnify and hold harmless the Client from any claims...' },
                    { id: '7.5', title: 'Tip: Small errors change meaning', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Legal Precision</h2><p>A misplaced comma in a contract can cost millions. Accuracy is paramount.</p>' },
                    { id: '7.6', title: 'Full contract excerpt typing', type: 'practice', duration: 300, text: 'This Employment Agreement ("Agreement") is made effective as of January 1 by and between Company Inc. and Employee Name.' }
                ]
            },
            {
                id: 8,
                title: 'Dictation Speed & Listening Rhythm',
                description: 'Training used primarily for audio transcription.',
                subLessons: [
                    { id: '8.1', title: 'Typing in real-time practice', type: 'practice', duration: 300, text: 'Listen to the flow. Type as you hear. Don\'t stop. Keep the fingers moving. Catch up during the pauses.' },
                    { id: '8.2', title: 'Short audio-style drills', type: 'practice', duration: 300, text: 'Okay, let\'s move on to the next topic. Basically, the sales numbers are up. Any questions?' },
                    { id: '8.3', title: 'Long sentence dictation drills', type: 'practice', duration: 300, text: 'I want to emphasize that the quarterly earnings report was significantly higher than we anticipated given the market conditions.' },
                    { id: '8.4', title: 'Correction and replay workflow', type: 'practice', duration: 300, text: '(inaudible) ... let me rephrase that. The project deadline is pushed to June. Correction: July.' },
                    { id: '8.5', title: 'Tip: Accuracy over rushing', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Pacing</h2><p>It\'s faster to type at a steady pace than to rush, make a mistake, backspace, and retype.</p>' },
                    { id: '8.6', title: 'Full dictation simulation', type: 'practice', duration: 300, text: 'Good morning everyone. Thank you for joining this call. We have three items on the agenda today. First, the budget review.' }
                ]
            },
            {
                id: 9,
                title: 'Confidentiality & Compliance',
                description: 'Ethics, HIPAA, and data security.',
                subLessons: [
                    { id: '9.1', title: 'Professional ethics', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Confidentiality</h2><p>What you type stays in the document. Never discuss patient or client information.</p>' },
                    { id: '9.2', title: 'Handling sensitive information', type: 'practice', duration: 300, text: 'CONFIDENTIAL: This document contains proprietary information. Do not distribute.' },
                    { id: '9.3', title: 'Placeholder practice (Name/ID masking)', type: 'practice', duration: 300, text: 'Patient [NAME REDACTED] admitted on [DATE]. ID # [XXXXX].' },
                    { id: '9.4', title: 'Secure transcription habits', type: 'practice', duration: 300, text: 'Lock your screen. Use secure file transfer. Delete local copies after submission.' },
                    { id: '9.5', title: 'Tip: Privacy is mandatory', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">HIPAA & GDPR</h2><p>Violating privacy laws can result in fines using jail time. Take security seriously.</p>' },
                    { id: '9.6', title: 'Secure document typing drill', type: 'practice', duration: 300, text: 'SUBJECT: PENDING LITIGATION. PRIVILEGED AND CONFIDENTIAL. ATTORNEY-CLIENT COMMUNICATION.' }
                ]
            },
            {
                id: 10,
                title: 'Advanced Medical Dictation Challenge',
                description: 'Pro-level clinical scenarios.',
                subLessons: [
                    { id: '10.1', title: 'Complex terminology typing', type: 'practice', duration: 300, text: 'cholecystectomy myocardial infarction encephalopathy thrombocytopenia hyperlipidemia' },
                    { id: '10.2', title: 'Multi-condition patient reports', type: 'practice', duration: 300, text: 'Patient with history of COPD, CHF, and DM2 presents with dyspnea and lower extremity edema.' },
                    { id: '10.3', title: 'Emergency case dictation', type: 'practice', duration: 300, text: 'TRAUMA ALERT: 25yo male, MVC. GCS 14. BP 90/60. HR 120. FAST scan positive. To OR immediately.' },
                    { id: '10.4', title: 'Final clinical accuracy test', type: 'practice', duration: 300, text: 'OPERATIVE REPORT: Laparoscopic appendectomy. FINDINGS: Gangrenous appendix. PROCEDURE: Mesoappendix ligated. Specimen removed.' },
                    { id: '10.5', title: 'Certification-level drill', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Medical Pro</h2><p>You have demonstrated the ability to handle complex clinical transcription. Maintain this standard.</p>' }
                ]
            },
            {
                id: 11,
                title: 'Advanced Legal Dictation Challenge',
                description: 'Pro-level courtroom scenarios.',
                subLessons: [
                    { id: '11.1', title: 'Court transcript simulation', type: 'practice', duration: 300, text: 'THE COURT: Call your next witness. MR. BLACK: The defense calls Dr. White. (Witness sworn in).' },
                    { id: '11.2', title: 'Legal judgment excerpt typing', type: 'practice', duration: 300, text: 'IT IS HEREBY ORDERED, ADJUDGED, AND DECREED that judgment be entered in favor of the Plaintiff in the amount of $50,000.' },
                    { id: '11.3', title: 'Multi-speaker formatting', type: 'practice', duration: 300, text: 'Q: State your name. A: John Doe. Q: Do you swear to tell the truth? A: I do.' },
                    { id: '11.4', title: 'Final legal accuracy test', type: 'practice', duration: 300, text: 'DEPOSITION of Jane Doe taken on May 1 at the offices of Smith & Associates. APPEARANCES: Bob Jones for Plaintiff.' },
                    { id: '11.5', title: 'Certification-level drill', type: 'info', duration: 180, content: '<h2 class="text-2xl font-bold mb-4">Legal Eagle</h2><p>You have mastered the nuance of legal transcription. Your transcripts stand ready for the court record.</p>' }
                ]
            },
            {
                id: 12,
                title: 'Professional Transcription Certification Test',
                description: 'The final barrier to professional status.',
                subLessons: [
                    { id: '12.1', title: 'Medical final exam', type: 'practice', duration: 300, text: 'ADMISSION NOTE: 60M with chest pain. EKG shows ST elevation. Plan: Cardiac cath lab stat. Aspirin 325mg given.' },
                    { id: '12.2', title: 'Legal final exam', type: 'practice', duration: 300, text: 'CLOSING ARGUMENT: Ladies and gentlemen of the jury, the evidence shows beyond a reasonable doubt that the defendant was present.' },
                    { id: '12.3', title: 'Mixed professional dictation', type: 'practice', duration: 300, text: 'We need to sign the contract by 5:00 PM. The patient needs meds by 6:00 PM. The cost is $500. Please invoice.' },
                    { id: '12.4', title: 'Formatting + proofreading test', type: 'practice', duration: 300, text: 'Heading 1\n\nParagraph text here.\n\n- List item\n- List item\n\nConclusion of the document.' },
                    { id: '12.5', title: 'Final WPM + Accuracy scoring', type: 'practice', duration: 300, text: 'Congratulations. You have completed the Professional Dictation Course. You possess the skills to transcribe for the world\'s most demanding industries.' },
                    { id: '12.6', title: 'Course completion certificate', type: 'info', duration: 180, content: '<h2 class="text-3xl font-bold mb-4">Certified Pro</h2><p class="mb-4">You are now a master of the keyboard. Medical, Legal, Technical, and Speed. You can type it all.</p>' }
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
