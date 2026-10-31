// codigo creado por dv.shadow
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
  let img = 'https://files.catbox.moe/2adu0w.jpg'
  let reto = `
╭─★・✦・★─╮
  💮  R  E  T  O  💮
╰─★・✦・★─╯

✦ ${pickRandom(global.bucin)}

━━━✦ 「 𝗥𝗜𝗡 𝗜𝗧𝗢𝗦𝗛𝗜 」✦━━━`.trim()

  const fkontak = {
    key: {
      fromMe: false,
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
    },
    message: {
      contactMessage: {
        displayName: 'The Shadow Brokers - Bot',
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;The Shadow Brokers;;;\nFN:The Shadow Brokers\nTEL;type=CELL;type=VOICE;waid=51969214380:51969214380\nEND:VCARD`,
      },
    },
  }

  const rcanal = {
    forwardingScore: 999,
    isForwarded: true,
    externalAdReply: {
      showAdAttribution: true,
      title: "𝑅𝐼𝑁 𝐼𝑇𝑂𝑆𝐻𝐼 𝑀𝐷 𝐵𝑌 𝐷𝐸𝑉.𝑆𝐻𝐴𝐷𝑂𝑊",
      body: "🌴 تابع القناة لمزيد من الجديد.",
      mediaType: 1,
      previewType: "PHOTO",
      thumbnailUrl: avatar,
      sourceUrl: "https://whatsapp.com/channel/0029Vb8QIpSJ3juu0VHRyU0v"
    }
  }

  await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: reto,
    contextInfo: rcanal
  }, { quoted: m })
}

handler.help = ['reto']
handler.tags = ['fun']
handler.command = ['reto']
export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

global.bucin = [
"Pasa el pack de una hormiga",
"Dile a tus amigos que te vas a vivir a EU y mándame una captura de lo que te haya dicho",
"Grita desde la ventana que quieres mamar y mándame el vídeo",
"اكتب الاسم de tu crush",
"Debes de poner الاسم de mi creador en tu estado de WhatsApp, sin dar contexto",
"أرسلme una fotografía tuya",
"Debes de dibujar en alguna parte de tu cuerpo الاسم de algún integrante dالمجموعة, luego realiza una foto y envíala",
"Hazte una foto dándole un beso a una Televisión",
 "Mándame una fotografía en ropa interior",
"اكتب en tu estado de WhatsApp que te gusta comer tierra",
"Debes de poner la fotografía de un participante dالمجموعة que sea del sexo opuesto al tuyo en tu perfil de WhatsApp durante 3 días 📸📸",
"Tienes que mandar un audio cantando الأغنية: Un pato que va cantando alegremente cua cua 🦆",
"أرسل un الرسالة a tu ex y dile todavía me gustas", "أرسل un audio diciendo amo a The Shadow Brokers - Bot", 
"Dile a tu crush que la amas y pasa captura al grupo", "أرسل un audio cantando", 
"أرسل una foto en la que salgas tu sin taparte la cara ni nada", "أرسل un video bailando", 
"Invita a personas que no conoces a tomarse una selfi contigo y luego envíalo al grupo", 
"Elija algunos números aleatorios de sus contactos y envíeles un mensaje de texto con الرسالة 'Estoy embarazad@'.", 
"¡Tome cualquier bebida que esté cerca de usted, luego mézclela con chile y beba!", 
"Tome un número aleatorio de sus contactos, llámelo y dígale 'te amo' ", 
"Compre la comida más barata en la cafetería (o compre una botella de agua) y diga entre sollozos a sus compañeros de clase: 'Esta ... es la comida más cara que he comprado)' ", 
" Compre una botella de coca cola y salpique flores con ella frente a la multitud.", 
" Párese cerca del refrigerador, cierre los ojos, elija alimentos al azar en él, incluso cuando coma, sus ojos deben estar cerrados.", 
" De pie en medio de la cancha de baloncesto y gritando: 'TE AMO MI PRÍNCIPE / PRINCESA' ", 
"Presenta tus respetos a alguien de la clase y luego di: 'Estoy a su servicio, Majestad' ", 
" Caminando aplaudiendo y cantando الأغنية 'Feliz cumpleaños' de la clase al pasillo.", 
" Arrodíllate sobre una rodilla y di '¿Cásate conmigo?' la primera persona en entrar a la habitación.", 
" Haz un tocado absurdo con tejido, sea lo que sea, sigue pidiendo poses frente a la cámara, sigue subiendo", 
"Dile 'ERES HERMOSA / MUY HERMOSA, NO MIENTES' a la chica que crees que es la más bonita de esta clase.", 
" Dile a alguien en clase: 'أولاً me dijeron que era tu gemelo, nos separamos y luego me sometí a una cirugía plástica. Y esto es lo más serio que he dicho' ", 
" Tirar el cuaderno de alguien a la basura, frente a sus ojos, diciendo 'Este libro nadie puede entender' ", 
" ¡Arranca el pelo de tu propia pierna 3 veces!", 
" Chatea con tus padres, diles que los extrañas con emoticonos tristes.", 
" Intente buscar en Google cosas aterradoras o ridículas como tripofobia, etc.", 
" Siéntese relajado en medio de la cancha de baloncesto mientras finge que es una playa para tomar el sol.", 
" Llena tu boca de agua y tienes que aguantar hasta dos rondas, si te ríes y derramas o bebes, entonces tienes que volver a llenar y agregar una ronda más.", 
" Salude a la primera persona que entre en esta sala y diga '¡مرحباً بك في Quién quiere ser millonario!' ", 
"أرسل un الرسالة de texto a tus padres '¡أهلاً, hermano! ¡Acabo de comprar el último número de la revista Playboy!' ", 
"أرسلles un الرسالة de texto a tus padres: 'Mamá, papá, ya sé que soy un niño adoptado del orfanato. No ocultes esto más'.", 
" أرسل tres números aleatorios en tus contactos y escribe 'Me acabo de convertir en modelo de la revista Playboy' ", 
" ¡Come una cucharada de salsa de soja dulce y salsa de soja!", 
" Come algo pero no uses las manos.", 
" Enojarse con sus amigos que no vienen a pesar de que tienen una cita para jugar 'Verdad o Reto' juntos", 
"¡Rompe el huevo con la cabeza!", 
"Coma alimentos que se hayan mezclado y tendrán un sabor extraño, pero asegúrese de que los alimentos no sean dañinos para la salud a largo o corto plazo.", 
"Baila como Girls 'Generation para los niños frente a la clase, o baila como Super Junior para las niñas.", 
"Izar el asta de la bandera sin la bandera.", 
"Hablando de la persona que te gusta, de tus amigos más cercanos, del sexo opuesto que no conoces en absoluto y cosas por el estilo.", 
"Copia los peinados de todos tus amigos.", 
"Cantando الأغنية HAI TAYO frente a mucha gente mientras baila", 
"Cante الأغنية Baby Shark en voz alta en el aula.", 
"Pedir prestado algo a los vecinos", 
"Pide la firma de uno de los profesores más feroces mientras dices 'Eres verdaderamente la persona que más admiro en el mundo' ", 
" Pídale dinero a alguien (al azar ) en la calle diciendo 'No tengo dinero para tomar un angkot'.", 
" Beba algo que haya sido preparado / acordado, pero asegúrese de que no sea peligroso, puede ser como beber jarabe mezclado con salsa de soja.", 
" Hablando con el emoticono-miedo de la persona que te gusta, está bien conversar con lo que quieras, a través de cualquier medio que puedas.", 
" Canta tu película de Disney favorita fuera de casa mientras gritas.", 
" Nombra de 1 azul a 20 azules rápidamente y no debes cometer ningún error. Si está mal, debe repetirse desde el principio.", 
" Póngase una corona de papel de copia y diga a todos en la habitación 'HONOR AL REY' mientras señala a cada persona con una regla.", 
" Vuelve a ponerte los pantalones hasta la mañana siguiente.", 
" Abraza a la persona que NO te agrada en clase y di: 'Muchas gracias por ser la mejor persona para mí' ", 
" Ve a un campo amplio, luego corre lo más rápido posible mientras dices 'Estoy loco, estoy loco' ", 
" Elija una flor y luego conéctela a alguien que no conoce (debe ser del sexo opuesto)", 
" Elige a una persona al azar en la calle, luego di 'No sabes que eres hermosa' (ala One Direction)", 
" Fingir estar poseído ejm: poseído por un tigre, etc.", 
" Pídale que silbe ya que su boca está nuevamente llena de comida.", 
" Pide ser un mesero para que te sirva con tus amigos para el almuerzo.", 
" Dígales que usen calcetines para hacer guantes.", 
"Dígales que usen el sombrero más extraño / el casco más absurdo durante la próxima ronda.", 
"Llama a tu mamá y dile 'mamá, quiero casarme lo antes posible' ", 
"Llama a tu ex y di 'te extraño' ", 
"Cambia de ropa con la persona más cercana hasta la siguiente ronda.", 
"Actualice el estado en WhatsApp lo que sea con palabras que comiencen con 'S' ", 
"Sube un video de canto a YouTube que esté cantando canciones populares.", 
"Colorea tus uñas de las manos y de los pies de diferentes colores durante una semana.", 
"come 2 cucharadas de arroz sin guarniciones", 
"أرسل el emoji '🦄💨' cada vez que escriba en un grupo 1 día", 
"diga '¡مرحباً بك في Quién quiere ser millonario!' a todos los grupos que tienes", 
"canta el coro de la última canción que tocaste", 
"Envia un audio de voz a tu ex / enamorado / novia, dile hola (nombre), quiero llamar, solo un momento. Te Extraño🥺👉🏼👈🏼 ", 
"Dile a la gente al azar: أولاً me dijeron que era tu gemelo, nos separamos y luego me sometí a una cirugía plástica. Y esto", 
"¡Haz 1 rima para el primer jugador!", 
"cuenta tu propia versión de cosas vergonzosas", 
"cambiar الاسم a 'Gay' durante 24 horas", 
"¡أشِر إلى tu tipo de novia!", 
"Di 'Estoy enamorado de ti, ¿quieres ser mi novio o no?' al último sexo opuesto con el que conversaste en WhatsApp, espera a que responda", 
"Háblale a tu ex por WhatsApp y dile 'te amo, por favor vuelve'. Manda una captura de pantalla como evidencia de reto cumplido!"
]