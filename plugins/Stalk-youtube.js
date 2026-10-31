import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🍬 من فضلك أدخل un nombre de canal o usuario para buscar.\n\nEjemplo:\n> *${usedPrefix + command}* mahimking11`, m, rcanal);
  }

  await m.react('🕓');
  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/tools/ytstalk?channel=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.data) {
      await m.react('✖️');
      return await conn.reply(m.chat, '❌ لا توجد نتائج para este canal.', m);
    }

    const user = json.data;
    let txt = `📌 *DETALLES DEL CANAL*\n\n`;
    txt += `👤 *المستخدم:* ${user.username}\n`;
    txt += `🔖 *Suscriptores:* ${user.subscriber_count}\n`;
    txt += `📅 *الإجمالي de videos:* ${user.video_count}\n`;
    txt += `📜 *الوصف:* ${user.description || 'لا يوجد وصف'}\n`;
    txt += `🔗 *Canal:* ${user.channel}\n\n`;

    txt += `🎬 *Últimos videos:*\n\n`;
    user.others.forEach((video, index) => {
      txt += `📽️ *Video ${index + 1}*\n`;
      txt += `📌 *Título:* ${video.title}\n`;
      txt += `📅 *Publicado:* ${video.published}\n`;
      txt += `👀 *Vistas:* ${video.views}\n`;
      txt += `⏳ *Duración:* ${video.duration}\n`;
      txt += `🔗 *Ver video:* https://www.youtube.com/watch?v=${video.videoId}\n\n`;
    });

    await conn.sendMessage(m.chat, { image: { url: user.avatar }, caption: txt }, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, '⚠️ حدث خطأ أثناء المعالجة. حاول مرة أخرى لاحقاً.', m);
  }
};

handler.help = ['youtubestalk *<nombre de usuario>*'];
handler.tags = ['stalk'];
handler.command = ['youtubestalk', 'ytstalk'];
handler.register = true;

export default handler;
