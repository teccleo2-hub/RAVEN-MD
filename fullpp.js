const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { downloadContentFromMessage } = require('@ostyado/baileys');

module.exports = {
  command: "fullpp",
  desc: "Set full profile picture without cropping",
  category: "Owner",
  usage: ".fullpp (reply to an image)",
  run: async ({ m, isOwner, trashcore, xreply }) => {
    if (!isOwner) return await xreply("❌ Only the owner can use this command.");

    try {
      const quotedMsg = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (!quotedMsg || !quotedMsg.imageMessage) {
        return await xreply("📌 Reply to an *image* to set it as the bot profile picture.");
      }

      await xreply("📸 Updating profile picture...");
      const stream = await downloadContentFromMessage(quotedMsg.imageMessage, 'image');
      let buffer = Buffer.from([]);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
      const image = await Jimp.read(buffer);
      const maxDim = Math.max(image.bitmap.width, image.bitmap.height);
      const square = new Jimp(maxDim, maxDim, 0xffffffff); 
      square.composite(image, (maxDim - image.bitmap.width) / 2, (maxDim - image.bitmap.height) / 2);

      const tempFile = path.join(os.tmpdir(), `dp_${Date.now()}.jpg`);
      await square.writeAsync(tempFile);
      await trashcore.updateProfilePicture(trashcore.user.id, { url: tempFile });

      fs.unlinkSync(tempFile);
      await xreply("✅ Bot profile picture updated successfully (no crop).");

    } catch (err) {
      console.error("❌ fullpp error:", err);
      await xreply("💥 Failed to update bot profile picture.");
    }
  }
};