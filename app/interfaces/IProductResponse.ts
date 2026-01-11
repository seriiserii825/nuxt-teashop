export interface IProductResponse {
  data: IProduct[]
  meta: IMeta
}
export interface IProduct {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  price: number
  images: string[]
  storeId: string
  categoryId: string
  colorId: string
  userId: null
}
export interface IMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}
