import { API_URL } from '~/config/api_url.config'
import type { IStore, IStoreCreate, IStoreUpdate } from '~/interfaces/IStore'

import { useAxios } from '../axiosInstance'

export const storeService = {
  getAll: async () => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IStore[]>({
      url: API_URL.stores(),
      method: 'GET',
    })
    return data
  },
  getByStoreId: async (storeId: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IStore[]>({
      url: API_URL.stores(`/store/${storeId}`),
      method: 'GET',
    })
    return data
  },
  getById: async (id: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IStore>({
      url: API_URL.stores(`/${id}`),
      method: 'GET',
    })
    return data
  },
  create: async (data: IStoreCreate) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IStore>({
      url: API_URL.stores(),
      method: 'POST',
      data,
    })
    return response.data
  },
  update: async (id: string, data: IStoreUpdate) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IStore>({
      url: API_URL.stores(`/${id}`),
      method: 'PATCH',
      data,
    })
    return response.data
  },
  delete: async (id: string) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IStore>({
      url: API_URL.stores(`/${id}`),
      method: 'DELETE',
    })
    return response.data
  },
}
