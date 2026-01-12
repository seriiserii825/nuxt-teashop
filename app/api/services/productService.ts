import { API_URL } from '~/config/api_url.config'
import type {
  IProduct,
  IProductCreate,
  IProductUpdate,
} from '~/interfaces/IProduct'
import type { IProductResponse } from '~/interfaces/IProductResponse'

import { useAxios } from '../axiosInstance'

export const productService = {
  getAll: async (
    page = 1,
    limit = 10,
    search = '',
    sortKey = '',
    sortOrder: 'asc' | 'desc' = 'desc'
  ) => {
    const { axiosWithToken } = useAxios()

    // Формируем параметры, убирая пустые значения
    const params: Record<string, string | number> = { page, limit }

    if (search) params.search = search
    if (sortKey) {
      params.sortKey = sortKey
      params.sortOrder = sortOrder
    }

    const { data } = await axiosWithToken<IProductResponse>({
      url: API_URL.products(),
      method: 'GET',
      params,
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
