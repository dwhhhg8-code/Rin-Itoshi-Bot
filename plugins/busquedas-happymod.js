import fetch from 'node-fetch';

const api = "https://dark-core-api.vercel.app/api/search/happymod?key=api&text=";

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '☃️ أدخل النص de lo que quieres buscar en Happymod.\n\nEjemplo:\n' + `> *${usedPrefix + command}* minecraft`, m, rcanal);
  await m.react('🕓');

  try {
    let url = `${api}${encodeURIComponent(text)}`;
    let res = await fetch(url);
    let json = await res.json();

    if (!json.success) {
      return conn.reply(m.chat, 'لا توجد نتائج لبحثك.', m);
    }

    let txt = '`乂  H A P P Y M O D  -  B Ú S Q U E`';

    for (let i = 0; i < json.results.length; i++) {
      let result = json.results[i];
      txt += `\n\n`;
      txt += `  *» Nro* : ${i + 1}\n`;
      txt += `  *» Titulo* : ${result.name}\n`;
      txt += `  *» التقييم* : ${result.stars}\n`;
      txt += `  *» Enlace* : ${result.link}\n`;
      txt += `  *» الوصف* : ${result.description}\n`;
      txt += `  *» الصورة* : ${result.image}\n`;
    }

    await conn.reply(m.chat, txt, m, rcanal);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
}

handler.help = ['happymodsearch *<búsqueda>*'];
handler.tags = ['search'];
handler.command = ['happymodsearch'];
handler.register = true;

export default handler;