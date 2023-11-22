// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/google-fonts', 'nuxt-icon', '@pinia/nuxt', '@nuxtjs/supabase'],
    googleFonts: {
        families: {
            Roboto: [100, 200, 300, 400, 500, 600, 700, 800],
        },
    },
    css: ['@/assets/styles/global.css'],
    supabase: {
       redirectOptions: {
            login: '/login',
            callback: '/confirm',
            exclude: ['/', '/signup'],
        },
    },
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
