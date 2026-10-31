import db from '../lib/database.js';
import MessageType from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
        } else {
            const quoted = m.quoted ? m.quoted.sender : null;
            who = quoted ? quoted : m.chat;
        }
    } else {
        who = m.chat;
    }
    
    if (!who) return m.reply(`${emoji} من فضلك، menciona al usuario o cita un الرسالة.`);
    
    let txt = text.replace('@' + who.split`@`[0], '').trim();
    let dmt;

    if (txt.toLowerCase() === 'all') {
        dmt = global.db.data.users[who].exp;
    } else {
        if (!txt) return m.reply(`${emoji2} من فضلك أدخل la cantidad de experiencia (XP) que deseas quitar.`);
        if (isNaN(txt)) return m.reply(`${emoji} Solo números son permitidos.`);
        
        dmt = parseInt(txt);
    }
    
    let users = global.db.data.users;
    
    if (users[who].exp < dmt) {
        return m.reply(`${emoji2} المستخدم no tiene suficiente XP para quitar. Tiene ${users[who].exp} XP.`);
    }

    users[who].exp -= dmt;
    
    m.reply(`✨ *Quitado:*
» ${dmt} \n@${who.split('@')[0]}, te han quitado ${dmt} XP`, null, { mentions: [who] });
};

handler.help = ['quitarxp *<@user>*'];
handler.tags = ['owner'];
handler.command = ['quitarxp', 'removexp']; 
handler.rowner = true;

export default handler;
