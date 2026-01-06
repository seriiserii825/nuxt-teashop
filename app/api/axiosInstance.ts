import axios, { type CreateAxiosDefaults } from 'axios'

import { getAccessToken, removeAccessToken, setAccessToken } from './api_tokens'

const config = useRuntimeConfig()
const baseURL = config.public.apiBase

const options: CreateAxiosDefaults = {
  baseURL,
  headers: {
    contentType: 'application/json',
  },
  withCredentials: true,
}

const axiosClassic = axios.create(options)
const axiosWithToken = axios.create(options)

axiosWithToken.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

axiosWithToken.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (
      (error.response.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true // <-- добавь эту строку!
      try {
        // Получаем новый accessToken
        const response = await axiosClassic.post('/auth/login/access-token')
        const newToken = response.data.accessToken

        // Сохраняем новый токен
        setAccessToken(newToken)

        // Обновляем header и повторяем запрос
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return axiosWithToken.request(originalRequest)
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

function errorCatch(error: any) {
  const message = error?.response?.data?.message
  return message
    ? typeof message === 'object'
      ? message[0]
      : message
    : error.message
}

export { axiosClassic, axiosWithToken }
