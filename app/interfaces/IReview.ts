import type { IProduct } from './IProduct'
import type { IStore } from './IStore'

export interface IReview {
  id: number
  createdAt: Date
  updatedAt: Date
  rating: number
  text: string
  product_id: string
  product: IProduct
  user_id: string
  store_id: string
  store: IStore
}

export type IReviewCreate = Omit<
  IReview,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'store'
  | 'user_id'
  | 'store_id'
  | 'product'
>
export type IReviewUpdate = Partial<IReviewCreate>
