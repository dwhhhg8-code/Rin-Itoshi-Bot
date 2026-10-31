import axios from 'axios';

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '🍓 من فضلك أدخل رابط de Kwai.', m, rcanal);
  }

  const kwaiUrl = args[0];
  let res;

  try {
    await m.react('🍟');
    res = await axios.get(`https://api.nexfuture.com.br/api/downloads/kwai/dl?url=${kwaiUrl}`);
  } catch (e) {
    return conn.reply(m.chat, 'خطأ في جلب datos. Verifica الرابط.', m);
  }

  const result = res.data;
  if (!result.status) {
    return conn.reply(m.chat, 'لا توجد نتائج أو حدث خطأ.', m);
  }

  const videoTitle = result.resultado.titulo;
  const videoDescription = result.resultado.descricao;
  const videoCreator = result.resultado.criador.nome;
  const videoUrl = result.resultado.video;
  const thumbnailUrl = result.resultado.thumbnail;

  if (!videoUrl) {
    return conn.reply(m.chat, 'لم يتم العثور على رابط فيديو صالح.', m);
  }

  const caption = `
*🎥 Título:* ${videoTitle}
*الوصف:* ${videoDescription}
*Creado por:* ${videoCreator}
*Publicado:* ${new Date(result.resultado.publicado).toLocaleString()}
  `.trim();

  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: caption, thumbnail: thumbnailUrl, mimetype: 'video/mp4' }, { quoted: m });
      await m.react('✅');
      break;
    } catch (e) {
      if (attempt === maxRetries) {
        await m.react('❌');
        return conn.reply(m.chat, 'خطأ في إرسال الفيديو بعد عدة محاولات.', m);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

handler.help = ['kwai'];
handler.tags = ['descargas'];
handler.command = ['kwai', 'kwaidl'];
handler.register = true;

export default handler;