/* Pure helpers for summaries; no UI or storage dependencies. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.KhaksarStatistics = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  function summarize(history) {
    const sessions = Array.isArray(history) ? history : [];
    const tests = sessions.filter((entry) => entry && entry.type === 'test');
    const bestWpm = tests.length ? Math.max(...tests.map((entry) => Number(entry.wpm) || 0)) : null;
    const averageAccuracy = tests.length
      ? Math.round(tests.reduce((sum, entry) => sum + (Number(entry.accuracy) || 0), 0) / tests.length)
      : null;
    const practiceSeconds = sessions.reduce((sum, entry) => sum + Math.max(0, Number(entry.duration) || 0), 0);
    return Object.freeze({
      sessionCount: sessions.length,
      testCount: tests.length,
      bestWpm,
      averageAccuracy,
      practiceSeconds,
      tests
    });
  }
  return Object.freeze({ summarize });
});
