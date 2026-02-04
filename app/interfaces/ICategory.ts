import type { components } from '~/generated/schema'

import type { IStore } from './IStore'

type CategorySchema = components['schemas']['CategoryBasicDto']

export type ICategory = CategorySchema & {
  store?: IStore
}

export type ICategoryCreate = components['schemas']['CreateCategoryDto']
export type ICategoryUpdate = components['schemas']['UpdateCategoryDto']
export type ICategoryWithProductsCount =
  components['schemas']['CategoryWithProductsCountDto']
