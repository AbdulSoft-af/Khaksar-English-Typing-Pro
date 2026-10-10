/* Khaksar English Typing Pro — vanilla JavaScript, no external dependencies. */
(function () {
  'use strict';

  const DATA = window.KHAKSAR_DATA || { passages: {}, lessons: [], sampleTexts: {} };
  const HISTORY_KEY = 'khaksar-english-typing-history-v1';
  const SETTINGS_KEY = 'khaksar-english-typing-settings-v1';
  const LESSONS_KEY = 'khaksar-english-typing-lessons-v1';
  const DEFAULT_SETTINGS = { theme: 'light', duration: 30, difficulty: 'medium', liveFeedback: true };
  const iconPaths = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    'book-open': '<path d="M12 7v14"/><path d="M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-3a4 4 0 0 0-4 2 4 4 0 0 0-4-2H5a2 2 0 0 1-2-2Z"/>',
    keyboard: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 15h8"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 1.5M9 2h6M12 2v3M19 5l1.5 1.5"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 14 4-4 4 3 6-7"/>',
    settings: '<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="m19.4 15 .1.1 1.2.9-1.4 2.4-1.5-.6a8 8 0 0 1-1.7 1l-.3 1.6h-2.8l-.3-1.6a8 8 0 0 1-1.7-1l-1.5.6-1.4-2.4 1.2-.9a7 7 0 0 1 0-2l-1.2-.9 1.4-2.4 1.5.6a8 8 0 0 1 1.7-1l.3-1.6h2.8l.3 1.6a8 8 0 0 1 1.7 1l1.5-.6 1.4 2.4-1.2.9a7 7 0 0 1 0 2Z" transform="translate(-1 -1) scale(1.08)"/>',
    sparkles: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1 2.5 2.5 1-2.5 1L19 21l-1-2.5-2.5-1 2.5-1L19 14ZM5 2l.8 2.2L8 5l-2.2.8L5 8l-.8-2.2L2 5l2.2-.8L5 2Z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    play: '<path d="m8 5 12 7-12 7V5Z" fill="currentColor" stroke="none"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"/>',
    'check-circle': '<path d="m8 12 2.5 2.5L16 9"/><circle cx="12" cy="12" r="9"/>',
    'trending-up': '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'calendar-check': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m4 5 2 2 4-4"/>',
    'arrow-up-right': '<path d="M7 17 17 7M7 7h10v10"/>',
    'clipboard-list': '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5v-1h6v1M9 10h6M9 14h6M9 18h3"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    moon: '<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    'rotate-ccw': '<path d="M3 7v5h5M3.5 12A8.5 8.5 0 1 0 6 6.2L3 12"/><path d="M12 8v4l3 2"/>',
    pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    'refresh-cw': '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.4-3"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10"/>',
    lightbulb: '<path d="M9 18h6M10 22h4M8.5 14.5a6 6 0 1 1 7 0c-.8.6-1.5 1.8-1.5 3.5h-4c0-1.7-.7-2.9-1.5-3.5Z"/>',
    'graduation-cap': '<path d="m2 10 10-5 10 5-10 5-10-5Z"/><path d="M6 12v5c3.5 3 8.5 3 12 0v-5M22 10v6"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    flag: '<path d="M5 21V4m0 0h14l-2 4 2 4H5"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M20.2 15A9 9 0 1 0 3.8 15"/><path d="M6.2 18h11.6"/><path d="M12 3v2"/>' ,
    activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    'sliders-horizontal': '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 16h4"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.5-3.3 1.9 1.9 0 0 1 1.4-3.2H18a3 3 0 0 0 3-3c0-4.7-4-8.5-9-8.5Z"/><circle cx="7.5" cy="10" r="1"/><circle cx="11" cy="7" r="1"/><circle cx="15" cy="8.5" r="1"/>',
    'shield-check': '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    'wifi-off': '<path d="M2 8.8a15 15 0 0 1 20 0M5 12a10 10 0 0 1 6.1-2.1M8.5 15.5a5 5 0 0 1 7 0M12 20h.01M2 2l20 20"/>',
    'move-up-right': '<path d="M7 17 17 7M7 7h10v10"/>',
    'move-down-right': '<path d="M7 7 17 17M7 17h10V7"/>',
    text: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
    'list-ordered': '<path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M3 10h3M3 15c0-1.1.9-2 2-2s2 .9 2 2c0 1.5-4 2-4 4h4"/>'
  };

  let settings = readJSON(SETTINGS_KEY, DEFAULT_SETTINGS);
  settings = { ...DEFAULT_SETTINGS, ...(settings && typeof settings === 'object' ? settings : {}) };
  let history = readJSON(HISTORY_KEY, []);
  if (!Array.isArray(history)) history = [];
  let completedLessons = readJSON(LESSONS_KEY, []);
  if (!Array.isArray(completedLessons)) completedLessons = [];
  let currentRoute = 'dashboard';
  let currentMode = 'test';
  let currentLesson = null;
  let duration = [15, 30, 60, 120].includes(Number(settings.duration)) ? Number(settings.duration) : 30;
  let difficulty = ['easy', 'medium', 'hard'].includes(settings.difficulty) ? settings.difficulty : 'medium';
  let passage = '';
  let timerId = null;
  let started = false;
  let running = false;
  let paused = false;
  let finished = false;
  let segmentStart = 0;
  let elapsedMs = 0;
  let sessionStartedAt = null;
  let toastId = null;
  let lastResult = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function readJSON(key, fallback) {
    return window.KhaksarStorage ? window.KhaksarStorage.read(key, fallback) : fallback;
  }

  function saveJSON(key, value) {
    const saved = window.KhaksarStorage ? window.KhaksarStorage.write(key, value) : false;
    if (!saved) showToast('Browser storage is full or unavailable. Export your data as a backup.');
    return saved;
  }

  function svgIcon(name, extraClass = '') {
    const path = iconPaths[name] || iconPaths.sparkles;
    return `<svg class="${extraClass}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  function hydrateIcons(root = document) {
    $$('[data-icon]', root).forEach((node) => {
      node.innerHTML = svgIcon(node.getAttribute('data-icon'));
    });
  }

  function dateLabel(date = new Date()) {
    return new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'short', day: 'numeric' }).format(date);
  }

  function dateTimeLabel(value) {
    const date = new Date(value);
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(date);
  }

  function numberLabel(value) {
    return Number.isFinite(value) ? Math.max(0, Math.round(value)).toLocaleString() : '0';
  }

  function formatClock(seconds) {
    const total = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function formatDuration(seconds) {
    const total = Math.max(0, Math.round(seconds || 0));
    if (total < 60) return `${total}s`;
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return secs ? `${mins}m ${secs}s` : `${mins} min`;
  }

  function currentTyped() {
    return $('#typing-input') ? $('#typing-input').value : '';
  }

  function actualElapsedMs() {
    return elapsedMs + (running ? Math.max(0, Date.now() - segmentStart) : 0);
  }

  function calculateMetrics(text = currentTyped(), elapsed = actualElapsedMs()) {
    return window.KhaksarTypingEngine.calculateMetrics(text, passage, elapsed);
  }

  function setTheme(theme, shouldSave = true) {
    const selected = ['light', 'dark', 'system'].includes(theme) ? theme : 'light';
    settings.theme = selected;
    let effective = selected;
    if (selected === 'system') {
      effective = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = effective;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', effective === 'dark' ? '#111827' : '#17233f');
    const icon = $('#theme-toggle [data-icon]');
    if (icon) {
      icon.setAttribute('data-icon', effective === 'dark' ? 'sun' : 'moon');
      icon.innerHTML = svgIcon(effective === 'dark' ? 'sun' : 'moon');
    }
    $$('[data-theme-choice]').forEach((button) => button.classList.toggle('active', button.dataset.themeChoice === selected));
    if (shouldSave) saveJSON(SETTINGS_KEY, settings);
  }

  function showToast(message) {
    const toast = $('#toast');
    const label = $('#toast-message');
    if (!toast || !label) return;
    label.textContent = message;
    toast.classList.add('show');
    if (toastId) window.clearTimeout(toastId);
    toastId = window.setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function getPassage() {
    const pools = DATA.passages[difficulty] || DATA.passages.medium || [];
    if (!pools.length) return 'Practice makes progress. Keep your hands relaxed and focus on accuracy.';
    const count = currentMode === 'test' ? (duration >= 120 ? 4 : duration >= 60 ? 3 : duration >= 30 ? 2 : 1) : 1;
    const shuffled = pools.slice().sort(() => Math.random() - 0.5);
    const parts = [];
    for (let i = 0; i < count; i += 1) parts.push(shuffled[i % shuffled.length]);
    return parts.join(' ');
  }

  function resetSession(options = {}) {
    const keepPassage = Boolean(options.keepPassage);
    clearInterval(timerId);
    timerId = null;
    started = false;
    running = false;
    paused = false;
    finished = false;
    segmentStart = 0;
    elapsedMs = 0;
    sessionStartedAt = null;
    lastResult = null;
    $('#result-panel')?.classList.add('hidden');
    const input = $('#typing-input');
    if (input) {
      input.disabled = false;
      input.readOnly = false;
      input.value = '';
      input.maxLength = keepPassage ? (passage.length || 0) : 0;
    }
    if (!keepPassage || !passage) passage = currentLesson && currentMode === 'lesson' ? currentLesson.text : getPassage();
    if (input) input.maxLength = passage.length;
    renderPassage('');
    updateMetrics();
    $('#session-feedback').textContent = '';
    $('#session-feedback').className = 'session-feedback';
    $('#pause-session').disabled = true;
    $('#pause-session').innerHTML = `${svgIcon('pause')} Pause`;
    $('#start-session').disabled = false;
    $('#start-session-label').textContent = 'Start typing';
    $('#session-state').textContent = currentMode === 'test' ? 'Ready when you are' : currentMode === 'lesson' ? `Lesson ${currentLesson ? currentLesson.number : ''} · Ready to learn` : 'Practice at your own pace';
    $('#typing-mode-label').textContent = currentMode === 'test' ? 'TIMED TYPING TEST' : currentMode === 'lesson' ? 'GUIDED LESSON' : 'FREE PRACTICE';
    $('#typing-heading').textContent = currentMode === 'test' ? 'Find your rhythm.' : currentMode === 'lesson' ? (currentLesson ? currentLesson.title : 'Build your technique.') : 'Practice without pressure.';
    $('#input-label-text').textContent = currentMode === 'test' ? 'Start typing the text above' : currentMode === 'lesson' ? 'Follow the lesson prompt above' : 'Type the passage at your own pace';
    $('#typing-help').textContent = currentMode === 'test' ? 'Tip: focus on accuracy first — speed will follow.' : 'Tip: you can reset or switch text any time.';
    $('#test-options').classList.toggle('hidden', currentMode !== 'test');
    $('#metric-time').parentElement.querySelector('.metric-label').textContent = currentMode === 'test' ? 'TIME LEFT' : 'TIME ELAPSED';
    $('#time-progress').parentElement.classList.toggle('hidden', currentMode !== 'test');
    $$('#test-options [data-duration]').forEach((button) => button.classList.toggle('active', Number(button.dataset.duration) === duration));
    $('#difficulty-select').value = difficulty;
    const focusButton = $('#focus-input');
    if (focusButton) focusButton.disabled = false;
    refreshSessionSubtitle();
  }

  function refreshSessionSubtitle() {
    const subtitle = $('#session-subtitle');
    if (!subtitle) return;
    if (currentMode === 'test') subtitle.textContent = `${duration}-second test · ${difficulty === 'hard' ? 'Advanced' : difficulty[0].toUpperCase() + difficulty.slice(1)} text · Results saved on this device.`;
    else if (currentMode === 'lesson') subtitle.textContent = `${currentLesson ? currentLesson.level : 'Guided'} lesson · Complete the prompt to mark this lesson finished.`;
    else subtitle.textContent = 'Take your time, build a steady rhythm, and practice without a countdown.';
  }

  function renderPassage(typed) {
    const target = $('#passage-display');
    if (!target) return;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < passage.length; i += 1) {
      const span = document.createElement('span');
      span.className = 'char-future';
      const char = passage[i];
      span.textContent = char;
      if (i < typed.length) span.classList.add(typed[i] === char ? 'char-correct' : 'char-wrong');
      else if (i === typed.length) span.classList.add('char-current');
      fragment.appendChild(span);
    }
    target.replaceChildren(fragment);
  }

  function startClock() {
    if (running || finished) return;
    started = true;
    paused = false;
    running = true;
    segmentStart = Date.now();
    if (!sessionStartedAt) sessionStartedAt = new Date().toISOString();
    $('#session-state').textContent = 'Session in progress';
    $('#pause-session').disabled = false;
    $('#pause-session').innerHTML = `${svgIcon('pause')} Pause`;
    $('#start-session-label').textContent = 'Keep typing';
    clearInterval(timerId);
    timerId = window.setInterval(tick, 150);
  }

  function tick() {
    if (!running || finished) return;
    const elapsed = actualElapsedMs();
    updateMetrics();
    if (currentMode === 'test' && elapsed >= duration * 1000) finishSession('time');
  }

  function updateMetrics() {
    const typed = currentTyped();
    renderPassage(typed);
    const elapsed = actualElapsedMs();
    const metrics = calculateMetrics(typed, elapsed);
    $('#metric-wpm').innerHTML = `${numberLabel(metrics.wpm)} <small>WPM</small>`;
    $('#metric-accuracy').innerHTML = `${metrics.accuracy}<small>%</small>`;
    $('#metric-errors').textContent = numberLabel(metrics.errors);
    $('#char-count').textContent = `${typed.length.toLocaleString()} / ${passage.length.toLocaleString()} characters`;
    $('#typing-metrics')?.classList.toggle('hidden', !settings.liveFeedback);
    const metricTime = $('#metric-time');
    const timeProgress = $('#time-progress');
    if (currentMode === 'test') {
      const remain = Math.max(0, duration - Math.ceil(elapsed / 1000));
      metricTime.innerHTML = `${remain}<span>s</span>`;
      if (timeProgress) timeProgress.style.width = `${Math.max(0, Math.min(100, (remain / duration) * 100))}%`;
    } else {
      metricTime.textContent = formatClock(elapsed / 1000);
    }
  }

  function handleTyping() {
    const input = $('#typing-input');
    if (!input || finished || paused) return;
    if (input.value.length > passage.length) input.value = input.value.slice(0, passage.length);
    if (!started && input.value.length > 0) startClock();
    updateMetrics();
    if (input.value.length > 0) {
      $('#session-feedback').textContent = '';
      $('#session-feedback').className = 'session-feedback';
    }
    if (input.value.length >= passage.length && passage.length > 0) finishSession('complete');
  }

  function pauseOrResume() {
    if (finished) return;
    if (!started) {
      $('#typing-input').focus();
      showToast('Your timer starts with your first character.');
      return;
    }
    if (running) {
      elapsedMs = actualElapsedMs();
      running = false;
      paused = true;
      clearInterval(timerId);
      timerId = null;
      $('#typing-input').disabled = true;
      $('#pause-session').innerHTML = `${svgIcon('play')} Resume`;
      $('#session-state').textContent = 'Session paused';
      $('#session-feedback').textContent = 'Your session is paused. Select Resume when you are ready.';
      $('#session-feedback').className = 'session-feedback warning';
      updateMetrics();
    } else if (paused) {
      paused = false;
      $('#typing-input').disabled = false;
      startClock();
      $('#typing-input').focus();
    }
  }

  function finishSession(reason) {
    if (finished) return;
    const typed = currentTyped();
    if (!typed.length) return;
    elapsedMs = actualElapsedMs();
    running = false;
    paused = false;
    finished = true;
    started = true;
    clearInterval(timerId);
    timerId = null;
    const measuredMs = Math.max(elapsedMs, 1000);
    const metrics = calculateMetrics(typed, measuredMs);
    const now = new Date().toISOString();
    const record = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      type: currentMode,
      label: currentMode === 'test' ? `${duration}-second test` : currentMode === 'lesson' ? (currentLesson ? currentLesson.title : 'Guided lesson') : 'Free practice',
      date: now,
      startedAt: sessionStartedAt || now,
      duration: Math.round(measuredMs / 1000),
      testDuration: currentMode === 'test' ? duration : null,
      difficulty,
      wpm: metrics.wpm,
      accuracy: metrics.accuracy,
      correct: metrics.correct,
      attempts: metrics.attempts,
      errors: metrics.errors,
      reason
    };
    history.unshift(record);
    history = history.slice(0, 100);
    saveJSON(HISTORY_KEY, history);
    lastResult = record;
    if (currentMode === 'lesson' && currentLesson && !completedLessons.includes(currentLesson.id)) {
      completedLessons.push(currentLesson.id);
      saveJSON(LESSONS_KEY, completedLessons);
    }
    $('#typing-input').disabled = true;
    $('#pause-session').disabled = true;
    $('#start-session').disabled = true;
    $('#session-state').textContent = reason === 'time' ? 'Time is up' : 'Session complete';
    $('#session-feedback').textContent = reason === 'time' ? 'Time is up — your result is ready below.' : 'Passage complete — your result is ready below.';
    $('#session-feedback').className = 'session-feedback success';
    $('#result-wpm').innerHTML = `${numberLabel(record.wpm)} <small>WPM</small>`;
    $('#result-accuracy').textContent = `${record.accuracy}%`;
    $('#result-correct').textContent = numberLabel(record.correct);
    $('#result-errors').textContent = numberLabel(record.errors);
    $('#result-panel').classList.remove('hidden');
    updateMetrics();
    refreshDashboard();
    refreshProgress();
    refreshLessons();
    showToast(currentMode === 'lesson' ? 'Lesson completed and progress saved.' : 'Session saved to your progress.');
    $('#result-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function resetCurrentSession() {
    resetSession({ keepPassage: true });
  }

  function startNewText() {
    resetSession({ keepPassage: false });
    $('#typing-input').focus();
  }

  function navigate(route, options = {}) {
    const allowed = ['dashboard', 'test', 'practice', 'learn', 'progress', 'settings'];
    if (!allowed.includes(route)) route = 'dashboard';
    currentRoute = route;
    currentLesson = options.lesson || null;
    currentMode = route === 'test' ? 'test' : route === 'practice' ? (currentLesson ? 'lesson' : 'practice') : currentMode;
    $$('.page-view').forEach((section) => section.classList.remove('active'));
    const view = route === 'test' || route === 'practice' ? $('#session-view') : $(`#${route}-view`);
    if (view) view.classList.add('active');
    $$('.nav-item[data-route]').forEach((button) => button.classList.toggle('active', button.dataset.route === route || (route === 'practice' && button.dataset.route === 'practice')));
    const titles = { dashboard: 'Dashboard', test: 'Typing test', practice: currentLesson ? 'Lesson practice' : 'Free practice', learn: 'Learn to type', progress: 'Progress', settings: 'Settings' };
    $('#breadcrumb-current').textContent = titles[route] || 'Dashboard';
    $('#sidebar').classList.remove('mobile-open');
    document.body.classList.remove('sidebar-open');
    $('#mobile-menu').setAttribute('aria-expanded', 'false');
    if (route === 'test' || route === 'practice') {
      if (route === 'test') {
        duration = Number(settings.duration) || 30;
        difficulty = settings.difficulty || 'medium';
      }
      resetSession({ keepPassage: false });
    }
    if (route === 'dashboard') refreshDashboard();
    if (route === 'learn') refreshLessons();
    if (route === 'progress') refreshProgress();
    if (route === 'settings') syncSettingsControls();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function refreshDashboard() {
    const summary = window.KhaksarStatistics.summarize(history);
    const tests = summary.tests;
    const best = summary.bestWpm;
    const avgAccuracy = summary.averageAccuracy;
    const practiceMinutes = Math.floor(summary.practiceSeconds / 60);
    $('#stat-best').textContent = best === null ? '—' : numberLabel(best);
    $('#stat-accuracy').textContent = avgAccuracy === null ? '—' : numberLabel(avgAccuracy);
    $('#stat-tests').textContent = numberLabel(tests.length);
    $('#stat-time').textContent = numberLabel(practiceMinutes);
    $('#today-label').textContent = dateLabel();
    const host = $('#recent-sessions');
    const recent = history.slice(0, 3);
    if (!recent.length) {
      host.innerHTML = `<div class="empty-state"><span class="empty-icon">${svgIcon('clipboard-list')}</span><strong>Your story starts here</strong><p>Complete your first typing test and your results will appear here.</p><button type="button" class="button button-secondary button-small" data-route="test">Take a test</button></div>`;
      hydrateIcons(host);
    } else {
      host.innerHTML = recent.map((record) => `<div class="recent-item"><span class="recent-type-icon">${svgIcon(record.type === 'lesson' ? 'book-open' : record.type === 'practice' ? 'keyboard' : 'timer')}</span><span class="recent-item-info"><strong>${escapeHTML(record.label || 'Typing session')}</strong><small>${dateTimeLabel(record.date)} · ${numberLabel(record.accuracy)}% accuracy</small></span><span class="recent-wpm"><strong>${numberLabel(record.wpm)}</strong><small>NET WPM</small></span></div>`).join('');
    }
  }

  function refreshLessons() {
    const grid = $('#lesson-grid');
    if (!grid) return;
    const lessons = DATA.lessons || [];
    const completeCount = lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
    $('#lesson-completion').textContent = `${completeCount} of ${lessons.length} completed`;
    grid.innerHTML = lessons.map((lesson) => {
      const isComplete = completedLessons.includes(lesson.id);
      return `<article class="lesson-card ${isComplete ? 'completed' : ''}"><div class="lesson-card-top"><span class="lesson-number">LESSON ${lesson.number}</span><span class="lesson-icon">${svgIcon(lesson.icon || 'book-open')}</span></div><h3>${escapeHTML(lesson.title)}</h3><p>${escapeHTML(lesson.description)}</p><div class="lesson-meta"><span>${svgIcon('clock')} ${escapeHTML(lesson.duration)}</span><span>${escapeHTML(lesson.level)}</span></div><button class="lesson-start" type="button" data-lesson-id="${escapeHTML(lesson.id)}">${isComplete ? 'Practice again' : 'Start lesson'} <span>→</span></button></article>`;
    }).join('');
    $('#continue-learning').textContent = completeCount === lessons.length ? 'Review a lesson' : 'Continue learning';
    $('#continue-learning').setAttribute('data-continue', 'true');
  }

  function buildChart() {
    const container = $('#progress-chart');
    if (!container) return;
    const records = history.filter((item) => item.type === 'test').slice(0, 10).reverse();
    if (records.length < 2) {
      container.innerHTML = `<div class="chart-empty"><span>${svgIcon('chart')}</span><strong>${records.length === 1 ? 'One result saved — keep practicing' : 'Your chart will grow with you'}</strong><span>${records.length === 1 ? 'Complete another timed test to start seeing a trend.' : 'Complete a timed test to see your speed trend.'}</span></div>`;
      return;
    }
    const width = 640, height = 220, left = 39, right = 14, top = 14, bottom = 28;
    const innerW = width - left - right, innerH = height - top - bottom;
    const values = records.map((r) => Number(r.wpm) || 0);
    const max = Math.max(20, Math.ceil(Math.max(...values) / 10) * 10);
    const points = values.map((value, index) => ({ x: left + (innerW * index / (values.length - 1)), y: top + innerH - (value / max) * innerH, value, date: new Date(records[index].date) }));
    const polyline = points.map((point) => `${point.x},${point.y}`).join(' ');
    const area = `${left},${top + innerH} ${polyline} ${left + innerW},${top + innerH}`;
    let grid = '';
    for (let i = 0; i <= 4; i += 1) {
      const y = top + (innerH * i / 4);
      const val = Math.round(max * (4 - i) / 4);
      grid += `<line x1="${left}" y1="${y}" x2="${width - right}" y2="${y}" stroke="var(--line)" stroke-dasharray="3 5"/><text x="${left - 9}" y="${y + 3}" text-anchor="end" font-size="10" fill="var(--muted)">${val}</text>`;
    }
    const labels = points.map((point, index) => `<text x="${point.x}" y="${height - 8}" text-anchor="middle" font-size="9" fill="var(--muted)">${escapeHTML(new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(point.date))}</text>`).join('');
    const circles = points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="4" fill="var(--surface)" stroke="#7568ea" stroke-width="2"><title>${point.value} WPM</title></circle>`).join('');
    container.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart of net typing speed across recent completed tests">${grid}<polygon points="${area}" fill="rgba(117,104,234,.10)"/><polyline points="${polyline}" fill="none" stroke="#7568ea" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${circles}${labels}</svg>`;
  }

  function refreshProgress() {
    const summary = window.KhaksarStatistics.summarize(history);
    const tests = summary.tests;
    const best = summary.bestWpm;
    const accuracy = summary.averageAccuracy;
    const minutes = Math.floor(summary.practiceSeconds / 60);
    $('#progress-best').textContent = best === null ? '—' : numberLabel(best);
    $('#progress-accuracy').textContent = accuracy === null ? '—' : numberLabel(accuracy);
    $('#progress-tests').textContent = numberLabel(tests.length);
    $('#progress-time').textContent = numberLabel(minutes);
    $('#history-count').textContent = `${history.length} ${history.length === 1 ? 'session' : 'sessions'}`;
    $('#history-footnote').textContent = 'Saved only in this browser. Export JSON for a portable backup.';
    const body = $('#history-body');
    if (!history.length) {
      body.innerHTML = '<tr><td colspan="6" class="table-empty">No sessions yet. Your first result will show up here.</td></tr>';
    } else {
      body.innerHTML = history.slice(0, 50).map((record) => `<tr><td><span class="session-name"><span class="table-session-icon">${svgIcon(record.type === 'lesson' ? 'book-open' : record.type === 'practice' ? 'keyboard' : 'timer')}</span>${escapeHTML(record.label || 'Typing session')}</span></td><td>${escapeHTML(dateTimeLabel(record.date))}</td><td>${escapeHTML(formatDuration(record.duration))}</td><td class="speed-cell">${numberLabel(record.wpm)} WPM</td><td><span class="accuracy-chip">${numberLabel(record.accuracy)}%</span></td><td>${numberLabel(record.errors)}</td></tr>`).join('');
    }
    buildChart();
    const milestones = [
      { title: 'First 10 tests', desc: 'Build a repeatable practice habit', current: tests.length, goal: 10, icon: 'trophy', suffix: 'tests' },
      { title: 'Reach 30 WPM', desc: 'A useful early speed milestone', current: best || 0, goal: 30, icon: 'gauge', suffix: 'WPM' },
      { title: 'Maintain 95% accuracy', desc: 'Precision is the foundation of speed', current: accuracy || 0, goal: 95, icon: 'target', suffix: '%' }
    ];
    $('#milestone-list').innerHTML = milestones.map((item) => {
      const pct = Math.max(0, Math.min(100, Math.round(item.current / item.goal * 100)));
      const value = item.current >= item.goal ? `${numberLabel(item.goal)}${item.suffix === 'tests' ? '' : item.suffix}` : `${numberLabel(item.current)} / ${numberLabel(item.goal)}${item.suffix === 'tests' ? '' : item.suffix}`;
      return `<div class="milestone"><span class="milestone-icon">${svgIcon(item.icon)}</span><div class="milestone-copy"><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.desc)}</small><div class="milestone-progress"><span style="width:${pct}%"></span></div></div><span class="milestone-count">${escapeHTML(value)}</span></div>`;
    }).join('');
  }

  function syncSettingsControls() {
    $('#default-duration').value = String(settings.duration || 30);
    $('#default-difficulty').value = settings.difficulty || 'medium';
    $('#live-feedback-toggle').checked = settings.liveFeedback !== false;
    $$('[data-theme-choice]').forEach((button) => button.classList.toggle('active', button.dataset.themeChoice === settings.theme));
  }

  function exportData() {
    const payload = {
      app: 'Khaksar English Typing Pro',
      version: '1.0.1',
      exportedAt: new Date().toISOString(),
      settings,
      completedLessons,
      sessions: history
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `khaksar-typing-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('Your data backup has been exported.');
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  }

  function beginLesson(lessonId) {
    const lesson = DATA.lessons.find((item) => item.id === lessonId);
    if (!lesson) return;
    currentLesson = lesson;
    passage = lesson.text;
    navigate('practice', { lesson });
  }

  function resetSettings() {
    settings = { ...DEFAULT_SETTINGS };
    duration = settings.duration;
    difficulty = settings.difficulty;
    setTheme(settings.theme, false);
    saveJSON(SETTINGS_KEY, settings);
    syncSettingsControls();
    if (currentRoute === 'test') resetSession({ keepPassage: false });
    $('#settings-feedback').textContent = 'Default settings restored.';
    showToast('Settings restored to defaults.');
  }

  function bindEvents() {
    document.addEventListener('click', (event) => {
      const routeButton = event.target.closest('[data-route]');
      if (routeButton) {
        event.preventDefault();
        navigate(routeButton.dataset.route);
        return;
      }
      const lessonButton = event.target.closest('[data-lesson-id]');
      if (lessonButton) {
        beginLesson(lessonButton.dataset.lessonId);
        return;
      }
      const durationButton = event.target.closest('[data-duration]');
      if (durationButton) {
        duration = Number(durationButton.dataset.duration);
        settings.duration = duration;
        saveJSON(SETTINGS_KEY, settings);
        resetSession({ keepPassage: false });
        return;
      }
      const themeButton = event.target.closest('[data-theme-choice]');
      if (themeButton) {
        setTheme(themeButton.dataset.themeChoice);
        showToast(`Theme set to ${themeButton.dataset.themeChoice}.`);
      }
    });

    $('#mobile-menu').addEventListener('click', () => {
      const open = !$('#sidebar').classList.contains('mobile-open');
      $('#sidebar').classList.toggle('mobile-open', open);
      document.body.classList.toggle('sidebar-open', open);
      $('#mobile-menu').setAttribute('aria-expanded', String(open));
    });
    $('#theme-toggle').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
    $('#typing-input').addEventListener('input', handleTyping);
    $('#typing-input').addEventListener('paste', () => window.setTimeout(handleTyping, 0));
    $('#typing-input').addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        // Keep normal tab navigation accessible; the input stays in the tab order.
        return;
      }
    });
    $('#passage-shell').addEventListener('click', () => $('#typing-input').focus());
    $('#start-session').addEventListener('click', () => {
      if (finished) return;
      if (paused) pauseOrResume();
      else $('#typing-input').focus();
      if (!started) {
        $('#session-feedback').textContent = 'Ready! The timer begins as soon as you type your first character.';
        $('#session-feedback').className = 'session-feedback';
      }
    });
    $('#pause-session').addEventListener('click', pauseOrResume);
    $('#reset-session').addEventListener('click', resetCurrentSession);
    $('#new-session').addEventListener('click', startNewText);
    $('#refresh-text').addEventListener('click', startNewText);
    $('#focus-input').addEventListener('click', () => $('#typing-input').focus());
    $('#retry-session').addEventListener('click', () => {
      resetSession({ keepPassage: false });
      $('#typing-input').focus();
    });
    $('#difficulty-select').addEventListener('change', (event) => {
      difficulty = event.target.value;
      settings.difficulty = difficulty;
      saveJSON(SETTINGS_KEY, settings);
      resetSession({ keepPassage: false });
    });
    $('#continue-learning').addEventListener('click', () => {
      const next = DATA.lessons.find((lesson) => !completedLessons.includes(lesson.id)) || DATA.lessons[0];
      if (next) beginLesson(next.id);
    });
    $('#default-duration').addEventListener('change', (event) => {
      settings.duration = Number(event.target.value) || 30;
      duration = settings.duration;
      saveJSON(SETTINGS_KEY, settings);
      $('#settings-feedback').textContent = 'Default test duration saved.';
      showToast('Default duration saved.');
    });
    $('#default-difficulty').addEventListener('change', (event) => {
      settings.difficulty = event.target.value;
      difficulty = settings.difficulty;
      saveJSON(SETTINGS_KEY, settings);
      $('#settings-feedback').textContent = 'Default difficulty saved.';
      showToast('Default difficulty saved.');
    });
    $('#live-feedback-toggle').addEventListener('change', (event) => {
      settings.liveFeedback = event.target.checked;
      saveJSON(SETTINGS_KEY, settings);
      updateMetrics();
      $('#settings-feedback').textContent = settings.liveFeedback ? 'Live typing feedback is enabled.' : 'Live typing feedback is hidden; results will still be saved.';
    });
    $('#export-data').addEventListener('click', exportData);
    $('#export-settings').addEventListener('click', exportData);
    $('#clear-history').addEventListener('click', () => {
      if (!history.length) { showToast('There is no history to clear.'); return; }
      if (!window.confirm('Clear all saved typing sessions from this browser? This cannot be undone unless you exported a backup.')) return;
      history = [];
      saveJSON(HISTORY_KEY, history);
      refreshDashboard();
      refreshProgress();
      showToast('Typing history cleared.');
    });
    $('#reset-settings').addEventListener('click', () => {
      if (window.confirm('Restore the default theme and typing preferences? Your session history will not be deleted.')) resetSettings();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && document.body.classList.contains('sidebar-open')) {
        $('#sidebar').classList.remove('mobile-open');
        document.body.classList.remove('sidebar-open');
        $('#mobile-menu').setAttribute('aria-expanded', 'false');
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'enter' && currentRoute === 'test') {
        event.preventDefault();
        startNewText();
      }
    });
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => {
        if (settings.theme === 'system') setTheme('system', false);
      });
    }
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then(() => {
        const status = $('.local-status span:last-child');
        if (status) status.textContent = 'Offline-ready on this device';
      }).catch((error) => console.warn('Service worker registration failed:', error));
    });
  }

  function boot() {
    hydrateIcons();
    $$('.year-now').forEach((node) => { node.textContent = new Date().getFullYear(); });
    $('#today-label').textContent = dateLabel();
    duration = Number(settings.duration) || 30;
    difficulty = settings.difficulty || 'medium';
    setTheme(settings.theme, false);
    syncSettingsControls();
    // Set a starter passage without changing the dashboard route.
    currentMode = 'test';
    passage = getPassage();
    bindEvents();
    refreshDashboard();
    refreshLessons();
    refreshProgress();
    updateMetrics();
    registerServiceWorker();
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
