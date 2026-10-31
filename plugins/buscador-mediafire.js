import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) return conn.reply(m.chat, `*⚡ Usa el comando así:*\n\n> ${usedPrefix + command} Dragon Ball`, m, rcanal);

  await m.react('🕐')

  try {

    let res = await fetch(`https://api.stellarwa.xyz/search/mediafire?query=${encodeURIComponent(text)}&apikey=Shadow-nex`)
    let json = await res.json()

    if (!json.status || !json.results || json.results.length === 0) {
      throw `❌ لا توجد نتائج para: *${text}*`
    }

    let txt = `╭━━━〔 🔍 *النتيجةs de MediaFire* 〕━━⬣\n`
    txt += `┃ ✨ *بحث:* ${text}\n`
    txt += `┃ 👑 *المطوّر:* shadow_xyz \n`
    txt += `╰━━━━━━━━━━━━━━━━━━⬣\n\n`

    json.results.forEach((file, i) => {
      txt += `📁 *${i + 1}.* ${file.filename || 'الملف غير معروف'}\n`
      txt += `┆📦 *Tamaño:* ${file.filesize || 'Desconocido'}\n`
      txt += `┆🔗 *Link:* ${file.url || 'غير متاح'}\n`
      txt += `┆🌐 *Fuente:* ${file.source_title || 'بدون عنوان'}\n`
      txt += `┆🔸 *URL Fuente:* ${file.source_url || 'غير متاح'}\n`
      txt += `╰━━━━━━━━━━━━⬣\n\n`
    })

    await m.react('✔️')
    await conn.reply(m.chat, txt.trim(), m)

  } catch (err) {
    console.error(err)
    await conn.reply(m.chat, '*خطأ في consultar la API de MediaFire.*', m)
  }
}

handler.help = ['mediafiresearch <texto>']
handler.tags = ['buscador']
handler.command = ['mediafiresearch', 'mfse']
handler.group = true
handler.register = true
handler.coin = 5
export default handler