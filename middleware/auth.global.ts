export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useNuxtApp()
  if (!to.meta.public && auth.$auth.tokenStrategy.token?.status().unknown()) {
    return navigateTo('/app/login')
  }
})
