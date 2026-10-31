import fetch from "node-fetch";

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `🌸 أدخل el UID del jugador.\n\nEjemplo:\n${usedPrefix + command} 12183392680`, m);
  }

  try {
    let uid = args[0];
    let url = `https://xrljosedevapi.vercel.app/stalk/ff?id=${uid}&apikey=xrlfree`;
    let res = await fetch(url);
    let json = await res.json();

    if (!json.status || !json.result) {
      return conn.reply(m.chat, `❌ لم يتم العثور على معلومات del jugador con UID: *${uid}*`, m);
    }

    let result = json.result;
    let player = result.player_data;
    let account = result.account_info;
    let game = result.game_info;
    let pet = result.pet_info;
    let guild = result.guild_info;
    let leader = result.leader_info;

    let txt = `
╭━━━〔 *STALK FREE FIRE* 〕━━⬣
│🌟 *UID:* ${player.uid}
│👤 *الاسم:* ${player.name || "Desconocido"}
│⚡ *المستوى:* ${player.level} (Exp: ${player.exp})
│🌍 *Región:* ${player.region}
│🎭 *Avatar ID:* ${player.avatar_id}
│🖼 *Banner ID:* ${player.banner_id}
│📌 *Pin ID:* ${player.pin_id}
│💎 *Diamantes:* ${account.total_diamonds}
│🎖 *Honor Score:* ${account.honor_score}
│📈 *Booyah Pass:* ${game.booyah_pass}
│🏆 *BR Rank:* ${game.br_rank}
│🔥 *CS Points:* ${game.cs_points}
│🐾 *Mascota:* ${pet.pet_name} (Lvl ${pet.pet_level})
│👥 *Clan:* ${guild.guild_name} (Lvl ${guild.guild_level})
│👑 *Líder:* ${leader.leader_name} (Lvl ${leader.leader_level})
╰━━━━━━━━━━━━━━⬣
    `.trim();

    await conn.sendMessage(m.chat, {
      text: txt,
      contextInfo: {
        externalAdReply: {
          title: `Free Fire Stalk`,
          body: `UID: ${player.uid} • المستوى ${player.level}`,
          thumbnailUrl: player.banner_image,
          sourceUrl: `https://ff.garena.com/`
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `❌ خطأ في جلب datos.`, m);
  }
};

handler.help = ["stalkff <uid>"];
handler.tags = ["tools"];
handler.command = ['stalkff'];

export default handler;