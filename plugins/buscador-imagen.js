import axios from 'axios'

const handler = async (m, { conn, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `${emoji} من فضلك أدخل نصاً para buscar una الصورة.`, m)
try {
await m.react('🕒')
const res = await getGoogleImageSearch(text)
const urls = await res.getAll()
if (urls.length < 2) return conn.reply(m.chat, '✧ لم يتم العثور على suficientes imágenes para un álbum.', m)
const medias = urls.slice(0, 10).map(url => ({ type: 'image', data: { url } }))
const caption = `✔️ النتيجةs de búsqueda para: ${text}`
await conn.sendSylphy(m.chat, medias, { caption, quoted: m })
await m.react('✔️')
} catch (error) {
await m.react('✖️')
conn.reply(m.chat, `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`, m)
}}

handler.help = ['imagen']
handler.tags = ['descargas']
handler.command = ['imagen', 'image']
handler.register = true
export default handler

function getGoogleImageSearch(query) {
const apis = [`https://api.delirius.store/search/gimage?query=${encodeURIComponent(query)}`, `https://api.siputzx.my.id/api/images?query=${encodeURIComponent(query)}`]
return { getAll: async () => {
for (const url of apis) {
try {
const res = await axios.get(url)
const data = res.data
if (Array.isArray(data?.data)) {
const urls = data.data.map(d => d.url).filter(u => typeof u === 'string' && u.startsWith('http'))
if (urls.length) return urls
}} catch {}
}
return []
},
getRandom: async () => {
const all = await this.getAll()
return all[Math.floor(Math.random() * all.length)] || null
}}}
