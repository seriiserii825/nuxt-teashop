import { API_URL } from '~/config/api_url.config'
import type { IUser } from '~/interfaces/IUser'

import { axiosWithToken } from '../axiosInstance'

export const userService = {
  getAll: async () => {
    const { data } = await axiosWithToken<IUser[]>({
      url: API_URL.users(),
      method: 'GET',
    })
    return data
  },
  profile: async () => {
    const { data } = await axiosWithToken<IUser>({
      url: API_URL.users('profile'),
      method: 'GET',
    })
    return data
  },
  favorites: async () => {
    const { data } = await axiosWithToken<IUser[]>({
      url: API_URL.users('favorites'),
      method: 'PATCH',
    })
    return data
  },
}
