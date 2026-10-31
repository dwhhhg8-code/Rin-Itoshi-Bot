import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
if (!text) return m.reply(`${emoji} أدخل la Ruta y الاسم del الملف junto al comando.`)
try {
if (!m.quoted.text) return m.reply(`${emoji2} رُدّ al الرسالة.`)
let path = `${text}.js`
await fs.writeFileSync(path, m.quoted.text)
m.reply(`${emoji} تم الحفظ en *${path}*.`)
} catch {
await m.reply(`رُدّ al الرسالة.`)
}}
handler.tags = ['owner']
handler.help = ["savefile <ruta/nombre>"]
handler.command = ["savefile", "savejs", "savecmd"]
handler.rowner = true

export default handler