import type { Config } from 'tailwindcss'

export default {
  corePlugins: {
    preflight: false
  },
  darkMode: 'class',
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    // './plugins/**/*.{ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      boxShadow: {
        test: '0px 0px 12px rgba(0, 0, 0, 0.12)'
      },
      colors: {
        wok: '#FFFFFF'
        // primary: defaultTheme.colors.green
      },
      animation: {
        loader: 'rotate 2s linear infinite'
      },
      keyframes: {
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        }
      }
    }
  }

} satisfies Config
