/// <reference types="vitest" />
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    server: {
      deps: {
        inline: ['element-plus']
      }
    }
  },
  root: '.'
})
