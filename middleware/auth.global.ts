export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth()
  if (!to.meta.public && auth.tokenStrategy.token?.status().unknown()) {
    const localePath = useLocalePath()
    return navigateTo(`${localePath({ path: '/app/login' })}`)
  }
})
