import fetch from "node-fetch";

let handler = async (m, { text }) => {
  if (!text) return m.reply("*💥 أدخل un texto para usar copilot.*");

  try {
    let url = `https://api.nekolabs.my.id/ai/copilot?text=${encodeURIComponent(text)}`;
    let res = await fetch(url);
    let data = await res.json();

    if (!data.status) throw new Error("❌ خطأ في الـ API");

    let reply = data.result.text;
    await m.reply(reply);
  } catch (e) {
    console.error(e);
    m.reply("⭐ خطأ في جلب respuesta de la IA.");
  }
};

handler.help = ["copilot *<texto>*"];
handler.tags = ["ai"];
handler.command = ["copilot"];
export default handler;