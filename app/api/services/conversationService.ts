import { API_URL } from '~/config/api_url.config'
import type { IConversation } from '~/interfaces/IConversation'

import { useAxios } from '../axiosInstance'

export const conversationService = {
  getAll: async () => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IConversation[]>({
      url: API_URL.conversation('/conversations'),
      method: 'GET',
    })
    return data
  },
}
