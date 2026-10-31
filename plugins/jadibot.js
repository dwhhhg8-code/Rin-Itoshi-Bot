import ws from "ws"
import axios from "axios"
import fetch from "node-fetch"

const handler = async (m, { conn, command, usedPrefix, participants }) => {
  try {

    const users = [
      global.conn.user.jid,
      ...new Set(
        global.conns
          .filter(c => c.user && c.ws.socket && c.ws.socket.readyState !== ws.CLOSED)
          .map(c => c.user.jid)
      )
    ]

    function convertirMsADiasHorasMinutosSegundos(ms) {
      const segundos = Math.floor(ms / 1000)
      const minutos = Math.floor(segundos / 60)
      const horas = Math.floor(minutos / 60)
      const días = Math.floor(horas / 24)
      const segRest = segundos % 60
      const minRest = minutos % 60
      const horasRest = horas % 24

      let partes = []
      if (días) partes.push(`${días} día${días > 1 ? "s" : ""}`)
      if (horasRest) partes.push(`${horasRest} hora${horasRest > 1 ? "s" : ""}`)
      if (minRest) partes.push(`${minRest} minuto${minRest > 1 ? "s" : ""}`)
      if (segRest) partes.push(`${segRest} segundo${segRest > 1 ? "s" : ""}`)
      return partes.join(", ")
    }

    const getThumbnail = async () => {
      const res = await axios.get("https://files.catbox.moe/3su9of.jpg", { responseType: "arraybuffer" })
      return Buffer.from(res.data, "binary")
    }
    const thumbnail = await getThumbnail()

    const shadow_xyz = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: {
        productMessage: {
          product: {
            productImage: {
              mimetype: "image/jpeg",
              jpegThumbnail: thumbnail
            },
            title: "☆ 🍏 𝐒𝐔𝐁𝐁𝐎𝐓𝐒 • 𝐎𝐍𝐋𝐈𝐍𝐄 ☁️ ☆",
            description: "SubBots conectados en este momento",
            currencyCode: "USD",
            priceAmount1000: 5000,
            retailerId: "SubBots",
            productImageCount: 1
          },
          businessOwnerJid: "201125166486@s.whatsapp.net"
        }
      }
    }

    let groupBots = users.filter(bot =>
      participants.some(p => p.id.toLowerCase() === bot.toLowerCase())
    )

    if (!groupBots.includes(global.conn.user.jid)) {
      groupBots.push(global.conn.user.jid)
    }

    const botsGroup =
      groupBots.length > 0
        ? groupBots.map(bot => {
            const isMainBot = bot === global.conn.user.jid
            const v = global.conns.find(c => c.user?.jid === bot)

            const uptime = isMainBot
              ? convertirMsADiasHorasMinutosSegundos(Date.now() - (global.conn.uptime || Date.now()))
              : v?.uptime
              ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime)
              : "Activo desde ahora"

            const mention = bot.replace(/[^0-9]/g, "")
            return `☃️ @${mention}\n> 🌾 *Bot:* ${isMainBot ? "Principal" : "Sub-Bot"}\n> 🍉 *Online:* ${uptime}`
          }).join("\n\n")
        : `✧ No hay bots activos en este grupo`

    const message = `\`\`\`   ݊ ּ͜⏜݆ׄ͜⌒໊݂݁͜⏜݄͜ ͝⃞֟🌷⃛͜͝ ⃞໊݄⏜݆ׄ͜͜⌒ ּ͜⏜݆ׄ݊͜ ּ͜ \`\`\`
\`\`\`    ۪〫〫𝆬✿〫𝆬 ᮫ᨗ۫ 𝐒𝐎𝐂𝐊𝐄𝐓𝐒 𝐎𝐍𝐋𝐈𝐍𝐄   ּּ籭᮫꫶ֹּּ࣭ٜ〫۫𝆬𝆬ᨗ࠭࠭𝆬ᨗ \`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮ \`\`\`

*「 ✦ 」 قائمة bots activos*

❀ Principal: *1*
✿ Subs: *${users.length - 1}*

❏ En este grupo: *${groupBots.length}* bots
${botsGroup}`

    const mentionList = groupBots.map(bot => (bot.endsWith("@s.whatsapp.net") ? bot : `${bot}@s.whatsapp.net`))

    const rcanal2 = {
      contextInfo: {
        mentionedJid: mentionList
      }
    }

    await conn.sendMessage(
      m.chat,
      {
        image: { url: 'https://shadow-xyz.vercel.app/img/shadow2.jpg' },
        caption: message.trim(),
        mentions: mentionList,
        fileName: 'sockets.jpg',
        mimetype: 'image/jpeg',
        ...rcanal2,
        ...rcanal // 🙂
      },
      { quoted: shadow_xyz }
    )

  } catch (error) {
    m.reply(`⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`)
  }
}

handler.tags = ["serbot"]
handler.help = ["botlist"]
handler.command = ["botlist", "listbots", "listbot", "bots", "sockets", "socket"]

export default handler