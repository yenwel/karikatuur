# Caricature Sprint Trainer (Web App Prototype)

A lightweight, mobile-friendly web app for practicing fast caricature drawing.

## Features implemented

- Load local face photos as reference (`<input type="file">`).
- Upload and locally store caricature photos (saved in browser local storage).
- Fast drawing countdown timer with start / pause / reset.
- Side-by-side comparison of reference face and latest caricature.
- Local gallery of recent caricatures.

## Run locally

Open `index.html` directly in a browser, or serve with any static server.

Example:

```bash
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

## Notes for future mobile app version

- For a native app (Flutter / React Native), replace local storage with device media library + app documents.
- Add optional cloud sync for progress history.
- Add drawing analytics (time per drawing, difficulty tags, face-angle categories).
