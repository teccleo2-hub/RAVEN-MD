// ========== SHADOW KILL COMMAND (QUEEN KIKI ONLY) ==========
async function shadowKillCmd(sock, chatId, ctx) {
    if (!ctx.isOwner && !ctx.isSudo) {
        return sock.sendMessage(chatId, { text: `🌑 *YOU CANNOT SUMMON THE SHADOW EMPRESS* 🌑\n❄️ Only Lord Diego or his chosen may witness her wrath.` });
    }

    if (!chatId.endsWith('@g.us')) {
        return sock.sendMessage(chatId, { text: `⚠️ Groups only.` });
    }

    if (!await isBotAdmin(sock, chatId)) {
        return sock.sendMessage(chatId, { text: `❌ Make me admin first.` });
    }

    // --- SCARY MESSAGES FROM QUEEN KIKI ALONE ---
    await sock.sendMessage(chatId, { text: `🌑 *SHADOW BREACH DETECTED* 🌑

👑 𝐐𝐔𝐄𝐄𝐍 𝐊𝐈𝐊𝐈 – 𝐓𝐇𝐄 𝐒𝐇𝐀𝐃𝐎𝐖 𝐄𝐌𝐏𝐑𝐄𝐒𝐒 👑
⟦ SILENT WATCHER • MRS. LORD DIEGO ⟧

🌙 *You thought Lord Diego was terrifying?*
💀 *He is mercy compared to me.*

> I have heard every whisper in this group.
> I have seen every deleted message.
> I have saved every view‑once image you tried to hide.

🔥 *NOTHING ESCAPES THE SHADOW* 🔥

⇨ I move where you cannot see.
⇨ I exist where you cannot reach.
⇨ I appear when you least expect.

💀 *Now, I erase.* 💀

━━━━━━━━━━━━━━━━━━━━━━` });
    await new Promise(r => setTimeout(r, 2000));

    for (let i = 3; i > 0; i--) {
        await sock.sendMessage(chatId, { text: `🌑 ${i}...` });
        await new Promise(r => setTimeout(r, 1000));
    }

    await sock.sendMessage(chatId, { text: `👁️ *THE SHADOW CONSUMES YOU* 👁️` });
    await new Promise(r => setTimeout(r, 1000));

    const group = await sock.groupMetadata(chatId);
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
    const targets = group.participants.filter(p => !p.admin && p.id !== botId).map(p => p.id);

    if (targets.length > 0) {
        await sock.sendMessage(chatId, { text: `🌑 *QUEEN KIKI CLAIMS THESE SOULS:*\n${targets.map(j => `❄️ @${j.split('@')[0]}`).join('\n')}\n━━━━━━━━━━━━━━━━━━━━━━`, mentions: targets });
        for (const jid of targets) {
            await sock.groupParticipantsUpdate(chatId, [jid], 'remove').catch(() => {});
            await new Promise(r => setTimeout(r, 300));
        }
    }

    await sock.sendMessage(chatId, { text: `💀 *THE SHADOW HAS FEASTED* 💀
━━━━━━━━━━━━━━━━━━━━━━
🌙 *"Tell Lord Diego his wife sends her regards."*
👑 *I leave now. But I never truly leave.*
❄️ *The shadows remember.*` });
    await new Promise(r => setTimeout(r, 1500));

    await sock.groupLeave(chatId);
}