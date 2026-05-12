const { downloadContentFromMessage } = require("@ostyado/baileys");

module.exports = {
  command: ["setgpp"],
  desc: "Set the group profile picture (reply to an image)",
  category: "group",
  isOwner: true,
  run: async ({ trashcore, chat, m, xreply, isOwner }) => {
    try {
      if (!chat.endsWith("@g.us")) return xreply("⚠️ Groups only.");
      if (!isOwner) return xreply("⚠️ Owner only.");

      const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      const imgMsg = quoted?.imageMessage || m.message?.imageMessage;

      if (!imgMsg) return xreply("⚠️ Reply to an image to set it as the group picture.");

      const stream = await downloadContentFromMessage(imgMsg, "image");
      const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      const buffer = Buffer.concat(chunks);

      await trashcore.updateProfilePicture(chat, buffer);
      xreply("✅ Group profile picture updated!");
    } catch (err) {
      console.error("Setgpp Error:", err);
      xreply("❌ Failed to update group picture. Check bot admin permissions.");
    }
  }
};
