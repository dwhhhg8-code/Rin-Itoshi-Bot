import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🧇 من فضلك أدخل un nombre de usuario para buscar.\n\nEjemplo:\n> *${usedPrefix + command}* Vegeta_Sola`, m);
  }

  await m.react('🕓');
  try {
    const res = await fetch(`https://api.nexfuture.com.br/api/outros/kwstalk?query=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.resultado) {
      await m.react('✖️');
      return await conn.reply(m.chat, '❌ لا توجد نتائج لهذا البحث.', m);
    }

    const user = json.resultado;
    let txt = `📌 *K W A I  -  S T A L K*\n\n`;
    txt += `👤 *الاسم:* ${user.nome}\n`;
    txt += `🔖 *المستخدم:* ${user.nome_usuario}\n`;
    txt += `📅 *Cuenta creada:* ${new Date(user.data_criacao).toLocaleDateString('es-ES')}\n`;
    txt += `📜 *Bio:* ${user.bio || 'لا يوجد وصف'}\n`;
    txt += `👥 *Seguidores:* ${user.seguidores.toLocaleString()}\n`;
    txt += `🔄 *Siguiendo:* ${user.seguindo.toLocaleString()}\n`;
    txt += `❤️ *Me gusta totales:* ${user.curtidas.toLocaleString()}\n`;
    txt += `🎥 *Videos publicados:* ${user.total_videos}\n`;
    txt += `🔗 *Perfil:* ${user.url_perfil}\n\n`;

    txt += `🎬 *Últimos videos:*\n\n`;
    user.videos.forEach((video, index) => {
      txt += `📽️ *Video ${index + 1}*\n`;
      txt += `📌 *Título:* ${video.titulo}\n`;
      txt += `📝 *الوصف:* ${video.descricao || 'لا يوجد وصف'}\n`;
      txt += `⏳ *Duración:* ${video.duracao.replace('PT', '').toLowerCase()}\n`;
      txt += `❤️ *Likes:* ${video.curtidas.toLocaleString()}\n`;
      txt += `💬 *Comentarios:* ${video.comentarios.toLocaleString()}\n`;
      txt += `🔄 *Compartidos:* ${video.compartilhamentos.toLocaleString()}\n`;
      txt += `📌 *Ver video:* ${video.url}\n\n`;
    });

    await conn.sendMessage(m.chat, { image: { url: user.foto_perfil }, caption: txt }, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, '⚠️ حدث خطأ أثناء المعالجة. حاول مرة أخرى لاحقاً.', m);
  }
};

handler.help = ['kwaistalk *<usuario>*'];
handler.tags = ['stalk'];
handler.command = ['kwaistalk', 'kwstalk'];
handler.register = true;

export default handler;