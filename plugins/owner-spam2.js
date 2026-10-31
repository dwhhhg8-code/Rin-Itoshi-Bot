const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const args = text.split('|').map(v => v.trim());

  if (args.length < 3) {
    return m.reply(`${emoji} Debes ingresar الرابط dالمجموعة, el الرسالة y la cantidad de spam separados por "|".*\n\nEjemplo:\n${usedPrefix + command} https://chat.whatsapp.com/SSSS | Hola, ¿cómo están? | 5`);
  }

  const [groupLink, message, countStr] = args;
  const count = parseInt(countStr, 10);

  if (!groupLink.includes('chat.whatsapp.com')) {
    return m.reply(`${emoji2} Proporcione رابط صالح dالمجموعة.`);
  }
  if (isNaN(count) || count <= 0) {
    return m.reply(`${emoji2} Especifique una cantidad صالح de الرسالةs (mayor a 0).`);
  }

  try {
    const code = groupLink.split('chat.whatsapp.com/')[1];
    const groupId = await conn.groupAcceptInvite(code);

    m.reply(`${done} Unido al grupo بنجاح. Iniciando spam de ${count} الرسالةs...`);

    for (let i = 0; i < count; i++) {
      await conn.sendMessage(groupId, { text: message });
      await delay(1000); 
    }

    m.reply(`${done} Spam completado. Saliendo dالمجموعة...`);
    await conn.groupLeave(groupId);
  } catch (error) {
    console.error(error);
    m.reply(`${msm} خطأ في intentar realizar la operación: ${error.message}`);
  }
};

handler.help = ['spam2'];
handler.tags = ['owner'];
handler.command = ['spam2'];
handler.owner = true;
export default handler;