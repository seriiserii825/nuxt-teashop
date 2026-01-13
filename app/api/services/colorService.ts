import { API_URL } from '~/config/api_url.config'
import type { IColor, IColorCreate, IColorUpdate } from '~/interfaces/IColor'

import { useAxios } from '../axiosInstance'

export const colorService = {
  getAll: async () => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IColor[]>({
      url: API_URL.colors(),
      method: 'GET',
    })
    return data
  },
  getByStoreId: async (storeId: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IColor[]>({
      url: API_URL.colors(`/store/${storeId}`),
      method: 'GET',
    })
    return data
  },
  getById: async (id: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IColor>({
      url: API_URL.colors(`/${id}`),
      method: 'GET',
    })
    return data
  },
  create: async (data: IColorCreate, storeId: string) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IColor>({
      url: API_URL.colors(`/store/${storeId}`),
      method: 'POST',
      data,
    })
    return response.data
  },
  update: async (id: string, data: IColorUpdate) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IColor>({
      url: API_URL.colors(`/${id}`),
      method: 'PATCH',
      data,
    })
    return response.data
  },
  delete: async (id: string) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IColor>({
      url: API_URL.colors(`/${id}`),
      method: 'DELETE',
    })
    return response.data
  },
}
