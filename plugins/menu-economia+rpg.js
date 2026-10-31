import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let fecha = moment.tz('America/Lima').format('DD/MM/YYYY')
    let hora = moment.tz('America/Lima').format('hh:mm:ss A')
    let dia = moment.tz('America/Lima').locale('es').format('dddd')
    let comandos = Object.keys(global.plugins).length

    let club = '⚡ *Powered by* » Sʜᴀᴅᴏᴡ•Core 𝖢𝗅𝗎𝖻 ⚡'
    let menu = `╔════ ≪ •❈• ≫ ════╗
      👻 𝑴𝑬𝑵𝑼 - 𝑬𝑪𝑶𝑵𝑶𝑴𝑰𝑨 👻
╚════ ≪ •❈• ≫ ════╝
⏰ الوقت: *${hora}*
📅 التاريخ: *${fecha}*
🔋 Día: *${dia}*
👑 المطوّر: *${creador}*
⚙️ البادئة: *${usedPrefix}*
📡 الأوامر: *${comandos}*

⚔️ ¡Prepárate para la aventura!


❖─┅〈 𝑨𝑽𝑬𝑵𝑻𝑼𝑹𝑨 🌍
┃🎒 #aventura → Explora el mundo RPG
┃🏆 #baltop → Ranking de jugadores
┃🏹 #berburu / cazar → Caza animales y gana premios
┃💰 #bank / bal → Consulta tu dinero en el banco
┃📦 #cofre → Abre un cofre misterioso
┃🏦 #depositar → Deposita dinero al banco
┃🧭 #explorar → Descubre nuevas zonas
┃⚔️ #gremio → Información de tu gremio
┃🎃 #halloween → Evento de Halloween
┃❤️ #heal → Recupera tu vida
┃🎒 #inventario → Mira tus objetos
┃🕳️ #mazmorra → Entra en la mazmorra
┃📅 #monthly → Recompensa mensual
┃🏧 #retirar <cantidad> → Retira dinero del banco
┃🎄 #navidad → Evento de Navidad
┃🦹 #robar → Intenta robar a alguien
┃💃 #prostituirse → Gana dinero extra
┃📆 #weekly → Recompensa semanal
┃💨 #pay → tranfiere coins a otro jugador
╰━≡

❖─┅〈 𝑬𝑪𝑶𝑵𝑶𝑴𝑰𝑨 💸
┃🎟️ #canjear <código> → Reclama un premio
┃👛 #wallet → Consulta tu billetera
┃🎲 #apostar <cantidad> → Juega con tu dinero
┃🪙 #cf → Cara o cruz con monedas
┃🔪 #crimen → Haz un crimen (riesgoso)
┃🎁 #daily → Recompensa diaria
┃🎉 #regalo → Recibe un regalo sorpresa
┃⛏️ #minar → Mina minerales
┃📚 #robarxp → Roba experiencia a otros
┃🛒 #buy / buyall → Compra objetos
┃🎡 #ruleta <cantidad> <color> → Apuesta a la ruleta
┃👷 #trabajar / work → Trabaja para ganar dinero
┃🎰 #slot <apuesta> → Máquinas tragamonedas
╰━≡

📢 *Canal Oficial:*  
🔗 ${channel}  
「 ⚽𐚁 ֹ ִ Rin Itoshi - Official ୧ ֹ ִ⚽ 」
    `.trim()

    await conn.sendMessage(m.chat, {
      image: { url: logo },
      caption: menu,
      footer: club,
      buttons: [
        { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "👑 المطوّر" }, type: 1 },
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "📜 Menú Completo" }, type: 1 }
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
          title: '👻 Rin Itoshi - Menú RPG',
          body: '🎮 ᴄʀᴇᴀ ᴛᴜ ᴀᴠᴇɴᴛᴜʀᴀ, ʀᴇᴄᴏɢᴇ ʀᴇᴄᴜʀsᴏs, ɢᴀɴᴀ ᴏʀᴏ ʏ ᴅᴏᴍɪɴᴀ ᴇʟ ᴍᴜɴᴅᴏ ʀᴘɢ ⚔️',
          thumbnailUrl: 'https://files.catbox.moe/us0m4f.jpg',
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ خطأ في عرض قائمة RPG.')
  }
}

handler.help = ['menurpg']
handler.tags = ['menus']
handler.command = ['menur', 'menurpg']

export default handler