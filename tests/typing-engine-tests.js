'use strict';
const assert = require('node:assert/strict');
const engine = require('../assets/js/typing-engine.js');
const stats = require('../assets/js/statistics.js');

function run(name, fn) {
  fn();
  process.stdout.write(`✓ ${name}\n`);
}

run('empty input is safe and defaults to 100% accuracy', () => {
  const result = engine.calculateMetrics('', 'hello', 0);
  assert.equal(result.correct, 0);
  assert.equal(result.attempts, 0);
  assert.equal(result.errors, 0);
  assert.equal(result.wpm, 0);
  assert.equal(result.accuracy, 100);
});

run('five correct characters in one minute equals one WPM', () => {
  const result = engine.calculateMetrics('hello', 'hello', 60_000);
  assert.equal(result.correct, 5);
  assert.equal(result.errors, 0);
  assert.equal(result.wpm, 1);
  assert.equal(result.accuracy, 100);
});

run('incorrect characters lower accuracy and count as errors', () => {
  const result = engine.calculateMetrics('hallo!', 'hello?', 60_000);
  assert.equal(result.correct, 4);
  assert.equal(result.attempts, 6);
  assert.equal(result.errors, 2);
  assert.equal(result.accuracy, 67);
});

run('metrics do not count untyped target characters as errors', () => {
  const result = engine.calculateMetrics('abc', 'abcdef', 10_000);
  assert.equal(result.correct, 3);
  assert.equal(result.errors, 0);
  assert.equal(result.attempts, 3);
});

run('input clamp never exceeds the target length', () => {
  assert.equal(engine.clampTypedText('long text', 4), 'long');
  assert.equal(engine.clampTypedText('abc', 0), '');
});

run('summary uses timed tests for best speed and average accuracy', () => {
  const summary = stats.summarize([
    { type: 'test', wpm: 20, accuracy: 90, duration: 30 },
    { type: 'practice', wpm: 200, accuracy: 100, duration: 60 },
    { type: 'test', wpm: 40, accuracy: 98, duration: 45 }
  ]);
  assert.equal(summary.sessionCount, 3);
  assert.equal(summary.testCount, 2);
  assert.equal(summary.bestWpm, 40);
  assert.equal(summary.averageAccuracy, 94);
  assert.equal(summary.practiceSeconds, 135);
});

process.stdout.write('All unit tests passed.\n');
