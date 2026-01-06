import { API_URL } from '~/config/api_url.config'
import type {
  IProduct,
  IProductCreate,
  IProductUpdate,
} from '~/interfaces/IProduct'

import { useAxios } from '../axiosInstance'

export const productService = {
  getAll: async () => {
    const { axiosClassic } = useAxios()
    const { data } = await axiosClassic<IProduct[]>({
      url: API_URL.products(),
      method: 'GET',
    })
    return data
  },
  getByStoreId: async (storeId: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IProduct[]>({
      url: API_URL.products(`/store/${storeId}`),
      method: 'GET',
    })
    return data
  },
  getByCategoryId: async (categoryId: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IProduct[]>({
      url: API_URL.products(`/category/${categoryId}`),
      method: 'GET',
    })
    return data
  },
  searchByTerm: async (term: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IProduct[]>({
      url: API_URL.products(`/search`),
      method: 'GET',
      params: term ? { term } : {},
    })
    return data || []
  },
  getById: async (id: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IProduct>({
      url: API_URL.products(`/${id}`),
      method: 'GET',
    })
    return data
  },
  create: async (data: IProductCreate, storeId: string) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IProduct>({
      url: API_URL.products(`/store/${storeId}`),
      method: 'POST',
      data,
    })
    return response.data
  },
  update: async (id: string, data: IProductUpdate) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IProduct>({
      url: API_URL.products(`/${id}`),
      method: 'PATCH',
      data,
    })
    return response.data
  },
  delete: async (id: string) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IProduct>({
      url: API_URL.products(`/${id}`),
      method: 'DELETE',
    })
    return response.data
  },
}
