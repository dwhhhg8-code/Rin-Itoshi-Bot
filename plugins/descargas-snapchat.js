import axios from 'axios';

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '👻 من فضلك أدخل رابط de Snapchat.', m, rcanal);
  }

  const snapchatUrl = args[0];
  let res;

  try {
    await m.react('🕓');
    res = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/snapchat-DL?url=${snapchatUrl}`);
  } catch (e) {
    return conn.reply(m.chat, 'خطأ في جلب datos. Verifica الرابط.', m);
  }

  const result = res.data;
  if (!result || !result.data || !result.data.url) {
    return conn.reply(m.chat, 'لا توجد نتائج أو حدث خطأ.', m);
  }

  const videoUrl = result.data.url;

  if (!videoUrl) {
    return conn.reply(m.chat, 'لم يتم العثور على رابط فيديو صالح.', m);
  }

  const caption = `*🥥 𝐴𝑞𝑢í 𝑒𝑠𝑡𝑎 𝑡𝑢 𝑣𝑖𝑑𝑒𝑜 𝑑𝑒 𝑆𝑛𝑎𝑝𝑐𝒉𝑎𝑡..*`;
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption }, { quoted: m });
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

handler.help = ['snapchat'];
handler.tags = ['descargas'];
handler.command = ['snapchat', 'snapdl', 'snap'];
handler.register = true;
handler.coin = 2;

export default handler;