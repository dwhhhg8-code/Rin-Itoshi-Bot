import fetch from 'node-fetch'
import os from 'os'
import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix, command }) => {

  let logo = 'https://i.pinimg.com/originals/9d/6c/4e/9d6c4eeb7898079652b7f2c2e5c65632.jpg'
  let img = 'https://i.pinimg.com/originals/9d/6c/4e/9d6c4eeb7898079652b7f2c2e5c65632.jpg'

  // ✦✦✦✦ REGLAS DEL BOT ✦✦✦✦
  if (['botreglas', 'reglasdelbot', 'reglasbot', 'reglas'].includes(command)) {
    
    let uptime = process.uptime() * 1000
    let muptime = clockString(uptime)
    let userCount = Object.keys(global.db?.data?.users || {}).length || 0
    let chats = Object.keys(conn.chats || {}).length
    let groups = Object.values(conn.chats || {}).filter(c => c.id.endsWith('@g.us')).length

    const texto = `=================================
     𝙍𝙀𝙂𝙇𝘼𝙈𝙀𝙉 𝑹𝒊𝒏 𝑰𝒕𝒐𝒔𝒉𝒊 ⚡
 ⚠️ *𝐂𝐨𝐝𝐢𝐠𝐨 𝐝𝐞 𝐎𝐧𝐨𝐫 – Black*

▤ ✘ No llamar al bot innecesariamente.
▤ ✘ No hacer spam o comandos repetitivos.
▤ ✘ No añadir a grupos sin autorización.
▤ ✘ No مفقودr el respeto al sistema ni a los admins.
▤ ✘ Contacta al creador en caso de errores o dudas.
=================================

=================================
   ❖ ⚜️ *𝐀𝐕𝐈𝐒𝐎 𝐄𝐒𝐏𝐄𝐂𝐈𝐀𝐋* ⚜️ ❖
\`\`\`❗ Si incumples cualquiera de estas reglas, el bot tomará medidas automáticas.\`\`\`
=================================

=================================
   ❖ 💠 *𝐈𝐍𝐅𝐎 𝐃𝐄𝐋 𝐁𝐎𝐓* 💠 ❖
🧑‍💻 *Creador:* 𝖍𝖆𝖎𝖙𝖍𝖆𝖒
🤖 *Nombre:* FLASH BOT
📦 *Versión:* 2.2.5
📊 *Usuarios registrados:* ${userCount}
💬 *Chats activos:* ${chats} (${groups} grupos)
⏱️ *Tiempo activo:* ${muptime}
📅 *التاريخ:* ${moment.tz('America/Lima').format('DD/MM/YYYY HH:mm')}

=================================
   ❖ ⭐ *𝐑𝐄𝐂𝐎𝐌𝐄𝐍𝐃𝐀𝐂𝐈𝐎𝐍* ⭐ ❖
\`\`\`⭐ Si te gusta el bot, visita el repositorio y apóyalo con una estrella.\`\`\`

> 🌐 Repositorio: ${md}
> ${textbot}`.trim();

    await conn.sendMessage(m.chat, { image: { url: logo }, caption: texto }, { quoted: fkontak })
  }

  // ✦✦✦✦ REGLAS DE GRUPO ✦✦✦✦
  else if (['gruporeglas', 'reglasgp'].includes(command)) {
    if (!m.isGroup) return conn.reply(m.chat, '❗ Este comando solo se puede usar en grupos.', m);

    try {
      const groupInfo = await conn.groupMetadata(m.chat);
      const url = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null);

      let admins = groupInfo.participants.filter(p => p.admin).map(p => `• @${p.id.split('@')[0]}`).join('\n') || 'No hay administradores.';
      let creador = groupInfo.owner ? `@${groupInfo.owner.split('@')[0]}` : 'Desconocido';
      let fechaCreacion = new Date(groupInfo.creation * 1000).toLocaleString('es-ES', { timeZone: 'America/Lima' });

      const texto = `
==============================
 📜 𝗥 𝗘 𝗚 𝗟 𝗔 𝗦 • 𝗚 𝗥 𝗢 𝗨 𝗣 📜
==============================

🏷️ *Nombre:* ${groupInfo.subject}
👑 *المطوّر:* ${creador}
👥 *Miembros:* ${groupInfo.participants.length}
🛡️ *Admins:*
${admins}
📅 *Creado el:* ${fechaCreacion}

📝 *الوصف:*
${groupInfo.desc?.trim() || 'No hay reglas establecidas en la descripción dالمجموعة.'}

> © ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ | ☆ ʙʏ 𝖍𝖆𝖎𝖙𝖍𝖆𝖒`.trim();

      await conn.sendMessage(m.chat, { image: { url: url || img }, caption: texto, mentions: conn.parseMention(texto) }, { quoted: m })

     await conn.sendMessage(m.chat, { audio: { url: 'https://files.catbox.moe/55r702.mp4' }, mimetype: 'audio/mpeg', ptt: true, }, { quoted: m })

    } catch (e) {
      console.error(e);
      await conn.reply(m.chat, '❌ No se pudieron obtener las reglas dالمجموعة. Asegúrate de usar este comando en un grupo صالح.', m);
    }
  }
};

handler.help = ['botreglas', 'gruporeglas']
handler.tags = ['main']
handler.command = ['botreglas','reglasdelbot','reglasbot','reglas','gruporeglas','reglasgp']
handler.register = true
handler.coin = 4

export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [
    d ? d + 'd' : '',
    h ? h + 'h' : '',
    m ? m + 'm' : '',
    s ? s + 's' : ''
  ].join(' ')
}