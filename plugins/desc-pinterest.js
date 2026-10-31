import axios from "axios";
import * as cheerio from "cheerio";

const pindl = {
    video: async (url) => {
        try {
            let { data: html } = await axios.get(url);
            let $ = cheerio.load(html);

            const mediaDataScript = $('script[data-test-id="video-snippet"]');
            if (mediaDataScript.length) {
                const mediaData = JSON.parse(mediaDataScript.html());

                if (
                    mediaData["@type"] === "VideoObject" &&
                    mediaData.contentUrl &&
                    mediaData.contentUrl.endsWith(".mp4")
                ) {
                    return {
                        type: "video",
                        name: mediaData.name,
                        description: mediaData.description,
                        contentUrl: mediaData.contentUrl,
                        thumbnailUrl: mediaData.thumbnailUrl,
                        uploadDate: mediaData.uploadDate,
                        duration: mediaData.duration,
                        commentCount: mediaData.commentCount,
                        likeCount: mediaData.interactionStatistic?.find(
                            (stat) =>
                                stat.InteractionType["@type"] === "https://schema.org/LikeAction"
                        )?.InteractionCount,
                        watchCount: mediaData.interactionStatistic?.find(
                            (stat) =>
                                stat.InteractionType["@type"] === "https://schema.org/WatchAction"
                        )?.InteractionCount,
                        creator: mediaData.creator?.name,
                        creatorUrl: mediaData.creator?.url,
                        keywords: mediaData.keywords,
                    };
                }
            }
            return null;
        } catch (error) {
            return { error: "خطأ في جلب البيانات del video" };
        }
    },

    image: async (url) => {
        try {
            let { data: html } = await axios.get(url);
            let $ = cheerio.load(html);

            const mediaDataScript = $('script[data-test-id="leaf-snippet"]');
            if (mediaDataScript.length) {
                const mediaData = JSON.parse(mediaDataScript.html());

                if (
                    mediaData["@type"] === "SocialMediaPosting" &&
                    mediaData.image &&
                    /\.(png|jpe?g|webp)$/i.test(mediaData.image) &&
                    !mediaData.image.endsWith(".gif")
                ) {
                    return {
                        type: "image",
                        author: mediaData.author?.name,
                        authorUrl: mediaData.author?.url,
                        headline: mediaData.headline,
                        articleBody: mediaData.articleBody,
                        image: mediaData.image,
                        datePublished: mediaData.datePublished,
                        sharedContentUrl: mediaData.sharedContent?.url,
                        isRelatedTo: mediaData.isRelatedTo,
                        mainEntityOfPage: mediaData.mainEntityOfPage?.["@id"],
                    };
                }
            }
            return null;
        } catch (error) {
            return { error: "خطأ في جلب البيانات de الصورة" };
        }
    },

    gif: async (url) => {
        try {
            let { data: html } = await axios.get(url);
            let $ = cheerio.load(html);

            const mediaDataScript = $('script[data-test-id="leaf-snippet"]');
            if (mediaDataScript.length) {
                const mediaData = JSON.parse(mediaDataScript.html());

                if (
                    mediaData["@type"] === "SocialMediaPosting" &&
                    mediaData.image &&
                    mediaData.image.endsWith(".gif")
                ) {
                    return {
                        type: "gif",
                        author: mediaData.author?.name,
                        authorUrl: mediaData.author?.url,
                        headline: mediaData.headline,
                        articleBody: mediaData.articleBody,
                        gif: mediaData.image,
                        datePublished: mediaData.datePublished,
                        sharedContentUrl: mediaData.sharedContent?.url,
                        isRelatedTo: mediaData.isRelatedTo,
                        mainEntityOfPage: mediaData.mainEntityOfPage?.["@id"],
                    };
                }
            }
            return null;
        } catch (error) {
            return { error: "خطأ في جلب البيانات del GIF" };
        }
    },

    download: async (urlPin) => {
        let result = await pindl.video(urlPin);
        if (result) return result;

        result = await pindl.image(urlPin);
        if (result) return result;

        result = await pindl.gif(urlPin);
        return result || { error: "لم يتم العثور على ningún medio" };
    },
};


const getFileSize = async (url) => {
    try {
        const res = await axios.head(url);
        return parseInt(res.headers["content-length"]) || 0;
    } catch {
        return 0;
    }
};

const handler = async (m, { conn, text }) => {
    if (!text) throw "¿💥 Dónde está la URL?";
    await m.react("🕓");

    try {
        const result = await pindl.download(text);
        if (result.error) throw result.error;

        let caption = "";
        const maxSize = 10 * 1024 * 1024; // 10 MB

        if (result.type === "video") {
            caption += `「✦」 *معلومات Video*\n\n> ✐ Título » ${result.name || "N/A"}\n> 🜸 Link » ${result.contentUrl}\n`;

            const size = await getFileSize(result.contentUrl);
            if (size > maxSize) {
                caption += `\n⚠️ الفيديو es muy pesado para enviar. Usa الرابط.`;
                await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, {
                    video: { url: result.contentUrl },
                    caption
                }, { quoted: m });
            }

        } else if (result.type === "image") {
            caption += `「✦」 *معلومات الصورة*\n\n> ✐ Título » ${result.headline || "N/A"}\n> 🜸 Link » ${result.image}`;
            await conn.sendMessage(m.chat, {
                image: { url: result.image },
                caption
            }, { quoted: m });

        } else if (result.type === "gif") {
            caption += `「✦」 *معلومات Gif*\n\n> ✐ Título » ${result.headline || "N/A"}\n> 🜸 Link » ${result.gif}\n`;

            const size = await getFileSize(result.gif);
            if (size > maxSize) {
                caption += `\n⚠️ El GIF es muy pesado para enviar. Usa الرابط.`;
                await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, {
                    video: { url: result.gif },
                    caption
                }, { quoted: m });
            }
        }

        await m.react("✅");
    } catch (error) {
        await m.react("✖️");
        await conn.sendMessage(m.chat, {
            text: `Algo salió mal: ${error}`
        }, { quoted: m });
    }
};

handler.help = ["pinterestdl *<url>*"];
handler.tags = ["descargas"];
handler.command = ['pindl', 'pinterestdl'];

export default handler;