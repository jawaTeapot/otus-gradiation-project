export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig()
  const auth = useAuth()
  if (!to.meta.public && auth.tokenStrategy.token?.status().unknown()) {
    return navigateTo(`${config.app.baseURL}app/login`)
  }
})
