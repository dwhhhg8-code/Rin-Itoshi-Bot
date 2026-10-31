import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  let bio
  try {
    const info = await conn.fetchStatus(who)
    bio = info?.status?.trim() || "😔 Sin biografía متاح"
  } catch {
    bio = "Sin biografía متاح"
  }

  if (user.registered) {
    const botones = [
      { buttonId: `${usedPrefix}unreg`, buttonText: { displayText: '✿ Eliminar Registro ✿' }, type: 1 },
    ]

    return await conn.sendMessage(m.chat, {
      caption: '   ꒰🍓⚠️ `ＡＶＩＳＯ` ⚠️🍓꒱ ',
      mentions: [m.sender],
      footer: `
(｡>﹏<｡) 💦  
*Ya cuentas con un registro activo...*  

🌸 ¿𝒒𝒖𝒊𝒆𝒓𝒆𝒔 𝒓𝒆𝒈𝒊𝒔𝒕𝒓𝒂𝒓𝒕𝒆 𝒏𝒖𝒆𝒗𝒂𝒎𝒆𝒏𝒕𝒆?  

💌 Usa *#unreg* para borrar tu registro y comenzar otra vez.  
`,
      buttons: botones,
      headerType: 4,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        }
      }
    }, { quoted: fkontak })
  }

  if (!Reg.test(text)) {
    const botones = [
      { buttonId: `${usedPrefix}reg ${name2}.18`, buttonText: { displayText: 'ᴠᴇʀɪғɪᴄᴀʀ ✅' }, type: 1 },
    ]

    return await conn.sendMessage(m.chat, {
      caption: '`ＡＶＩＳＯ:`',
      mentions: [m.sender],
      footer: `
｡☆✼★━━━━━━━━━━━━★✼☆｡  
❀ ₊˚⊹ ᴏᴏᴘꜱ~ ᴄᴏᴍᴀɴᴅᴏ ɪɴᴄᴏʀʀᴇᴄᴛᴏ (｡•́︿•̀｡)  
┈┈┈┈┈┈┈┈┈┈  
↳ 𝑼́𝒔𝒂𝒍𝒐 𝒂𝒔𝒊́:  
${usedPrefix + command} nombre.edad  

🐰 𝑬𝒋𝒆𝒎𝒑𝒍𝒐:  
> ${usedPrefix + command} ${name2}.18  
┈┈┈┈┈┈┈┈┈┈  
🌸 𝒏𝒐 𝒕𝒓𝒊𝒔𝒕𝒆~ 𝒗𝒖𝒆𝒍𝒗𝒆 𝒂 𝒊𝒏𝒕𝒆𝒏𝒕𝒂𝒓 ꒰ᐢ. .ᐢ꒱
｡☆✼★━━━━━━━━━━━━★✼☆｡`,
      buttons: botones,
      headerType: 4,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        }
      }
    }, { quoted: fkontak })
  }

  let hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
  let fechaObj = new Date()
  let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
  let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })

  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply('⚠️ El nombre no puede estar vacío.')
  if (!age) return m.reply('⚠️ La edad no puede estar vacía.')
  if (name.length >= 100) return m.reply('⚠️ El nombre es demasiado largo.')
  age = parseInt(age)
  if (age > 1000) return m.reply('🧓 Wow~ el abuelito quiere jugar con el bot.')
  if (age < 5) return m.reply('🍼 Awww~ un abuelito bebé jsjs.')

  user.name = `${name} ✓`
  user.age = age
  user.regTime = +new Date      
  user.registered = true

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

  let regbot = `
╔═•ೋ°✧ REGISTRO COMPLETADO ✧°ೋ•═╗
│
│  ► ☃️ ɴᴏᴍʙʀᴇ: ${name}
│  ► 🍃 ᴜsᴇʀ: ${name2}
│  ► 📞 ɴᴜᴍᴇʀᴏ: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
│  ► ⭐ ᴇᴅᴀᴅ: ${age} años
│  ► 🔥 ʙɪᴏ: ${bio}
│
├─ 🍉 ғᴇᴄʜᴀ: ${fecha}    📡 ʜᴏʀᴀ: ${hora}
├─ 🎀 ᴅɪᴀ: ${dia}
└─ 🚀 ᴄʟᴀᴠᴇ ɴs: ${sn}
╚═════════════════════..`

  await m.react?.('📩')
  await conn.sendMessage(
    m.chat,
    {
      image: { url: pp },
      caption: regbot,
      footer: `${botname} • ${dev}`,
      buttons: [],
      headerType: 4,
      ...global.rcanalx
    },
    { quoted: fkontak }
  )
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler