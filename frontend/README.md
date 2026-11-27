# Smart Home Automation Dashboard (React + Vite)

    npm install
    npm run dev      # open the printed Network URL on your phone (same Wi-Fi)
    npm run build

- `src/context/HomeContext.jsx` – all state + device actions. Hook the ESP8266 MQTT publish/subscribe here
  (`act()` = commands, the `setInterval` effect = sensor readings).
- `src/i18n.js` + `src/base.js` – Arabic / English strings (RTL switches automatically).
- `src/views/` – Dashboard, Settings, Logs, About. `src/components/` – cards, layout, UI pieces, SVG art.
- `src/styles/` – original design CSS split by area; `mobile.css` = phone/tablet layout (bottom nav under 900px).
