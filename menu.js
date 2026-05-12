const { getSetting } = require("../../database");
const { plugins } = require("../../pluginStore");
const config = require("../../config");

function formatUptime(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const parts = [];
  if (d) parts.push(`${d}d`);
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  if (s || parts.length === 0) parts.push(`${s}s`);
  return parts.join(" ");
}

function groupByCategory(plugins) {
  const categories = {};
  for (const plugin of plugins.values()) {
    const raw = plugin.category || "Uncategorized";
    const category = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    if (!categories[category]) categories[category] = [];
    const cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
    for (const cmd of cmds) {
      const display = plugin.isOwner ? `${cmd} 👑` : cmd;
      if (!categories[category].includes(display)) {
        categories[category].push(display);
      }
    }
  }
  return categories;
}

const CATEGORY_ICONS = {
  Admin:         "💪",
  Downloads:     "📥",
  Group:         "👥",
  Tools:         "🛠️",
  Utility:       "⚙️",
  Uncategorized: "📌"
};

module.exports = {
  command: ["menu", "raven", "blacklord"],
  desc: "Show command list and bot status",
  category: "utility",
  run: async ({ trashcore, chat, botStartTime }) => {
    const startTime = botStartTime || global.botStartTime || Date.now();
    const uptimeSeconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
    const uptime = formatUptime(uptimeSeconds);

    const prefix = await getSetting("prefix", config.PREFIX || ".");
    const privateMode = await getSetting("privateMode", false);
    const mode = privateMode ? "🔒 PRIVATE" : "🌐 PUBLIC";
    const totalPlugins = plugins.size;
    const grouped = groupByCategory(plugins);

    let commandsText = "";
    for (const [category, cmds] of Object.entries(grouped)) {
      const icon = CATEGORY_ICONS[category] || "📌";
      commandsText += `\n╭─「 ${icon} *${category.toUpperCase()}* 」\n`;
      cmds.sort();
      commandsText += cmds.map(cmd => `│  ◈ ${prefix}${cmd}`).join("\n");
      commandsText += `\n╰${"─".repeat(20)}\n`;
    }

    const text = `
╔══════════════════════╗
  ✦ *${config.BOT_NAME}* ✦
╚══════════════════════╝

┌─────────────────────
│ 🤖 *Bot:* ${config.BOT_NAME}
│ 👤 *Owner:* ${config.OWNER_NAME}
│ 🏷️ *Version:* v${config.VERSION}
│ 📡 *Mode:* ${mode}
│ 🔧 *Prefix:* [ ${prefix} ]
│ 📦 *Plugins:* ${totalPlugins} loaded
│ ⏱️ *Uptime:* ${uptime}
└─────────────────────

📣 *Channel:* ${config.CHANNEL}

━━━━━━ *COMMANDS* ━━━━━━
${commandsText}
━━━━━━━━━━━━━━━━━━━━━━━
> _Powered by ${config.BOT_NAME} v${config.VERSION}_
`;

    const botImageUrl = "https://res.cloudinary.com/dqxlb29uz/image/upload/v1778498636/bwm_uploads/media-1778498635948.jpg";

    await trashcore.sendMessage(chat, {
      image: { url: botImageUrl },
      caption: text
    });
  }
};
