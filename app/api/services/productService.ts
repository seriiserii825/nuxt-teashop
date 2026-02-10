import { API_URL } from '~/config/api_url.config'
import type {
  IProduct,
  IProductCreate,
  IProductUpdate,
  IQueryProduct,
} from '~/interfaces/IProduct'
import type { IProductResponse } from '~/interfaces/IProductResponse'

import { useAxios } from '../axiosInstance'

export const productService = {
  getAll: async (query: IQueryProduct, store_id: number) => {
    const {
      page = 1,
      limit = 10,
      search = '',
      sort_key = '',
      sort_order = 'desc',
      category_ids = [],
      price_min = undefined,
      price_max = undefined,
      color_id = undefined,
      stars = undefined,
    } = query
    const { axiosWithToken } = useAxios()

    // Формируем параметры, убирая пустые значения
    const params: Record<string, string | number> = { page, limit }

    if (search) params.search = search
    if (sort_key) {
      params.sort_key = sort_key
      params.sort_order = sort_order
    }

    if (category_ids) {
      params.category_ids = String(category_ids)
    }

    if (price_min !== undefined) {
      params.price_min = price_min
    }

    if (price_max !== undefined) {
      params.price_max = price_max
    }

    if (color_id !== undefined) {
      params.color_id = color_id
    }

    if (stars !== undefined) {
      params.stars = stars
    }

    const { data } = await axiosWithToken<IProductResponse>({
      url: API_URL.products(`/store/${store_id}`),
      method: 'GET',
      params,
    })
    return data
  },
  getAllArray: async (store_id: number) => {
    const { axiosWithToken } = useAxios()

    const { data } = await axiosWithToken<IProduct[]>({
      url: API_URL.products(`/store/${store_id}/find-array`),
      method: 'GET',
    })
    return data
  },
  getByStoreId: async (
    storeId: string,
    page = 1,
    limit = 10,
    search = '',
    sort_key = '',
    sort_order: 'asc' | 'desc' = 'desc'
  ) => {
    const { axiosWithToken } = useAxios()

    // Формируем параметры, убирая пустые значения
    const params: Record<string, string | number> = { page, limit }

    if (search) params.search = search
    if (sort_key) {
      params.sort_key = sort_key
      params.sort_order = sort_order
    }

    const { data } = await axiosWithToken<IProductResponse>({
      url: API_URL.products(`/store/${storeId}`),
      method: 'GET',
      params,
    })
    return data
  },
  getByCategoryId: async (category_id: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IProduct[]>({
      url: API_URL.products(`/category/${category_id}`),
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
  getById: async (id: string, store_id: number) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IProduct>({
      url: API_URL.products(`/${id}/store/${store_id}`),
      method: 'GET',
    })
    return data
  },
  create: async (data: IProductCreate, storeId: string) => {
    const { axiosWithToken } = useAxios()

    // Создаем FormData
    const formData = new FormData()

    // Добавляем обычные поля
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('price', data.price.toString())
    formData.append('category_id', String(data.category_id))
    formData.append('color_id', String(data.color_id))

    // Добавляем файлы
    if (data.images) {
      data.images.forEach((file) => {
        formData.append('images', file)
      })
    }

    const response = await axiosWithToken<IProduct>({
      url: API_URL.products(`/store/${storeId}`),
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  },
  update: async (id: string, data: IProductUpdate, store_id: number) => {
    const { axiosWithToken } = useAxios()

    const formData = new FormData()

    // Добавляем обычные поля (только если они определены)
    if (data.title !== undefined) {
      formData.append('title', data.title)
    }
    if (data.description !== undefined) {
      formData.append('description', data.description)
    }
    if (data.price !== undefined) {
      formData.append('price', data.price.toString())
    }
    if (data.category_id !== undefined) {
      formData.append('category_id', String(data.category_id))
    }
    if (data.color_id !== undefined) {
      formData.append('color_id', String(data.color_id))
    }

    // Добавляем старые изображения (те, что нужно сохранить)
    if (data.old_images && data.old_images.length > 0) {
      data.old_images.forEach((url) => {
        formData.append('old_images[]', url)
      })
    }

    // Добавляем новые изображения (если есть)
    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append('images', file)
      })
    }

    const response = await axiosWithToken<IProduct>({
      url: API_URL.products(`/${id}/store/${store_id}`),
      method: 'PATCH',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  },
  delete: async (id: string, store_id: number) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IProduct>({
      url: API_URL.products(`/${id}/store/${store_id}`),
      method: 'DELETE',
    })
    return response.data
  },
}
