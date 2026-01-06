import { API_URL } from '~/config/api_url.config'
import type { IUser } from '~/interfaces/IUser'

import { useAxios } from '../axiosInstance'

export const userService = {
  getAll: async () => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IUser[]>({
      url: API_URL.users(),
      method: 'GET',
    })
    return data
  },
  profile: async () => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IUser>({
      url: API_URL.users('/profile'),
      method: 'GET',
    })
    return data
  },
  favorites: async () => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IUser[]>({
      url: API_URL.users('/favorites'),
      method: 'PATCH',
    })
    return data
  },
}
