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

export type ICreateReview = Omit<IReview, 'id' | 'createdAt' | 'updatedAt'>
export type IUpdateReview = Partial<ICreateReview>
