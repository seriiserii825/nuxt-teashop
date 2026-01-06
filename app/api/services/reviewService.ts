import { API_URL } from '~/config/api_url.config'
import type {
  IReview,
  IReviewCreate,
  IReviewUpdate,
} from '~/interfaces/IReview'

import { useAxios } from '../axiosInstance'

export const reviewService = {
  getAll: async () => {
    const { axiosClassic } = useAxios()
    const { data } = await axiosClassic<IReview[]>({
      url: API_URL.reviews(),
      method: 'GET',
    })
    return data
  },
  getByStoreId: async (storeId: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IReview[]>({
      url: API_URL.reviews(`/store/${storeId}`),
      method: 'GET',
    })
    return data
  },
  getById: async (id: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IReview>({
      url: API_URL.reviews(`/${id}`),
      method: 'GET',
    })
    return data
  },
  create: async (data: IReviewCreate, storeId: string) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IReview>({
      url: API_URL.reviews(`/store/${storeId}`),
      method: 'POST',
      data,
    })
    return response.data
  },
  update: async (id: string, data: IReviewUpdate) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IReview>({
      url: API_URL.reviews(`/${id}`),
      method: 'PATCH',
      data,
    })
    return response.data
  },
  delete: async (id: string) => {
    const { axiosWithToken } = useAxios()
    const response = await axiosWithToken<IReview>({
      url: API_URL.reviews(`/${id}`),
      method: 'DELETE',
    })
    return response.data
  },
}
