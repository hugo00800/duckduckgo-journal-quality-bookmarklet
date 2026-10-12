# NOTICE

Dieses Repository ist ein Bookmarklet-Nachbau der Browser-Erweiterung
**"Rapid Journal Quality Check"**. Ursprünglich für die DuckDuckGo-
Browser-App gedacht (die keine Erweiterungen unterstützt), stellte sich
heraus, dass auch `javascript:`-Bookmarklets dort nicht ausführbar sind.
Das Projekt ist daher jetzt auf Safari ausgelegt, wo Bookmarklets nativ
funktionieren.

## Herkunft des Codes

| Datei/Ordner | Herkunft | Verändert? |
|---|---|---|
| `vendor/script.js`, `vendor/js/*.js`, `vendor/data/*.js`, `vendor/css/style.css` | [AndreasKarasenko/Rapid-Journal-Quality-Check](https://github.com/AndreasKarasenko/Rapid-Journal-Quality-Check) (Firefox-Port), ursprünglich von [JuRaKlWi/Rapid-Journal-Quality-Check](https://github.com/JuRaKlWi/Rapid-Journal-Quality-Check) (Dr. Julian R.K. Wichmann) | Nein, byteidentisch kopiert |
| `vendor/LICENSE-ORIGINAL` | Original-LICENSE-Datei aus obigem Repo | Nein |
| `shim.js` | Neu geschrieben für dieses Projekt | — |
| `loader.js` | Neu geschrieben für dieses Projekt | — |
| `bookmarklet.js` / `bookmarklet.txt` | Neu geschrieben für dieses Projekt | — |

## Warum unverändert?

Die eigentliche Ranking-Logik (`ccf.js`, die Datenfiles) enthält keine
WebExtension-spezifischen Aufrufe und funktioniert unverändert außerhalb
einer Extension. Einzige Ausnahme: drei Stellen rufen
`browser.storage.local.get(...)` auf (in `script.js`, `ccf.js` und
`fetchRank.js`). Dafür stellt `shim.js` eine minimale Ersatzfunktion bereit,
die dieselben Standardwerte zurückgibt, die die Original-Erweiterung bei der
Installation setzt (siehe `background.js` im Original-Repo) — SJR, CORE,
ABDC und FT50 aktiv, Rest deaktiviert.

## Lizenz

Beide Original-Repos stehen unter der MIT-Lizenz, Copyright (c) 2022 Julian
R.K. Wichmann. Diese erlaubt ausdrücklich Nutzung, Veränderung und
Weiterverbreitung — auch öffentlich — solange Lizenztext und
Copyright-Hinweis erhalten bleiben. Das ist hier der Fall: jede vendorte
Datei trägt ihren Original-Header, zusätzlich liegt die Original-LICENSE in
`vendor/LICENSE-ORIGINAL`.

Eine vorherige Rückfrage bei den Original-Autoren war aufgrund der
MIT-Lizenz rechtlich nicht notwendig und wurde daher nicht gestellt. Die
Lizenztexte wurden stattdessen direkt an der Quelle verifiziert (siehe
`vendor/LICENSE-ORIGINAL` sowie die Header-Kommentare der einzelnen
vendorten Dateien).
