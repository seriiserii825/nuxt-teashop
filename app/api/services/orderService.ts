import { API_URL } from '~/config/api_url.config'
import type { IOrder, IOrderCreate } from '~/interfaces/IOrder'

import { axiosWithToken } from '../axiosInstance'

export const reviewService = {
  getAll: async () => {
    const { data } = await axiosWithToken<IOrder[]>({
      url: API_URL.reviews(),
      method: 'GET',
    })
    return data
  },
  create: async (data: IOrderCreate) => {
    const response = await axiosWithToken<IOrder>({
      url: API_URL.orders('place'),
      method: 'POST',
      data,
    })
    return response.data
  },
}
