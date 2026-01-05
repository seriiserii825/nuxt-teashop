import { API_URL } from '~/config/api_url.config'

import { axiosWithToken } from '../axiosInstance'

interface IFile {
  url: string
  name: string
}

export const fileService = {
  upload: async (file: FormData, folder: string) => {
    const { data } = await axiosWithToken<IFile[]>({
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
