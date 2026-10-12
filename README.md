# Rapid Journal Quality Check — Bookmarklet für die DuckDuckGo-Browser-App

Zeigt beim Durchsuchen von Google Scholar Journal-Rankings (SJR, CORE, ABDC,
FT50, VHB, AJG, CCF, ...) direkt neben den Suchergebnissen an — als
Bookmarklet, weil die **DuckDuckGo-Browser-App keine Browser-Erweiterungen
unterstützt**.

Basiert auf der Browser-Erweiterung **"Rapid Journal Quality Check"** von
[Dr. Julian R.K. Wichmann](https://github.com/JuRaKlWi/Rapid-Journal-Quality-Check)
und dem [Firefox-Port von Andreas Karasenko](https://github.com/AndreasKarasenko/Rapid-Journal-Quality-Check).
Details zur Herkunft des Codes stehen in [NOTICE.md](./NOTICE.md).

## Wie es funktioniert

Ein Bookmarklet ist ein normaler Lesezeichen-Link, der statt einer URL
JavaScript enthält (`javascript:...`). Beim Klick lädt er `loader.js` aus
diesem Repo nach, der wiederum die Original-Ranking-Logik und -Daten
(unverändert aus dem Original-Projekt) in die aktuelle Google-Scholar-Seite
injiziert.

```
Klick aufs Bookmarklet
  → lädt loader.js (mit Cache-Buster)
    → lädt jQuery (falls nicht vorhanden)
    → lädt shim.js (Ersatz für browser.storage.local)
    → lädt vendor/js/scholar.js, scholar_turbo.js, ccf.js, fetchRank.js
    → lädt vendor/data/*.js (Ranking-Datenbanken)
    → lädt vendor/script.js (startet die Auswertung)
```

## Installation

1. Den Inhalt von [`bookmarklet.txt`](./bookmarklet.txt) kopieren.
2. In der DuckDuckGo-Browser-App ein neues Lesezeichen anlegen und den
   kopierten Text **als URL** einfügen (nicht als Name).
3. Auf einer Google-Scholar-Ergebnisseite (`scholar.google.com/scholar?q=...`)
   das Lesezeichen anklicken.

Falls du dieses Repo forkst: In `bookmarklet.js` und `loader.js` die
Konstante `BASE` auf deinen eigenen GitHub-Pfad anpassen, dann
`bookmarklet.txt` wie unten beschrieben neu erzeugen.

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

- **Nicht verifiziert**: Ob die DuckDuckGo-Browser-App `javascript:`-Links
  als Lesezeichen überhaupt ausführt, konnte nicht automatisiert getestet
  werden — das muss manuell in der App geprüft werden. Manche mobilen/
  abgesicherten Browser blockieren das aus Sicherheitsgründen.
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

## Lizenz

Siehe [LICENSE](./LICENSE) und [NOTICE.md](./NOTICE.md).
