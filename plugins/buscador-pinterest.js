import fetch from 'node-fetch'
import baileys from '@whiskeysockets/baileys'

const { generateWAMessageContent, generateWAMessageFromContent, proto } = baileys

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`${emojis} أدخل un texto. Ejemplo: .pinterest anime`)
  await m.react('🕓')
  await conn.sendMessage(m.chat, {
    text: `🍉 ʙᴜsᴄᴀɴᴅᴏ ʀᴇsᴜʟᴛᴀᴅᴏs ૮₍｡˃ ᵕ ˂ ｡₎ა 🫛`,
    ...rcanal
  }, { quoted: m })

  try {
    let res = await fetch(`https://api.stellarwa.xyz/search/pinterest?query=${encodeURIComponent(text)}&apikey=Diamond`)
    let json = await res.json()

    if (!json.status || !json.data?.length) throw 'لا توجد نتائج en Pinterest.'

    let results = json.data.slice(0, 15)

    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent(
        { image: { url } },
        { upload: conn.waUploadToServer }
      )
      return imageMessage
    }

    let cards = []
    for (let item of results) {
      let image = await createImage(item.hd || item.mini)

      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text:  `> *❏ \`Título:\`* ${item.title || '-'}\n` +
                `> *➭ \`ID:\`* ${item.id}\n` +
                `> *⍟ \`المستخدم:\`* ${item.username}\n` +
                `> *♧ \`الاسم:\`* ${item.full_name}\n` +
                `> *✿ \`Seguidores:\`* ${item.followers}\n` +
                `> *✬ \`Likes:\`* ${item.likes}\n` +
                `> *✧ \`التاريخ:\`* ${item.created}\n` +
                `> *✎ \`الوصف:\`* ${item.description || 'لا يوجد وصف'}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: club
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '🌷 Pinterest Result ☁️',
          hasMediaAttachment: true,
          imageMessage: image
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: "🔗 Ver الصورة HD",
                url: item.hd,
                merchant_url: item.hd
              })
            },
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: "👤 Ver Perfil",
                url: item.profile_user,
                merchant_url: item.profile_user
              })
            }
          ]
        })
      })
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `*🎋 النتيجةs de Pinterest para:* \`${text}\`\n> 🍏 Mostrando: ${results.length} resultados`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '_Pinterest - Search_'
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards
            })
          })
        }
      }
    }, { quoted: m, ...rcanal })

    await m.react('✅')
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch (e) {
    console.error(e)
    await m.reply('خطأ في البحث o envío del الرسالة.', null, { ...rcanal })
  }
}

handler.help = ['pinterest <texto>']
handler.tags = ['buscador']
handler.command = ['pinterest', 'pin']
handler.register = true
handler.coin = 4

export default handler

/*
import axios from 'axios';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
  if (typeof jid !== "string") {
    throw new TypeError(`jid must be string, received: ${jid} (${jid?.constructor?.name})`);
  }

  for (const media of medias) {
    if (!media.type || (media.type !== "image" && media.type !== "video")) {
      throw new TypeError(`media.type must be "image" or "video", received: ${media.type} (${media.type?.constructor?.name})`);
    }
    if (!media.data || (!media.data.url && !Buffer.isBuffer(media.data))) {
      throw new TypeError(`media.data must be object with url or buffer, received: ${media.data} (${media.data?.constructor?.name})`);
    }
  }

  if (medias.length < 2) {
    throw new RangeError("Minimum 2 media");
  }

  const caption = options.text || options.caption || "";
  const delay = !isNaN(options.delay) ? options.delay : 500;
  delete options.text;
  delete options.caption;
  delete options.delay;

  const album = baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: {
        expectedImageCount: medias.filter(media => media.type === "image").length,
        expectedVideoCount: medias.filter(media => media.type === "video").length,
        ...(options.quoted
          ? {
              contextInfo: {
                remoteJid: options.quoted.key.remoteJid,
                fromMe: options.quoted.key.fromMe,
                stanzaId: options.quoted.key.id,
                participant: options.quoted.key.participant || options.quoted.key.remoteJid,
                quotedMessage: options.quoted.message,
              },
            }
          : {}),
      },
    },
    {}
  );

  await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

  for (let i = 0; i < medias.length; i++) {
    const { type, data } = medias[i];
    const img = await baileys.generateWAMessage(
      album.key.remoteJid,
      { [type]: data, ...(i === 0 ? { caption } : {}) },
      { upload: conn.waUploadToServer }
    );
    img.message.messageContextInfo = {
      messageAssociation: { associationType: 1, parentMessageKey: album.key },
    };
    await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id });
    await baileys.delay(delay);
  }

  return album;
}

const pins = async (judul) => {
  try {
    const res = await axios.get(`https://anime-xi-wheat.vercel.app/api/pinterest?q=${encodeURIComponent(judul)}`);
    if (Array.isArray(res.data.images)) {
      return res.data.images.map(url => ({
        image_large_url: url,
        image_medium_url: url,
        image_small_url: url
      }));
    }
    return [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `${emojis} أدخل un texto. Ejemplo: .pinterest anime`, m, fake);
    await conn.sendMessage(m.chat, {
      text: `🍉 ʙᴜsᴄᴀɴᴅᴏ ʀᴇsᴜʟᴛᴀᴅᴏs ૮₍｡˃ ᵕ ˂ ｡₎ა 🫛`,
      ...await rcanal()
    }, { quoted: m })
    

  try {
    m.react('✨️');
    const results = await pins(text);
    if (!results || results.length === 0) return conn.reply(m.chat, `لا توجد نتائج para "${text}".`, m, fake);

    const maxImages = Math.min(results.length, 15);
    const medias = [];

    for (let i = 0; i < maxImages; i++) {
      medias.push({
        type: 'image',
        data: { url: results[i].image_large_url || results[i].image_medium_url || results[i].image_small_url }
      });
    }

    await sendAlbumMessage(m.chat, medias, {
      caption: `𝗥𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼𝘀 𝗱𝗲: ${text}\n𝗖𝗮𝗻𝘁𝗶𝗱𝗮𝗱 𝗱𝗲 𝗿𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼𝘀: 15\n𝗖𝗿𝗲𝗮𝗱𝗼𝗿:\n> ${club}`,
      quoted: m
    });

    await conn.sendMessage(m.chat, { react: { text: '☘️', key: m.key } });

  } catch (error) {
    conn.reply(m.chat, 'خطأ في جلب صور Pinterest.', m, fake);
  }
};

handler.help = ['pinterest'];
handler.command = ['pinterest', 'pin'];
handler.tags = ['buscador'];
handler.register = true

export default handler;

const rcanal = async () => {
  return {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363401008003732@newsletter',
        serverMessageId: '',
        newsletterName: '囹🎋𑜞 ᪲•˙ꨂ ֢✧: яιи ιтσѕнι ¢нαииєℓ σffι¢ιαℓ ੈ♡‧₊˚'
      },
      externalAdReply: {
        title: "𐔌 . ⋮ 𝗕 𝗨 𝗦 𝗖 𝗔 𝗡 𝗗 𝗢 .ᐟ ֹ ₊ ꒱",
        body: "جارٍ البحث في Pinterest...",
        mediaUrl: null,
        description: null,
        previewType: "PHOTO",
        thumbnail: await (await fetch(icono)).buffer(),
        sourceUrl: "https://pinterest.com",
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  }
}*/