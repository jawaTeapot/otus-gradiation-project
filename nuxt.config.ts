// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Boomstream'
    },
    rootId: 'Boomstream'
  },

  css: ['~/assets/css/main.scss'],

  extensions: ['.graphql', '.gql'],

  modules: [
    [
      '@nuxtjs/eslint-module', {
        emitWarning: false
      }
    ],
    '@nuxt-alt/auth',
    [
      '@pinia/nuxt', {
        storesDirs: ['./store/**']
      }
    ],
    '@vueuse/nuxt',
    [
      '@element-plus/nuxt', {
        themes: ['dark']
      }
    ],
    '@nuxtjs/color-mode',
    [
      '@nuxtjs/tailwindcss', {
        cssPath: '~/assets/css/main.scss',
        configPath: 'tailwind.config'
      }
    ],
    '@nuxtjs/i18n',
    'nuxt-icon',
    '@nuxtjs/apollo',
    '@nuxt/image'
  ],

  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
    strict: true
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_URL
    }
  },

  vueuse: {
    ssrHandlers: true
  },

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        file: 'en.json'
      },
      {
        code: 'ru',
        name: 'Русский',
        iso: 'ru-RU',
        file: 'ru.json'
      }
    ],
    lazy: true,
    langDir: 'locales',
    strategy: 'prefix',
    defaultLocale: 'ru',
    detectBrowserLanguage: {
      alwaysRedirect: true,
      cookieCrossOrigin: true,
      useCookie: true
    }
  },

  build: {
    transpile: ['vue-i18n']
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.BASE_URL + '/graphql',
        tokenName: 'auth._token.local'
      }
    }
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'accessToken',
          maxAge: 3600
        },
        refreshToken: {
          property: 'refreshToken',
          maxAge: 1800
        },
        user: {
          property: 'user'
          // autoFetch: true
        },
        endpoints: {
          login: { url: `${process.env.BASE_URL}/api/v1/login`, method: 'post' },
          refresh: { url: `${process.env.BASE_URL}/api/v1/refresh`, method: 'post' },
          logout: false,
          user: false
        }
      }
    }
  },
  colorMode: {
    preference: 'system',
    classSuffix: '',
    fallback: 'light'
  }
})
