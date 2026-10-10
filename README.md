# Khaksar English Typing Pro

A responsive, offline-ready English typing practice app made with semantic HTML, CSS, and plain JavaScript. It uses no framework, CDN, remote font, or runtime dependency.

## Features

- Dashboard with saved-session summary and recent activity
- Timed typing tests (15, 30, 60, and 120 seconds)
- Live character marking, net WPM, accuracy, errors, pause/resume, restart, and new passages
- Free practice plus six guided lessons
- Local session history, milestones, and a lightweight SVG speed chart
- Light, dark, and system themes; adjustable default duration, difficulty, and live metrics
- JSON export and explicit history-clear option
- Service Worker and PWA manifest for offline use after the app shell has been cached
- Responsive layout, keyboard focus styling, reduced-motion support, and no third-party requests

## Run locally

Service Workers are restricted to secure contexts, including `localhost`. From this directory, run:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser. Windows users can also double-click `run-windows.bat`. Open the local URL once, then reload it. A local server is enough; no internet connection is required. The Service Worker caches the app shell for subsequent offline use. You can also open `index.html` directly for basic local use, but PWA installation and Service Worker caching require HTTP/HTTPS or localhost.

## Run the unit tests

Requires Node.js (no packages to install):

```bash
node tests/typing-engine-tests.js
```

## How the metrics work

- **Net WPM:** correctly typed characters divided by five, divided by elapsed minutes, rounded to the nearest whole WPM.
- **Accuracy:** correctly typed characters divided by attempted characters, multiplied by 100 and rounded to a whole percent. Empty input begins at 100% until typing starts.
- **Errors:** attempted characters that do not match the character at the same position in the target text. Characters not yet attempted are not counted as errors.

The calculation is deterministic and is tested in `tests/typing-engine-tests.js`.

## Local data and privacy

History, lesson completion, and settings are saved to browser local storage on this device. They do not automatically sync to other devices or provide account login. Use **Export data** to create a JSON backup. Clearing browser site data may remove saved progress.

## Project layout

```text
Khaksar-English-Typing-Pro/
├── index.html
├── manifest.json
├── service-worker.js
├── README.md
├── run-windows.bat
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │   ├── app.js
│   │   ├── data.js
│   │   ├── typing-engine.js
│   │   ├── storage.js
│   │   └── statistics.js
│   └── icons/
│       ├── favicon.svg
│       ├── icon-192.png
│       └── icon-512.png
└── tests/
    └── typing-engine-tests.js
```

## Versioning

Current release: `1.0.1`. This patch improves legibility at 100% browser zoom and adjusts the layout breakpoints for common laptop, tablet, and mobile widths. The service-worker cache version is bumped so returning users can receive the updated stylesheet. For future releases, update `CACHE_VERSION` in `service-worker.js` when static app files change.
