import axios from "axios";
const {
  proto,
  generateWAMessageFromContent,
  generateWAMessageContent,
} = (await import("@whiskeysockets/baileys")).default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return conn.reply(
      m.chat,
      `🌿 *أدخل un texto para buscar en TikTok.*\n\n📌 Ejemplo:\n> ${usedPrefix + command} edits de Kaiser`,
      m,
      rcanal
    );

  const createVideoMessage = async (url) => {
    try {
      const { data } = await axios.get(url, { responseType: "arraybuffer" });
      const buffer = Buffer.from(data);
      const { videoMessage } = await generateWAMessageContent(
        { video: buffer },
        { upload: conn.waUploadToServer }
      );
      return videoMessage;
    } catch {
      return null;
    }
  };

  try {
    m.react("⏳");

    const apiUrl = `https://api.starlights.uk/api/search/tiktok?text=${encodeURIComponent(
      text
    )}`;
    const res = await axios.get(apiUrl);
    const data = res.data;

    if (!data?.status || !data?.result?.data?.length)
      throw new Error("❌ لا توجد نتائج en TikTok.");

    let results = data.result.data.slice(0, 6);
    let cards = [];

    for (let v of results) {
      let info = `🎬 *Título:* ${v.title || "بدون عنوان"}
👤 *المطوّر:* ${v.creator || "Desconocido"}
🌎 *Región:* ${v.region || "N/A"}
🕒 *Duración:* ${v.duration || 0} segundos
📅 *Publicado:* ${v.create_time || "N/A"}

📈 *Vistas:* ${v.views?.toLocaleString() || 0}
❤️ *Likes:* ${v.likes?.toLocaleString() || 0}
💬 *Comentarios:* ${v.comments?.toLocaleString() || 0}
🔁 *Compartidos:* ${v.share?.toLocaleString() || 0}
⬇️ *تنزيلs:* ${v.download?.toLocaleString() || 0}

🎵 *الصوت:* ${v.music ? v.music.split("/").pop() : "Sin información"}
🔗 *Enlace:* ${v.url || "غير متاح"}`;

      let videoMsg = await createVideoMessage(v.nowm);
      if (!videoMsg) continue;

      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: info }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: "🌸 Fuente: 𝚂𝙷𝙰𝙳𝙾𝚆-𝙽𝙴𝚇",
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: v.title || "Video TikTok",
          hasMediaAttachment: true,
          videoMessage: videoMsg,
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
          {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "🍉 𝘝𝘌𝘙 𝘌𝘕 𝘛𝘐𝘒𝘛𝘖𝘒",
                  url: v.url || v.nowm,
                }),
              },
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "🕸️ 𝘊𝘏𝘈𝘕𝘕𝘌𝘓 - 𝘖𝘍𝘊",
                  url: 'https://whatsapp.com/channel/0029VbBPa8EFsn0aLfyZl23j',
                }),
              },
            ],
          }
        ),
      });
    }

    if (cards.length === 0)
      throw new Error("⚠️ تعذّر procesar ningún video.");

    const msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `🌺 *النتيجةs de TikTok para:* ${text}`,
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "🌿 FLASH BOT ✨",
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                hasMediaAttachment: false,
              }),
              carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject(
                { cards }
              ),
            }),
          },
        },
      },
      { quoted: m }
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    m.react("✅");
  } catch (e) {
    console.error(e);
    conn.reply(
      m.chat,
      `*خطأ في buscar en TikTok:*\n${e.message}`,
      m
    );
  }
};

handler.help = ["tiktoksearch <texto>"];
handler.tags = ["buscador"];
handler.command = ["tiktoksearch", "ttsearch", "tiktoks"];
handler.register = true;
handler.group = true;
handler.coin = 2

export default handler;