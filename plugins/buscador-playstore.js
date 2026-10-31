
import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '🤖 من فضلك، proporciona الاسم de la aplicación que deseas buscar.\nEjemplo: .playstore WhatsApp', m);
  }

  const query = args.join(' ');
  const apiUrl = `https://api.vreden.my.id/api/playstore?query=${encodeURIComponent(query)}`;

  try {
    await m.react('⏳');

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data || !data.result || data.result.length === 0) {
      return conn.reply(m.chat, '❌ لم يتم العثور على aplicaciones. Intenta con otro nombre.', m);
    }

    let results = `📱 *النتيجةs de la búsqueda en Play Store para:* ${query}\n\n`;
    data.result.forEach((app, index) => {
      results += `🔗 [Enlace ${index + 1}](${app.link || 'Enlace غير متاح'})\n`;
    });

    await conn.reply(m.chat, results.trim(), m);
    await m.react('✅');

  } catch (error) {
    console.error('خطأ في realizar la búsqueda:', error);
    await m.react('❌'); 

    conn.reply(m.chat, `❌ حدث خطأ al realizar la búsqueda: ${error.message}`, m);
  }
};

handler.command = ['playstore'];
handler.help = ['playstore <nombre>'];
handler.tags = ['search'];
handler.register = true;

export default handler;
