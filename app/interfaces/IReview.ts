export interface IReview {
  id: string
  createdAt: Date
  updatedAt: Date
  rating: number
  text: string
  productId: string
  userId: string
  storeId: string
}

export type IReviewCreate = Omit<IReview, 'id' | 'createdAt' | 'updatedAt'>
export type IReviewUpdate = Partial<IReviewCreate>
