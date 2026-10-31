import { createHash } from 'crypto'
import fetch from 'node-fetch'

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = command.toLowerCase()
  let isAll = false
  let isUser = false
  let isEnable

  switch (type) {
    case 'welcome':
    case 'bienvenida':
      if (!m.isGroup) return global.dfail('group', m, conn)
      if (!isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.welcome
      break

    case 'antiprivado':
    case 'antiprivate':
      if (!isOwner) return global.dfail('rowner', m, conn)
      isEnable = bot.antiPrivate
      isAll = true
      break

    case 'antiarabe':
      if (!isOwner) return global.dfail('rowner', m, conn)
      isEnable = bot.antiarabe
      isAll = true
      break

    case 'restrict':
    case 'restringir':
      if (!isOwner) return global.dfail('rowner', m, conn)
      isEnable = bot.restrict
      isAll = true
      break

    case 'antibot':
    case 'antibots':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.antiBot
      break

    case 'autoaceptar':
    case 'aceptarauto':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.autoAceptar
      break

    case 'autorechazar':
    case 'rechazarauto':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.autoRechazar
      break

    case 'autoresponder':
    case 'autorespond':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.autoresponder
      break

    case 'antisubbots':
    case 'antibot2':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.antiBot2
      break

    case 'modoadmin':
    case 'soloadmin':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.modoadmin
      break

    case 'reaction':
    case 'reaccion':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.reaction
      break

    case 'antispam':
    case 'antispam2':
      if (!isOwner) return global.dfail('rowner', m, conn)
      isEnable = bot.antiSpam
      isAll = true
      break

    case 'antilink2':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.antiLink2
      break

    case 'jadibotmd':
    case 'modejadibot':
      if (!isOwner) return global.dfail('rowner', m, conn)
      isEnable = bot.jadibotmd
      isAll = true
      break

    case 'detect':
    case 'avisos':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.detect
      break

    case 'antiver':
    case 'antiocultar':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.antiver
      break

    case 'audios':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.audios
      break

    case 'antilink':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.antiLink
      break

    case 'antifake':
    case 'antivirtuales':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.antifake
      break

    case 'economy':
    case 'economia':
      if (m.isGroup && !isAdmin && !isOwner) return global.dfail('admin', m, conn)
      isEnable = chat.economy
      break

    default:
      return conn.reply(m.chat, 'Opción غير صالح.', m)
  }

  if (args[0] === 'on' || args[0] === 'enable') {
    if (isEnable) return conn.reply(m.chat, `ꕥ *${type}* ya estaba *activado*.`, m, rcanal)
    isEnable = true
  } else if (args[0] === 'off' || args[0] === 'disable') {
    if (!isEnable) return conn.reply(m.chat, `ꕥ *${type}* ya estaba *desactivado*.`, m, rcanal)
    isEnable = false
  } else {
    return conn.reply(m.chat, `
━━━━━━━━━━━━━━━━━━━━━━━
﹒⌗﹒🌤️ .˚₊‧  𝐂𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐚𝐜𝐢𝐨𝐧 🍂ᯭ⁾  ꤥㅤꤪꤨ
━━━━━━━━━━━━━━━━━━━━━━━
🌿 *الأمر:* ${command}
🌾 *Activar:* ${usedPrefix + command} on
🍉 *Desactivar:* ${usedPrefix + command} off
━━━━━━━━━━━━━━━━━━━━━━━
> ꕥ Estado actual: *${isEnable ? '✓ ᴬᶜᵗᶦᵛᵃᵈᵒ' : '✗ ᴰᵉˢᵃᶜᵗᶦᵛᵃᵈᵒ'}*
━━━━━━━━━━━━━━━━━━━━━━━`, m, rcanal)
  }

  if (isAll) bot[type] = isEnable
  else if (isUser) user[type] = isEnable
  else chat[type] = isEnable

  conn.reply(m.chat, `
°================================°
☃️ 𝐏𝐀𝐍𝐄𝐋 𝐃𝐄 𝐂𝐎𝐍𝐓𝐑𝐎𝐋 🍉
°================================°

🧩 *Función:* ${type}
⚙️ *Estado:* ${isEnable ? '✅ 𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎' : '❌ 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎'}
🌍 *Aplica:* ${isAll ? '🌐 𝐓𝐨𝐝𝐨 𝐞𝐥 𝐁𝐨𝐭' : isUser ? '👤 𝐔𝐬𝐮𝐚𝐫𝐢𝐨' : '💬 𝐂𝐡𝐚𝐭'}

°================================°
`, m, rcanal)
}

handler.help = [
  'welcome', 'bienvenida', 'antiprivado', 'antiprivate', 'restrict', 'restringir', 'antibot', 'antibots',
  'autoaceptar', 'aceptarauto', 'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots',
  'antibot2', 'modoadmin', 'soloadmin', 'reaction', 'reaccion', 'antispam', 'antispam2',
  'jadibotmd', 'modejadibot', 'detect', 'avisos', 'antilink', 'audios', 'antiver', 'antiocultar',
  'antilink2', 'antiarabe', 'antifake', 'antivirtuales', 'economy', 'economia'
]

handler.tags = ['nable']
handler.command = handler.help

export default handler