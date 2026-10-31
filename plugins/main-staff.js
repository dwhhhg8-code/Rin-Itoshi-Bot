let handler = async (m, { conn, command, usedPrefix }) => {
  let img = './src/catalogo.jpg'
  let staff = ` 🌷⃢🌟⃞𝑬𝒒𝒖𝒊𝒑𝒐 𝒅𝒆 𝑨𝒚𝒖𝒅𝒂𝒏𝒕𝒆𝒔🌟⃞🌷⃢

╭━➤🏜️ 𝙁𝙇𝘼𝙎𝙃 𝘽𝙊𝙏 𝑴𝑫 ︵ٜ⊹۬︵
┃👑 𝑫𝒖𝒆𝒏̃𝒐: ${global.creador || 'No definido'}
┃🤖 𝑩𝒐𝒕: ${global.botname || 'FLASH BOT'}
┃📦 𝑽𝒆𝒓𝒔𝒊ó𝒏: ${global.vs || '1.0.0'}
┃📚 𝑳𝒊𝒃𝒓𝒆𝒓í𝒂: ${global.libreria || 'Baileys'} (${global.baileys || 'multi-device'})
╰━━━━━━━━━━━━━━━━━━━━━

╭━➤🧠 𝑪𝒓𝒆𝒂𝒅𝒐𝒓 𝑷𝒓𝒊𝒏𝒄𝒊𝒑𝒂𝒍 ︵ٜ⊹۬︵
┃⚽ 𝑵𝒐𝒎𝒃𝒓𝒆: ${global.etiqueta || 'Yuji'}𖣘
┃🎈 𝑹𝒐𝒍: Developer
┃🔗 𝑵ú𝒎𝒆𝒓𝒐: wa.me/qr/5B6AGA5YNOUZI1
┃🧬 𝑮𝒊𝒕𝑯𝒖𝒃: https://github.com/dwhhhg8-code
╰━━━━━━━━━━━━━━━━━━━━━

╭━➤👥 𝑪𝒐𝒍𝒂𝒃𝒐𝒓𝒂𝒅𝒐𝒓𝒆𝒔 ︵ٜ⊹۬︵
┃🚫 𝑨𝒄𝒕𝒖𝒂𝒍𝒎𝒆𝒏𝒕𝒆 𝒏𝒐 𝒉𝒂𝒚 𝒄𝒐𝒍𝒂𝒃𝒐𝒓𝒂𝒅𝒐𝒓𝒆𝒔
╰━━━━━━━━━━━━━━━━━━━━━`

  await conn.sendFile(m.chat, img, 'staff.jpg', staff.trim(), m)
}
  
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler