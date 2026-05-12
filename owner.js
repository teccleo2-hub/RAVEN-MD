const config = require("../../config");

module.exports = {
  command: "owner",
  desc: "Bot owner info",
  category: "admin",
  run: async ({ trashcore, chat }) => {
    const text = `╔══════════════════════╗
  👤 *BOT OWNER*
╚══════════════════════╝

┌─────────────────────
│ 🏷️ *Name:* ${config.OWNER_NAME}
│ 📞 *Number:* wa.me/${config.OWNER[0]}
│ 📣 *Channel:* ${config.CHANNEL}
└─────────────────────`;
    await trashcore.sendMessage(chat, { text });
  }
};
