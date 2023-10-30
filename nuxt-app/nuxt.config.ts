// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            baseURL: process.env.BASE_URL,
        },
    },
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
