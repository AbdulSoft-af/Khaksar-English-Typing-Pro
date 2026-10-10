/* Offline-first learning content. Keep this file dependency-free and safe to cache. */
(function () {
  'use strict';
  const passages = {
    easy: [
      'Small steps can lead to big changes. Take your time, keep your hands relaxed, and look at the screen as you type. Clear and steady work helps you learn each key with confidence.',
      'A good day begins with a simple plan. Read a little, practice a skill, take a short break, and try again. When you stay patient, new habits become easier to build.',
      'The quick brown fox jumps over the lazy dog. This sentence uses every letter of the alphabet. Read it slowly, notice each word, and try to type every character correctly.',
      'Learning takes time, and that is perfectly fine. Begin with words you know, keep a comfortable pace, and enjoy each small improvement. A calm mind helps your fingers move.'
    ],
    medium: [
      'Strong typing skills come from regular practice, thoughtful feedback, and a relaxed posture. Keep your eyes on the screen, let your fingers return to the home row, and avoid rushing through unfamiliar words.',
      'A clear process makes difficult tasks feel manageable. Set one small goal, focus on the next useful action, and review the result before moving on. Consistency is often more powerful than a burst of effort.',
      'Technology helps people share ideas, solve problems, and learn from one another. Good communication still depends on clear thinking, useful words, and the patience to explain a message in a thoughtful way.',
      'Accuracy creates a strong foundation for speed. Notice punctuation, spaces, and capital letters as carefully as the words themselves. With repeated practice, correct movements become smoother and require less effort.'
    ],
    hard: [
      'Reliable performance is rarely accidental: it develops through deliberate practice, honest measurement, and small adjustments made over time. Review mistakes without frustration, then repeat the difficult pattern until it feels natural.',
      'When information moves quickly, clarity becomes even more valuable. A well-structured message guides attention, communicates intent, and makes complex ideas easier to understand without sacrificing precision or useful detail.',
      'Keyboard fluency involves rhythm, accuracy, and efficient movement rather than speed alone. Maintain a neutral wrist position, avoid unnecessary tension, and build a sustainable pace that you can reproduce consistently.',
      'Careful problem-solving begins by separating assumptions from evidence. Define the goal, identify the constraints, test a reasonable approach, and use the result to improve the next decision. Precision saves time in the long run.'
    ]
  };

  const lessons = [
    { id: 'home-row', number: '01', title: 'Home row basics', level: 'Beginner', duration: '3 min', description: 'Find the home row and learn where your fingers rest between keystrokes.', icon: 'keyboard', text: 'asdf jkl; asdf jkl; fdsa ;lkj fdsa ;lkj asdf jkl; asdf jkl; fj fj dk dk sl sl a; a; as as df df jk jk kl kl' },
    { id: 'top-row', number: '02', title: 'Reach the top row', level: 'Beginner', duration: '4 min', description: 'Practice reaching for the top row while returning to your home position.', icon: 'move-up-right', text: 'qwer uiop qwer uiop try your best to type with care we use our fingers with a light touch power grows with daily practice' },
    { id: 'bottom-row', number: '03', title: 'Explore the bottom row', level: 'Beginner', duration: '4 min', description: 'Build control with the lower row of keys and simple letter combinations.', icon: 'move-down-right', text: 'zxcv nm zxcv nm a calm hand can move with care every new skill takes practice and each clear word helps us improve' },
    { id: 'common-words', number: '04', title: 'Everyday words', level: 'Intermediate', duration: '5 min', description: 'Type frequent English words with a consistent, comfortable rhythm.', icon: 'book-open', text: 'the time and people can make good work with your hands have a clear plan and take one step at a time to learn a useful skill' },
    { id: 'sentences', number: '05', title: 'Sentence flow', level: 'Intermediate', duration: '5 min', description: 'Build a steady rhythm through complete sentences and natural spacing.', icon: 'text', text: 'Practice every day, and your typing will feel more natural. Keep your shoulders relaxed, look at the screen, and focus on clear, accurate words.' },
    { id: 'punctuation', number: '06', title: 'Punctuation & numbers', level: 'Advanced', duration: '6 min', description: 'Add capital letters, punctuation, and numbers to your everyday typing.', icon: 'list-ordered', text: 'On October 10, write a clear note: plan 3 tasks, take 2 short breaks, and review each result. Are the details correct? Yes—check them twice!' }
  ];

  const sampleTexts = {
    easy: ['Practice makes progress.','Type with calm hands.','Take a breath and begin.','Small steps matter every day.','Clear words build confidence.','Learn one key at a time.'],
    medium: ['Make accuracy your first goal.','A steady rhythm is easier to repeat.','Build good habits through practice.','Clear thinking leads to clear writing.','Keep your eyes on the text, not your hands.'],
    hard: ['Deliberate practice turns feedback into lasting improvement.','Precision, consistency, and patience support sustainable speed.','Thoughtful communication makes complex ideas easier to follow.','Measure the result, learn from it, and refine your approach.']
  };

  window.KHAKSAR_DATA = Object.freeze({ passages, lessons, sampleTexts });
})();
