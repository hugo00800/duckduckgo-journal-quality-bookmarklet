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

  // TODO: replace with your own GitHub user/repo once pushed.
  var BASE = "https://raw.githubusercontent.com/hugo00800/duckduckgo-journal-quality-bookmarklet/main/";

  var files = [];
  if (typeof window.jQuery === "undefined") {
    files.push("https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js");
  }
  files.push(
    BASE + "shim.js",
    BASE + "vendor/js/scholar.js",
    BASE + "vendor/js/scholar_turbo.js",
    BASE + "vendor/js/ccf.js",
    BASE + "vendor/js/fetchRank.js",
    BASE + "vendor/data/ccf.FullRank_ISSNs.js",
    BASE + "vendor/data/ccf.FullRank_Names.js",
    BASE + "vendor/data/ccf.FullRank_Acro.js",
    BASE + "vendor/script.js"
  );

  var styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = BASE + "vendor/css/style.css";
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
