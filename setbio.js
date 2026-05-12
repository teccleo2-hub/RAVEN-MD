module.exports = {
  command: "setbio",
  desc: "Change the bot's WhatsApp bio/status",
  category: "Owner",
  usage: ".setbio <new_bio>",
  run: async ({ m, args, isOwner, trashcore, xreply }) => {
    if (!isOwner) return await xreply("❌ Only the bot owner can use this command.");
    if (!args[0]) return await xreply("⚠️ Usage: .setbio <new_bio>");

    try {
      const newBio = args.join(" ");
      await sock.updateProfileStatus(newBio);
      await xreply(`✅ Bot bio updated successfully:\n\n${newBio}`);
    } catch (err) {
      console.error("❌ setbio error:", err);
      await xreply("💥 Failed to update bot bio.");
    }
  }
};