export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth()
  if (!to.meta.public && auth.tokenStrategy.token?.status().unknown()) {
    return navigateTo('app/login')
  }
})
