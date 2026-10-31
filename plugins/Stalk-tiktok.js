import axios from 'axios'

let handler = async (m, { usedPrefix, command, conn, text }) => {
  if (!text) return m.reply('خطأ! أدخل un usuario. *Ejemplo:* ${usedPrefix + command} mrbeast');

  try {
    m.reply('⏳ جارٍ البحث información...')

    let ress = await axios.get(`https://api.koboo.my.id/api/stalk/tiktok?username=${text}`)
    let res = ress.data

    if (res.status !== 200) throw 'خطأ! لم يتم العثور على المستخدم. Asegúrate de escribirlo بنجاح.'

    let user = res.result.user
    let stats = res.result.stats
    let profileTab = user.profileTab

    let teks = `乂  *STALKER TIKTOK*\n
*◦ NOMBRE :* ${user.nickname}
*◦ USUARIO :* ${user.uniqueId}
*◦ ID :* ${user.id}
*◦ SEGUIDORES :* ${stats.followerCount}
*◦ SIGUIENDO :* ${stats.followingCount}
*◦ ME GUSTAS :* ${stats.heartCount}
*◦ VIDEOS :* ${stats.videoCount}
*◦ AMIGOS :* ${stats.friendCount}
*◦ DESCRIPCIÓN :* ${user.signature || 'لا يوجد وصف'}
*◦ REGIÓN :* ${user.region || 'Desconocida'}
*◦ CUENTA PRIVADA :* ${user.privateAccount ? '🔒 Sí' : '🔓 No'}
*◦ VERIFICADO :* ${user.verified ? '✅ Sí' : '❌ No'}
*◦ CUENTA COMERCIAL :* ${user.commerceUserInfo.commerceUser ? '🛒 Sí' : '❌ No'}
*◦ DESCARGAS PERMITIDAS :* ${user.downloadSetting === 3 ? '✅ Sí' : '❌ No'}
*◦ EXPANDIR PLAYLIST :* ${user.canExpPlaylist ? '✅ Sí' : '❌ No'}
*◦ PESTAÑA DE MÚSICA :* ${profileTab.showMusicTab ? '✅ Sí' : '❌ No'}
*◦ PESTAÑA DE PREGUNTAS :* ${profileTab.showQuestionTab ? '✅ Sí' : '❌ No'}
*◦ PESTAÑA DE PLAYLIST :* ${profileTab.showPlayListTab ? '✅ Sí' : '❌ No'}
*◦ ORGANIZACIÓN :* ${user.isOrganization ? '🏢 Sí' : '❌ No'}
*◦ LENGUAJE :* ${user.language || 'Desconocido'}`

    await conn.sendMessage(m.chat, { image: { url: user.avatarLarger }, caption: teks }, { quoted: m })

  } catch (err) {
    m.reply('❌ خطأ: لم يتم العثور على المستخدم o la API falló. حاول مرة أخرى.')
  }
}

handler.help = ['tiktokstalk *<usuario>*']
handler.tags = ['stalk']
handler.command = ['tiktokstalk']

export default handler