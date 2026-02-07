import type { components } from '~/generated/schema'

import type { ICategory } from './ICategory'
import type { IColor } from './IColor'

type ProductSchema = components['schemas']['ProductBasicDto']

// Базовый интерфейс продукта (то, что приходит с сервера)
export type IProduct = ProductSchema & {
  category?: ICategory
  color?: IColor
}

type ProductCreateSchema = components['schemas']['CreateProductDto']
export type IProductCreate = ProductCreateSchema & {
  images: File[]
}
type ProductUpdateSchema = components['schemas']['UpdateProductDto']
export type IProductUpdate = ProductUpdateSchema & {
  images?: File[]
}

type ProductsPaginatedDto = components['schemas']['ProductsPaginatedDto']
export type IProductsPaginated = ProductsPaginatedDto

type QueryProductDto = components['schemas']['QueryProductDto']
export type IQueryProduct = QueryProductDto
