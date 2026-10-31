/*
《✧》DERECHOS RESERVADOS POR EL AUTOR《✧》
- GabrielVz (@glytglobal)
*/

import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {

if (!text) return conn.reply(m.chat, `${emoji} اكتب el nonbre del scraper.\nEjemplo: ${usedPrefix + command} yt-search`, m)

try {

await m.react(rwait)
conn.reply(m.chat, `${emoji2} جارٍ البحث el scraper....`, m)

let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
let { objects } = await res.json()

if (!objects.length) return conn.reply(m.chat, `${emoji2} لم يتم العثور على resultado de: ${text}`, m)

let txt = objects.map(({ package: pkg }) => {
return `《✧》 Scraper  -  Search 《✧》

✦ الاسم: ${pkg.name}
✦ Versión: V${pkg.version}
✦ Enlace: ${pkg.links.npm}
✦ الوصف: ${pkg.description}
\n\n----------`
}).join`\n\n`

await conn.reply(m.chat, txt, m, fake)
await m.react(done)
} catch {
await conn.reply(m.chat, `${msm} حدث خطأ.`, m)
await m.react(error)
}}

handler.help = ['npmjs']
handler.tags = ['buscador']
handler.command = ['npmjs']
handler.register = true
handler.coin = 1

export default handler