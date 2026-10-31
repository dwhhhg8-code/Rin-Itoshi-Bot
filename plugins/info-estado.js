import ws from 'ws'
let handler = async (m, { conn, usedPrefix, isRowner}) => {
let _uptime = process.uptime() * 1000;
let totalreg = Object.keys(global.db.data.users).length
let totalchats = Object.keys(global.db.data.chats).length

let uptime = clockString(_uptime);
let users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) 
const totalUsers = users.length;
let old = performance.now()
let neww = performance.now()
let speed = neww - old
const used = process.memoryUsage()
let info = `▧ ═══『 ${botname} 』═══ ▧
⟢ 🏆 𝐂𝐫𝐞𝐚𝐝𝐨𝐫: ${etiqueta}
⟢ 🌀 𝐏𝐫𝐞𝐟𝐢𝐣𝐨: [ ${usedPrefix} ]
⟢ 📌 𝐕𝐞𝐫𝐬𝐢𝐨́𝐧: ${vs}
⟢ 💬 𝐂𝐡𝐚𝐭𝐬 𝐏𝐫𝐢𝐯𝐚𝐝𝐨𝐬: ${chats.length - groupsIn.length}
⟢ 🗂 𝐂𝐡𝐚𝐭𝐬 𝐓𝐨𝐭𝐚𝐥𝐞𝐬: ${chats.length}
⟢ 👥 𝐔𝐬𝐮𝐚𝐫𝐢𝐨𝐬: ${totalreg}
⟢ 🏟 𝐆𝐫𝐮𝐩𝐨𝐬: ${groupsIn.length}
⟢ ⏳ 𝐀𝐜𝐭𝐢𝐯𝐨: ${uptime}
⟢ ⚡ 𝐕𝐞𝐥𝐨𝐜𝐢𝐝𝐚𝐝: ${(speed * 1000).toFixed(0) / 1000} seg
⟢ 🤖 𝐒𝐮𝐛-𝐁𝐨𝐭𝐬 𝐀𝐜𝐭𝐢𝐯𝐨𝐬: ${totalUsers || '0'}
▧ ═══════════════════ ▧
`;
await conn.sendFile(m.chat, banner, 'estado.jpg', info, m)
}
handler.help = ['estado']
handler.tags = ['info']
handler.command = ['estate', 'state', 'stado', 'stats']
handler.register = true

export default handler

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
}
