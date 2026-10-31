import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `${emoji} من فضلك أدخل الاسم del Pokemon que quiere buscar.`, m)
await m.react(rwait)
conn.reply(m.chat, `${emoji2} جارٍ البحث *<${text}>*, espere un momento...`, m)
const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`;
const response = await fetch(url);
const json = await response.json();
if (!response.ok) {
await m.react(error)
return conn.reply(m.chat, '⚠️ حدث خطأ أثناء البحث عن البوكيمون.', m)}
const aipokedex = `${emoji} *Pokedex - معلومات de ${json.name}*\n\n☁️ *الاسم:* ${json.name}\n🔖 *ID:* ${json.id}\n💬 *Tipo:* ${json.type}\n💪 *Habilidades:* ${json.abilities}\n🎴 *Tamaño:* ${json.height}\n⚖️ *Peso:* ${json.weight}\n\n📖 *الوصف:*\n${json.description}\n\n🔍 ¡Encuentra más detalles sobre este Pokémon en la Pokedex!\n\n🔗 https://www.pokemon.com/es/pokedex/${json.name.toLowerCase()}`
conn.reply(m.chat, aipokedex, m)
await m.react(done) }

handler.help = ['pokedex *<pokemon>*']
handler.tags = ['fun']
handler.group = true;
handler.register = true
handler.command = ['pokedex']

export default handler