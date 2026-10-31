import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `✨ من فضلك أدخل un término de búsqueda.\n\nEjemplo:\n> *${usedPrefix + command}* blackpink`, m, rcanal);
  }

  await m.react('🕓');
  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/search/movie?query=${text}`);
    const json = await res.json();

    if (!json.status || !json.data || json.data.length === 0) {
      await m.react('✖️');
      return await conn.reply(m.chat, 'لا توجد نتائج لهذا البحث.', m);
    }

    let txt = '`🎬 النتيجةs de la búsqueda`\n\n';
    json.data.forEach((movie, index) => {
      txt += `✩ ${index + 1}. *Título:* ${movie.title}\n`;
      txt += `✩  *التاريخ de lanzamiento:* ${movie.release_date}\n`;
      txt += `✩  *التقييم:* ${movie.vote_average} (${movie.vote_count} votos)\n`;
      txt += `✩  *Resumen:* ${movie.overview}\n`;
      txt += `✩  *الصورة:* ${movie.image}\n`;
      txt += `✩  *Enlace:* ${movie.video ? 'Ver video' : 'Sin video متاح'}\n\n`;
    });

    await conn.reply(m.chat, txt, m, rcanal);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'حدث خطأ أثناء المعالجة. حاول مرة أخرى لاحقاً.', m);
  }
};

handler.help = ['movie <término>'];
handler.tags = ['search'];
handler.command = ['movie', 'moviepelicula', 'buscarpeliculamovie'];
handler.register = true;

export default handler;