/* Defensive local storage wrapper. All saved records are local to this browser. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.KhaksarStorage = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }
  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }
  function remove(key) {
    try { localStorage.removeItem(key); return true; }
    catch (error) { return false; }
  }
  return Object.freeze({ read, write, remove });
});
