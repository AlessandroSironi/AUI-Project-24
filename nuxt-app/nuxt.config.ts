// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    nitro: {
        compressPublicAssets: true,
    },
    app: {
        head: {
            title: 'GreenIFTTT',
            meta: [{ name: 'description', content: 'GreenIFTTT project website' }],
            htmlAttrs: {
                lang: 'en',
            },
        },
    },
});
