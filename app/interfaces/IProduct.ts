import type { ICategory } from './ICategory'
import type { IColor } from './IColor'

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
  category: ICategory
  colorId: string
  color: IColor
  userId: null
}

export type IProductCreate = Omit<
  IProduct,
  'id' | 'createdAt' | 'updatedAt' | 'userId'
>
export type IProductUpdate = Partial<IProductCreate>
