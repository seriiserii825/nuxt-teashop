import type { IStore } from './IStore'

export interface IReview {
  id: number
  createdAt: Date
  updatedAt: Date
  rating: number
  text: string
  product_id: string
  user_id: string
  store_id: string
  store: IStore
}

export type IReviewCreate = Omit<IReview, 'id' | 'createdAt' | 'updatedAt'>
export type IReviewUpdate = Partial<IReviewCreate>
