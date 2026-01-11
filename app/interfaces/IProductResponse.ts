import type { IProduct } from './IProduct'

export interface IProductResponse {
  data: IProduct[]
  meta: IMeta
}
export interface IMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}
