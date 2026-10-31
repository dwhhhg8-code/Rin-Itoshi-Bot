/* Código hecho por I'm Fz `
 - https/Github.com/FzTeis
*/

import axios from 'axios';
import cheerio from 'cheerio';

const searchAnime = async (query) => {
    const url = `https://tioanime.com/directorio?q=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const results = [];

        $('ul.animes li').each((_, element) => {
            const name = $(element).find('h3.title').text().trim();
            const id = $(element).find('a').attr('href').split('/').pop();
            const image = $(element).find('img').attr('src');
            const animeUrl = `https://tioanime.com${$(element).find('a').attr('href')}`; 

            results.push({
                name,
                id,
                image: `https://tioanime.com${image}`,
                url: animeUrl, 
            });
        });

        return results;
    } catch (error) {
        console.error('خطأ في buscar el anime:', error.message);
        return { error: 'تعذّر الحصول على النتائج' };
    }
};

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `${emoji} من فضلك أدخل الاسم de un anime para buscar.`, m);
    }

    const results = await searchAnime(args[0]);
    if (results.length === 0) {
        return conn.reply(m.chat, `${emoji2} لا توجد نتائج.`, m);
    }

    const messages = [];
    for (const { name, id, url, image } of results) {
        messages.push([
            `Informacion del anime`,
            `Título: ${name}\n\n🔖 ID: ${id}\n*Usa este ID para descargar el anime o bien, selecciona una opción de la lista.*`,
            image,
            [],
            [[`${url}`]],
            [],
            [{ title: `اختر للحصول على معلومات الأنمي.`, rows: [
                { title: name, description: 'انقر للحصول على معلومات مفصلة عن الأنمي.', rowId: `${usedPrefix}animeinfo ${url}` }
            ]}]
        ]);
    }

    await conn.sendCarousel(m.chat, '', `\`\`\`🍭 ¡أهلاً! A continuación te muestro la lista de animes encontrados.\`\`\``, "", messages, m);
}

handler.help = ['animes', 'animesearch', 'animess'];
handler.command = ['animes', 'animesearch', 'animess'];
handler.tags = ['buscador'];
handler.premium = true;
handler.register = true;
handler.group = true;

export default handler;