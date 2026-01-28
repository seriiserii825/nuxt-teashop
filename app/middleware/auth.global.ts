// middleware/auth.global.ts
import { getAccessToken, setAccessToken } from '~/api/api_tokens'
import { userService } from '~/api/services/userService'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth_store = useAuthStore()

  if (!to.path.startsWith('/dashboard') && !to.path.startsWith('/store')) {
    return
  }

  const queryToken = to.query.accessToken as string

  // Токен из query только на /dashboard
  if (to.path === '/dashboard' && to.query.accessToken) {
    setAccessToken(to.query.accessToken as string)
    return navigateTo('/dashboard', { replace: true })
  }

  const token = getAccessToken()

  if (!token) {
    return navigateTo('/login')
  }

  try {
    const authStore = useAuthStore()
    const newData = await userService.profile()
    auth_store.setUser(newData)

    if (to.path.startsWith('/store') && authStore.user?.role !== 'admin') {
      return navigateTo('/dashboard')
    }

    if (queryToken) {
      return navigateTo(to.path, { replace: true })
    }
  } catch (e) {
    console.log(e, 'e')
  }
})
