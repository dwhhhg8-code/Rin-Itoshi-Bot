import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.botNumber = ''

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.owner = [
// <-- Número @s.whatsapp.net -->
  ['201125166486', 'ⲂＹ 𝖍𝖆𝖎𝖙𝖍𝖆𝖒 👑', true],
  ['201125166486', '𝖍𝖆𝖎𝖙𝖍𝖆𝖒', true],
],
//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.suittag = ['201125166486']
global.prems = []

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.libreria = 'Baileys'
global.baileys = 'V 6.7.24'
global.vs = '3.0.0'
global.nameqr = '𓆩⚡𓆪 𝙁𝙇𝘼𝙎𝙃 𝘽𝙊𝙏 𓆩⚡𓆪'
global.namebot = '𓆩⚡𓆪 𝙁𝙇𝘼𝙎𝙃 𝘽𝙊𝙏 𓆩⚡𓆪'
global.sessions = 'Sessions'
global.jadi = 'JadiBots'
global.shadowJadibts = true

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.packname = '𓆩⚡𓆪 𝙁𝙇𝘼𝙎𝙃 𝘽𝙊𝙏 𓆩⚡𓆪'
global.botname = '𓆩⚡𓆪 𝙁𝙇𝘼𝙎𝙃 𝘽𝙊𝙏 𓆩⚡𓆪'
global.wm = '𓆩⚡𓆪 𝙁𝙇𝘼𝙎𝙃 𝘽𝙊𝙏 𓆩⚡𓆪'
global.author = 'ⲂＹ 𝖍𝖆𝖎𝖙𝖍𝖆𝖒 👑'
global.dev = '𝖍𝖆𝖎𝖙𝖍𝖆𝖒'
global.bot = '𓆩⚡𓆪 𝙁𝙇𝘼𝙎𝙃 𝘽𝙊𝙏 𓆩⚡𓆪'
global.club = dev
global.textbot = '𓆩⚡𓆪 𝙁𝙇𝘼𝙎𝙃 𝘽𝙊𝙏 𓆩⚡𓆪'
global.etiqueta = '𓆩⚡𓆪 𝙁𝙇𝘼𝙎𝙃 𝘽𝙊𝙏 𓆩⚡𓆪'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.moneda = '¥enes'
global.banner = 'https://i.pinimg.com/originals/9d/6c/4e/9d6c4eeb7898079652b7f2c2e5c65632.jpg'
global.avatar = 'https://i.pinimg.com/originals/9d/6c/4e/9d6c4eeb7898079652b7f2c2e5c65632.jpg'
global.logo = 'https://i.pinimg.com/originals/9d/6c/4e/9d6c4eeb7898079652b7f2c2e5c65632.jpg'
global.icono = 'https://i.pinimg.com/originals/9d/6c/4e/9d6c4eeb7898079652b7f2c2e5c65632.jpg'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.gp1 = 'https://whatsapp.com/channel/0029Vb8QIpSJ3juu0VHRyU0v'
global.comunidad1 = 'https://whatsapp.com/channel/0029Vb8QIpSJ3juu0VHRyU0v'
global.channel = 'https://whatsapp.com/channel/0029Vb8QIpSJ3juu0VHRyU0v'
global.channel2 = 'https://whatsapp.com/channel/0029Vb8QIpSJ3juu0VHRyU0v'
global.group = 'https://chat.whatsapp.com/JyzcMffpXp2DrvOB4Z2jz9?mode=gi_t'
global.community = 'https://chat.whatsapp.com/JyzcMffpXp2DrvOB4Z2jz9?mode=gi_t'
global.md = 'https://github.com/dwhhhg8-code/flash-bot'
global.github = 'https://github.com/dwhhhg8-code'
global.correo = 'dwhhhg8@gmail.com'
global.gmail = 'dwhhhg8@gmail.com'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: "120363410090342500@newsletter",
ch2: "120363410090342500@newsletter",
ch3: "120363410090342500@newsletter"
}
global.multiplier = 60

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
