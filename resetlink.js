module.exports = {
  command: ["resetlink"],
  desc: "Reset the group invite link",
  category: "group",
  isOwner: true,
  run: async ({ trashcore, chat, xreply, isOwner }) => {
    try {
      if (!chat.endsWith("@g.us")) return xreply("⚠️ Groups only.");
      if (!isOwner) return xreply("⚠️ Owner only.");

      await trashcore.groupRevokeInvite(chat);
      const newCode = await trashcore.groupInviteCode(chat);

      xreply(`🔄 Invite link reset!\n\n🔗 *New Link:*\nhttps://chat.whatsapp.com/${newCode}`);
    } catch (err) {
      console.error("Resetlink Error:", err);
      xreply("❌ Failed to reset link. Check bot admin permissions.");
    }
  }
};
