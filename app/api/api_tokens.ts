import Cookie from 'js-cookie'

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken',
}

export function getAccessToken(): string | null {
  const accessToken = Cookie.get(EnumTokens.ACCESS_TOKEN)
  return accessToken || null
}

export function setAccessToken(token: string) {
  Cookie.set(EnumTokens.ACCESS_TOKEN, token, {
    domain: import.meta.env.NUXT_PUBLIC_COOKIE_DOMAIN || undefined,
    sameSite: 'strict',
    expires: 1, // 1 day
  })
}

export function removeAccessToken() {
  Cookie.remove(EnumTokens.ACCESS_TOKEN)
}
