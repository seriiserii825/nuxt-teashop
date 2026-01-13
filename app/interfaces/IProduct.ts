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

export type IProductCreate = Pick<
  IProduct,
  'title' | 'description' | 'price' | 'images' | 'categoryId' | 'colorId'
>
export type IProductUpdate = Partial<IProductCreate>
