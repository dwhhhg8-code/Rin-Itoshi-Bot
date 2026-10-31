import fetch from 'node-fetch';

let handler = async (m, { text }) => {
  if (!text) {
    m.reply(`${emoji} من فضلك، proporciona el termino de búsqueda que deseas realizar a *Google*.`);
    return;
  }

  const apiUrl = `https://delirius-apiofc.vercel.app/search/googlesearch?query=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status) {
      m.reply('خطأ في realizar la búsqueda.');
      return;
    }

    let replyMessage = `${emoji2} النتيجةs de la búsqueda:\n\n`;
    result.data.slice(0, 1).forEach((item, index) => {
      replyMessage += `☁️ *${index + 1}. ${item.title}*\n`;
      replyMessage += `📰 *${item.description}*\n`;
      replyMessage += `🔗 URL: ${item.url}`;
    });

m.react('✅')

    m.reply(replyMessage);
  } catch (error) {
    console.error(`${msm} خطأ في realizar la solicitud a la API:`, error);
    m.reply(`${msm} حدث خطأ al obtener النتائج.`);
  }
};

handler.command = ['google'];

export default handler;