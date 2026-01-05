import { API_URL } from '~/config/api_url.config'
import type { IColor, IColorCreate, IColorUpdate } from '~/interfaces/IColor'

import { axiosClassic } from '../axiosInstance'

export const categoryService = {
  getAll: async () => {
    const { data } = await axiosClassic<IColor[]>({
      url: API_URL.colors(),
      method: 'GET',
    })
    return data
  },
  getByStoreId: async (storeId: string) => {
    const { data } = await axiosClassic<IColor[]>({
      url: API_URL.colors(`/store/${storeId}`),
      method: 'GET',
    })
    return data
  },
  getById: async (id: string) => {
    const { data } = await axiosClassic<IColor>({
      url: API_URL.colors(`/${id}`),
      method: 'GET',
    })
    return data
  },
  create: async (data: IColorCreate, storeId: string) => {
    const response = await axiosClassic<IColor>({
      url: API_URL.colors(`/store/${storeId}`),
      method: 'POST',
      data,
    })
    return response.data
  },
  update: async (id: string, data: IColorUpdate) => {
    const response = await axiosClassic<IColor>({
      url: API_URL.colors(`/${id}`),
      method: 'PATCH',
      data,
    })
    return response.data
  },
  delete: async (id: string) => {
    const response = await axiosClassic<IColor>({
      url: API_URL.colors(`/${id}`),
      method: 'DELETE',
    })
    return response.data
  },
}
