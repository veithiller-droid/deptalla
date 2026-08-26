# Deptalla – moderner Startseitenentwurf

Frameworkfreie statische Frontend-Version für Visual Studio Code.

## Dateien

- `index.html` – komplette Startseite
- `styles.css` – Layout, Responsive Design, Animationen
- `script.js` – Menü, Scroll-Reveals, Bild-Hover, Parallax
- `download-assets.sh` – optional: Originalbilder der bestehenden Website lokal herunterladen

## Starten

Am einfachsten in VS Code mit der Extension **Live Server**:

1. Ordner öffnen
2. `index.html` öffnen
3. Rechtsklick → `Open with Live Server`

Alternativ funktioniert die Seite auch direkt durch Doppelklick auf `index.html`.

## Bilder

Der Entwurf nutzt derzeit direkt die vorhandenen Bild-URLs von `elektrotechnik-deptalla.de`, damit er sofort funktioniert.

Für eine produktive Version sollten die Bilder lokal gespeichert werden. Dazu im Terminal im Projektordner ausführen:

```bash
chmod +x download-assets.sh
./download-assets.sh
```

Danach können die Bildpfade in `index.html` von den Remote-URLs auf `assets/images/...` geändert werden.

## Designidee

- gleiche vorhandene Bildwelt
- deutlich größere Typografie
- Schwarz / Off-White / Deptalla-Blau / Signalgrün
- kontrastreiche Flächen
- Sticky Navigation
- Scroll-Reveal
- dezentes Parallax
- interaktive Leistungszeilen mit Bildvorschau
- große Projektmodule
- klare Kontakt-CTAs

## Vor dem Livegang

Aktuelle Projekte, Mitarbeiterstand, Datenschutz/Impressum und finale Texte bitte noch mit dem Betreiber abgleichen.
