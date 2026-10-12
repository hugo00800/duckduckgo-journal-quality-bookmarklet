/**
 * loader.js
 *
 * Injected by the bookmarklet (see bookmarklet.js). Loads jQuery (if not
 * already present on the page), the shim, and the vendored
 * Rapid-Journal-Quality-Check files in the exact order the original
 * extension's manifest.json used, then lets vendor/script.js run itself.
 *
 * Only meant to run on a Google Scholar results or citations page.
 */
(function () {
  "use strict";

  var host = window.location.hostname;
  if (host.indexOf("scholar.google.") === -1) {
    alert("Rapid Journal Quality Check Bookmarklet: Diese Seite ist keine Google Scholar Seite.");
    return;
  }

  // jsDelivr, not raw.githubusercontent.com: GitHub serves .js as text/plain
  // with X-Content-Type-Options: nosniff, which makes browsers refuse to
  // execute it as a <script>. jsDelivr serves the correct MIME type.
  //
  // Pinned to a commit SHA, not @main: jsDelivr's cache for a floating
  // branch ref (@main) is keyed by path only (query strings are ignored)
  // and can take a long time to reflect new commits even after an
  // explicit purge. A commit SHA is a new, immutable URL on every change,
  // so there is nothing to purge or go stale - update this value after
  // every push to vendor/ or any other file this loader references.
  var BASE = "https://cdn.jsdelivr.net/gh/hugo00800/safari-journal-quality-bookmarklet@bde0a76ea6990864f9cd075be284136a81639714/";

  var cacheBust = "?v=" + Date.now();

  var files = [];
  if (typeof window.jQuery === "undefined") {
    files.push("https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js");
  }
  files.push(
    BASE + "shim.js" + cacheBust,
    BASE + "vendor/js/scholar.js" + cacheBust,
    BASE + "vendor/js/scholar_turbo.js" + cacheBust,
    BASE + "vendor/js/ccf.js" + cacheBust,
    BASE + "vendor/js/fetchRank.js" + cacheBust,
    // Data files are multiple MB and essentially static once published,
    // so they are deliberately left cacheable (no cache-bust query string).
    BASE + "vendor/data/ccf.FullRank_ISSNs.js",
    BASE + "vendor/data/ccf.FullRank_Names.js",
    BASE + "vendor/data/ccf.FullRank_Acro.js",
    BASE + "vendor/script.js" + cacheBust
  );

  var styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = BASE + "vendor/css/style.css" + cacheBust;
  document.head.appendChild(styleLink);

  function loadNext(i) {
    if (i >= files.length) {
      return;
    }
    var script = document.createElement("script");
    script.src = files[i];
    script.onload = function () {
      loadNext(i + 1);
    };
    script.onerror = function () {
      console.error("Rapid Journal Quality Check Bookmarklet: Konnte nicht laden:", files[i]);
      loadNext(i + 1);
    };
    document.head.appendChild(script);
  }

  loadNext(0);
})();
