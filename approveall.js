module.exports = {
  command: ["approveall"],
  desc: "Approve all pending join requests",
  category: "group",
  isOwner: true,
  run: async ({ trashcore, chat, xreply, isOwner }) => {
    try {
      if (!chat.endsWith("@g.us")) return xreply("⚠️ Groups only.");
      if (!isOwner) return xreply("⚠️ Owner only.");

      const requests = await trashcore.groupRequestParticipantsList(chat);

      if (!requests || requests.length === 0)
        return xreply("ℹ️ No pending join requests.");

      const jids = requests.map(r => r.jid);
      await trashcore.groupRequestParticipantsUpdate(chat, jids, "approve");

      xreply(`✅ Approved *${jids.length}* pending request(s).`);
    } catch (err) {
      console.error("Approveall Error:", err);
      xreply("❌ Failed to approve requests. Check bot admin permissions.");
    }
  }
};
