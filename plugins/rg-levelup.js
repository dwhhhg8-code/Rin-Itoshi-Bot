import { canLevelUp, xpRange } from '../lib/levelling.js';
import db from '../lib/database.js';

let handler = async (m, { conn }) => {
    let mentionedUser = m.mentionedJid[0];
    let citedMessage = m.quoted ? m.quoted.sender : null;
    let who = mentionedUser || citedMessage || m.sender; 
    let name = conn.getName(who) || 'Usuario';
    let user = global.db.data.users[who];

    if (!user) {
        await conn.sendMessage(m.chat, "لم يتم العثور على datos dالمستخدم.", { quoted: m });
        return;
    }

    let { min, xp } = xpRange(user.level, global.multiplier);
    
    let before = user.level * 1;
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;

    if (before !== user.level) {
        let txt = `ᥫ᭡ Felicidades Has subido de nivel ❀\n\n`; 
        txt += `*${before}* ➔ *${user.level}* [ ${user.role} ]\n\n`;
        txt += `• ✰ *المستوى anterior* : ${before}\n`;
        txt += `• ✦ *Nuevos niveles* : ${user.level}\n`;
        txt += `• ❖ *التاريخ* : ${new Date().toLocaleString('id-ID')}\n\n`;
        txt += `> ➨ Nota: *Cuanto más interactúes con el Bot, mayor será tu nivel.*`;
        await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
    } else {
        let users = Object.entries(global.db.data.users).map(([key, value]) => {
            return { ...value, jid: key };
        });

        let sortedLevel = users.sort((a, b) => (b.level || 0) - (a.level || 0));
        let rank = sortedLevel.findIndex(u => u.jid === who) + 1;

        let txt = `*「✿」المستخدم* ◢ ${name} ◤\n\n`;
        txt += `✦ المستوى » *${user.level}*\n`;
        txt += `✰ الخبرة » *${user.exp}*\n`;
        txt += `❖ الرتبة » ${user.role}\n`;
        txt += `➨ Progreso » *${user.exp - min} => ${xp}* _(${Math.floor(((user.exp - min) / xp) * 100)}%)_\n`;
        txt += `# Puesto » *${rank}* de *${sortedLevel.length}*\n`;
        txt += `❒ الأوامر totales » *${user.commands || 0}*`;

        await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
    }
}

handler.help = ['levelup', 'lvl @user']
handler.tags = ['rpg']
handler.command = ['nivel', 'lvl', 'level', 'levelup']
handler.register = true
handler.group = true

export default handler
