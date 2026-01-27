import { API_URL } from '~/config/api_url.config'
import type { ILoginPayload } from '~/interfaces/ILoginPayload'
import type {
  ILoginAccessTokenResponse,
  ILoginResponse,
} from '~/interfaces/ILoginResonse'
import type {
  IRegisterPayload,
  IRegisterResponse,
} from '~/interfaces/IRegister'

import { removeAccessToken, setAccessToken } from '../api_tokens'
import { useAxios } from '../axiosInstance'

export const authService = {
  login: async (data: ILoginPayload): Promise<ILoginResponse> => {
    const { axiosClassic } = useAxios()
    const response = await axiosClassic({
      url: API_URL.auth('/login'),
      method: 'POST',
      data,
    })
    if (response.data.tokens?.accessToken) {
      setAccessToken(response.data.tokens.accessToken)
    }
    return response.data
  },
  register: async (data: IRegisterPayload): Promise<IRegisterResponse> => {
    const { axiosClassic } = useAxios()
    const response = await axiosClassic({
      url: API_URL.auth('/register'),
      method: 'POST',
      data,
    })
    return response.data
  },
  getNewTokens: async (): Promise<ILoginAccessTokenResponse> => {
    const { axiosClassic } = useAxios()
    const response = await axiosClassic({
      url: API_URL.auth('/login/access-token'),
      method: 'POST',
    })
    if (response.data.tokens?.accessToken) {
      setAccessToken(response.data.tokens.accessToken)
    }
    return response.data
  },
  getProfile: async () => {
    const { axiosClassic } = useAxios()
    const response = await axiosClassic({
      url: API_URL.auth('/users/profile'),
      method: 'GET',
    })
    return response.data
  },
  logout: async (): Promise<void> => {
    const { axiosWithToken } = useAxios()
    await axiosWithToken({
      url: API_URL.auth('/logout'),
      method: 'POST',
    })
    removeAccessToken()
  },
}
