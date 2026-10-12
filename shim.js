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
 * Defined via Object.defineProperty with writable:false/configurable:false
 * (not a plain `window.browser = ...` assignment) so that nothing loaded
 * later - whether the page's own scripts or our own vendored files - can
 * silently overwrite it. A plain assignment would be vulnerable to a race:
 * if some other script on the page (re)assigns `window.browser` *after*
 * this shim runs but *before* vendor/script.js reads it, our patch would
 * simply be clobbered with no visible error.
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

  var rjqcBrowser = {
    storage: {
      local: {
        get: function (keysOrCallback, maybeCallback) {
          var callback = typeof keysOrCallback === "function" ? keysOrCallback : maybeCallback;
          if (typeof callback === "function") {
            callback(RJQC_DEFAULTS);
          }
        }
      }
    }
  };

  try {
    Object.defineProperty(window, "browser", {
      value: rjqcBrowser,
      writable: false,
      configurable: false,
      enumerable: true
    });
  } catch (e) {
    // window.browser was already non-configurable (e.g. a real
    // WebExtension content-script context) - fall back to patching it
    // in place instead of replacing it outright.
    window.browser = window.browser || {};
    window.browser.storage = window.browser.storage || {};
    window.browser.storage.local = window.browser.storage.local || rjqcBrowser.storage.local;
  }

  console.log(
    "[RJQC shim] window.browser.storage.local.get is now:",
    typeof window.browser.storage.local.get
  );
})();
