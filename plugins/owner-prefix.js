const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `${emoji} No Se Encontró Ningun البادئة, Por Favor اكتب Un البادئة.\n> *Ejemplo: ${usedPrefix + command} !*`;
  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
 // await m.reply(`*❀ Prefijo Actualizado Con Éxito, Prefijo Actual: ${text}*`);
  conn.fakeReply(m.chat, `${done} *البادئة تم التحديث Con Éxito, البادئة Actual: ${text}*`, '0@s.whatsapp.net', '✨ PREFIJO NUEVO ✨')
};
handler.help = ['prefix'].map((v) => v + ' [prefix]');
handler.tags = ['owner'];
handler.command = ['prefix'];
handler.rowner = true;

export default handler;