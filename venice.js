const axios = require("axios");

module.exports = {
  command: "diego",
  desc: "AI response using Venice API",
  category: "AI",
  usage: ".diego <message>",

  run: async ({ args, xreply }) => {
    try {
      const text = args.join(" ");
      if (!text) return await xreply("❌ Please enter a message. Example: `.Diego hello`");

      const apiURL = `https://apiskeith.vercel.app/ai/venice?q=${encodeURIComponent(text)}`;
      const response = await axios.get(apiURL);

      const result = response.data?.result;
      if (!result) return await xreply("⚠️ Diego API returned no response.");

      return await xreply(result);

    } catch (err) {
      console.error("❌ Diego API Error:", err.message);
      return await xreply("💥 Diego AI is unavailable right now. Try again later.");
    }
  },
};