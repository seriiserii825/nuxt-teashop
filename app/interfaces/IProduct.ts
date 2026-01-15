import type { ICategory } from './ICategory'
import type { IColor } from './IColor'

// Базовый интерфейс продукта (то, что приходит с сервера)
export interface IProduct {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  price: number
  images: string[] // URL-ы изображений с сервера
  storeId: string
  categoryId: string
  category: ICategory
  colorId: string
  color: IColor
  userId: null
}

// Для создания продукта (отправка на сервер с файлами)
export interface IProductCreate {
  title: string
  description: string
  price: number
  images: File[] // Файлы для загрузки
  categoryId: string
  colorId: string
}

// Для обновления продукта (без файлов)
export interface IProductUpdate {
  title?: string
  description?: string
  price?: number
  categoryId?: string
  colorId?: string
  images: File[]
  oldImages: string[]
}
