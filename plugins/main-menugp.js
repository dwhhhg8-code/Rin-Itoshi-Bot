import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix }) => {
  try {
    let tag = `@${m.sender.split('@')[0]}`
    let fecha = moment.tz('America/Lima').format('DD/MM/YYYY')
    let hora = moment.tz('America/Lima').format('HH:mm:ss')

    let menu = `
╭━━━〔 🍂 𝐌𝐄𝐍𝐔 𝐀𝐃𝐌𝐈𝐍 🍂 〕━━━⬣
┃ ⭐ أهلاً ${tag} 
┃ 🌱 هذه هي الأوامر 
┃ 🍧 لإدارة المجموعة 💖
┃ 📅 التاريخ: *${fecha}*
┃ ⏰ الوقت: *${hora}*
╰━━━━━━━━━━━━━━━━━━━━⬣

╭─〔 🌷 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈𝐎́𝐍 🌷 〕
┃ 💥 ${usedPrefix}on
┃ admins <texto>
┃ 💥 ${usedPrefix}group open / close
┃ 💥 ${usedPrefix}grupo abrir / cerrar
┃ 💥 ${usedPrefix}delete
┃ 💥 ${usedPrefix}demote
┃ 💥 ${usedPrefix}encuesta <text|text2>
┃ 💥 ${usedPrefix}groupdesc <text>
┃ 💥 ${usedPrefix}gruponame <text>
┃ 💥 ${usedPrefix}hidetag
┃ 💥 ${usedPrefix}infogrupo
┃ 💥 ${usedPrefix}kick
┃ 💥 ${usedPrefix}kickall
┃ 💥 ${usedPrefix}link
┃ 💥 ${usedPrefix}listadv
┃ 💥 ${usedPrefix}promote
┃ 💥 ${usedPrefix}revoke
┃ 💥 ${usedPrefix}todos *<الرسالة>*
┃ 💥 ${usedPrefix}bot
┃ 💥 ${usedPrefix}ruletaban
╰━━━━━━━━━━━━⬣

╭─〔 🍧 𝐎𝐍 / 𝐎𝐅𝐅 🍧 〕
┃ 🌱 ${usedPrefix}welcome
┃ 🌱 ${usedPrefix}bienvenida
┃ 🌱 ${usedPrefix}antiprivado
┃ 🌱 ${usedPrefix}antiprivate
┃ 🌱 ${usedPrefix}restrict
┃ 🌱 ${usedPrefix}restringir
┃ 🌱 ${usedPrefix}antibot
┃ 🌱 ${usedPrefix}antibots
┃ 🌱 ${usedPrefix}autoaceptar
┃ 🌱 ${usedPrefix}aceptarauto
┃ 🌱 ${usedPrefix}autorechazar
┃ 🌱 ${usedPrefix}rechazarauto
┃ 🌱 ${usedPrefix}autoresponder
┃ 🌱 ${usedPrefix}autorespond
┃ 🌱 ${usedPrefix}antisubbots
┃ 🌱 ${usedPrefix}antibot2
┃ 🌱 ${usedPrefix}modoadmin
┃ 🌱 ${usedPrefix}soloadmin
┃ 🌱 ${usedPrefix}reaction
┃ 🌱 ${usedPrefix}reaccion
┃ 🌱 ${usedPrefix}antiSpam
┃ 🌱 ${usedPrefix}antispam
┃ 🌱 ${usedPrefix}jadibotmd
┃ 🌱 ${usedPrefix}modejadibot
┃ 🌱 ${usedPrefix}subbots
┃ 🌱 ${usedPrefix}detect
┃ 🌱 ${usedPrefix}avisos
┃ 🌱 ${usedPrefix}antilink
┃ 🌱 ${usedPrefix}audios
┃ 🌱 ${usedPrefix}antiver
┃ 🌱 ${usedPrefix}antiocultar
┃ 🌱 ${usedPrefix}antilink2
┃ 🌱 ${usedPrefix}antiarabe
┃ 🌱 ${usedPrefix}antifake
┃ 🌱 ${usedPrefix}antivirtuales
╰━━━━━━━━━━━━⬣

🍂⭐ 𝙁𝙇𝘼𝙎𝙃 𝘽𝙊𝙏 ⭐🍂
`.trim()

    let imgs = [
      'https://files.catbox.moe/ceotf9.jpg',
      'https://i.pinimg.com/originals/9d/6c/4e/9d6c4eeb7898079652b7f2c2e5c65632.jpg',
      'https://files.catbox.moe/i97oje.jpg'
    ]
    let img = imgs[Math.floor(Math.random() * imgs.length)]
    let thumb = await (await fetch(img)).buffer()

    const fkontak = { 
      key: {  
        fromMe: false, 
        participant: `0@s.whatsapp.net`
      }, 
      message: { 
        orderMessage: { 
          itemCount: -999999, 
          status: 1, 
          surface: 1, 
          message: "🍧 FLASH BOT 💖", 
          orderTitle: 'Bang', 
          thumbnail: thumb,
          sellerJid: '0@s.whatsapp.net'
        }
      }
    }

    await conn.sendMessage(m.chat, {
      text: menu,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: "🌷 Panel de Administración 🌷",
          body: "🍂 Gestiona tu grupo fácilmente 🍂",
          thumbnailUrl: img,
          sourceUrl: "https://github.com/dwhhhg8-code/flash-bot",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak })

    await m.react('⚽')
  } catch (e) {
    await conn.reply(m.chat, '❌ خطأ في عرض قائمة الإدارة.', m)
    console.error(e)
  }
}

handler.help = ['menugp', 'menuadmin', 'menugrupo']
handler.tags = ['menus']
handler.command = ['menugp', 'menuadmin', 'menugrupo']

export default handler
