import fs from 'fs'
import path from 'path'

var handler = async (m, { conn }) => {
  try {
    await m.react('🕒') 
    conn.sendPresenceUpdate('composing', m.chat)

    const pluginsDir = './plugins'
    const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'))

    let response = `📂 *Revisión de Syntax خطأs:* ⚡\n\n`
    let hasErrors = false

    for (const file of files) {
      try {
        await import(path.resolve(pluginsDir, file))
      } catch (error) {
        hasErrors = true

        const match = error.stack.match(/:(\d+):(\d+)/)
        const errorLine = match ? match[1] : 'Desconocido'
        const errorColumn = match ? match[2] : 'Desconocido'

        const filePath = path.resolve(pluginsDir, file)
        const fileLines = fs.readFileSync(filePath, 'utf8').split('\n')
        
        const start = Math.max(0, errorLine - 3)
        const end = Math.min(fileLines.length, parseInt(errorLine) + 2)
        const codePreview = fileLines
          .slice(start, end)
          .map((line, i) => {
            let lineNumber = start + i + 1
            return `${lineNumber === parseInt(errorLine) ? '👉' : '  '}${lineNumber} | ${line}`
          })
          .join('\n')

        response += `🚩 *خطأ en:* ${file}\n`
        response += `> ● الرسالة: ${error.message}\n`
        response += `> ● Línea: ${errorLine}, Columna: ${errorColumn}\n`
        response += `> ● Vista previa:\n\`\`\`js\n${codePreview}\n\`\`\`\n\n`
      }
    }

    if (!hasErrors) {
      response += '✅ ¡Todo está en orden! No se detectaron errores de sintaxis'
    } else {
      response += '⚠️ Revisa los errores marcados arriba antes de reiniciar el bot.'
    }

    await conn.reply(m.chat, response, m)
    await m.react(hasErrors ? '⚠️' : '✅')
  } catch (err) {
    await m.react('✖️') 
    console.error(err)
    conn.reply(m.chat, '🚩 *حدث خطأ أثناء التحقق من البلجنات.*', m)
  }
}

handler.command = ['detectarsyntax2']
handler.help = ['detectarsyntax2']
handler.tags = ['tools']
handler.rowner = true
handler.register = true

export default handler