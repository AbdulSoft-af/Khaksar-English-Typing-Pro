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



