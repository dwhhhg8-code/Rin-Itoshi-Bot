import fetch from 'node-fetch'
import fs from 'fs'
import { generarBienvenida, generarDespedida } from './_welcome.js'

const handler = async (m, { conn, command, usedPrefix, text, groupMetadata }) => {
const value = text ? text.trim() : ''
const chat = global.db.data.chats[m.chat]
if (command === 'setgp') {
return m.reply(`✦ أدخل la categoría que deseas modificar para tu grupo.\n\n🜸 Categorías متاحة:\n• ${usedPrefix}gpname <nuevo nombre>\n> Cambia الاسم dالمجموعة\n• ${usedPrefix}gpdesc <nueva descripción>\n> Modifica la descripción dالمجموعة\n• ${usedPrefix}gpbanner <imagen>\n> Establece una nueva imagen para المجموعة (رُدّ علىa imagen)\n• ${usedPrefix}setwelcome <الرسالة>\n> Configura el الرسالة de bienvenida para nuevos miembros\n• ${usedPrefix}setbye <الرسالة>\n> Establece el الرسالة de despedida al salir un usuario\n• ${usedPrefix}testwelcome\n> Simula el الرسالة de bienvenida\n• ${usedPrefix}testbye\n> Simula el الرسالة de despedida`)
}
try {
switch (command) {
case 'setwelcome': {
if (!value) return m.reply(`ꕥ Debes enviar un الرسالة para establecerlo como الرسالة de bienvenida.\n> Puedes usar {usuario} para mencionar al usuario, {grupo} para mencionar الاسم dالمجموعة y {desc} para mencionar la descripción dالمجموعة.\n\n✐ Ejemplo: ${usedPrefix}setwelcome مرحباً بك {usuario} a {grupo}!`)
chat.sWelcome = value
m.reply(`ꕥ Has establecido el الرسالة de bienvenida بنجاح.\n> Puedes usar ${usedPrefix}testwelcome para ver cómo se verá el الرسالة de bienvenida.`)
break
}
case 'setbye': {
if (!value) return m.reply(`ꕥ Debes enviar un الرسالة para establecerlo como الرسالة de despedida.\n> Puedes usar {usuario}, {grupo} y {desc} como variables dinámicas.\n\n✐ Ejemplo: ${usedPrefix}setbye Adiós {usuario}, te extrañaremos en {grupo}!`)
chat.sBye = value
m.reply(`ꕥ Has establecido el الرسالة de despedida بنجاح.\n> Puedes usar ${usedPrefix}testbye para ver cómo se verá el الرسالة de despedida.`)
break
}
case 'testwelcome': {
if (!chat.sWelcome) return m.reply('⚠︎ No hay الرسالة de bienvenida configurado.')
const { pp: ppWel, caption: captionWel, mentions: mentionsWel } = await generarBienvenida({ conn, userId: m.sender, groupMetadata, chat })
await conn.sendMessage(m.chat, { image: { url: ppWel }, caption: captionWel, mentions: mentionsWel }, { quoted: m })
try { fs.unlinkSync(ppWel) } catch {}
break
}
case 'testbye': {
if (!chat.sBye) return m.reply('⚠︎ No hay الرسالة de despedida configurado.')
const { pp: ppBye, caption: captionBye, mentions: mentionsBye } = await generarDespedida({ conn, userId: m.sender, groupMetadata, chat })
await conn.sendMessage(m.chat, { image: { url: ppBye }, caption: captionBye, mentions: mentionsWel }, { quoted: m })
try { fs.unlinkSync(ppBye) } catch {}
break
}}} catch (e) {
m.reply(`⚠︎ Se ha producido un problema.\n> El detalle del error se mostrará a continuación. Usa ${usedPrefix}report para informarlo.\n\n${e.message}`)
}}

handler.help = ['setwelcome', 'setbye', 'testwelcome', 'testbye']
handler.tags = ['group']
handler.command = ['setgp', 'setwelcome', 'testwelcome', 'testbye']
handler.admin = true
handler.group = true

export default handler
