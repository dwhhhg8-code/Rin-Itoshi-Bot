import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const haremFilePath = './src/database/harem.json';

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('تعذّر cargar الملف characters.json.');
    }
}

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

let handler = async (m, { conn, args }) => {
    if (args.length === 0) {
        await conn.reply(m.chat, '《✧》Debes especificar un personaje para ver su información.\n> Ejemplo » *#winfo Aika Sano*', m);
        return;
    }

    const characterName = args.join(' ').toLowerCase().trim();

    try {
        const characters = await loadCharacters();
        const character = characters.find(c => c.name.toLowerCase() === characterName);

        if (!character) {
            await conn.reply(m.chat, `《✧》لم يتم العثور على el personaje *${characterName}*.`, m);
            return;
        }

        const harem = await loadHarem();
        const userEntry = harem.find(entry => entry.characterId === character.id);
        const statusMessage = userEntry 
            ? `Reclamado por @${userEntry.userId.split('@')[0]}` 
            : 'Libre';
        
        const message = `❀ الاسم » *${character.name}*\n⚥ Género » *${character.gender}*\n✰ Valor » *${character.value}*\n♡ Estado » ${statusMessage}\n❖ Fuente » *${character.source}*`;

        await conn.reply(m.chat, message, m, { mentions: [userEntry ? userEntry.userId : null] });
    } catch (error) {
        await conn.reply(m.chat, `✘ خطأ في cargar المعلومات del personaje: ${error.message}`, m);
    }
};

handler.help = ['charinfo <nombre del personaje>', 'winfo <nombre del personaje>', 'waifuinfo <nombre del personaje>'];
handler.tags = ['anime'];
handler.command = ['charinfo', 'winfo', 'waifuinfo'];
handler.group = true;
handler.register = true;

export default handler;
