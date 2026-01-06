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
      if (
        (error.response?.status === 401 ||
          errorCatch(error) === 'jwt expired' ||
          errorCatch(error) === 'jwt must be provided') &&
        originalRequest &&
        !originalRequest._isRetry
      ) {
        originalRequest._isRetry = true
        try {
          const response = await axiosClassic!.post('/auth/login/access-token')
          const newToken = response.data.accessToken
          setAccessToken(newToken)
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return axiosWithToken!.request(originalRequest)
        } catch (e) {
          if (
            errorCatch(e) === 'jwt expired' ||
            errorCatch(e) === 'jwt must be provided'
          ) {
            removeAccessToken()
          }
          return Promise.reject(e)
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
