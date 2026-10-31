import moment from 'moment-timezone'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, args, usedPrefix }) => {
  try {
    let userId =
      (m.quoted && m.quoted.sender) ||
      (m.mentionedJid && m.mentionedJid[0]) ||
      m.sender

    if (!global.db.data.users) global.db.data.users = {}
    if (!global.db.data.characters) global.db.data.characters = {}
    if (!global.db.data.users[userId]) global.db.data.users[userId] = {}

    const user = global.db.data.users[userId]
    const name = await getSafeName(conn, userId)
   
    const cumpleanos = user.birth || 'Sin especificar :< (#setbirth)'
    const genero = user.genre || 'Sin especificar'
    const pareja = user.marry
    const casado = pareja
      ? (global.db.data.users[pareja]?.name || await getSafeName(conn, pareja))
      : 'Nadie'
    const description = user.description || 'لا يوجد وصف :v'

    const exp = user.exp || 0
    const nivel = user.level || 0
    const coin = user.coin || 0
    const bank = user.bank || 0
    const totalCoins = coin + bank
    const country = user.country || 'Desconocido'
    const phone = new PhoneNumber(userId, 'PE').getNumber('international')

    const sorted = Object.entries(global.db.data.users)
      .map(([k, v]) => ({ ...v, jid: k }))
      .sort((a, b) => (b.level || 0) - (a.level || 0))
    const rank = sorted.findIndex(u => u.jid === userId) + 1
    const xpData = xpRange(nivel, global.multiplier || 1)
    const porcentaje = Math.floor(
      ((exp - xpData.min) / (xpData.xp || 1)) * 100
    )
    const progreso = `${exp - xpData.min} / ${xpData.xp} (_${porcentaje}%_)`

    const prems = Array.isArray(global.prems) ? global.prems : []
    const premium =
      user.premium ||
      prems
        .map(v => v.replace(/\D+/g, '') + '@s.whatsapp.net')
        .includes(userId)
    const isLeft = premium
      ? user.premiumTime && user.premiumTime > Date.now()
        ? await formatTime(user.premiumTime - Date.now())
        : 'Permanente'
      : '—'

    const favId = user.favorite
    const favLine =
      favId && global.db.data.characters?.[favId]
        ? `\n๑ Claim favorito » *${global.db.data.characters[favId].name || '???'}*`
        : ''
    const ownedIDs = Object.entries(global.db.data.characters)
      .filter(([, c]) => c.user === userId)
      .map(([id]) => id)
    const haremCount = ownedIDs.length
    const haremValue = ownedIDs.reduce((acc, id) => {
      const char = global.db.data.characters[id] || {}
      return acc + (typeof char.value === 'number' ? char.value : 0)
    }, 0)

    const perfil =
      (await conn
        .profilePictureUrl(userId, 'image')
        .catch(_ =>
          'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg'
        )) || 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg'

    const profileText = `
╭━⊰ 🔮 𝐏𝐄𝐑𝐅𝐈𝐋 𝐂𝐎𝐒𝐌𝐈𝐂𝐎 🔮 ⊱━╮
   ✧˚₊⊹ ʀɪɴ ɪᴛᴏꜱʜɪ ʙᴏᴛ ⊹₊˚✧
╰━━━━━━━━━━━━━━━━━━━━━━━╯

🌟 *Identidad Estelar:* @${userId.split('@')[0]}
🌙 *الاسم Arcano:* *${name}*
🌀 *Esencia Vital:* _${description}_

╭─〔 ⚙️ CONFIGURACIÓN ESPIRITUAL 〕
│ 🎂 *Edad Estelar:* ${user.age || 'Incierta'}
│ 📆 *Ciclo Cósmico:* ${cumpleanos}
⚧️ *Polaridad:* ${genero}
│ 💖 *Vínculo Álmico:* ${casado}
│ 🌍 *Origen Estelar:* ${country}
│ 📱 *Contacto:* ${phone}
╰══✦

╭─〔 ✦ RECURSOS CÓSMICOS ✦ 〕
│ 🪙 *العملات:* ${coin.toLocaleString()}
│ 🏦 *Banco:* ${bank.toLocaleString()}
│ 🌷 *المستوى Dimensional:* ${nivel}
│ 🌿 *Exp Cósmica:* ${exp.toLocaleString()}
│ 🌀 *Progreso:* ${progreso}
│ 📈 *Puesto:* #${rank}
│ 🛡️ *الرتبة:* ${user.role || 'Sin الرتبة'}
│ 🔮 *Premium:* ${premium ? `🟢 Activo (*${isLeft}*)` : '🔴 Inactivo'}
╰══✦

╭─〔 💞 CONEXIÓN DIVINA 💞 〕
│ ꕥ *Harem:* ${haremCount}
│ ♤ *Valor total:* ${haremValue.toLocaleString()}
│ ❒ *Coins totales:* ${totalCoins.toLocaleString()}
│ ❒ *الأوامر usados:* ${user.commands || 0}
╰══✦

🌌 〘 _"El cosmos refleja tu esencia."_ 〙
`

    await conn.sendMessage(m.chat, {
      text: profileText,
      contextInfo: {
        mentionedJid: [userId],
        forwardingScore: 999999,
        isForwarded: true,
        externalAdReply: {
          title: '🌌 𝑷𝒆𝒓𝒇𝒊𝒍 𝑪𝒐́𝒔𝒎𝒊𝒄𝒐 🌠',
          body: `${name} — Explorador Estelar`,
          thumbnailUrl: perfil,
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: false,
        },
      },
    }, { quoted: m })
  
  } catch (error) {
    console.error(error)
    await m.reply(
      `⚠️ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`
    )
  }
}

handler.help = ['profile']
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
handler.group = true

export default handler

async function getSafeName(conn, id) {
  try {
    return await conn.getName(id)
  } catch {
    return id.split('@')[0]
  }
}

async function formatTime(ms) {
  if (ms <= 0) return 'Expirado'
  let s = Math.floor(ms / 1000),
    m = Math.floor(s / 60),
    h = Math.floor(m / 60),
    d = Math.floor(h / 24)
  s %= 60
  m %= 60
  h %= 24
  let t = []
  if (d) t.push(`${d} día${d > 1 ? 's' : ''}`)
  if (h) t.push(`${h} hora${h > 1 ? 's' : ''}`)
  if (m) t.push(`${m} minuto${m > 1 ? 's' : ''}`)
  if (s) t.push(`${s} segundo${s > 1 ? 's' : ''}`)
  return t.length ? t.join(' y ') : 'Ahora mismo'
}