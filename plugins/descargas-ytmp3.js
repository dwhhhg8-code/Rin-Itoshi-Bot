import fetch from 'node-fetch'
import yts from 'yt-search'
import axios from 'axios'

let handler = async (m, { conn, text, command, usedPrefix }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `🎋 أدخل الاسم de الأغنية o رابط de YouTube.\n\n> Ejemplo: ${usedPrefix + command} DJ Malam Pagi`,
        m
      )
    }

    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

    const search = await yts(text)
    const video = search.videos[0]
    if (!video) return conn.reply(m.chat, '☁️ لم يتم العثور على ningún resultado.', m)

    const meta = {
      title: video.title,
      duration: video.timestamp,
      url: video.url,
      author: video.author?.name || "Desconocido",
      views: video.views?.toLocaleString('es-PE') || "0",
      ago: video.ago || "Desconocido",
      thumbnail: video.thumbnail
    }

    const apis = [
      {
        api: 'ZenzzXD v2',
        endpoint: `https://api.zenzxz.my.id/api/downloader/ytmp3v2?url=${encodeURIComponent(video.url)}`,
        extractor: res => res.data?.download_url
      },
      {
        api: 'Vreden',
        endpoint: `https://api.vreden.my.id/api/v1/download/youtube/audio?url=${encodeURIComponent(video.url)}&quality=128`,
        extractor: res => res.result?.download?.url
      },
      {
        api: 'Yupra',
        endpoint: `https://api.yupra.my.id/api/downloader/ytmp3?url=${encodeURIComponent(video.url)}`,
        extractor: res => res.result?.link
      },
      {
        api: 'Stellar',
        endpoint: `https://api.stellarwa.xyz/dow/ytmp3?url=${encodeURIComponent(video.url)}&apikey=Shadow_Core`,
        extractor: res => res.data?.dl
      }
    ]

    const { url: downloadUrl, servidor } = await fetchFromApis(apis)
    if (!downloadUrl) return conn.reply(m.chat, '❌ لا يوجد API devolvió el audio.', m)

    const size = await getSize(downloadUrl)
    const sizeStr = size ? formatSize(size) : 'Desconocido'

    const textoInfo = `╔═══❖•ೋ° ⚜️ °ೋ•❖═══╗
       *🎧 ＹＯＵＴＵＢＥ ＭＰ3 🎶*
╚═══❖•ೋ° ⚜️ °ೋ•❖═══╝
🌸 *Título:* ${meta.title}
🕒 *Duración:* ${meta.duration}
💾 *Tamaño:* ${sizeStr}
🎚 *الجودة:* 128kbps
📡 *Canal:* ${meta.author}
👁 *Vistas:* ${meta.views}
📅 *Publicado:* ${meta.ago}
🔗 *Enlace:* ${meta.url}
────────────────────
🍀 *جارٍ المعالجة tu canción, انتظر un momento...*`

    const thumb = (await conn.getFile(meta.thumbnail)).data

    await conn.sendMessage(m.chat, { image: thumb, caption: textoInfo }, { quoted: m })

    await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, fileName: `${meta.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
    
 /*       const audioBuffer = await (await fetch(downloadUrl)).buffer()
    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      fileName: `${meta.title}.mp3`,
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: '☃️ 𝐘  𝐎 𝐔 𝐓 𝐔 𝐁 𝐄 • 𝐌 𝐔 𝐒 𝐈 𝐂',
          body: `ᴅᴜʀᴀᴄɪᴏɴ: ${meta.duration} | ᴘᴇsᴏ: ${meta.size}`,
          thumbnailUrl: meta.thumbnail,
          mediaType: 2,
          renderLargerThumbnail: true,
          mediaUrl: meta.url,
          sourceUrl: meta.url,
          who = mentionedJid[0] ? mentionedJid[0] : m.quoted ? await m.quoted.sender : m.sender
        }
      }
    }, { quoted: fkontak })*/
    
    await m.reply(`> 🌸 *الصوت procesado بنجاح.*\n> Servidor usado: *${servidor}*\n> Peso: *${sizeStr}*`)

    await conn.sendMessage(m.chat, { react: { text: "✔️", key: m.key } })

  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, `خطأ: ${e.message}`, m)
  }
}

handler.command = ['ytmp3', 'song']
handler.tags = ['download']
handler.help = ['ytmp3 <texto o link>', 'song <texto>']
handler.group = true

export default handler

async function fetchFromApis(apis) {
  for (const api of apis) {
    try {
      const res = await fetch(api.endpoint)
      const json = await res.json()
      const url = api.extractor(json)
      if (url) return { url, servidor: api.api }
    } catch {}
  }
  return { url: null, servidor: "Ninguno" }
}

async function getSize(url) {
  try {
    const response = await axios.head(url)
    const length = response.headers['content-length']
    return length ? parseInt(length, 10) : null
  } catch {
    return null
  }
}

function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  if (!bytes || isNaN(bytes)) return 'Desconocido'
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(2)} ${units[i]}`
}