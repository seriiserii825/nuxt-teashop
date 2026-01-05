import { API_URL } from '~/config/api_url.config'
import type { IStore, IStoreCreate, IStoreUpdate } from '~/interfaces/IStore'

import { axiosClassic, axiosWithToken } from '../axiosInstance'

export const storeService = {
  getAll: async () => {
    const { data } = await axiosClassic<IStore[]>({
      url: API_URL.stores(),
      method: 'GET',
    })
    return data
  },
  getByStoreId: async (storeId: string) => {
    const { data } = await axiosWithToken<IStore[]>({
      url: API_URL.stores(`/store/${storeId}`),
      method: 'GET',
    })
    return data
  },
  getById: async (id: string) => {
    const { data } = await axiosWithToken<IStore>({
      url: API_URL.stores(`/${id}`),
      method: 'GET',
    })
    return data
  },
  create: async (data: IStoreCreate, storeId: string) => {
    const response = await axiosWithToken<IStore>({
      url: API_URL.stores(`/store/${storeId}`),
      method: 'POST',
      data,
    })
    return response.data
  },
  update: async (id: string, data: IStoreUpdate) => {
    const response = await axiosWithToken<IStore>({
      url: API_URL.stores(`/${id}`),
      method: 'PATCH',
      data,
    })
    return response.data
  },
  delete: async (id: string) => {
    const response = await axiosWithToken<IStore>({
      url: API_URL.stores(`/${id}`),
      method: 'DELETE',
    })
    return response.data
  },
}
