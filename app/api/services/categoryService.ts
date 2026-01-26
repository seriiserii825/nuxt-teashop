import { API_URL } from '~/config/api_url.config'
import type {
  ICategory,
  ICategoryCreate,
  ICategoryUpdate,
} from '~/interfaces/ICategory'

import { useAxios } from '../axiosInstance'

export const categoryService = {
  getAll: async (store_id: number) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<ICategory[]>({
      url: API_URL.categories(`/store/${store_id}`),
      method: 'GET',
    })
    return data
  },
  getByStoreId: async (storeId: number) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<ICategory[]>({
      url: API_URL.categories(`/store/${storeId}`),
      method: 'GET',
    })
    return data
  },
  getById: async (id: string, store_id: number) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<ICategory>({
      url: API_URL.categories(`/${id}/store/${store_id}`),
      method: 'GET',
    })
    return data
  },
  create: async (data: ICategoryCreate, storeId: string) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<ICategory>({
      url: API_URL.categories(`/store/${storeId}`),
      method: 'POST',
      data,
    })
    return response.data
  },
  update: async (id: string, data: ICategoryUpdate, store_id: number) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<ICategory>({
      url: API_URL.categories(`/${id}/store/${store_id}`),
      method: 'PATCH',
      data,
    })
    return response.data
  },
  delete: async (id: string, store_id: number) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<ICategory>({
      url: API_URL.categories(`/${id}/store/${store_id}`),
      method: 'DELETE',
    })
    return response.data
  },
}
