# TrashBot / Ultra X Base

## Overview
A modular WhatsApp bot built with Node.js and the Baileys library. It connects to WhatsApp via pairing code or SESSION_ID, and supports a plugin system for commands.

## Stack
- **Runtime**: Node.js 20 (CommonJS)
- **WhatsApp Library**: @trashcore/baileys
- **Database**: SQLite via better-sqlite3
- **Package Manager**: npm

## Project Structure
- `index.js` - Entry point; handles WhatsApp connection, session, and pairing
- `config.js` - Bot configuration (name, prefix, owners, session ID)
- `command.js` - Message handler / command router
- `pluginStore.js` - Plugin loader and watcher
- `database.js` / `database/` - SQLite database setup and utilities
- `basestore.js` - Message store implementation
- `plugins/` - Plugin commands organized by category (admin, downloads, group, tools, utility)
- `library/` - Helper utilities (exif, etc.)

## Configuration
- `SESSION_ID` environment variable: Set to a base64-encoded session string prefixed with `trashcore~` to auto-authenticate. Leave empty to use pairing code flow.
- Bot config in `config.js`: BOT_NAME, PREFIX, OWNER phone numbers

## Running
```bash
node index.js
```

On first run without a SESSION_ID, it will prompt for a WhatsApp phone number and display a pairing code.

## Workflow
- Workflow: "Start application" — runs `node index.js` as a console process
