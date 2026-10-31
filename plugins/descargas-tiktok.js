import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `*🌸✨ Onichan~ debes poner رابط TikTok uwu 💖*`, m, fake);
  }

  try {
    const tiktokData = await tiktokdl(args[0]);

    if (!tiktokData || !tiktokData.status || !tiktokData.data) {
      return conn.reply(m.chat, "❌ Uff... تعذّر جلب الفيديو onichan 😿", m);
    }

    const thumbRes = await fetch('https://qu.ax/QvZCV.jpg');
    const thumbBuffer = await thumbRes.buffer();

    const fkontak = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo"
      },
      message: {
        locationMessage: {
          name: ` • 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙰𝙳𝙰 •`,
          jpegThumbnail: thumbBuffer
        }
      },
      participant: "0@s.whatsapp.net"
    };

    const data = tiktokData.data;
    const videoURL = data.meta.media[0]?.hd || data.meta.media[0]?.org;

    if (videoURL) {
      await conn.sendFile(
        m.chat,
        videoURL,
        "tiktok.mp4",
        `╭━━━〔 🩵 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎́𝐍 𝐃𝐄𝐋 𝐕𝐈𝐃𝐄𝐎 🩵 〕━━⬣
│ 🍧 *Título:* \`${data.title || 'لا يوجد وصف'}\`
│
│ ╭─❏ ＥＳＴＡＤＯ ❏
│ │ 🍂 *Autor:* ${data.author?.nickname || 'Desconocido'} (${data.author?.username || 'N/A'})
│ │ 🆔 *ID Autor:* ${data.author?.id || 'N/A'}
│ │ 🏳️ *Región:* ${data.region || 'N/A'}
│ │ 📅 *Publicado:* ${data.published || 'Desconocido'}
│ ╰───────────────⬣
│
│ ╭─❏ ＳＴＡＴＳ ❏
│ │ 🔥 *Likes:* ${data.like || '0'}
│ │ 💬 *Comentarios:* ${data.comment || '0'}
│ │ 👀 *Vistas:* ${data.repro || '0'}
│ │ 📤 *Compartido:* ${data.share || '0'}
│ │ 📥 *تنزيلs:* ${data.download || '0'}
│ ╰───────────────⬣
│
│ ╭─❏ ＭＵＳＩＣＡ ❏
│ │ 🎶 *Título:* ${data.music?.title || 'Desconocido'}
│ │ 👤 *Autor:* ${data.music?.author || 'Desconocido'}
│ │ ⏳ *Duración:* ${data.music?.duration || 'N/A'} seg
│ ╰───────────────⬣
│
│ ╭─❏ ＶＩＤＥＯ ❏
│ │ 📺 *Duración:* ${data.duration || '0'} seg
│ │ ⚡ *Tamaño HD:* ${data.meta.media[0]?.size_hd || 'N/A'}
│ │ 📂 *Original:* ${data.meta.media[0]?.size_org || 'N/A'}
│ │ 🚫 *Marca de agua:* ${data.meta.media[0]?.size_wm || 'N/A'}
│ ╰───────────────⬣
│
│ ╭─❏ ＩＮＦＯ ❏
│ │ ⚙️ *Proceso:* ${(tiktokData.process * 100).toFixed(2)}%
│ ╰───────────────⬣
╰━━━━━━━━━━━━━━━━━━━━━━⬣`,
        fkontak
      );
    } else {
      return conn.reply(m.chat, "❌ No pude descargarlo nya~ 😿", m);
    }
  } catch (error1) {
    return conn.reply(m.chat, `❌ خطأ inانتظرdo: ${error1.message}`, m);
  }
};

handler.help = ['tiktok'].map((v) => v + ' *<link>*');
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt'];
handler.register = true;
handler.coin = 2;
handler.limit = true;

export default handler;

async function tiktokdl(url) {
  let api = `https://api.delirius.store/download/tiktok?url=${encodeURIComponent(url)}`;
  let response = await (await fetch(api)).json();
  return response;
}