import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let fecha = moment.tz('America/Lima').format('DD/MM/YYYY')
    let hora = moment.tz('America/Lima').format('hh:mm:ss A')
    let dia = moment.tz('America/Lima').locale('es').format('dddd')
    let comandos = Object.keys(global.plugins).length
    let readMore = String.fromCharCode(8206).repeat(4001)
    
    let channel = 'https://whatsapp.com/channel/0029Vb8QIpSJ3juu0VHRyU0v'
    let club = '⚡ *Powered by* » Sʜᴀᴅᴏᴡ•Core 𝖢𝗅𝗎𝖻 ⚡'
    let menu = `
╭━━━〔 *📥 𝘔𝘌𝘕𝘜 𝘋𝘌𝘚𝘊𝘈𝘙𝘎𝘈𝘚* 〕━━⬣
┃ ⏱️ 𝐇𝐨𝐫𝐚: *${hora}*
┃ 📅 𝐅𝐞𝐜𝐡𝐚: *${fecha}*
┃ 📆 𝐃𝐢́𝐚: *${dia}*
┃ 🧑‍💻 𝐎𝐰𝐧𝐞𝐫: *${creador}*
┃ ⚙️ 𝐏𝐫𝐞𝐟𝐢𝐣𝐨: *${usedPrefix}*
┃ 📚 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬: *${comandos}*
╰━━━〔 *${bot}* 〕━━⬣

${readMore}

╭─⬣「 *التنزيلات المتاحة* 」
│🤗 .cuddle  
│🖼️ .imagen *<query>*
│📌 .pinterestdl *<url>*  
│🎵 .tksearch *<búsqueda>*
│➕ .tkseguir  
│🎬 .animedl *<anime-id> <episode-number>* 
│📘 .facebook  
│📘 .fb2 *<enlace>* 
│📦 .apkf  
│📦 .fdroid  
│☁️ .gdrive  
│🐙 .gitclone *<url git>*  
│📸 .instagram  
│📸 .ig  
│📥 .mediafire  
│📥 .mega  
│📦 .apkmod  
│🎮 .npmdl  
│📌 .pinvid *<link>*  
│🎧 .playaudio  
│🎞️ .playvideo  
│🎶 .playlist *<texto>*
│🎶 .ytmp33 *<url>*
│🎞️ .ytmp44 *<url>*
│🎲 .tiktokrandom
│👻 .snapchat
│🎧 .soundcloud *<nombre>* 
│🎼 .spotify  
│🖼️ .tiktokimg *<url>*
│🎶 .tiktokmp3 *<url>*  
│🎲 .tiktok *<link>*  
│🎞️ .tiktokhd <url>  
│🎲 .tiktok2 *<url>*  
│🐦 .twitter *<url>*    
│🎶 .audio z<yt_link>*
│🎞️ .video *<yt_link>*
│🎶 .ytmp3 *<link>*  
│📄 .ytmp3doc  
│📄 .ytadoc  
│🎞️ .ytmp4 *<url>*  
│📄 .ytmp4doc  
│🍏 .applemusic *<url>*  
│🎨 .capcut *<url>*  
│📦 .apk2  
│📦 .apk_download  
│🍏 .applemusic *<link> *
│🎥 .kwai  
│🎶 .music *<canción>* 
│📂 .terabox *<url>*  
│📑 .menudl  
│📑 .descargas  
│📑 .dlmenu  
│🎶 .yta-v2 *<url de YouTube>* 
│🎶 .play8 *<texto>*  
│🎶 .yta *<url o texto>* 
│🎞️ .ytv 
╰─────────────⬣

📢 Canal Official:

${channel}

「 ⚽𐚁 ֹ ִ FLASH BOT - Official ୧ ֹ ִ⚽ᩚ꤬ᰍ 」
    `.trim()

    await conn.sendMessage(m.chat, {
      image: { url: logo },
      caption: menu,
      footer: club,
      buttons: [
        { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "⚡ المطوّر" }, type: 1 },
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "☘️ القائمة | الكل" }, type: 1 }
      ],
      headerType: 4,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: '⚡ FLASH BOT - 🌱 Menu تنزيلs',
          body: '🎧 ᴅᴇsᴄᴀʀɢᴀ ᴄᴏɴᴛᴇɴɪᴅᴏ ᴅᴇ ʟᴀs ᴘʀɪɴᴄɪᴘᴀʟᴇs ʀᴇᴅᴇs: ʏᴏᴜᴛᴜʙᴇ, ғᴀᴄᴇʙᴏᴏᴋ, sᴘᴏᴛɪғʏ, ɪɢ, ᴇᴛᴄ.',
          thumbnailUrl: 'https://files.catbox.moe/us0m4f.jpg',
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ خطأ في عرض قائمة التنزيلات.')
  }
}
handler.help = ['menudescargas', 'dlmenu']
handler.tags = ['menus']
handler.command = ['menudescargas', 'dlmenu', 'menudl']
export default handler


