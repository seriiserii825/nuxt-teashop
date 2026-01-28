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
  category_id: string
  category: ICategory
  color_id: string
  color: IColor
  userId: null
}

// Для создания продукта (отправка на сервер с файлами)
export interface IProductCreate {
  title: string
  description: string
  price: number
  images: File[] // Файлы для загрузки
  category_id: string
  color_id: string
}

// Для обновления продукта (без файлов)
export interface IProductUpdate {
  title?: string
  description?: string
  price?: number
  category_id?: string
  color_id?: string
  images: File[]
  old_images: string[]
}
