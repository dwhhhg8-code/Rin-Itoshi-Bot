/* 
- Código Creado Por Izumi-kzx
- Código Auténtico Por Code Titans
- Power By Team Code Titans
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/
// *[ 🧇 BING IMAGE ]*
import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default
let handler = async (m, { conn, text }) => {
if (!text) return m.reply('أدخل النص لما تريد البحث عنه في الصور 🔍')
try {
async function createImage(url) {
const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer })
return imageMessage
}
let push = []
let api = await fetch(`https://delirius-apiofc.vercel.app/search/bingimage?query=${encodeURIComponent(text)}`)
let json = await api.json()
if (!json.results || json.results.length === 0) return m.reply('لا توجد صور لبحثك.')
for (let item of json.results.slice(0, 5)) {
let image = await createImage(item.direct)
push.push({
body: proto.Message.InteractiveMessage.Body.fromObject({ text: `◦ *Título:* ${item.title || 'بدون عنوان'}` }),
footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
header: proto.Message.InteractiveMessage.Header.fromObject({ title: '', hasMediaAttachment: true, imageMessage: image }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{
"name": "cta_url",
"buttonParamsJson": `{"display_text":"🌐 Ver Fuente","url":"${item.source}"}`
}]
})
})
}
const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({ text: `🔎 *النتيجةs de:* ${text}` }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: '📸 تم العثور على صور' }),
header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] })
})
}
}
}, { quoted: m })
await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
} catch (error) {
console.error(error)
m.reply('حدث خطأ أثناء البحث عن الصور. حاول مرة أخرى.')
}
}

handler.help = ['bingsearch']
handler.tags = ['buscador']
handler.command = ['bingsearch']

export default handler