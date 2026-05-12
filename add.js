module.exports = {
  command: ["add"],
  desc: "Add a member to the group",
  category: "group",
  isOwner: true,
  run: async ({ trashcore, chat, args, xreply, isOwner }) => {
    try {
      if (!chat.endsWith("@g.us")) return xreply("⚠️ Groups only.");
      if (!isOwner) return xreply("⚠️ Owner only.");

      if (!args[0]) return xreply(`⚠️ Provide a number.\nExample: .add 2547xxxxxxx`);

      const number = args[0].replace(/\D/g, "");
      const jid = `${number}@s.whatsapp.net`;

      const result = await trashcore.groupParticipantsUpdate(chat, [jid], "add");
      const status = result?.[0]?.status;

      if (status === "200") {
        xreply(`✅ Added *+${number}* to the group.`);
      } else if (status === "403") {
        xreply(`❌ *+${number}* has privacy settings that prevent being added.`);
      } else if (status === "408") {
        xreply(`⚠️ *+${number}* must be sent an invite. They are not on WhatsApp or blocked adds.`);
      } else if (status === "409") {
        xreply(`ℹ️ *+${number}* is already in the group.`);
      } else {
        xreply(`⚠️ Could not add *+${number}*. Status: ${status}`);
      }
    } catch (err) {
      console.error("Add Error:", err);
      xreply("❌ Failed to add member. Check bot admin permissions.");
    }
  }
};
