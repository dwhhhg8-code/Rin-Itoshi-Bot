import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(
      `🍂 *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` naruto`
    );
  }

  try {
    let res = await fetch(`https://api.siputzx.my.id/api/stalk/instagram?username=${encodeURIComponent(text)}`);
    if (!res.ok) throw await res.text();
    let json = await res.json();

    if (!json.status || !json.data) throw " لم يتم العثور على معلومات المستخدم.";

    let user = json.data;
    let bioLinks = (user.bio_links && user.bio_links.length > 0) 
      ? user.bio_links.map(b => `🌐 ${b.url}`).join("\n") 
      : "—";

    let caption = `
╭━━━〔 *Instagram Stalk* 〕━━⬣
┆ 👤 *المستخدم:* ${user.username}
┆ 📛 *الاسم:* ${user.full_name || "-"}
┆ 📝 *Bio:* ${user.biography || "-"}
┆ 🔗 *Perfil:* https://instagram.com/${user.username}
┆ 🌍 *Bio Links:* 
${bioLinks}
┆ 🏷️ *Cuenta:* ${user.is_private ? "خاصة 🔒" : "عامة 🌐"}
┆ 🏢 *Business:* ${user.is_business_account ? "Sí" : "No"}
┆ ☑️ *Verificado:* ${user.is_verified ? "Sí" : "No"}
┆ 👥 *Seguidores:* ${user.followers_count.toLocaleString()}
┆ 👤 *Siguiendo:* ${user.following_count.toLocaleString()}
┆ 📸 *Posts:* ${user.posts_count.toLocaleString()}
╰━━━━━━━━━━━━━━━━━━⬣
`;

    await conn.sendMessage(m.chat, {
      image: { url: user.profile_pic_url },
      caption: caption.trim(),
    }, { quoted: m });

    if (user.posts && user.posts.length > 0) {
      let ultimos = user.posts.slice(0, 3);
      for (let post of ultimos) {
        let textPost = `
🎋 *Post:* https://instagram.com/p/${post.shortcode}
📝 ${post.caption || "-"}
❤️ Likes: ${post.like_count || 0}
💬 Comentarios: ${post.comment_count || 0}
👀 Vistas: ${post.view_count || 0}
⏰ التاريخ: ${new Date(post.timestamp * 1000).toLocaleString()}
`;

        if (post.is_video && post.video_url) {
          await conn.sendMessage(m.chat, {
            video: { url: post.video_url },
            caption: textPost.trim(),
          }, { quoted: m });
        } else {
          await conn.sendMessage(m.chat, {
            image: { url: post.thumbnail_url },
            caption: textPost.trim(),
          }, { quoted: m });
        }
      }
    }

  } catch (e) {
    console.error(e);
    m.reply("خطأ في جلب información dالمستخدم.");
  }
};

handler.help = ["igstalk"];
handler.tags = ["internet"];
handler.command = ["igstalk", "instagramstalk", "stalkig"];

export default handler;