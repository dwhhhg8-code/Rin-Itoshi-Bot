import { generateWAMessageFromContent, proto, prepareWAMessageMedia } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
    const media = await prepareWAMessageMedia({ image: { url: 'https://tinyurl.com/28st4n83' } }, { upload: conn.waUploadToServer })

    const menu = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: "╔═════════════════════╗\n║⬩𓊆◦ القوائم المتاحة ◦𓊇⬩\n╚═════════════════════╝\n\n❯l︴• \`menulist\`\n❯l︴• \`menuowner - dev\`\n❯l︴• \`menudescargas - menudl\`\n❯l︴• \`menusticker\`\n❯l︴• \`menusearch - menuse\`\n❯l︴• \`menulogos\`\n❯l︴• \`menugrupo - menugp\`\n❯l︴• \`menuaudios - menu2\`\n❯l︴• \`menurpg\`\n❯l︴• \`menufun\`\n❯l︴• \`menutools\`\n❯l︴• \`menup\`"
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: "_ʀɪɴ ɪᴛᴏꜱʜɪ ʙᴏᴛ ✨_"
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: true,
                        imageMessage: media.imageMessage
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                        buttons: [
                            {
                                "name": "cta_url",
                                "buttonParamsJson": `{"display_text":"🌐 الموقع","url":"https://github.com/dwhhhg8-code"}`
                            },
                            {
                                "name": "quick_reply",
                                "buttonParamsJson": `{"display_text":"📜 قائمة الأوامر","id":".totalfunciones"}`
                            },
                            {
                                "name": "single_select",
                                "buttonParamsJson": JSON.stringify({
                                    title: "⚙️ الإعدادات",
                                    sections: [
                                        {
                                            title: "الخيارات",
                                            rows: [
                                                { header: "👤 الملف الشخصي", title: "عرض الملف", id: ".perfil" },
                                                { header: "⚡ الحالة", title: "حالتي", id: ".estado" }
                                            ]
                                        }
                                    ]
                                })
                            }
                        ]
                    })
                })
            }
        }
    }, { userJid: m.sender, quoted: m })

    await conn.relayMessage(m.chat, menu.message, { messageId: menu.key.id })
}

handler.command = ['menus']
export default handler