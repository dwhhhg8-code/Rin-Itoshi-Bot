import fs from 'fs';
import fetch from 'node-fetch';

let apkSession = new Map();

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command === 'apk2' && text) {
    try {
      await m.react('🔍');

      const response = await fetch(`https://delirius-apiofc.vercel.app/download/apk?query=${encodeURIComponent(text)}`);
      const data = await response.json();
      if (!data.status || !data.data) throw new Error("لم يتم العثور على la aplicación.");

      const app = data.data;
      apkSession.set(m.chat, { app });

      let description = `🍧 *الاسم:* ${app.name}
🌱 *Desarrollador:* ${app.developer}
📦 *Paquete:* ${app.id}
⚙️ *Tamaño:* ${app.size}
⭐ *Rating:* ${app.stats?.rating?.average || "N/A"} (${app.stats?.rating?.total || 0} votos)
📅 *Publicado:* ${app.publish}
⚽ *تنزيلs:* ${app.stats?.downloads?.toLocaleString() || "N/A"}
🏪 *Tienda:* ${app.store?.name || "Desconocida"}`;

      const buttons = [
        {
          buttonId: `${usedPrefix}apk_download`,
          buttonText: { displayText: "☃️ 𝐃𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐫 𝐚𝐩𝐤" },
          type: 1
        }
      ];

      await m.react('✅');
      await conn.sendMessage(
        m.chat,
        {
          image: { url: app.image },
          caption: description.trim(),
          buttons,
          footer: dev,
          viewOnce: true
        },
        { quoted: m }
      );

    } catch (error) {
      console.error("خطأ:", error);
      await m.react('❌');

      await conn.sendMessage(
        m.chat,
        { text: `❌ حدث خطأ: ${error.message || "خطأ غير معروف"}` },
        { quoted: m }
      );
    }
    return;
  }

  if (command === 'apk_download') {
    let session = apkSession.get(m.chat);
    if (!session) {
      return conn.sendMessage(
        m.chat,
        { text: `❗ No hay sesión activa. Usa ${usedPrefix}apk2 <nombre de la aplicación>.` },
        { quoted: m }
      );
    }

    let { app } = session;
    const downloadUrl = app.download;

    try {
      await m.react('⌛');

      let caption = dev;

      await conn.sendMessage(
        m.chat,
        {
          document: { url: downloadUrl },
          fileName: `${app.name}.apk`,
          mimetype: 'application/vnd.android.package-archive',
          caption: caption.trim(),
          contextInfo: {
            externalAdReply: {
              title: "𝐒𝐡𝐚𝐝𝐨𝐰_°𝐱𝐲𝐳",
              body: " 🅁🄸🄽 🄸🅃🄾🅂🄷🄸 🄱🄾🅃 🄼🄳",
              sourceUrl: app.store?.avatar || null,
              thumbnailUrl: app.image,
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        },
        { quoted: m }
      );

      await m.react('☑️');

    } catch (err) {
      console.error("خطأ en descarga:", err);
      await m.react('❌'); 

      await conn.sendMessage(
        m.chat,
        { text: `تعذّر descargar الملف.` },
        { quoted: m }
      );
    }

    return;
  }

  if (command === 'apk2' && !text) {
    return conn.sendMessage(
      m.chat,
      {
        text: `❗ أدخل un término de búsqueda.\n\n💚 Ejemplo:\n${usedPrefix}apk2 WhatsApp`
      },
      { quoted: m }
    );
  }
};

handler.tags = ['descargas'];
handler.help = ['apk2', 'apk_download'];
handler.command = ['apk2', 'apk_download'];

export default handler;