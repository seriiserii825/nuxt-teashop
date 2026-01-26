import { API_URL } from '~/config/api_url.config'
import type { IMainStatistics } from '~/interfaces/IMainStatistics'
import type { IStatisticsMiddle } from '~/interfaces/IStatisticsMiddle'

import { useAxios } from '../axiosInstance'

export const statisticsService = {
  mainStatistics: async (storeId: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IMainStatistics[]>({
      url: API_URL.statistics(`/main/store/${storeId}`),
      method: 'GET',
    })
    return data
  },
  middleStatistics: async (storeId: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IStatisticsMiddle>({
      url: API_URL.statistics(`/middle/store/${storeId}`),
      method: 'GET',
    })
    return data
  },
}
