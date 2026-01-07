import { API_URL } from '~/config/api_url.config'
import type { IMainStatistics } from '~/interfaces/IMainStatistics'

import { useAxios } from '../axiosInstance'

export const statisticsService = {
  mainStatistics: async (storeId: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IMainStatistics[]>({
      url: API_URL.statistics(`/main/${storeId}`),
      method: 'GET',
    })
    return data
  },
}
