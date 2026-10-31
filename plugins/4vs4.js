const handler = async (msg, { conn, args }) => {
  const chatId = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;
  const senderNum = sender.replace(/[^0-9]/g, "");
  const isOwner = global.owner.some(([id]) => id === senderNum);
  const isFromMe = msg.key.fromMe;

  if (!chatId.endsWith("@g.us")) {
    return conn.sendMessage(chatId, { text: "📛 Este comando solo funciona en *grupos*." }, { quoted: msg });
  }

  const meta = await conn.groupMetadata(chatId);
  const isAdmin = meta.participants.find(p => p.id === sender)?.admin;

  if (!isAdmin && !isOwner && !isFromMe) {
    return conn.sendMessage(chatId, {
      text: "🔐 Este comando solo puede ser usado por *administradores* o el *propietario del bot*."
    }, { quoted: msg });
  }

  const horaTexto = args.join(" ").trim();
  if (!horaTexto) {
    return conn.sendMessage(chatId, {
      text: "⏰ Debes indicar la hora de la sala.\n\n*Uso:* `.4vs4 5:30pm`"
    }, { quoted: msg });
  }

  const to24Hour = (str) => {
    let [time, modifier] = str.toLowerCase().split(/(am|pm)/);
    let [h, m] = time.split(":").map(n => parseInt(n));
    if (modifier === 'pm' && h !== 12) h += 12;
    if (modifier === 'am' && h === 12) h = 0;
    return { h, m: m || 0 };
  };

  const to12Hour = (h, m) => {
    const suffix = h >= 12 ? 'pm' : 'am';
    h = h % 12 || 12;
    return `${h}:${m.toString().padStart(2, '0')}${suffix}`;
  };

  const base = to24Hour(horaTexto);

  const zonas = [
    { pais: "🇲🇽 México", offset: 0 },
    { pais: "🇨🇴 Colombia", offset: 0 },
    { pais: "🇵🇪 Perú", offset: 0 },
    { pais: "🇵🇦 Panamá", offset: 0 },
    { pais: "🇸🇻 El Salvador", offset: 0 },
    { pais: "🇨🇱 Chile", offset: 2 },
    { pais: "🇦🇷 Argentina", offset: 2 },
    { pais: "🇪🇸 España", offset: 7 }
  ];

  const horaMsg = zonas.map(z => {
    let newH = base.h + z.offset;
    let newM = base.m;
    if (newH >= 24) newH -= 24;
    return `${z.pais} ┇ ${to12Hour(newH, newM)}`;
  }).join("\n");

  await conn.sendMessage(chatId, { react: { text: '⚔️', key: msg.key } });

  const participantes = meta.participants.filter(p => p.id !== conn.user.id);
  if (participantes.length < 12) {
    return conn.sendMessage(chatId, {
      text: "⚠️ Necesitas al menos *12 jugadores* para formar escuadras y suplentes."
    }, { quoted: msg });
  }

  const loadingMsg = await conn.sendMessage(chatId, {
    text: "🕹️ Iniciando configuración del torneo...",
    quoted: msg
  });

  const fases = [
    "🔧 Reuniendo datos del lobby...",
    "♻️ Barajando nombres...",
    "📋 Preparando equipos...",
    "🚀 ¡Listo! Equipos generados:"
  ];

  for (let i = 0; i < fases.length; i++) {
    await new Promise(r => setTimeout(r, 1200));
    await conn.sendMessage(chatId, {
      edit: loadingMsg.key,
      text: fases[i]
    });
  }

  const shuffled = participantes.sort(() => Math.random() - 0.5);
  const teamA = shuffled.slice(0, 4);
  const teamB = shuffled.slice(4, 8);
  const subs = shuffled.slice(8, 12);

  const listar = (lista, liderEmoji = "👑") =>
    lista.map((u, i) => `${i === 0 ? liderEmoji : "🥷"} ┇ @${u.id.split("@")[0]}`).join("\n");

  const resultado = `*🏆 PARTIDA 4v4 — COMPETITIVA*\n\n` +
                    `🗓️ *الوقتrio de la Sala:*\n${horaMsg}\n\n` +
                    `🎯 *Modalidad:* Clásico\n\n` +
                    `👥 *Equipo Alpha:*\n${listar(teamA)}\n\n` +
                    `📥 *Suplentes:*\n${listar(subs.slice(0, 2), "🧍")}\n\n` +
                    `👥 *Equipo Beta:*\n${listar(teamB)}\n\n` +
                    `📥 *Suplentes:*\n${listar(subs.slice(2), "🧍")}`;

  const menciones = [...teamA, ...teamB, ...subs].map(p => p.id);

  await conn.sendMessage(chatId, {
    edit: loadingMsg.key,
    text: resultado,
    mentions: menciones
  });
};

handler.command = ['4vs4'];
export default handler;