import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters.json'
const haremFilePath = './src/database/harem.json'

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        throw new Error('❀ تعذّر cargar الملف characters.json.')
    }
}

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

let handler = async (m, { conn, args }) => {
    if (args.length === 0) {
        await conn.reply(m.chat, `《✧》من فضلك، قدّم اسم الشخصية.`, m)
        return
    }

    const characterName = args.join(' ').toLowerCase().trim()

    try {
        const characters = await loadCharacters()
        const character = characters.find(c => c.name.toLowerCase() === characterName)

        if (!character) {
            await conn.reply(m.chat, `《✧》No se ha encontrado el personaje *${characterName}*. تأكد من الاسم esté correcto.`, m)
            return
        }

        const randomImage = character.img[Math.floor(Math.random() * character.img.length)]

        const message = `❀ الاسم » *${character.name}*
⚥ Género » *${character.gender}*
❖ Fuente » *${character.source}*`

        await conn.sendFile(m.chat, randomImage, `${character.name}.jpg`, message, m)
    } catch (error) {
        await conn.reply(m.chat, `✘ خطأ في cargar الصورة del personaje: ${error.message}`, m)
    }
}

handler.help = ['wimage <nombre del personaje>']
handler.tags = ['anime']
handler.command = ['charimage', 'wimage', 'waifuimage']
handler.group = true

export default handler