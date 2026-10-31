const handler = async (m, { text, conn }) => {
    try {
        if (!text) return m.reply("《✦》 ¡من فضلك، introduce الرابط del canal de WhatsApp!");

        const regex = /https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9-_]+)/;
        const match = text.match(regex);

        if (!match) return m.reply("⚠️ ¡الرابط del canal de WhatsApp no es صالح!");

        let channelId = match[2];
        let res = await conn.newsletterMetadata("invite", channelId);

        if (!res || !res.id) return m.reply("❌ Falló la obtención de datos del canal. ¡Verifica الرابط nuevamente!");

        let SHADOW = `🌱 *Detalles del Canal de WhatsApp* 📡\n\n`
            + `🍂 *ID:* ${res.id}\n`
            + `⚡ *الاسم:* ${res.name}\n`
            + `⚽ *الإجمالي de Seguidores:* ${res.subscribers.toLocaleString()}\n`
            + `☘️ *Estado:* ${res.state}\n`
            + `✅ *Verificado:* ${res.verification === "VERIFIED" ? "✔ Verificado" : "❌ No Verificado"}\n`;

        return m.reply(SHADOW);
    } catch (error) {
        console.error(error);
        return m.reply("⚠️ حدث خطأ al obtener البيانات del canal. حاول مرة أخرى لاحقاً.");
    }
};

handler.command = ['cekidch', 'idch'];
handler.help = ['cekidch'];
handler.tags = ['stalk'];

export default handler;