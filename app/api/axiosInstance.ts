import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'

import { getAccessToken, removeAccessToken, setAccessToken } from './api_tokens'

let axiosClassic: AxiosInstance | null = null
let axiosWithToken: AxiosInstance | null = null

function createAxiosInstances() {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const options: CreateAxiosDefaults = {
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }

  axiosClassic = axios.create(options)
  axiosWithToken = axios.create(options)

  const isDev = import.meta.dev
  if (isDev) {
    const MIN_DELAY = 400
    const addDelayInterceptors = (instance: AxiosInstance) => {
      instance.interceptors.request.use((config) => {
        ;(config as any)._startTime = Date.now()
        return config
      })
      instance.interceptors.response.use(async (response) => {
        const elapsed = Date.now() - ((response.config as any)._startTime || 0)
        if (elapsed < MIN_DELAY) {
          await new Promise((r) => setTimeout(r, MIN_DELAY - elapsed))
        }
        return response
      })
    }
    addDelayInterceptors(axiosClassic)
    addDelayInterceptors(axiosWithToken)
  }

  axiosWithToken.interceptors.request.use((config) => {
    const accessToken = getAccessToken()
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  axiosWithToken.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      const status = error.response?.status
      const message = errorCatch(error)

      const isAuthError =
        status === 401 ||
        message === 'jwt expired' ||
        message === 'jwt must be provided'

      if (isAuthError && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true
        try {
          const response = await axiosClassic!.post('/auth/login/access-token')
          const newToken = response.data.accessToken
          setAccessToken(newToken)
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return axiosWithToken!.request(originalRequest)
        } catch (e) {
          // Refresh failed — logout and redirect
          removeAccessToken()
          if (shouldRedirectOnAuthError()) {
            navigateTo('/login')
          }
          return Promise.reject(e)
        }
      }

      // Any other 401 that's not retryable — logout
      if (status === 401) {
        removeAccessToken()
        if (shouldRedirectOnAuthError()) {
          navigateTo('/login')
        }
      }

      return Promise.reject(error)
    }
  )
}

function errorCatch(error: any) {
  const message = error?.response?.data?.message
  return message
    ? typeof message === 'object'
      ? message[0]
      : message
    : error.message
}

export function useAxios() {
  if (!axiosClassic || !axiosWithToken) {
    createAxiosInstances()
  }
  return { axiosClassic: axiosClassic!, axiosWithToken: axiosWithToken! }
}

function shouldRedirectOnAuthError(): boolean {
  const route = useRoute()
  return route.path.startsWith('/dashboard') || route.path.startsWith('/store')
}
