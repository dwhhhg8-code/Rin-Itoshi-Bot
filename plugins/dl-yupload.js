import { yupload } from "../lib/yupload.js"
import fetch from "node-fetch"
import fs from "fs"

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
  if (!args[0]) throw `🍂 أدخل un link de YourUpload. Ejemplo:\n${usedPrefix + command} https://www.yourupload.com/watch/wYk0lUX3cwGk`
  if (!/^https?:\/\/(www\.)?yourupload\.com\/watch\/[a-zA-Z0-9]+$/.test(args[0])) throw `⚠️ La URL no parece ser صالح de YourUpload`

  m.react('🕓')

  const { title, views, shareUrl, embedUrl, uploaded, dl } = await yupload.info(args[0])

  const body = `
\`\`\`◜ YourUpload - Download ◞\`\`\`

≡ 🌿 \`Título : »\` ${title}
≡ 🌲 \`Views : »\` ${views}
≡ 🌱 \`Uploaded : »\` ${uploaded}
    
≡ 🌳 \`URL : »\` ${shareUrl}
≡ 🌾 \`Embed URL : »\` ${embedUrl}
    
_# 🌴 Su الملف se enviará en un momento . . ._`

  await conn.sendMessage(m.chat, { text: body }, { quoted: m })

  let fileUrl = await yupload.dl(dl)

  await conn.sendFile(m.chat, fileUrl, `${title}.mp4`, "📥 Aquí tienes tu archivo", m, null, { asDocument: true })

  m.react('✅')
}

handler.command = handler.help = ['yupload']
handler.tags = ["download"]
export default handler