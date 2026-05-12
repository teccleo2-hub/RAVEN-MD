module.exports = {
  command: ["killgc"],
  desc: "Kick all members then leave the group",
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

      await xreply(`☠️ Initiating group termination...`);

      for (const jid of targets) {
        await trashcore.groupParticipantsUpdate(chat, [jid], "remove").catch(() => {});
        await new Promise(r => setTimeout(r, 400));
      }

      await trashcore.groupLeave(chat);
    } catch (err) {
      console.error("Killgc Error:", err);
      xreply("❌ Failed to kill group. Check bot admin permissions.");
    }
  }
};
