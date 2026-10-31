let handler = async (m, { conn }) => {
  try {
    await conn.updateProfilePicture(conn.user.jid, Buffer.alloc(0));
    await conn.reply(m.chat, '🗑️ Foto de perfil eliminada بنجاح.', m, fake);
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, '❌ حدث خطأ al eliminar la foto de perfil.', m);
  }
};

handler.help = ['delppbot'];
handler.tags = ['owner'];
handler.command = ['delppbot'];
handler.owner = true;

export default handler;