# RAVEN MD 🤖

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/151794313?v=4" width="120" style="border-radius:50%" />
</p>

<p align="center">
  <b>A powerful multi-device WhatsApp bot with a built-in web dashboard</b><br>
  Session manager · Plugin system · Group tools · Media downloaders · AI features
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-brightgreen?style=flat-square&logo=node.js" />
  <img src="https://img.shields.io/badge/Baileys-Latest-blueviolet?style=flat-square" />
  <img src="https://img.shields.io/badge/Platform-WhatsApp-25D366?style=flat-square&logo=whatsapp" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" />
</p>

---

## 🚀 Deploy to Heroku (One Click)

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/teccleo2-hub1/RAVEN-MD)

**Steps after deploying:**
1. Fill in `OWNER_NUMBER` and `PREFIX` (required) — leave `SESSION_ID` blank for now
2. Click **Deploy App** and wait for the build to finish
3. Click **View App** → the web dashboard opens
4. Enter your WhatsApp number → click **Get Pairing Code**
5. Open WhatsApp → **Linked Devices** → **Link with phone number** → enter the code
6. Once connected, copy the generated **Session ID** from the dashboard
7. Go to Heroku → **Settings** → **Config Vars** → paste it as `SESSION_ID`
8. Restart the dyno — bot reconnects instantly every time ⚡

---

## ✨ Features

| Category | Details |
|----------|---------|
| 🌐 Web Dashboard | Pair numbers, manage session IDs, upload/toggle/delete plugins — all from the browser |
| 🔑 Session Manager | Generates a permanent `SESSION_ID` after pairing — redeploy anywhere without re-pairing |
| 🧩 Plugin System | Drop `.js` files into `plugins/` or upload via dashboard — hot-reloaded automatically |
| 📥 Downloaders | TikTok, YouTube, Facebook, Pinterest, audio & video |
| 🛡️ AntiDelete | Logs all deleted messages to the bot's own DM |
| 👥 Group Tools | Promote, demote, kick, tagall, hidetag, antilink, antidemote, antipromote |
| 🤖 AI Tools | Copilot, LLaMA, Venice AI, OCR |
| 🔄 Auto-Reconnect | Automatic reconnect on disconnection |
| 🗄️ SQLite Database | Lightweight persistent storage for settings and message logs |

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OWNER_NUMBER` | ✅ Yes | Your WhatsApp number with country code, no `+` or spaces. e.g. `254712345678` |
| `PREFIX` | ✅ Yes | Command prefix. e.g. `.` `!` `#` |
| `SESSION_ID` | ❌ No | Session string starting with `trashcore~`. Set after first pairing. |
| `BOT_NAME` | ❌ No | Bot display name. Default: `RAVEN MD` |

---

## 🖥️ Web Dashboard

After deploying, open the app URL to access the dashboard:

- **📱 Pair Number** — Enter your number and get a pairing code instantly
- **🔑 Drop Session ID** — Paste an existing session to reconnect without re-pairing
- **✅ Connected** — Copy your permanent Session ID with one click
- **🧩 Plugin Manager** — Upload, enable/disable, or delete plugins from the browser

---

## 📦 Local Installation

```bash
git clone https://github.com/teccleo2-hub1/RAVEN-MD
cd RAVEN-MD
npm install
node index.js


## License

[GNU General Public License v3.0](https://github.com/teccleo2-hub/RAVEN-MD/blob/main/LICENSE)

Copyright (c) 2026 RAVEN-MD


