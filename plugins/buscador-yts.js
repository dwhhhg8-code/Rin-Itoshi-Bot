// - código creado x ShadowCore 🎋

import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const videoCache = {};
const cacheTimeout = 10 * 60 * 1000; // 10 minutos
const MAX_FILE_SIZE_MB = 70;

const shortenURL = async (url) => {
  try {
    const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    const shortUrl = await res.text();
    return shortUrl.includes("http") ? shortUrl : url;
  } catch {
    return url;
  }
};

const fetchAPI = async (url, type) => {
  try {
    const endpoint =
      type === "audio"
        ? `https://api.stellarwa.xyz/dow/ytmp3?url=${encodeURIComponent(url)}&apikey=Shadow`
        : `https://api.stellarwa.xyz/dow/ytmp4?url=${encodeURIComponent(url)}&apikey=Shadow`;

    const res = await fetch(endpoint);
    const data = await res.json();

    if (data?.status && data?.data?.dl) {
      return {
        download: data.data.dl,
        title: data.data.title || "Desconocido",
        author: data.data.author || "Desconocido",
        thumbnail: `https://img.youtube.com/vi/${new URL(url).searchParams.get("v")}/0.jpg`,
        format: type === "audio" ? "mp3" : "mp4"
      };
    }

    throw new Error("خطأ في جلب datos desde StellarWA");
  } catch (e) {
    console.log("خطأ en StellarWA:", e.message);
    return null;
  }
};

async function getSize(url) {
  try {
    const response = await axios.head(url);
    const length = response.headers["content-length"];
    return length ? parseInt(length, 10) : null;
  } catch {
    return null;
  }
}

function formatSize(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  if (!bytes || isNaN(bytes)) return "Desconocido";
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

const handler = async (m, { conn, text }) => {
  if (!text?.trim()) return conn.reply(m.chat, "*🎋 أدخل الاسم de الموسيقى a buscar.*", m);

  const search = await yts(text);
  if (!search.all.length) return conn.reply(m.chat, "لا توجد نتائج.", m);

  const results = search.all.slice(0, 10);
  videoCache[m.sender] = { results, timestamp: Date.now() };
  await m.react("🕒");

  let messageText = `🌷 النتيجةs de la búsqueda para *<${text}>*\n\n`;
  results.forEach((v, i) => {
    messageText += `
*${i + 1}.*
✿ *${v.title}*
> ✦ Canal » *${v.author.name}*
> ⴵ Duración » *${v.timestamp}*
> ✐ Subido » *${v.ago}*
> ✰ Vistas » *${v.views}*
> 🜸 Enlace » ${v.url}
────────────────────────`;
  });

  messageText += `
\n🍂 رُدّ con:
- \`A <número>\` → الصوت
- \`V <número>\` → Video
- \`AD <número>\` → الصوت Doc
- \`VD <número>\` → Video Doc`;

  const thumb = results[0]?.thumbnail ? (await conn.getFile(results[0].thumbnail))?.data : null;

  const fakertX = {
    contextInfo: {
      externalAdReply: {
        title: "🍓 𝗬𝗼𝘂𝗧𝘂𝗯𝗲 🎶 𝗦𝗲𝗮𝗿𝗰𝗵 🌤️",
        body: "النتيجةs encontrados",
        mediaType: 1,
        previewType: 0,
        sourceUrl: results[0]?.url,
        thumbnail: thumb,
        renderLargerThumbnail: true
      }
    }
  };

  await m.react("✔️");
  await conn.sendMessage(m.chat, { text: messageText, ...fakertX }, { quoted: m });
};

handler.help = ["ytsearch <texto>"];
handler.tags = ["buscador"];
handler.command = ["ytsearch", "yts"];
handler.group = true;
handler.register = true;

// 🪷 Descarga según respuesta dالمستخدم
handler.before = async (m, { conn }) => {
  if (!m.quoted || !m.quoted.text.includes("النتيجةs de la búsqueda")) return;

  const match = m.text.trim().match(/^(A|V|AD|VD)\s*(\d+)$/i);
  if (!match) return;

  const [, type, number] = match;
  const index = parseInt(number) - 1;

  if (
    !videoCache[m.sender] ||
    !videoCache[m.sender].results[index] ||
    Date.now() - videoCache[m.sender].timestamp > cacheTimeout
  ) {
    delete videoCache[m.sender];
    return conn.reply(m.chat, "🎋 La lista expiró. Usa /yts otra vez.", m);
  }

  const videoData = videoCache[m.sender].results[index];
  const urlVideo = videoData.url;

  try {
    const mediaType = type.startsWith("A") ? "audio" : "video";
    const asDocument = type.endsWith("D");

    await conn.reply(m.chat, mediaType === "audio" ? "🎧 جارٍ التنزيل audio..." : "🎬 جارٍ التنزيل video...", m);

    const apiData = await fetchAPI(urlVideo, mediaType);
    if (!apiData) return conn.reply(m.chat, "⚠️ خطأ في جلب الرابط desde StellarWA.", m);

    const sizeBytes = await getSize(apiData.download);
    const fileSizeMB = sizeBytes ? sizeBytes / (1024 * 1024) : null;

    if (fileSizeMB && fileSizeMB > MAX_FILE_SIZE_MB) {
      const shortUrl = await shortenURL(apiData.download);
      return conn.reply(
        m.chat,
        `⚠️ الملف pesa *${formatSize(sizeBytes)}* y excede el límite de ${MAX_FILE_SIZE_MB}MB.\n\n🔗 تنزيل manual: ${shortUrl}`,
        m
      );
    }

    const info = `
> 🌱 *Título:* ${apiData.title}
> 🎤 *Autor:* ${apiData.author}
> ⏱ *Duración:* ${videoData.timestamp || "?"}
> 💾 *Tamaño:* ${formatSize(sizeBytes)}
> 🔗 *تنزيل:* ${await shortenURL(apiData.download)}
`;

    if (asDocument) {
      await conn.sendMessage(
        m.chat,
        {
          document: { url: apiData.download },
          fileName: `${apiData.title}.${apiData.format}`,
          mimetype: mediaType === "audio" ? "audio/mpeg" : "video/mp4",
          caption: info
        },
        { quoted: m }
      );
    } else if (mediaType === "audio") {
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: apiData.download },
          fileName: `${apiData.title}.mp3`,
          mimetype: "audio/mpeg",
          ptt: false,
          contextInfo: {
            externalAdReply: {
              title: apiData.title,
              body: `♪ ${apiData.author} • ${formatSize(sizeBytes)}`,
              thumbnail: apiData.thumbnail ? (await conn.getFile(apiData.thumbnail)).data : null,
              sourceUrl: urlVideo,
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        },
        { quoted: m }
      );
    } else {
      await conn.sendMessage(
        m.chat,
        {
          video: { url: apiData.download },
          caption: info
        },
        { quoted: m }
      );
    }
  } catch (err) {
    conn.reply(m.chat, `⚠︎ خطأ: ${err.message}`, m);
  }
};

export default handler;