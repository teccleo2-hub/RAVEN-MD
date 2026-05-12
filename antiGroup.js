const { getSetting } = require("../database");

const URL_REGEX = /(https?:\/\/|www\.|chat\.whatsapp\.com)[^\s]*/i;

module.exports = function initAntiGroup(sock) {
  const botId = () => sock.user?.id?.split(":")[0] + "@s.whatsapp.net";

  // ===== ANTILINK =====
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    const m = messages?.[0];
    if (!m?.message || !m.key.remoteJid?.endsWith("@g.us")) return;

    const chat = m.key.remoteJid;
    if (!getSetting(`antilink_${chat}`, false)) return;

    const text =
      m.message?.conversation ||
      m.message?.extendedTextMessage?.text ||
      m.message?.imageMessage?.caption ||
      m.message?.videoMessage?.caption || "";

    if (!URL_REGEX.test(text)) return;

    try {
      const group = await sock.groupMetadata(chat);
      const sender = m.key.participant || m.key.remoteJid;
      const isAdmin = group.participants.some(
        p => p.id === sender && p.admin
      );
      if (isAdmin) return;

      await sock.sendMessage(chat, {
        delete: m.key
      });

      await sock.sendMessage(chat, {
        text: `⚠️ @${sender.split("@")[0]}, links are *not allowed* in this group!`,
        mentions: [sender]
      });
    } catch (err) {
      console.error("Antilink Error:", err.message);
    }
  });

  // ===== ANTIDEMOTE / ANTIPROMOTE =====
  sock.ev.on("group-participants.update", async ({ id, participants, action }) => {
    const chat = id;

    // ANTIDEMOTE — if bot gets demoted, try to re-promote itself
    if (action === "demote" && getSetting(`antidemote_${chat}`, false)) {
      const bot = botId();
      if (participants.includes(bot)) {
        try {
          await sock.groupParticipantsUpdate(chat, [bot], "promote");
          await sock.sendMessage(chat, {
            text: "🛡️ *Antidemote triggered!* I re-promoted myself."
          });
        } catch (err) {
          console.error("Antidemote Error:", err.message);
        }
      }
    }

    // ANTIPROMOTE — demote any newly promoted non-owner member
    if (action === "promote" && getSetting(`antipromote_${chat}`, false)) {
      try {
        const group = await sock.groupMetadata(chat);
        const bot = botId();
        const botIsAdmin = group.participants.some(
          p => p.id === bot && p.admin
        );
        if (!botIsAdmin) return;

        // Demote them back
        await sock.groupParticipantsUpdate(chat, participants, "demote");
        await sock.sendMessage(chat, {
          text: `🛡️ *Antipromote triggered!* Unauthorized promotion reversed.`
        });
      } catch (err) {
        console.error("Antipromote Error:", err.message);
      }
    }
  });

  console.log("✅ AntiGroup (antilink, antidemote, antipromote) active");
};
