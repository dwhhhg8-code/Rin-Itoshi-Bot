import os from 'os';
import { execSync } from 'child_process';

const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const getDiskSpace = () => {
    try {
        const stdout = execSync('df -h | grep -E "^/dev/root|^/dev/sda1"').toString();
        const [ , size, used, available, usePercent ] = stdout.trim().split(/\s+/);
        return { size, used, available, usePercent };
    } catch (error) {
        console.error('✧ خطأ في جلب el espacio en disco:', error);
        return null;
    }
};

const handler = async (m, { conn }) => {

    /*const rin = `╭━〔 ⚙️ 𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎 𝐃𝐀𝐓𝐎𝐒 ⚙️ 〕━⬣
┃
┃ 🚧 𝐂 𝐀 𝐑 𝐆 𝐀 𝐍 𝐃 𝐎 - 𝐒𝐘𝐒𝐓𝐄𝐌...
┃ 🚀 *𝙀𝙉𝙑𝙄𝘼𝙉𝘿𝙊 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝘾𝙄𝙊́𝙉 𝘿𝙀𝙇 𝙎𝙄𝙎𝙏𝙀𝙈𝘼...*
┃
╰━━━━━━〔 🛰️ 〕━━━━━━⬣`
    await conn.reply(m.chat, rin.trim(), m, fake);*/
    
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const _muptime = process.uptime() * 1000;
    const muptime = clockString(_muptime);
    const hostname = os.hostname();
    const platform = os.platform();
    const arch = os.arch();
    const nodeUsage = process.memoryUsage();
    const diskSpace = getDiskSpace();

    const message = `✦͙۪۪̇˚̣̣̣͙✩ 𓆩 𝑺𝒀𝑺𝑻𝑬𝑴 𝑰𝑵𝑭𝑶 𓆪 ✩˚̣̣̣͙۪۪͙̇✦
╭━━〔 ⚙️ *ESTADO DEL HOST* 〕━━⬣
│ ✧ 🌐 *Host:* ${hostname}
│ ✧ 🧬 *Sistema:* ${platform} (${arch})
│ ✧ 🔋 *RAM الإجمالي:* ${formatBytes(totalMem)}
│ ✧ ✨ *RAM Libre:* ${formatBytes(freeMem)}
│ ✧ ⚡ *RAM Usada:* ${formatBytes(usedMem)}
│ ✧ ⏳ *Tiempo Activo:* ${muptime}
╰━━━━━━━━━━━━━━━━━━⬣

╭━━〔 🪄 *MEMORIA NODE.JS* 〕━━⬣
│ ✧ 📦 *RSS:* ${formatBytes(nodeUsage.rss)}
│ ✧ 🧠 *Heap الإجمالي:* ${formatBytes(nodeUsage.heapTotal)}
│ ✧ 💎 *Heap Usado:* ${formatBytes(nodeUsage.heapUsed)}
│ ✧ 📂 *Externa:* ${formatBytes(nodeUsage.external)}
│ ✧ 🎯 *Buffers:* ${formatBytes(nodeUsage.arrayBuffers)}
╰━━━━━━━━━━━━━━━━━━⬣

${diskSpace ? `╭━━━〔 💽 *DISCO DURO* 〕━━━⬣
│ ✧ 📀 *الإجمالي:* ${diskSpace.size}
│ ✧ 📊 *Usado:* ${diskSpace.used}
│ ✧ 🌌 *Libre:* ${diskSpace.available}
│ ✧ 🔮 *Uso:* ${diskSpace.usePercent}
╰━━━━━━━━━━━━━━━━━━⬣` : '🚫 *تعذّر obtener el espacio en disco.*'}`;

    await conn.sendMessage(m.chat, {
        text: message,
        mentions: [],
        contextInfo: {
            mentionedJid: [],
            externalAdReply: {
                body: 'Sistema del bot',
                thumbnailUrl: 'https://files.catbox.moe/vs2uvc.jpg',
                mediaType: 1,
                renderLargerThumbnail: false,
                sourceUrl: 'https://whatsapp.com/channel/0029Vb8QIpSJ3juu0VHRyU0v'
            }
        }
    }, { quoted: m });
};

handler.help = ['sistema'];
handler.tags = ['info'];
handler.command = ['system', 'sistema'];
handler.register = true;

export default handler;

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}