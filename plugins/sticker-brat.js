import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fetchSticker = async (text, attempt = 1) => {
  try {
    const response = await axios.get('https://api.zenzxz.my.id/maker/brat', {
      params: { text: encodeURIComponent(text) },
      responseType: 'arraybuffer'
    })
    return response.data
  } catch (error) {
    if (error.response?.status === 429 && attempt <= 3) {
      const retryAfter = error.response.headers['retry-after'] || 5
      await delay(retryAfter * 1000)
      return fetchSticker(text, attempt + 1)
    }
    throw error
  }
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text && !m.quoted?.text) {
      return conn.sendMessage(m.chat, { text: `🎋 من فضلك، رُدّ على الرسالة o ingresa un texto لإنشاء el Sticker.` }, { quoted: m })
    }

    const inputText = m.quoted?.text || text
    await m.react('🕒')

    const buffer = await fetchSticker(inputText)

    let packstickers = global.db.data.users[m.sender] || {}
    let texto1 = packstickers.text1 || global.packsticker || 'Pack'
    let texto2 = packstickers.text2 || global.packsticker2 || 'Bot'

    const stiker = await sticker(buffer, false, texto1, texto2)
    if (!stiker) throw new Error('تعذّر generar الملصق.')

    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    await m.react('✔️')
  } catch (e) {
    await m.react('✖️')
    conn.sendMessage(m.chat, {
      text: `⚠︎ حدث خطأ.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`
    }, { quoted: m })
  }
}

handler.tags = ['sticker']
handler.help = ['brat <texto>']
handler.command = ['brat']

export default handler