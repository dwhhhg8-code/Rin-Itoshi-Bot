import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
try {
let res = await fetch('https://api.github.com/repos/dwhhhg8-code/flash-bot')

if (!res.ok) throw new Error('خطأ في جلب datos del repositorio')
let json = await res.json()

let txt = `⼢ ⃘𐇽.    𝗦𝗖𝗥𝗜𝗣𝗧  •  𝗜𝗡𝗙𝗢  ଘ(੭*ˊᵕˋ)੭\n`
txt += `> ❐ *الاسم:* ${json.name}\n`
txt += `> ✿ *Visitas:* ${json.watchers_count}\n`
txt += `> 𔓕 *Peso:* ${(json.size / 1024).toFixed(2)} MB\n`
txt += `> ❀ *تم التحديث:* ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`
txt += `> ✰ *Url:* ${json.html_url}\n`
txt += `> ✦ *Forks:* ${json.forks_count}\n`
txt += `> ⬣ *Stars:* ${json.stargazers_count}\n`
txt += `> *${dev}*`

await conn.sendMessage(m.chat, {text: txt, contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterName: channelRD.name, newsletterJid: channelRD.id, }, externalAdReply: { title: packname, body: dev, thumbnailUrl: 'https://files.catbox.moe/3bmdrm.jpg', sourceUrl: redes, mediaType: 1, renderLargerThumbnail: true }}}, {quoted: m})

} catch {
await conn.reply(m.chat, `${msm} حدث خطأ.`, m)
await m.react(error)
}}

handler.help = ['script']
handler.tags = ['main']
handler.command = ['script', 'sc']
handler.register = true

export default handler
/*


import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {

    const res = await fetch('https://api.github.com/repos/dwhhhg8-code/flash-bot');
    const data = await res.json();

    if (!data || !data.name) {
      return m.reply('تعذّر الحصول على معلومات المستودع.');
    }

    const txt = `⼢ ⃘𐇽.    𝗦𝗖𝗥𝗜𝗣𝗧  •  𝗜𝗡𝗙𝗢  ଘ(੭*ˊᵕˋ)੭
▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢
> ❐ 𝗡𝗼𝗺𝗯𝗿𝗲: ${data.name}
> ✦ 𝗙𝘂𝗹𝗹 𝗡𝗮𝗺𝗲: ${data.full_name}
> ✰ 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶𝗼́𝗻: ${data.description || 'No hay descripción'}
> ✿ 𝗣𝗿𝗶𝘃𝗮𝗰𝗮𝗱: ${data.private ? 'Privado' : 'عام'}
> ❐ 𝗢𝘄𝗻𝗲𝗿: ${data.owner.login} ✛
> ✦ 𝗢𝘄𝗻𝗲𝗿 ID: ${data.owner.id} ✜
> ✰ 𝗣𝗮́𝗴𝗶𝗻𝗮 𝗣𝗲𝗿𝘀𝗼𝗻𝗮𝗹: ${data.owner.html_url} ✞
> ✿ 𝗘𝘀𝘁𝗿𝗲𝗹𝗹𝗮𝘀: ${data.stargazers_count} ✓
> ❐ 𝗙𝗼𝗿𝗸𝘀: ${data.forks_count} ✦
> ✦ 𝗪𝗮𝘁𝗰𝗵𝗲𝗿𝘀: ${data.watchers_count} ✐
> ✰ 𝗟𝗶𝗰𝗲𝗻𝘀𝗲: ${data.license ? data.license.name : 'N/A'} ⊹
> ✿ 𝗟𝗲𝗻𝗴𝘂𝗮𝗷𝗲: ${data.language || 'Desconocido'} ❖
> ❐ 𝗖𝗿𝗲𝗮𝗱𝗼: ${new Date(data.created_at).toLocaleString()} ✠
> ✦ 𝗨𝗹𝘁𝗶𝗺𝗼 𝗣𝘂𝘀𝗵: ${new Date(data.pushed_at).toLocaleString()} ▸
> ✰ 𝗨𝗽𝗱𝗮𝘁𝗲: ${new Date(data.updated_at).toLocaleString()} ◂
> ✿ 𝗛𝗧𝗠𝗟 𝗨𝗥𝗟: ${data.html_url} ◈
> ❐ 𝗖𝗹𝗼𝗻𝗲 𝗨𝗥𝗟: ${data.clone_url} ◉
> ✦ 𝗔𝗿𝗰𝗵𝗶𝘃𝗲: ${data.archived ? 'Sí' : 'No'} ▰
> ✰ 𝗙𝗼𝗿𝗸𝗲𝗮𝗯𝗹𝗲: ${data.allow_forking ? 'Sí' : 'No'} ▱

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
> ${club}`;

    await conn.sendMessage(
      m.chat,
      {
        text: txt,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterName: channelRD.name,
            newsletterJid: channelRD.id,
          },
          externalAdReply: {
            title: packname,
            body: dev,
            thumbnailUrl: 'https://files.catbox.moe/3bmdrm.jpg',
            sourceUrl: redes,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    );

  } catch (err) {
    console.error(err);
    m.reply('حدث خطأ al consultar المستودع.');
  }
};

handler.help = ['script'];
handler.tags = ['main'];
handler.command = ['script', 'sc'];
handler.register = true;

export default handler;*/