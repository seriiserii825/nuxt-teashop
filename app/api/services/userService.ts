import { API_URL } from '~/config/api_url.config'
import type { IUser, IUserFavorite } from '~/interfaces/IUser'

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
  toggleFavorite: async (product_id: number, store_id: number) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IUserFavorite>({
      url: API_URL.users(`/favorites/${product_id}/store/${store_id}`),
      method: 'PATCH',
    })
    return response.data
  },
}
