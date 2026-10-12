# Rapid Journal Quality Check — Safari-Bookmarklet

Zeigt beim Durchsuchen von Google Scholar Journal-Rankings (SJR, CORE, ABDC,
FT50, VHB, AJG, CCF, ...) direkt neben den Suchergebnissen an — als
Bookmarklet für Safari.

Basiert auf der Browser-Erweiterung **"Rapid Journal Quality Check"** von
[Dr. Julian R.K. Wichmann](https://github.com/JuRaKlWi/Rapid-Journal-Quality-Check)
und dem [Firefox-Port von Andreas Karasenko](https://github.com/AndreasKarasenko/Rapid-Journal-Quality-Check).
Details zur Herkunft des Codes stehen in [NOTICE.md](./NOTICE.md).

## Warum ein Bookmarklet?

Ursprünglich war dieses Projekt für die **DuckDuckGo-Browser-App** gedacht,
die keine Browser-Erweiterungen unterstützt. Es stellte sich aber heraus,
dass die DuckDuckGo-Mac-App `javascript:`-Lesezeichen grundsätzlich nicht
ausführt (die Adressleiste behandelt sie als Suchanfrage statt als Befehl,
und es gibt weder AppleScript- noch Shortcuts-Unterstützung). **Safari**
unterstützt Bookmarklets dagegen nativ, daher ist dieses Repo jetzt direkt
auf Safari ausgelegt.

## Wie es funktioniert

Ein Bookmarklet ist ein normaler Lesezeichen-Link, der statt einer URL
JavaScript enthält (`javascript:...`). Beim Klick lädt er `loader.js` aus
diesem Repo (über jsDelivr) nach, der wiederum die Original-Ranking-Logik
und -Daten (unverändert aus dem Original-Projekt) in die aktuelle
Google-Scholar-Seite injiziert.

```
Klick aufs Bookmarklet
  → lädt loader.js (mit Cache-Buster, über jsDelivr)
    → lädt jQuery (falls nicht vorhanden)
    → lädt shim.js (Ersatz für browser.storage.local)
    → lädt vendor/js/scholar.js, scholar_turbo.js, ccf.js, fetchRank.js
    → lädt vendor/data/*.js (Ranking-Datenbanken)
    → lädt vendor/script.js (startet die Auswertung)
```

## Installation

**Am einfachsten über [`install.html`](./install.html):**

1. `install.html` in Safari öffnen (lokal herunterladen und doppelklicken,
   oder über GitHub Pages/den Raw-Link aufrufen)
2. Lesezeichenleiste einblenden, falls nicht sichtbar (`Cmd+Shift+B`)
3. Den grünen Button „📌 Journal Quality Check" auf die Lesezeichenleiste
   ziehen
4. Auf einer Google-Scholar-Ergebnisseite (`scholar.google.com/scholar?q=...`)
   das Lesezeichen anklicken

**Alternativ manuell:** Inhalt von [`bookmarklet.txt`](./bookmarklet.txt)
kopieren und als URL eines neuen Lesezeichens in Safari einfügen.

Falls du dieses Repo forkst: In `bookmarklet.js` und `loader.js` die
Konstante `BASE` auf deinen eigenen GitHub-Pfad anpassen, dann
`bookmarklet.txt` und den Link in `install.html` wie unten beschrieben neu
erzeugen.

### `bookmarklet.txt` neu erzeugen

Nach jeder Änderung an `bookmarklet.js`:

```bash
node -e '
const fs = require("fs");
let src = fs.readFileSync("bookmarklet.js", "utf8");
src = src.replace(/\/\*\*[\s\S]*?\*\//, "").trim();
const url = "javascript:" + encodeURIComponent(src).replace(/%20/g, " ");
fs.writeFileSync("bookmarklet.txt", url + "\n");
'
```

## Bekannte Einschränkungen

- **Nicht für die DuckDuckGo-Browser-App geeignet** (siehe oben) — dort
  bleibt der „Neues Lesezeichen"-Speichern-Button bei `javascript:`-URLs
  inaktiv, und per Drag&Drop hinzugefügte `javascript:`-Lesezeichen werden
  beim Klick nur als Text in die Adressleiste geschrieben und als Suche
  interpretiert statt ausgeführt.
- **Content-Security-Policy**: Falls Google Scholar irgendwann eine CSP
  ausliefert, die das Nachladen von `<script src>` aus fremden Domains
  blockiert, funktioniert das Bookmarklet nicht mehr (Stand jetzt: kein
  Problem beobachtet).
- **Keine Optionsseite**: Anders als die Original-Erweiterung gibt es keine
  Einstellungs-UI. Welche Rankings angezeigt werden, wird in `shim.js`
  (`RJQC_DEFAULTS`) festgelegt — Standard: SJR, CORE, ABDC, FT50 aktiv.
- **CrossRef/DBLP-Abfragen**: Wenn ein Journal nicht in den lokalen
  Datenfiles gefunden wird, fragt der Original-Code live die öffentlichen
  CrossRef- und DBLP-APIs ab (wie im Original-Plugin).
- **jsDelivr-Cache**: Nach Änderungen an den `.js`-Dateien im Repo kann es
  bis zu 24h dauern, bis jsDelivr die neue Version ausliefert, sofern nicht
  manuell über die [jsDelivr Purge-API](https://www.jsdelivr.com/tools/purge)
  invalidiert wird.

## Lizenz

Siehe [LICENSE](./LICENSE) und [NOTICE.md](./NOTICE.md).
