/**
 * shim.js
 *
 * Stand-in for the WebExtension `browser.storage.local` API that the
 * vendored scripts (vendor/script.js, vendor/js/ccf.js, vendor/js/fetchRank.js)
 * were originally written against inside a browser extension.
 *
 * This bookmarklet runs as a plain injected script, not an extension, so
 * `browser` does not exist. The vendored files call
 * `browser.storage.local.get(...)` in exactly two shapes:
 *   - get(callback)            -> used by script.js / ccf.js to read settings
 *   - get(['CORE'], callback)  -> used by fetchRank.js (result is unused dead code)
 * This shim answers both shapes with the same static defaults, matching the
 * defaults the original extension sets on install (see background.js).
 *
 * Built defensively (patch nested props instead of a top-level `||`
 * fallback) because some pages already define a global `browser` object
 * of their own (e.g. for unrelated user-agent detection) that has no
 * `.storage` property — a plain `window.browser = window.browser || {...}`
 * would then silently skip our assignment and leave `.storage` undefined.
 */
(function () {
  var RJQC_DEFAULTS = {
    ext_on: true,
    turbo: true,
    SJR: true,
    VHB: false,
    FNEGE: false,
    CoNRS: false,
    HCERE: false,
    CORE: true,
    CCF: false,
    DAEN: false,
    AJG: false,
    ABDC: true,
    FT50: true
  };

  window.browser = window.browser || {};
  window.browser.storage = window.browser.storage || {};
  window.browser.storage.local = window.browser.storage.local || {};
  if (typeof window.browser.storage.local.get !== "function") {
    window.browser.storage.local.get = function (keysOrCallback, maybeCallback) {
      var callback = typeof keysOrCallback === "function" ? keysOrCallback : maybeCallback;
      if (typeof callback === "function") {
        callback(RJQC_DEFAULTS);
      }
    };
  }
})();
