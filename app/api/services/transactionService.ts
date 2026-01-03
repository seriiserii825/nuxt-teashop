import type { ITransactionPayload } from '~/interfaces/ITransactionPayload'

export const transactionService = {
  getAll: async () => {
    const { $axios } = useNuxtApp()
    return $axios.get('/transactions')
  },
  getAllWithPagination: async (page: number, limit: number) => {
    const { $axios } = useNuxtApp()
    return $axios.get(`/transactions/pagination?page=${page}&limit=${limit}`)
  },
  getSummary: async () => {
    const { $axios } = useNuxtApp()
    return $axios.get('/transactions/summary')
  },
  create: async (payload: ITransactionPayload) => {
    const { $axios } = useNuxtApp()
    return $axios.post('/transactions', payload)
  },
  delete: async (id: number) => {
    const { $axios } = useNuxtApp()
    return $axios.delete(`/transactions/${id}`)
  },
  summary: async () => {
    const { $axios } = useNuxtApp()
    return $axios.get('/transactions/summary')
  },
}
