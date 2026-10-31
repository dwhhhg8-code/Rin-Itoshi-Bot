let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`${pickRandom(global.iq)}`, m)
}
handler.help = ['iqtest']
handler.tags = ['fun']
handler.command = ['iqtest', 'iq']
handler.group = true
handler.register = true
handler.fail = null

export default handler 

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.iq = [
'نسبة ذكائك: 1',
'نسبة ذكائك: 14',
'نسبة ذكائك: 23',
'نسبة ذكائك: 35',
'نسبة ذكائك: 41',
'نسبة ذكائك: 50',
'نسبة ذكائك: 67',
'نسبة ذكائك: 72',
'نسبة ذكائك: 86',
'نسبة ذكائك: 99',
'نسبة ذكائك: 150',
'نسبة ذكائك: 340',
'نسبة ذكائك: 423',
'نسبة ذكائك: 500',
'نسبة ذكائك: 676',
'نسبة ذكائك: 780',
'نسبة ذكائك: 812',
'نسبة ذكائك: 945',
'نسبة ذكائك: 1000',
'نسبة ذكائك: لا محدودة!!',
'نسبة ذكائك: 5000',
'نسبة ذكائك: 7500',
'نسبة ذكائك: 10000',
]