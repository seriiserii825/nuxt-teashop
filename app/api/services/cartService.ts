import { API_URL } from '~/config/api_url.config'
import type { IAddCartItem, ICartItem } from '~/interfaces/ICart'

import { useAxios } from '../axiosInstance'

export const cartService = {
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
