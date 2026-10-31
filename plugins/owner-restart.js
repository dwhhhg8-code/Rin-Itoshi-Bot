let handler = async (m, { conn, usedPrefix, command, isROwner }) => {
if (!isROwner) return
try {
await m.react('🕒')
m.reply(`❀ Reiniciando a ${botname} જ⁀➴\n> ► انتظر hasta que el *Socket* se reinicie.`)
await m.react('✔️')
setTimeout(() => {
if (process.send) {
process.send("restart")
} else {
process.exit(0)
}}, 3000)
} catch (error) {
await m.react('✖️')
console.log(error)
conn.reply(m.chat, `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`, m)
}}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart', 'reiniciar'] 

export default handler
