import cheerio from 'cheerio';
import axios from 'axios';

let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat];
    if (chat.isBanned) return;

    let movieName = m.text.split('.gnula ')[1]; //
    if (!movieName) {
        return conn.sendMessage(m.chat, { text: 'من فضلك، proporciona الاسم de la película.' }, { quoted: m });
    }

    let searchUrl = `https://gnulahd.nu/?s=${encodeURIComponent(movieName)}`;

    try {
        const { data } = await axios.get(searchUrl);
        const $ = cheerio.load(data);
        const results = [];

        if ($('.post').length === 0) {
            return conn.sendMessage(m.chat, { text: 'لا توجد نتائج para esa película.' }, { quoted: m });
        }

        $('.post').each((i, element) => {
            const titulo = $(element).find('h2 a').attr('title')?.replace('Permanent Link to ', '') || 'Título غير متاح';
            const fechaPublicacion = $(element).find('.time span').text().trim() || 'التاريخ غير متاح';
            const autor = $(element).find('.date span').text().replace('posted by ', '').trim() || 'Autor غير متاح';
            const imagen = $(element).find('.entry img').attr('src') || 'الصورة غير متاح';
            const enlace = $(element).find('h2 a').attr('href') || 'Enlace غير متاح';
            const sinopsis = $(element).find('p').eq(1).text().trim() || 'Sinopsis غير متاح';
            const iframeSrc = $(element).find('iframe').attr('src');

            results.push({
                titulo,
                fechaPublicacion,
                autor,
                imagen,
                enlace,
                sinopsis,
                iframeSrc
            });
        });

        for (const movie of results) {
            if (movie.iframeSrc) {
                const iframeData = await getIframeDetails(movie.iframeSrc);
                movie.idioma = iframeData.idioma;
                movie.calidad = iframeData.calidad;
                movie.enlaceDescarga = iframeData.enlaceDescarga;
            } else {
                movie.idioma = 'غير متاح';
                movie.calidad = 'غير متاح';
                movie.enlaceDescarga = 'غير متاح';
            }
        }

        const formattedResults = results.map(movie => 
            `🎬 Título: ${movie.titulo}\n` +
            `📅 Publicado: ${movie.fechaPublicacion}\n` +
            `🖋️ Autor: ${movie.autor}\n` +
            `📖 Sinopsis: ${movie.sinopsis}\n` +
            `🖼️ الصورة: ${movie.imagen}\n` +
            `🔗 Enlace: ${movie.enlace}\n` +
            `🎞️ Idioma: ${movie.idioma}\n` +
            `📺 الجودة: ${movie.calidad}\n` +
            `⬇️ تنزيلr: ${movie.enlaceDescarga}`
        ).join('\n\n');

        const output = `${formattedResults}\n\n> Zamas-Bot`;

        conn.sendMessage(m.chat, { text: output }, { quoted: m });
    } catch (error) {
        console.error(error);
        conn.sendMessage(m.chat, { text: 'حدث خطأ al buscar: ' + error.message }, { quoted: m });
    }
};

const getIframeDetails = async (iframeUrl) => {
    try {
        const { data } = await axios.get(iframeUrl);
        const $ = cheerio.load(data);
        const idioma = $('td:contains("subtitulado")').text().trim() || 'غير متاح';
        const calidad = $('td span').text().trim() || 'غير متاح';
        const enlaceDescarga = $('a.btn-download2').attr('href') || 'غير متاح';

        return {
            idioma,
            calidad,
            enlaceDescarga
        };
    } catch (error) {
        console.error(`خطأ في جلب detalles del iframe: ${error.message}`);
        return {};
    }
};

handler.help = ['gnula'];
handler.tags = ['buscador'];
handler.command = ['gnula'];
handler.premium = false;
handler.register = true;

export default handler;
