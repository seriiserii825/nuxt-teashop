// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    public: {
      apiBase: '/api', // изменил на прокси
      serverUrl: process.env.NUXT_PUBLIC_SERVER_URL,
      serverUploadsUrl: process.env.NUXT_PUBLIC_SERVER_UPLOADS_URL,
    },
  },
  nitro: {
    routeRules: {
      '/api/**': {
        proxy: 'http://localhost:3300/api/**',
      },
    },
  },
  devServer: {
    port: Number(process.env.NUXT_PORT),
  },
  devtools: { enabled: true },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/scss/my.scss',
  ],
  ssr: false,

  app: {
    head: {
      link: [{ rel: 'stylesheet', href: '/css/fonts.css' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  typescript: {
    typeCheck: true,
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  experimental: {
    typedPages: true,
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    'pinia-plugin-persistedstate/nuxt',
  ],
})
