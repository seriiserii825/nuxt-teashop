import { API_URL } from '~/config/api_url.config'
import type { IAddCartItem, ICart, ICartItem } from '~/interfaces/ICart'

import { useAxios } from '../axiosInstance'

export const cartService = {
  get: async () => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<ICart>({
      url: API_URL.cart(),
      method: 'GET',
    })
    return data
  },
  add: async (dto: IAddCartItem) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<ICartItem>({
      url: API_URL.cart(`/items`),
      method: 'POST',
      data: dto,
    })
    return data
  },
}
