module.exports = {
  command: ["groupinfo", "ginfo"],
  desc: "Show detailed group information",
  category: "group",
  run: async ({ trashcore, chat, xreply }) => {
    try {
      if (!chat.endsWith("@g.us")) return xreply("⚠️ Groups only.");

      const group = await trashcore.groupMetadata(chat);
      const admins = group.participants.filter(p => p.admin).map(p => `@${p.id.split("@")[0]}`);
      const total = group.participants.length;
      const created = new Date(group.creation * 1000).toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric"
      });

      const text = `╔══════════════════════╗
  📋 *GROUP INFO*
╚══════════════════════╝

┌─────────────────────
│ 🏷️ *Name:* ${group.subject}
│ 🆔 *ID:* ${chat.split("@")[0]}
│ 👥 *Members:* ${total}
│ 👑 *Admins:* ${admins.length}
│ 📅 *Created:* ${created}
│ 📝 *Desc:* ${group.desc ? group.desc.substring(0, 80) + (group.desc.length > 80 ? "..." : "") : "None"}
└─────────────────────

👑 *Admins:* ${admins.join(", ")}`;

      await trashcore.sendMessage(chat, {
        text,
        mentions: group.participants.filter(p => p.admin).map(p => p.id)
      });
    } catch (err) {
      console.error("Groupinfo Error:", err);
      xreply("❌ Failed to fetch group info.");
    }
  }
};
