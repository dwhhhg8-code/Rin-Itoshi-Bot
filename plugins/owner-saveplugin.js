import fs from 'fs';

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`${emoji} من فضلك أدخل الاسم del plugin.`);
    }

    if (!m.quoted || !m.quoted.text) {
        return m.reply(`${emoji2} Responda al الرسالة con el contenido del plugin.`);
    }

    const ruta = `plugins/${text}.js`;
    
    try {
        await fs.writeFileSync(ruta, m.quoted.text);
        m.reply(`${emoji} Guardando plugin en ${ruta}`);
    } catch (error) {
        m.reply(`${msm} حدث خطأ al guardar el plugin: ${error.message}`);
    }
};

handler.help = ['saveplugin'];
handler.tags = ['owner'];
handler.command = ["saveplugin"];
handler.owner = true;

export default handler;