const { getSetting, setSetting } = require("../../database");

module.exports = {
  command: ["antilink"],
  desc: "Toggle antilink protection — deletes messages with links",
  category: "group",
  isOwner: true,
  run: async ({ trashcore, chat, args, xreply, isOwner }) => {
    if (!chat.endsWith("@g.us")) return xreply("⚠️ Groups only.");
    if (!isOwner) return xreply("⚠️ Owner only.");

    const key = `antilink_${chat}`;
    const current = getSetting(key, false);
    const action = args[0]?.toLowerCase();

    let newState;
    if (action === "on") newState = true;
    else if (action === "off") newState = false;
    else newState = !current;

    setSetting(key, newState);
    xreply(`🔗 Antilink is now *${newState ? "ON ✅" : "OFF ❌"}* in this group.`);
  }
};
