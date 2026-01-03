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
