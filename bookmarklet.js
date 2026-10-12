/**
 * bookmarklet.js
 *
 * Source for the actual bookmarklet. This file is NOT loaded by the
 * browser directly — it is minified by hand into a single `javascript:`
 * URL (see bookmarklet.txt) which is what you save as a bookmark.
 *
 * It does only one thing: inject loader.js with a cache-busting query
 * string, so the browser always fetches a fresh copy of the loader and
 * the vendored scripts instead of a possibly stale cached version.
 */
(function () {
  var BASE = "https://cdn.jsdelivr.net/gh/hugo00800/safari-journal-quality-bookmarklet@main/";
  var s = document.createElement("script");
  s.src = BASE + "loader.js?v=" + Date.now();
  document.head.appendChild(s);
})();
