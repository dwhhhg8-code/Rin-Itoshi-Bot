import Jimp from 'jimp';

let handler = async (m, { conn }) => {
  if (!m.quoted) return conn.reply(m.chat, `${emoji} من فضلك، رُدّ علىa imagen para cambiar la foto de perfil.`, m);

  try {
    const media = await m.quoted.download();
    if (!media) return conn.reply(m.chat, `${emoji2} تعذّر obtener الصورة.`, m);

    const image = await Jimp.read(media);
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    await conn.updateProfilePicture(conn.user.jid, buffer);
    return conn.reply(m.chat, `${emoji} Foto de perfil cambiada بنجاح.`, m);
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, `${msm} حدث خطأ al intentar cambiar la foto de perfil.`, m);
  }
};

handler.help = ['setimage'];
handler.tags = ['owner'];
handler.command = ['setpfp', 'setimage'];
handler.rowner = true;

export default handler;