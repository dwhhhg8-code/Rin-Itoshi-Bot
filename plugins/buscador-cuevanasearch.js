import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return m.reply(`${emoji} أدخل الاسم de una pelicula\n> *Ejemplo: /cuevana Deadpool*.`)

try {
let api = await fetch(`https://delirius-apiofc.vercel.app/search/cuevana?q=${encodeURIComponent(text)}`)
let json = await api.json()

let JT = '📽️ Cuevana  -  Search 📽️';
json.data.forEach((app, index) => {
      JT += `\n\n═══════════════════════`;
      JT += `\n☁️ *Nro :* ${index + 1}`
      JT += `\n🖼️ *الصورة:* ${app.image}`
      JT += `\n⚜️ *Titulo:* ${app.title}`
      JT += `\n📚 *Descripcion:* ${app.description}`
      JT += `\n🔗 *Link:* ${app.link}`
}) 

m.reply(JT)
} catch (error) {
console.error(error)
}}

handler.command = ['cuevanasearch', 'cuevana']
handler.register = true
handler.group = true

export default handler