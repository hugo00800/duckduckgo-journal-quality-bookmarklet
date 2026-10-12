/**
 * bookmarklet.js
 *
 * Source for the actual bookmarklet. This file is NOT loaded by the
 * browser directly — it is minified by hand into a single `javascript:`
 * URL (see bookmarklet.txt) which is what you save as a bookmark.
 *
 * It does only one thing: inject loader.js from a specific, immutable
 * commit SHA (not the @main branch - jsDelivr's cache for a floating
 * branch ref is keyed by path only, ignores query strings, and can stay
 * stale for a long time even after an explicit purge; a commit SHA is a
 * brand new URL on every change, so there is nothing to go stale).
 * Update BASE's SHA after every push that changes loader.js itself.
 */
(function () {
  var BASE = "https://cdn.jsdelivr.net/gh/hugo00800/safari-journal-quality-bookmarklet@d8e65bdc78218d7f52ecd771c0f6568804bd3ee7/";
  var s = document.createElement("script");
  s.src = BASE + "loader.js";
  document.head.appendChild(s);
})();
