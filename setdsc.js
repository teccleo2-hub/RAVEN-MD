module.exports = {
  command: ["setdsc", "setdesc"],
  desc: "Set the group description",
  category: "group",
  isOwner: true,
  run: async ({ trashcore, chat, text, xreply, isOwner }) => {
    try {
      if (!chat.endsWith("@g.us")) return xreply("⚠️ Groups only.");
      if (!isOwner) return xreply("⚠️ Owner only.");

      if (!text) return xreply(`⚠️ Provide a description.\nExample: .setdsc Welcome to our group!`);

      await trashcore.groupUpdateDescription(chat, text);
      xreply(`✅ Group description updated!\n\n📝 _${text}_`);
    } catch (err) {
      console.error("Setdsc Error:", err);
      xreply("❌ Failed to update description. Check bot admin permissions.");
    }
  }
};
