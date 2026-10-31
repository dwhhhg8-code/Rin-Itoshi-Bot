import yts from 'yt-search';
import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, args, usedPrefix, command }) => {

  if (!args[0]) return conn.reply(m.chat, `*🧪 أدخل un título para buscar en YouTube.*\n✧ \`Ejemplo:\` ${usedPrefix}${command} Joji - Ew`, m, fake);

  await m.react('🕓');
  try {
    let query = args.join(" ");
    let searchResults = await searchVideos(query);
    let spotifyResults = await searchSpotify(query);
    let AppleMusicResult = await (await fetch(`https://api.siputzx.my.id/api/s/applemusic?query=${query}&region=es`)).json();

    if (!searchResults.length && !spotifyResults.length) throw new Error('*✖️ لا توجد نتائج.*');

    let video = searchResults[0];

    let thumbnail;
    try {
      thumbnail = await (await fetch(video.miniatura)).buffer();
    } catch (e) {
      console.warn('*✖️ تعذّر obtener الصورة المصغّرة، باستخدام صورة افتراضية.*');
      thumbnail = await (await fetch('https://telegra.ph/file/36f2a1bd2aaf902e4d1ff.jpg')).buffer();
    }

    const caption = `📀  𝐘𝐎𝐔𝐓𝐔𝐁𝐄 - 𝐌𝐔𝐒𝐈𝐂
 ✦ 𝗧𝗶́𝘁𝘂𝗹𝗼 › *${video.titulo || 'غير موجود'}*
 ✦ 𝗖𝗮𝗻𝗮𝗹 › *${video.canal || 'غير موجود'}*
 ✦ 𝗗𝘂𝗿𝗮𝗰𝗶𝗼́𝗻 › *${video.duracion || 'غير موجود'}*
 ✦ 𝗩𝗶𝘀𝘁𝗮𝘀 › *${video.vistas || 'غير موجود'}*
 ✦ 𝗣𝘂𝗯𝗹𝗶𝗰𝗮𝗱𝗼 › *${video.publicado || 'غير موجود'}*
 ✦ 𝗘𝗻𝗹𝗮𝗰𝗲 › ${video.url}`;


    let ytSections = searchResults.slice(1, 11).map((v, index) => ({
      title: `${index + 1}┃ ${v.titulo}`,
      rows: [
        {
          title: `🎶 تنزيلr MP3`,
          description: `Duración: ${v.duracion || 'غير متاح'}`,
          id: `${usedPrefix}ytmp3 ${v.url}`
        },
        {
          title: `📦 تنزيلr MP3 Documento`,
          description: `Duración: ${v.duracion || 'غير متاح'}`,
          id: `${usedPrefix}yta ${v.url}`
        },
        {
          title: `🎥 تنزيلr MP4`,
          description: `Duración: ${v.duracion || 'غير متاح'}`,
          id: `${usedPrefix}ytmp4 ${v.url}`
        },
        {
          title: `📦 تنزيلr MP4 Documento`,
          description: `Duración: ${v.duracion || 'غير متاح'}`,
          id: `${usedPrefix}ytmp4doc ${v.url}`
        }
      ]
    }));

    let spotifySections = spotifyResults.slice(0, 10).map((s, index) => ({
      title: `${index + 1}┃ ${s.titulo}`,
      rows: [
        {
          title: `🎶 تنزيلr الصوت`,
          description: `Duración: ${s.duracion || 'غير متاح'}`,
          id: `${usedPrefix}music ${s.url}`
        }
      ]
    }));

    let applemusicSections = (AppleMusicResult?.data?.result || []).slice(0, 5).map((a, index) => ({
      title: `${index + 1}┃ ${a.title}`,
      rows: [
        {
          title: `🎶 تنزيلr الصوت`,
          description: `Artista: ${a.artist || 'غير متاح'}`,
          id: `${usedPrefix}applemusic ${a.link}`
        }
      ]
    }));

    await conn.sendMessage(m.chat, {
      image: thumbnail,
      caption: caption,
      footer: club,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true
      },
      buttons: [
        {
          buttonId: `${usedPrefix}ytmp3 ${video.url}`,
          buttonText: { displayText: '☃️ 𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘳 𝘢𝘶𝘥𝘪𝘰' },
          type: 1,
        },
        {
          buttonId: `${usedPrefix}ytmp4 ${video.url}`,
          buttonText: { displayText: '🌾 𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘳 𝘷𝘪𝘥𝘦𝘰' },
          type: 1,
        },
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '📺 𝐑𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨𝐬 𝐝𝐞 𝐘𝐨𝐮𝐭𝐮𝐛𝐞',
              sections: ytSections,
            }),
          },
        },
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '🎲 𝐑𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨𝐬 𝐝𝐞 𝐒𝐩𝐨𝐭𝐢𝐟𝐲',
              sections: spotifySections,
            }),
          },
        },
      ],
      headerType: 1,
      viewOnce: true
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.react('✖️');
    conn.reply(m.chat, '*`خطأ في buscar el video.`*', m, fake);
  }
};

handler.help = ['play8 *<texto>*'];
handler.tags = ['downloader'];
handler.command = ['play8'];
export default handler;

async function searchVideos(query) {
  try {
    const res = await yts(query);
    return res.videos.slice(0, 10).map(video => ({
      titulo: video.title,
      url: video.url,
      miniatura: video.thumbnail,
      canal: video.author.name,
      publicado: video.ago || 'غير متاح',
      vistas: video.views || 'غير متاح',
      duracion: video.duration || 'غير متاح'
    }));
  } catch (error) {
    console.error('خطأ en yt-search:', error.message);
    return [];
  }
}

async function searchSpotify(query) {
  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/search/spotify?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.data.slice(0, 10).map(track => ({
      titulo: track.title,
      url: track.url,
      duracion: track.duration || 'غير متاح'
    }));
  } catch (error) {
    console.error('خطأ en Spotify API:', error.message);
    return [];
  }
}