module.exports = {
  command: "idch",
  desc: "Get WhatsApp Channel ID from link",
  category: "Tools",
  usage: ".idch <channel link>",

  run: async ({ sock, args, xreply }) => {
    try {
      if (!args[0]) {
        return xreply("❌ Example:\n.idch https://whatsapp.com/channel/0029VaXXXXXXX");
      }

      const link = args[0];

      if (!link.includes("whatsapp.com/channel/")) {
        return xreply("⚠️ Invalid WhatsApp channel link.");
      }

      // extract invite code
      const inviteCode = link.split("channel/")[1];

      // request channel metadata
      const res = await sock.newsletterMetadata("invite", inviteCode);

      if (!res) return xreply("❌ Could not fetch channel info.");

      const msg = `📢 *CHANNEL INFO*

🆔 ID: ${res.id}
📛 Name: ${res.name}
👥 Subscribers: ${res.subscribers || "Unknown"}
🔗 Invite: ${inviteCode}`;

      return xreply(msg);

    } catch (err) {
      console.log("CHANNEL ERROR:", err);
      return xreply("❌ Unable to fetch Channel ID. Make sure the link is correct.");
    }
  },
};