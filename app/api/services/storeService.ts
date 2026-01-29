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
  update: async (store_id: string, data: IStoreUpdate) => {
    const { axiosWithToken } = useAxios()

    const formData = new FormData()

    if (data.title) {
      formData.append('title', data.title)
    }
    if (data.description) {
      formData.append('description', data.description)
    }

    // Если нужно сохранить текущую картинку
    if (data.old_images && data.old_images.length > 0) {
      data.old_images.forEach((img) => {
        formData.append('old_picture', img)
      })
    }

    // Добавляем новые изображения (если есть)
    if (data.images && data.images.length > 0) {
      data.images.forEach((img) => {
        formData.append('picture', img)
      })
    }

    const response = await axiosWithToken<IStore>({
      url: API_URL.stores(`/${store_id}`),
      method: 'PATCH',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
