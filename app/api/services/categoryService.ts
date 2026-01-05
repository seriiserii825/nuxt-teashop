import { API_URL } from '~/config/api_url.config'
import type {
  ICategory,
  ICategoryCreate,
  ICategoryUpdate,
} from '~/interfaces/ICategory'

import { axiosClassic, axiosWithToken } from '../axiosInstance'

export const categoryService = {
  getAll: async () => {
    const { data } = await axiosClassic<ICategory[]>({
      url: API_URL.categories(),
      method: 'GET',
    })
    return data
  },
  getByStoreId: async (storeId: string) => {
    const { data } = await axiosWithToken<ICategory[]>({
      url: API_URL.categories(`/store/${storeId}`),
      method: 'GET',
    })
    return data
  },
  getById: async (id: string) => {
    const { data } = await axiosWithToken<ICategory>({
      url: API_URL.categories(`/${id}`),
      method: 'GET',
    })
    return data
  },
  create: async (data: ICategoryCreate, storeId: string) => {
    const response = await axiosWithToken<ICategory>({
      url: API_URL.categories(`/store/${storeId}`),
      method: 'POST',
      data,
    })
    return response.data
  },
  update: async (id: string, data: ICategoryUpdate) => {
    const response = await axiosWithToken<ICategory>({
      url: API_URL.categories(`/${id}`),
      method: 'PATCH',
      data,
    })
    return response.data
  },
  delete: async (id: string) => {
    const response = await axiosWithToken<ICategory>({
      url: API_URL.categories(`/${id}`),
      method: 'DELETE',
    })
    return response.data
  },
}
