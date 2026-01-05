import axios, { type CreateAxiosDefaults } from 'axios'

import { getAccessToken } from './api_tokens'

const baseURL = import.meta.env.NUXT_PUBLIC_API_BASE
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
      try {
        // await j
        return axiosWithToken.request(originalRequest)
      } catch (e) {
        if (
          errorCatch(e) === 'jwt expired' ||
          errorCatch(e) === 'jwt must be provided'
        ) {
          removeAccessToken()
        }
      }
    }
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
