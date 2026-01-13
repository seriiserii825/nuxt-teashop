import { API_URL } from '~/config/api_url.config'
import type { IFileUpload } from '~/interfaces/IFileUpload'

import { useAxios } from '../axiosInstance'

export const fileService = {
  upload: async (file: FormData, folder: string) => {
    const { axiosWithToken } = useAxios()
    const { data } = await axiosWithToken<IFileUpload[]>({
      url: API_URL.files(),
      method: 'POST',
      data: file,
      params: { folder },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },
}
