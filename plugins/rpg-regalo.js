const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender];

  if (!user.lastclaim) user.lastclaim = 0;
  if (!user.coin) user.coin = 0;
  if (!user.exp) user.exp = 0;
  if (!user.joincount) user.joincount = 0;

  const tenDaysInMillis = 864000000; 
  const now = Date.now();
  const timeRemaining = user.lastclaim + tenDaysInMillis - now;

  if (timeRemaining > 0) {
    return conn.reply(m.chat, `*🕒 Ya reclamaste tu recompensa de FLASH BOT 🌷!*\n\n⌛ Vuelve en: *${msToTime(timeRemaining)}*`, m);
  }

  user.coin += 500;
  user.exp += 1000;
  user.joincount += 20;
  user.lastclaim = now;

  const senderName = await conn.getName(m.sender);

  conn.sendMessage(m.chat, {
    text: `🎁 *Recompensa Reclamada!*\n\n☕ @${m.sender.split('@')[0]} (${senderName}) ha recibido:\n\n> 💵 *500 ${moneda}*\n> 🧠 *1000 XP*\n> 🪙 *20 Tokens*`,
    mentions: [m.sender]
  }, {
    quoted: m
  });
};

handler.help = ['regalo'];
handler.tags = ['rpg'];
handler.command = ['regalo', 'regalosrin'];
handler.fail = null;
handler.premium = true;

export default handler;

function msToTime(duration) {
  let days = Math.floor(duration / (1000 * 60 * 60 * 24));
  let hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((duration % (1000 * 60)) / 1000);

  return `${days} días, ${hours}h ${minutes}m ${seconds}s`;
}