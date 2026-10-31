import { exec } from 'child_process';

let handler = async (m, { conn }) => {
  m.reply(`*⚙️ 𝘐𝘯𝘪𝘤𝘪𝘢𝘯𝘥𝘰 𝘱𝘳𝘰𝘤𝘦𝘴𝘰 𝘥𝘦 𝘢𝘤𝘵𝘶𝘢𝘭𝘪𝘻𝘢𝘤𝘪𝘰𝘯. . . ..*`);

  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      conn.reply(m.chat, `${msm} خطأ: تعذّر realizar la actualización.\nRazón: ${err.message}`, m);
      return;
    }

    if (stderr) {
      console.warn('تحذير durante la actualización:', stderr);
    }

    if (stdout.includes('Already up to date.')) {
      conn.reply(m.chat, `*_البوت ya está actualizado._*`, m);
    } else {
      conn.reply(m.chat, `*🌿 𝘈𝘤𝘵𝘶𝘢𝘭𝘪𝘻𝘢𝘤𝘪𝘰𝘯 𝘤𝘰𝘮𝘱𝘭𝘦𝘵𝘢𝘥𝘢 𝘤𝘰𝘯 𝘦𝘹𝘪𝘵𝘰.*\n\n\`\`\`${stdout}\`\`\``, m, rcanal);
    }
  });
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update', 'fix', 'actualizar'];

handler.all = async function (m) {
  if (!m.text) return
  let txt = m.text.trim().toLowerCase()
  if (['update', 'fix', 'actualizar'].includes(txt)) {
    return handler(m, { conn: this, args: [] })
  }
}

export default handler;