/*

import fs from 'fs'
import moment from 'moment-timezone'
import PhoneNumber from 'awesome-phonenumber'
import { proto } from '@whiskeysockets/baileys'

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
  try {
    const argumento = text?.trim()?.toLowerCase()
    if (argumento !== 'descargas') return

    await m.react('📥')

    const fecha = moment.tz('America/Lima').format('DD/MM/YYYY')
    const hora = moment.tz('America/Lima').format('hh:mm:ss A')
    const dia = moment.tz('America/Lima').locale('es').format('dddd')
    const diaCapitalizado = dia.charAt(0).toUpperCase() + dia.slice(1)

    const userId = m.sender.split('@')[0]
    const user = global.db.data.users[m.sender] || {}
    const limit = user.limit || 0
    const premium = user.premium ? '✅ Sí' : '❌ No'
    const totalUsers = Object.keys(global.db.data.users).length
    const comandosTotales = Object.keys(global.plugins).length

    const phone = PhoneNumber('+' + userId)
    const pais = phone.getRegionCode() ? phone.getRegionCode() : 'Desconocido 🌍'

    const channel = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
    const owner = 'https://wa.me/201125166486'
    const ig = 'https://www.instagram.com/shadow_xyz9?igsh=aWFtNTIwczlhNnQ4'
    const logo = 'https://shadow-xyz.vercel.app/img/shadow13.jpg'

    const comandos = Object.values(global.plugins)
      .filter(plugin => plugin.help && plugin.tags && plugin.tags.includes('descargas'))
      .map(plugin => Array.isArray(plugin.help) ? plugin.help : [plugin.help])
      .flat()
      .map(cmd => `> ☁️ ${usedPrefix}${cmd}`)
      .join('\n')

    const cuerpo = `──────────────────────
〔 *🧁 _ᴍᴇɴᴜ - ᴅᴇsᴄᴀʀɢᴀs_ 🧁* 〕
──────────────────────
 
✎ 🧸 *المستخدم:* @${userId}
✎ 🍓 *País:* ${pais}
✎ 📡 *البادئة:* ${usedPrefix}
✎ 💖 *Premium:* ${premium}
✎ 🍬 *Límite:* ${limit}
✎ 🐰 *إجمالي المستخدمين:* ${totalUsers}
✎ 🪞 *Comandos:* ${comandosTotales}
✎ 💫 *Fecha:* ${hora}, ${fecha}, ${diaCapitalizado}
──────────────────────

🍋 𝘾𝙊𝙈𝘼𝙉𝘿𝙊𝙎
`.trim()

    const menu = comandos 
      ? `${cuerpo}\n\n${comandos}`
      : `${cuerpo}`

    const nativeFlowButtons = proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
      buttons: [
        {
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: '📢 Canal Oficial',
            url: channel,
            merchant_url: channel
          })
        },
        {
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: '🌷 Instagram',
            url: ig,
            merchant_url: ig
          })
        },
        {
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: '📞 contacto',
            url: owner,
            merchant_url: owner
          })
        }
      ]
    })

    await conn.relayMessage(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: { text: menu },
              footer: { text: '🍓 FLASH BOT | قائمة التنزيلات' },
              header: {
                title: '✨ Bienvenid@ soy?, ʀɪɴ ɪᴛᴏsʜɪ',
                subtitle: '',
                hasMediaAttachment: true,
                imageMessage: (await conn.prepareMessageMedia({ image: { url: logo } }, { upload: conn.waUploadToServer })).imageMessage
              },
              nativeFlowMessage: nativeFlowButtons,
              contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363422142340004@newsletter',
                  serverMessageId: 100,
                  newsletterName: '𝖱in Itoshi : 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅'
                },
                externalAdReply: {
                  title: '🍓 FLASH BOT - MD',
                  body: '✨ نزّل ملفاتك المفضلة.',
                  thumbnailUrl: logo,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                  sourceUrl: channel
                }
              }
            }
          }
        }
      },
      {}
    )

  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, `خطأ في عرض القائمة de descargas:\n${e.message}`, m, fake)
  }
}

handler.command = /^(menu|menudescargas)$/i
handler.tags = ['menus']
handler.help = ['menu descargas']
handler.register = true

export default handler

*/