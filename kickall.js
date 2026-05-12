module.exports = {
  command: ["kickall"],
  desc: "Kick all non-admin members from the group",
  category: "group",
  isOwner: true,
  run: async ({ trashcore, chat, xreply, isOwner }) => {
    try {
      if (!chat.endsWith("@g.us")) return xreply("⚠️ Groups only.");
      if (!isOwner) return xreply("⚠️ Owner only.");

      const group = await trashcore.groupMetadata(chat);
      const botId = trashcore.user.id.split(":")[0] + "@s.whatsapp.net";

      const targets = group.participants.filter(p =>
        !p.admin && p.id !== botId
      ).map(p => p.id);

      if (targets.length === 0) return xreply("ℹ️ No non-admin members to kick.");

      await xreply(`⚙️ Kicking *${targets.length}* member(s)...`);

      for (const jid of targets) {
        await trashcore.groupParticipantsUpdate(chat, [jid], "remove");
        await new Promise(r => setTimeout(r, 500));
      }

      xreply(`✅ Done! Kicked *${targets.length}* members.`);
    } catch (err) {
      console.error("Kickall Error:", err);
      xreply("❌ Failed to kickall. Check bot admin permissions.");
    }
  }
};
