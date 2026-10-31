import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    const userId = m.sender;
    const user = global.db.data.users[userId] || {};
    const name = await conn.getName(userId);
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const totalreg = Object.keys(global.db.data.users).length;
    const totalCommands = Object.values(global.plugins).filter(v => v.help && v.tags).length;

    const text = `
🛸 𝙍𝙄𝙉 𝙄𝙏𝙊𝙎𝙃𝙄 𝘽𝙊𝙏 - 𝘾𝙊𝙉𝙎𝙊𝙇𝘼 𝘿𝙀 𝘼𝙐𝘿𝙄𝙊𝙎  ⚽
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
⚡ *المستخدم:* ${name}  
🍂 *المسجلون:* ${totalreg}  
🧪 *الأوامر النشطة:* ${totalCommands}  
🍕 *مدة التشغيل:* ${uptime}  
  
🧠 *جارٍ الدخول إلى وحدة الأصوات...*  
📡 *الأصوات المتاحة:*  
  
╭─⧉ 𝘼𝙐𝘿𝙄𝙊𝙎 𝘼𝙉𝙄𝙈𝙀 / 𝙍𝘼𝙍𝙊𝙎
│ ◦ Onichan~
│ ◦ Yamete~
│ ◦ Nico Nico
│ ◦ Pikachu
│ ◦ Pokemon
│ ◦ Ara ara
╰───────────────⬣

╭─⧉ 𝘼𝙐𝘿𝙄𝙊𝙎 𝘿𝙀 𝙈𝙀𝙈𝙀𝙎 / 𝘾𝙃𝙄𝙎𝙏𝙀𝙎
│ ◦ Tunometecabrasaramambiche
│ ◦ Esto Va Ser Epico Papus
│ ◦ No Digas Eso Papus
│ ◦ Bien Pensado Woody
│ ◦ Contexto
│ ◦ Momento XDS
│ ◦ Chiste
│ ◦ Basado
│ ◦ :V
╰───────────────⬣

╭─⧉ 𝘼𝙐𝘿𝙄𝙊𝙎 𝙏𝙍𝙊𝙇 / 𝘿𝙄𝙑𝙀𝙍𝙏𝙄𝘿𝙊𝙎
│ ◦ جارٍ البحث عن Anonymous
│ ◦ Se Estan Riendiendo De Mi
│ ◦ Elmo Sabe Donde Vives
│ ◦ Diagnosticado Con Gay
│ ◦ Usted es Feo
│ ◦ No Me Hables
│ ◦ No Chupala
│ ◦ Nadie Te Pregunto
│ ◦ Marica Tu
│ ◦ Ma Ma Masivo
│ ◦ Su Nivel De Pendejo
│ ◦ Homero Chino
│ ◦ Cambiate A Movistar
│ ◦ Freefire
│ ◦ Calla Fan De BTS
╰───────────────⬣

╭─⧉ 𝘼𝙐𝘿𝙄𝙊𝙎 𝘿𝙀 𝙎𝘼𝙍𝘾𝘼𝙎𝙈𝙊 / 𝘽𝙐𝙍𝙇𝘼
│ ◦ Mierda De Bot
│ ◦ Vete A La VRG
│ ◦ Usted Esta Detenido
│ ◦ Quien Es Tu Botsito
│ ◦ Gaspi Frase
│ ◦ Se Pubrio
│ ◦ La Oración
│ ◦ Tarado
│ ◦ Temazo
╰───────────────⬣

╭─⧉ 𝘼𝙐𝘿𝙄𝙊𝙎 𝘿𝙀 𝘿𝙀𝘾𝙇𝘼𝙍𝘼𝘾𝙄𝙊𝙉 / 𝘼𝙈𝙊𝙍
│ ◦ Esto Va Para Ti
│ ◦ Teamo
│ ◦ Feliz Cumpleaños
│ ◦ Vivan Los Novios
│ ◦ Bebesita
╰───────────────⬣

╭─⧉ 𝘼𝙐𝘿𝙄𝙊𝙎 𝙎𝙄𝘿𝙀𝙍𝘼𝙇𝙀𝙎 / 𝙍𝘼𝙉𝘿𝙊𝙈
│ ◦ OMG
│ ◦ WTF
│ ◦ ZZZZ
│ ◦ Siuuu
│ ◦ TKA
│ ◦ Aguanta
│ ◦ Potasio
│ ◦ Rawr
│ ◦ Un Pato
╰───────────────⬣

╭─⧉ 𝘼𝙐𝘿𝙄𝙊𝙎 𝙎𝘼𝙏𝙄𝙍𝙄𝘾𝙊𝙎 / 𝘿𝙀 𝙎𝙄𝙏𝙐𝘼𝘾𝙄𝙊𝙉
│ ◦ Jesucristo
│ ◦ En Caso De Una Investigación
│ ◦ Me Pica Los Cocos
│ ◦ Tengo Los Calzones
│ ◦ Traiganle Una Falda
│ ◦ Enojado
│ ◦ Estoy Triste
│ ◦ No Estes Tite
│ ◦ Motivacion
╰───────────────⬣

╭─⧉ مقاطع الترحيب
│ ◦ Buenos Días
│ ◦ Buenas Noches
│ ◦ Bueno Si
│ ◦ مرحباً بك
│ ◦ Q Onda
│ ◦ Entrada
│ ◦ Donde Esta
│ ◦ Hey
│ ◦ Hablame
╰───────────────⬣

╭─⧉ مقاطع شخصيات
│ ◦ Gaspi Y La Minita
│ ◦ El Pepe
│ ◦ El Toxico
│ ◦ In Your Area
│ ◦ Amongos
╰───────────────⬣

╭─⧉ مقاطع مناسبات
│ ◦ Es Viernes
│ ◦ Feriado
│ ◦ Feliz Navidad
╰───────────────⬣

╭─⧉ مقاطع وداع
│ ◦ Me Voy
│ ◦ Lo Paltimos
│ ◦ Me Olvide
│ ◦ Juicioso
╰───────────────⬣


  
🔁 *لا ترى المفضل لديك؟*  

💬 _ملاحظة: اكتب الاسم فقط ليتم تشغيله._  
🕹️ _مثال:_ \`Tunometecabrasaramambiche\`  
  
───────────── ░▒▓█  
📡 *FLASH BOT جاهز*
`.trim();

    await conn.sendMessage(m.chat, {
      text,
      contextInfo: {
        externalAdReply: {
          title: "🎧 MENÚ DE AUDIOS - FLASH BOT ⚡",
          body: "اكتب اسم الصوت لتشغيله تلقائياً.",
          thumbnailUrl: banner,
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
        }
      }
    });

    await conn.sendMessage(m.chat, {
      react: {
        text: '✅',
        key: m.key,
      }
    });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ خطأ في عرض القائمة.', m);
  }
};

handler.help = ['menuaudios'];
handler.tags = ['menu'];
handler.command = ['menu2', 'menuaudios'];

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h + 'h', m + 'm', s + 's'].join(' ');
}