import { makeWASocket } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (/image/.test(mime)) {
    let img = await q.download();
    if (!img) return m.reply(`${emoji} Te faltó الصورة para el perfil dالمجموعة.`);

    try {
      await conn.updateProfilePicture(m.chat, img);
      m.reply(`${emoji} Perfecto.`);
      m.react(done)
    } catch (e) {
      m.reply(`︎${msm} حدث خطأ: ${e.message}`);
    }
  } else {
    return m.reply(`${emoji} Te faltó الصورة para cambiar el perfil dالمجموعة.`);
  }
};

handler.command = ['gpbanner', 'groupimg'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;