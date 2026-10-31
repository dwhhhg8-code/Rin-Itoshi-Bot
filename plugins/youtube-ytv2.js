import fetch from 'node-fetch'
import yts from 'yt-search'
import Jimp from 'jimp'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!text) return m.reply(`*✎ أدخل عنواناً أو رابط يوتيوب*`)

  try {
    let url = ''
    let title = ''

    if (/^https?:\/\/(www\.)?youtu/.test(args[0])) {
      url = args[0]
      title = text.replace(args[0], "").trim()
    } else {
      let search = await yts(text)
      if (!search.videos.length) return m.reply('❌ لم أجد نتائج.')
      let vid = search.videos[0]
      url = vid.url
      title = vid.title
    }

    if (args[1]) {
      let quality = args[1].replace(/p/i, "")
      await m.reply(`*📥 جارٍ التنزيل video en calidad ${quality}p, انتظر un momento...*`)

      let api = `https://api.sylphy.xyz/download/ytmp4v2?url=${encodeURIComponent(url)}&q=${quality}&apikey=sylphy_2962`
      let res = await fetch(api)
      let json = await res.json()

      if (!json.status || !json.result?.dl_url) throw new Error("تعذّر descargar el video")

      let { result } = json

      let thumb = null
      try {
        const img = await Jimp.read(result.thumbnail)
        img.resize(300, Jimp.AUTO)
        thumb = await img.getBufferAsync(Jimp.MIME_JPEG)
      } catch (err) {
        console.log("خطأ في معالجة miniatura:", err)
      }

      return await conn.sendMessage(m.chat, {
        document: { url: result.dl_url },
        caption: `\`\`\`✦ Título: ${result.title}
✦ الجودة: ${result.format}\`\`\``,
        mimetype: 'video/mp4',
        fileName: `${result.title || 'video'}.mp4`,
        ...(thumb ? { jpegThumbnail: thumb } : {})
      }, { quoted: m })
    }

    await m.reply('*🌱 جارٍ البحث información del video...*')

    let search = await yts(url)
    let video = search.videos[0]
    if (!video) return m.reply('لم يتم العثور على معلومات الفيديو.')

    let likes = video.likes ? video.likes.toLocaleString() : 'N/A'
    let desc = video.description ? video.description.slice(0, 200) + "..." : 'لا يوجد وصف'

    let caption = `*✨ معلومات del video:*\n\n` +
    `\`\`\`✦ Título: ${video.title}\n` +
    `✦ Duración: ${video.timestamp}\n` +
    `✦ Vistas: ${video.views.toLocaleString()}\n` +
    `✦ Likes: ${likes}\n` +
    `✦ Subido: ${video.ago}\n` +
    `✦ Canal: ${video.author.name}\n` +
    `✦ Link: ${video.url}\`\`\`\n\n` +
    `*📝 الوصف:* ${desc}`

    let buttons = [
      { buttonId: `${usedPrefix + command} ${url} 360`, buttonText: { displayText: "📹 360p" }, type: 1 },
      { buttonId: `${usedPrefix + command} ${url} 480`, buttonText: { displayText: "🎥 480p" }, type: 1 },
      { buttonId: `${usedPrefix + command} ${url} 720`, buttonText: { displayText: "📺 720p" }, type: 1 }
    ]

    let thumb = null
    try {
      const img = await Jimp.read(video.thumbnail)
      img.resize(300, Jimp.AUTO)
      thumb = await img.getBufferAsync(Jimp.MIME_JPEG)
    } catch (err) {
      console.log("خطأ في معالجة miniatura:", err)
    }

    await conn.sendMessage(m.chat, {
      image: { url: video.thumbnail },
      ...(thumb ? { jpegThumbnail: thumb } : {}),
      caption,
      footer: " اختر الجودة بالأزرار أو اكتب الأمر مع الجودة",
      buttons,
      headerType: 4
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('⚠️ خطأ في معالجة la solicitud.')
  }
}

handler.help = ['ytv-v2 <url|título> [calidad]']
handler.tags = ['downloader']
handler.command = ['ytv-v2']

export default handler