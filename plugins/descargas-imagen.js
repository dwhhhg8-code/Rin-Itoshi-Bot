import fetch from 'node-fetch';

// Variables globales para almacenar el estado
let pinterestSessions = new Map();

const pinterestHandler = async (m, { conn, command, args, text, usedPrefix }) => {
    // Obtener o crear sesión para este chat
    let session = pinterestSessions.get(m.chat) || {
        images: [],
        currentIndex: 0,
        query: text || '' // Almacenar la consulta actual
    };

    if (command === 'pinscroll') {
        // Validar que المستخدم ingrese un texto para buscar
        if (!text) {
            return conn.reply(m.chat, `❌ اكتب lo que quieres buscar\nEjemplo: ${usedPrefix}pinscroll paisajes`, m);
        }

        // Reiniciar la sesión para la nueva búsqueda
        session = {
            images: [],
            currentIndex: 0,
            query: text // Guardar la nueva consulta
        };
        pinterestSessions.set(m.chat, session);

        try {
            // Llamar a la API con la búsqueda dالمستخدم
            const response = await fetch(`https://api.agatz.xyz/api/pinsearch?message=${encodeURIComponent(text)}`);
            const data = await response.json();

            // Validar que la API devolvió resultados صالحs
            if (data.status !== 200 || !data.data?.length) {
                return conn.reply(m.chat, '❌ لم يتم العثور على imágenes', m);
            }

            // Guardar الصور en la sesión
            session.images = data.data;
            pinterestSessions.set(m.chat, session);

            // Enviar la primera imagen con botones de navegación
            return await sendImageWithButtons(session, m, conn);
        } catch (error) {
            console.error(error);
            return conn.reply(m.chat, '❌ خطأ في buscar imágenes', m);
        }
    }

    if (command === 'pinseguir') {
        // Verificar que haya imágenes en la sesión
        if (!session.images.length) {
            return conn.reply(m.chat, '❌ استخدم أولاً .pinscroll para buscar imágenes', m);
        }

        // Navegar a la siguiente imagen si existe
        if (session.currentIndex < session.images.length - 1) {
            session.currentIndex++;
            return await sendImageWithButtons(session, m, conn);
        } else {
            return conn.reply(m.chat, '❌ Ya estás en la última imagen', m);
        }
    }

    if (command === 'pinatras') {
        // Verificar que haya imágenes en la sesión
        if (!session.images.length) {
            return conn.reply(m.chat, '❌ استخدم أولاً .pinscroll para buscar imágenes', m);
        }

        // Navegar a الصورة anterior si existe
        if (session.currentIndex > 0) {
            session.currentIndex--;
            return await sendImageWithButtons(session, m, conn);
        } else {
            return conn.reply(m.chat, '❌ Ya estás en la primera imagen', m);
        }
    }
};

// Función para enviar una imagen con botones
async function sendImageWithButtons(session, m, conn) {
    const image = session.images[session.currentIndex];

    const caption = `
🖼️ *الصورة ${session.currentIndex + 1} de ${session.images.length}*
━━━━━━━━━━━━━━━━
📌 *Título*: ${image.grid_title || 'بدون عنوان'}
📅 *التاريخ*: ${image.created_at || 'Desconocida'}
🔗 *Enlace*: [Ver en Pinterest](${image.pin})
`.trim();

    try {
        // Enviar الصورة con los botones de navegación
        await conn.sendMessage(
            m.chat,
            {
                image: { url: image.images_url },
                caption: caption,
                buttons: [
                    { buttonId: 'pinatras', buttonText: { displayText: '.pinatras' }, type: 1 },
                    { buttonId: 'pinseguir', buttonText: { displayText: '.pinseguir' }, type: 1 }
                ],
                viewOnce: true
            },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❌ خطأ في إرسال الصورة', m);
    }
}

pinterestHandler.help = [
    'pinscroll <búsqueda>',
    'pinseguir',
    'pinatras'
];
pinterestHandler.tags = ['search', 'tools'];
pinterestHandler.command = /^(pinscroll|pinseguir|pinatras)$/i;

export default pinterestHandler;