import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🍬 من فضلك أدخل un nombre de usuario de Telegram para buscar.\n\nEjemplo:\n> *${usedPrefix + command}* JoseXrl15k`, m, rcanal);
  }

  await m.react('🕓');
  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/tools/telegramstalk?username=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.data) {
      await m.react('✖️');
      return await conn.reply(m.chat, '❌ لا توجد نتائج لهذا البحث.', m);
    }

    const user = json.data;
    let txt = `📌 *T E L E G R A M - S T A L K*\n\n`;
    txt += `👤 *الاسم:* ${user.name}\n`;
    txt += `🔖 *المستخدم:* ${user.username}\n`;
    txt += `📜 *الوصف:* ${user.description || 'لا يوجد وصف'}\n`;
    txt += `🔗 *Perfil:* ${user.profile}\n\n`;

    await conn.sendMessage(m.chat, { image: { url: user.profile }, caption: txt }, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, '⚠️ حدث خطأ أثناء المعالجة. حاول مرة أخرى لاحقاً.', m);
  }
};

handler.help = ['telegramstalk *<nombre_usuario>*'];
handler.tags = ['stalk'];
handler.command = ['telegramstalk'];
handler.register = true;

export default handler;
