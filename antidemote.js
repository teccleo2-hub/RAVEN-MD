const { getSetting, setSetting } = require("../../database");

module.exports = {
  command: ["antidemote"],
  desc: "Toggle antidemote — re-promotes bot if it gets demoted",
  category: "group",
  isOwner: true,
  run: async ({ trashcore, chat, args, xreply, isOwner }) => {
    if (!chat.endsWith("@g.us")) return xreply("⚠️ Groups only.");
    if (!isOwner) return xreply("⚠️ Owner only.");

    const key = `antidemote_${chat}`;
    const current = getSetting(key, false);
    const action = args[0]?.toLowerCase();

    let newState;
    if (action === "on") newState = true;
    else if (action === "off") newState = false;
    else newState = !current;

    setSetting(key, newState);
    xreply(`🛡️ Antidemote is now *${newState ? "ON ✅" : "OFF ❌"}* in this group.`);
  }
};
