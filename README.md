# ࿐𝐈𝐓`𝐒 𒆜*𝘾𝙇𝙀𝙊 𝙁𝙇𝙀𝙆𝙊*𒆜

**Version:** 1.0.0
**Author:** 𝙁𝙇𝙀𝙆𝙊
**Platform:** WhatsApp

---

## 📌 Overview
**𝘾𝙇𝙀𝙊 𝙁𝙇𝙀𝙆𝙊** is a modular, full-featured WhatsApp bot designed for scalable session management, robust error logging, and a smooth user experience.

Built on a clean plugin-based architecture, it supports group management, media downloads, AI tools, sticker creation, and much more — all configurable through a simple prefix command system.



---

## 🚀 Features
- 🔗 **SQLite database** — lightweight and efficient session & settings management
- 🔌 **Plugin system** — drop-in commands organised by category
- 👑 **Admin controls** — owner-only commands for full bot management
- 📥 **Downloader tools** — TikTok, YouTube, Facebook, Pinterest & more
- 🛠️ **AI tools** — Copilot, LLaMA, Venice AI, OCR
- 👥 **Group management** — promote, demote, kick, tagall, hidetag & more
- 🛡️ **AntiDelete** — logs deleted messages automatically
- 🔄 **Auto-reconnect** — no disconnection errors / antilogout

---

## 📦 Installation

```bash
git clone https://github.com/lordeagle-tech/hanson.git
cd hanson
npm install
node index.js
```

---

## ⚙️ Configuration

Edit `config.js` to customise:

| Field | Description |
|-------|-------------|
| `BOT_NAME` | Display name of the bot |
| `VERSION` | Bot version string |
| `PREFIX` | Command prefix (default `.`) |
| `OWNER_NAME` | Owner's display name |
| `OWNER` | Owner phone number(s) — no `+` or spaces |
| `PACK_NAME` | Sticker pack name |
| `AUTHOR` | Sticker author name |
| `CHANNEL` | WhatsApp channel link |
| `SESSION_ID` | Session string (or set via env variable) |

---

## 🔑 Pairing / Session

On first run, enter your WhatsApp number when prompted. A pairing code will appear — enter it on your phone under **Settings → Linked Devices → Link with phone number**.

Alternatively, set the `SESSION_ID` environment variable with your session string (`trashcore~BASE64DATA`) to skip pairing on restart.

---

## 📋 Commands

| Category | Commands |
|----------|----------|
| 👑 Admin | `.fullpp` `.mode` `.owner` `.setbio` `.setprefix` `.status` `.statusview` |
| 📥 Downloads | `.play` `.video` `.tiktok` `.facebook` `.pinterest` `.yts` |
| 👥 Group | `.promote` `.demote` `.kick` `.tagall` `.hidetag` `.linkgc` |
| 🛠️ Tools | `.sticker` `.ocr` `.copilot` `.llama` `.venice` |
| ⚙️ Utility | `.menu` `.ping` |

---

## 👤 Owner 𝙁𝙇𝙀𝙆𝙊

**𝘾𝙇𝙀𝙊** — `+254758301051`

## Deployment Platforms 



<div align="center">
  <table>
    <tr>
      <td align="center"><a href="https://dashboard.heroku.com/new?template=https://github.com/teccleo2-hub1/RAVEN-MD" target="_blank"><img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/></a></td>
      <td align="center"><a href="https://replit.com/github.com/teccleo2-hub1/RAVEN-MD" target="_blank"><img src="https://img.shields.io/badge/Replit-F26207?style=for-the-badge&logo=replit&logoColor=white"/></a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://app.koyeb.com/deploy?type=git&repository=github.com/teccleo2-hub1/RAVEN-MD" target="_blank"><img src="https://img.shields.io/badge/Koyeb-FF009D?style=for-the-badge&logo=koyeb&logoColor=white"/></a></td>
      <td align="center"><a href="https://railway.app/new/template?template=https://github.com/teccleo2-hub1/RAVEN-MD" target="_blank"><img src="https://img.shields.io/badge/Railway-FF8700?style=for-the-badge&logo=railway&logoColor=white"/></a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://render.com/deploy?repo=https://github.com/teccleo2-hub1/RAVEN-MD" target="_blank"><img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white"/></a></td>
      <td align="center"><a href="https://app.netlify.com/start/deploy?repository=https://github.com/teccleo2-hub1/RAVEN-MD" target="_blank"><img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"/></a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://heroku.com/deploy?template=https://github.com/teccleo2-hub1/RAVEN-MD/tree/main" target="_blank"><img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/></a></td>
      <td align="center"><a href="https://dashboard.katabump.com/auth/login#ce51a9" target="_blank"><img src="https://img.shields.io/badge/Katabump-FF6B6B?style=for-the-badge&logo=cloudflare&logoColor=white"/></a></td>
    </tr>
  </table>
</div>

---
