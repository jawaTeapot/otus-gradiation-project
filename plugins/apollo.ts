// import { useCookies } from '@vueuse/integrations/useCookies'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('apollo:auth', ({ client, token }) => {
    const cookie = useCookie('auth._token.local')
    token.value = cookie.value ? cookie.value : null
  })
})
