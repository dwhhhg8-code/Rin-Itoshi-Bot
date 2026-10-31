import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, args, text }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.reply(m.chat, `${emoji} من فضلك، responda a una *الصورة* o *Video.*`, m)
if (!text) return conn.reply(m.chat, `${emoji} أدخل el peso nuevo de la imágen/video.`, m)
await m.react('🕓')
try {
if (isNaN(text)) return conn.reply(m.chat, `${emoji2} Sólo números.`, m).then(_ => m.react('✖️'))
if (!/image\/(jpe?g|png)|video|document/.test(mime)) return conn.reply(m.chat, `${emoji2} Formato no soportado.`, m)
let img = await q.download()
let url = await uploadImage(img)

if (/image\/(jpe?g|png)/.test(mime)) {
await conn.sendMessage(m.chat, { image: {url: url}, caption: ``, fileLength: `${text}`, mentions: [m.sender] }, { ephemeralExpiration: 24*3600, quoted: m})
await m.react('✅')
} else if (/video/.test(mime)) {
return conn.sendMessage(m.chat, { video: {url: url}, caption: ``, fileLength: `${text}`, mentions: [m.sender] }, { ephemeralExpiration: 24*3600, quoted: m })
await m.react('✅')
}
} catch {
await m.react('✖️')
}}
handler.tags = ['tools']
handler.help = ['tamaño *<cantidad>*']
handler.command = ['filelength', 'length', 'tamaño']
//handler.limit = 1
handler.register = true 

export default handler