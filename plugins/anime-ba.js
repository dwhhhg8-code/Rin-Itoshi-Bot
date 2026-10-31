let handler = async (m, { conn }) => {
  try {
    let imageUrl = "https://api.zenzxz.my.id/random/ba";
    let caption = `> ${club}`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: caption
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("خطأ في إرسال الصورة.");
  }
};

handler.command = ['ba']; 
handler.help = ['ba'];
handler.tags = ['anime'];

export default handler;