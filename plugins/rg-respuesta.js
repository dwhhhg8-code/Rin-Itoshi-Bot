let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`${emoji} Ejemplo:\n\n${usedPrefix + command} <id> <الرسالة>\n\n*${emoji2} Uso:* ${usedPrefix + command} 1234 شكراً por tu confesión.`);
    
    let split = text.trim().split(/ (.+)/); 
    let id = split[0]; 
    let pesan = split[1]; 

    if (!id || !pesan) throw m.reply(`${emoji} Ejemplo:\n\n${usedPrefix + command} <id> <الرسالة>\n\n*${emoji2} Uso:* ${usedPrefix + command} 1234 شكراً por tu confesión.`);
    
    id = id.trim();
    pesan = pesan.trim();

    
    console.log("conn.menfess", conn.menfess); 
    
    if (!conn.menfess || !conn.menfess[id]) {
        throw m.reply(`${msm} خطأ:* لم يتم العثور على ningún الرسالة con el ID *${id}*.`);
    }
    
    let { dari, penerima } = conn.menfess[id];
    
    if (m.sender !== penerima) throw m.reply(`${emoji} No tienes permiso para responder a este الرسالة.`);
    
    let teks = `*أهلاً, recibiste una respuesta a tu الرسالة anónimo.*\n\n*\`ID:\`* *${id}*\n*\`RESPUESTA:\`* \n\n${pesan}`.trim();
    
    try {
        
        let sentMessage = await conn.sendMessage(dari, {
            text: teks,
            contextInfo: {
                mentionedJid: [dari],
                externalAdReply: {
                    title: 'R E S P U E S T A S',
                    body: '¡شكراً por usar el servicio de confesiones!',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: channel,
                }
            }
        });
        
        if (sentMessage) {
           return conn.reply(m.chat, `${emoji} الرد enviada بنجاح.\n*IDENTIFICADOR:*` + ` *${id}*`, m);
            
            
            conn.menfess[id].status = true;
        } else {
            throw new Error('تعذّر enviar el الرسالة.');
        }
    } catch (e) {
        console.error(e);
        m.reply(`${msm} حدث خطأ al enviar la respuesta. تأكد من el número es صالح y que el remitente puede recibir الرسالةs.`);
    }
};

handler.tags = ['rg'];
handler.help = ['respuesta'].map(v => v + ' <id الرسالة>');
handler.command = ['respuesta', 'responder']
handler.register = true;
handler.private = true;

export default handler;
