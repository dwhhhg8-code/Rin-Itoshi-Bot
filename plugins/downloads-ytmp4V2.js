
import fetch from "node-fetch";
import axios from "axios";
import yts from "yt-search";

let handler = async (m, { conn, text, args }) => {
  try {
    if (!text) return conn.reply(m.chat, `🌷 *Por favor, ingresa la URL del vídeo de YouTube.*`, m);

    await conn.sendMessage(m.chat, {
      text: `૮₍｡˃ ᵕ ˂ ｡₎ა 🫛 *¡Descargando tu video!*`
    }, { quoted: m });

    if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)/.test(args[0])) {
      return conn.reply(m.chat, `*Enlace inválido.* Por favor, ingresa una URL válida de YouTube.`, m);
    }

    await conn.sendMessage(m.chat, { react: { text: '⌛', key: m.key } });

    const videoData = await ytdl(args[0]);
    const search = await yts({ videoId: extractVideoId(args[0]) });
    const meta = search;

    const { title, duration, url } = videoData;
    const size = await getSize(url);
    const sizeStr = size ? await formatSize(size) : 'Desconocido';
    const thumbnail = await getThumbnail(args[0]);
    const cleanTitle = title.replace(/[^\w\s]/gi, '').trim().replace(/\s+/g, '_');
    const fileName = `${cleanTitle}.mp4`;

    const caption = `🎶 *ＹＯＵＴＵＢＥ • ＭＰ4*  🍎
────────────────────
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. 𝐓𝐈𝐓𝐔𝐋𝐎: *${meta.title || '-'}*
> °𓃉𐇽ܳ𓏸🌿ᮬᩬִּ〫᪲۟. 𝐃𝐔𝐑𝐀𝐂𝐈𝐎𝐍: *${meta.duration?.timestamp || duration || '-'}*
> °𓃉𐇽ܳ𓏸🍏ᮬᩬִּ〫᪲۟. 𝐂𝐀𝐍𝐀𝐋: *${meta.author?.name || '-'}*
> °𓃉𐇽ܳ𓏸🍄ᮬᩬִּ〫᪲۟. 𝐕𝐈𝐒𝐓𝐀𝐒: *${meta.views?.toLocaleString() || '-'}*
> °𓃉𐇽ܳ𓏸⚽ᮬᩬִּ〫᪲۟. 𝐓𝐀𝐌𝐀𝐍̃𝐎: *${sizeStr}*
> °𓃉𐇽ܳ𓏸☁️ᮬᩬִּ〫᪲۟. 𝐂𝐀𝐋𝐈𝐃𝐀𝐃: *480p*
> °𓃉𐇽ܳ𓏸🌷ᮬᩬִּ〫᪲۟. 𝐏𝐔𝐁𝐈𝐂𝐀𝐃𝐎: *${meta.ago || '-'}*
> °𓃉𐇽ܳ𓏸🕸️ᮬᩬִּ〫᪲۟. 𝐋𝐈𝐍𝐊: *${meta.url || args[0]}*
> °𓃉𐇽ܳ𓏸⚙️ᮬᩬִּ〫᪲۟. 𝐒𝐄𝐑𝐕𝐈𝐃𝐎𝐑: *undefined :(*
────────────────────`;

    let head = await fetch(url, { method: "HEAD" });
    let fileSize = head.headers.get("content-length") || 0;
    let fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);

    if (fileSizeMB >= 100) {
      await conn.sendMessage(m.chat, {
        document: { url },
        mimetype: 'video/mp4',
        fileName,
        caption: `${caption}\n\n> 😔 *Enviado como documento por superar 100 MB*`,
        thumbnail,
        contextInfo: {
          externalAdReply: {
            title: meta.title,
            body: '💦 ᥡ᥆ᥙ𝗍ᥙᑲᥱ ძ᥆ᥴ |  кαиєкι вσт ν2 🌾',
            mediaUrl: args[0],
            sourceUrl: args[0],
            thumbnailUrl: meta.image,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: fkontak });
    } else {
      await conn.sendMessage(m.chat, {
        video: { url },
        mimetype: 'video/mp4',
        fileName,
        caption: caption,
        thumbnail,
        contextInfo: {
          externalAdReply: {
            title: meta.title,
            body: '✅ Descarga completa',
            mediaUrl: args[0],
            sourceUrl: args[0],
            thumbnailUrl: meta.image,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: fkontak });
    }

    await conn.sendMessage(m.chat, { react: { text: '✔️', key: m.key } });

  } catch (e) {
    console.error(e);
    m.reply(`❌ *Ocurrió un error:*\n> ${e.message}`);
  }
};

handler.help = ['ytmp4v2 *<url>*'];
handler.tags = ['download'];
handler.command = ['ytmp4v2'];
handler.group = true;

export default handler;

async function ytdl(url) {
  const headers = {
    "accept": "*/*",
    "accept-language": "es-PE,es;q=0.9",
    "sec-fetch-mode": "cors",
    "Referer": "https://id.ytmp3.mobi/"
  };

  const initRes = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers });
  const init = await initRes.json();
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
  const convertURL = init.convertURL + `&v=${videoId}&f=mp4&_=${Math.random()}`;

  const convertRes = await fetch(convertURL, { headers });
  const convert = await convertRes.json();

  let info = {};
  for (let i = 0; i < 3; i++) {
    const progressRes = await fetch(convert.progressURL, { headers });
    info = await progressRes.json();
    if (info.progress === 3) break;
  }

  return {
    url: convert.downloadURL,
    title: info.title || 'video',
    duration: info.duration || 'Desconocido'
  };
}

function extractVideoId(url) {
  return url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
}

async function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  if (!bytes || isNaN(bytes)) return 'Desconocido';
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

async function getSize(url) {
  try {
    const res = await axios.head(url);
    const length = res.headers['content-length'];
    return length ? parseInt(length, 10) : null;
  } catch (err) {
    console.error('😢 Error al obtener tamaño del archivo:', err.message);
    return null;
  }
}

async function getThumbnail(ytUrl) {
  try {
    const videoId = extractVideoId(ytUrl);
    if (!videoId) return null;
    const thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const res = await fetch(thumbUrl);
    return await res.buffer();
  } catch {
    return null;
  }
}
