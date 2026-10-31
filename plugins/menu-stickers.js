let handler = async (m, { conn }) => {
  let imgurl = banner;
  const Menu = `
╭━━━〔 🌴 *قائمة الملصقات* 🌴 〕━━⬣
┃ 𖦹 ⊹ 🎄 𝑪𝒐𝒎𝒂𝒏𝒅𝒐𝒔 𝒑𝒂𝒓𝒂 𝒔𝒕𝒊𝒄𝒌𝒆𝒓𝒔
┃
┃ ✦ 🍄 #ʙʀᴀᴛ <texto>
┃    ▸ Convierte texto en sticker.
┃
┃ ✦ 🏞️ #ʙʀᴀᴛᴠɪᴅ <texto>
┃    ▸ Sticker estilo brat en video.
┃
┃ ✦ 👾 #ᴇᴍᴏᴊɪᴍɪx <emoji+emoji>
┃    ▸ Fusión de emojis en uno.
┃
┃ ✦ ☄️ #ᴘғᴘ @user
┃    ▸ Obtén foto de perfil de un usuario.
┃
┃ ✦ ⛩️ #ǫᴄ
┃    ▸ Crea un sticker con texto decorado.
┃
┃ ✦ 🌥️ #sᴇᴛᴍᴇᴛᴀ
┃    ▸ Personaliza los nombres de stickers.
┃
┃ ✦ 🐛 #s / #sᴛɪᴄᴋᴇʀ
┃    ▸ Convierte imagen en sticker.
┃
┃ ✦ 💥 #ᴛᴏɪᴍɢ (responde)
┃    ▸ Sticker a imagen.
┃
┃ ✦ 👻 #ᴡᴍ
┃    ▸ Marca personalizada en stickers.
┃
┃ ✦ 🌚 #ᴀᴛᴛᴘ <texto>
┃    ▸ Crea sticker a partir de texto.
┃
╰━━━〔 ⚡ ${global.packname || 'Rin itoshi Bot'} ⚡〕━━⬣
> 𓆩 ${global.dev || 'Shadow-xyzi'} 𓆪
`.trim();

  await conn.sendMessage(m.chat, {
    image: { url: imgurl },
    caption: Menu,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: global.packname,
        body: global.dev,
        thumbnailUrl: global.icono,
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        mediaUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
        sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
      }
    }
  }, { quoted: m });
};

handler.help = ['menusticker']
handler.tags = ['menus']
handler.command = ['menusticker', 'stickersmenu', 'stickermenu']

export default handler