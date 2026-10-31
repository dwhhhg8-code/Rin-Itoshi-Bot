import { tmpdir } from 'os'
import path from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, text }) => {
    if (!text) return conn.reply(m.chat, `${emoji} أدخل la ruta y الاسم dالملف que deseas eliminar.`, m)
    
    const file = text.trim()
    if (!existsSync(file)) return conn.reply(m.chat, `${emoji2} الملف غير موجود.`, m)
    
    unlinkSync(file)
    conn.reply(m.chat, `${done} الملف *${file}* ha sido eliminado بنجاح.`, m)
}
handler.tags = ['owner']
handler.help = ['deletefile']
handler.command = ['deletefile']
handler.rowner = true

export default handler