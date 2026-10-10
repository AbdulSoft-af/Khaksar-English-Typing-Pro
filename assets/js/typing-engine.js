/* Pure typing calculations: shared by the UI and automated tests. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.KhaksarTypingEngine = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  function calculateMetrics(typedText, targetText, elapsedMs) {
    const typed = String(typedText ?? '');
    const target = String(targetText ?? '');
    const elapsed = Math.max(0, Number(elapsedMs) || 0);
    let correct = 0;
    for (let index = 0; index < typed.length; index += 1) {
      if (typed[index] === target[index]) correct += 1;
    }
    const attempts = typed.length;
    const errors = Math.max(0, attempts - correct);
    const elapsedSeconds = elapsed / 1000;
    const wpm = elapsedSeconds > 0 ? Math.round((correct / 5) / (elapsedSeconds / 60)) : 0;
    const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 100;
    return { correct, attempts, errors, wpm, accuracy, elapsedSeconds };
  }

  function clampTypedText(value, targetLength) {
    return String(value ?? '').slice(0, Math.max(0, Number(targetLength) || 0));
  }

  return Object.freeze({ calculateMetrics, clampTypedText });
});
