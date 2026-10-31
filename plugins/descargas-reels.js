import fetch from "node-fetch";
import baileys from "@whiskeysockets/baileys";

const { proto, generateWAMessageFromContent, generateWAMessageContent } = baileys;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🎋 أدخل un nombre para buscar *Reels de Instagram*`);

  await m.react("⏳");
  await conn.sendMessage(m.chat, { text: "*🔎 جارٍ البحث Reels de Instagram...* 🗿" }, { quoted: fkontak });

  try {
    let res = await fetch(
      `https://api.vreden.my.id/api/v1/search/instagram/reels?query=${encodeURIComponent(text)}`
    );
    let json = await res.json();

    if (!json.status || !json.result?.search_data?.length) {
      await m.react("❌");
      return m.reply("لا توجد نتائج.");
    }

    let reels = json.result.search_data.slice(0, 6);

    async function createVideoMessage(url) {
      const { videoMessage } = await generateWAMessageContent({ video: { url } }, { upload: conn.waUploadToServer });
      return videoMessage;
    }

    let cards = [];
    for (let [i, r] of reels.entries()) {
      let video = await createVideoMessage(r.video || r.links);

      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `🌱 Usuario: @${r.profile?.username || "desconocido"}\n🍏 ${r.caption || "لا يوجد وصف"}\n❤️ ${r.statistics?.like_count || 0} | 🌾 ${r.statistics?.comment_count || 0} | 🌿 ${r.statistics?.play_count || 0}`,
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: "⚽ Instagram Reels",
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: "📹 Reel #" + (i + 1),
          hasMediaAttachment: true,
          videoMessage: video,
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "📢 Canal oficial",
                url: "https://whatsapp.com/channel/0029Vb8QIpSJ3juu0VHRyU0v",
                merchant_url: "https://whatsapp.com/channel/0029Vb8QIpSJ3juu0VHRyU0v",
              }),
            },
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌷 Ver en Instagram",
                url: r.links,
                merchant_url: r.links,
              }),
            },
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copiar Link",
                url: r.links,
                merchant_url: r.links,
              }),
            },
          ],
        }),
      });
    }

    const msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.create({
                text: "✨ النتيجةs encontrados:",
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "⚽ Instagram Reels Downloader",
              }),
              carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                cards,
              }),
            }),
          },
        },
      },
      { quoted: m }
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    await m.react("✅");
  } catch (e) {
    console.error(e);
    await m.react("❌");
    m.reply("خطأ في جلب los Reels.");
  }
};

handler.help = ["reels <texto>"];
handler.tags = ["downloader"];
handler.command = ["reels", "instareels"];

export default handler;