import type { components } from '~/generated/schema'

import type { ICategory } from './ICategory'
import type { IColor } from './IColor'

type ProductSchema = components['schemas']['ProductBasicDto']

// Базовый интерфейс продукта (то, что приходит с сервера)
export type IProduct = ProductSchema & {
  category?: ICategory
  color?: IColor
}

export type IProductCreate = components['schemas']['CreateProductDto']
export type IProductUpdate = components['schemas']['UpdateProductDto']
