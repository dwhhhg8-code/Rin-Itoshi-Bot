import axios from 'axios';
import baileys from '@whiskeysockets/baileys';

const { generateWAMessageFromContent, proto } = baileys;

const handler = async (m, { conn, text, channelRD }) => {
  if (!text) return m.reply('🎃 *أدخل الاسم de الأغنية o artista que deseas buscar en SoundCloud.*');

  try {
    await m.react('⏳');

    const searchRes = await axios.get('https://delirius-apiofc.vercel.app/search/soundcloud', {
      params: { q: text, limit: 1 }
    });

    const song = searchRes.data.data[0];
    if (!song) return m.reply('❌ No encontré resultados para esa búsqueda en SoundCloud.');

    const dlRes = await axios.get('https://api.siputzx.my.id/api/d/soundcloud', {
      params: { url: song.link }
    });

    if (!dlRes.data.status) return m.reply('> تعذّر descargar el audio. Intenta con otra canción.');

    const audio = dlRes.data.data;

    const fake = {
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          newsletterName: channelRD?.name,
          serverMessageId: '-1'
        }
      }
    };

    const caption = `
             🎶 SOUND CLOUD 🎶
 🎧 *Título:* ${audio.title || 'Desconocido'}
 👤 *Artista:* ${audio.user || 'Desconocido'}
 ⏱ *Duración:* ${msToTime(audio.duration) || 'Desconocido'}
 📝 *الوصف:* ${audio.description || 'لا يوجد وصف'}
 🔗 *Link:* ${song.link || 'N/A'}`;

    await conn.sendFile(m.chat, audio.thumbnail, 'cover.jpg', caption, { ...fake, quoted: m });

    await conn.sendMessage(m.chat, {
      audio: { url: audio.url },
      fileName: `${audio.title}.mp3`,
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: audio.title,
          body: `🎵 تنزيل completa | FLASH BOT`,
          thumbnailUrl: audio.thumbnail,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await m.react('✅');
  } catch (err) {
    console.error('[SOUNDCLOUD ERROR]', err);
    m.reply('❌ حدث خطأ أثناء المعالجة.');
    await m.react('❌');
  }
};

function msToTime(ms) {
  let seconds = Math.floor((ms / 1000) % 60),
      minutes = Math.floor((ms / (1000 * 60)) % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

handler.command = ['sound', 'soundcloud'];
handler.help = ['soundcloud <nombre de canción o artista>'];
handler.tags = ['descargas'];
handler.register = true;
handler.limit = 2;

export default handler;