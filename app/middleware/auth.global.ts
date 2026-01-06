// middleware/auth.global.ts
import { getAccessToken, setAccessToken } from '~/api/api_tokens'
import { userService } from '~/api/services/userService'

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/dashboard')) {
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
    await userService.profile()

    if (queryToken) {
      return navigateTo(to.path, { replace: true })
    }
  } catch (e) {
    handleAxiosError(e)
    return navigateTo('/login')
  }
})
