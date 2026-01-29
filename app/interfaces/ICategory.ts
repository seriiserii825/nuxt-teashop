import type { components } from '~/generated/schema'

type StoreSchema = components['schemas']['StoreBasicDto']
type CategorySchema = components['schemas']['CategoryBasicDto']

type IStore = StoreSchema
export type ICategory = CategorySchema & {
  store?: IStore
}

export type ICategoryCreate = components['schemas']['CreateCategoryDto']
export type ICategoryUpdate = components['schemas']['UpdateCategoryDto']

// import type { IStore } from './IStore'

// export interface ICategory {
//   id: string
//   createdAt: Date
//   updatedAt: Date
//   title: string
//   description: string
//   store_id: null
//   store?: IStore
// }

// export type ICategoryCreate = Pick<ICategory, 'title' | 'description'>
// export type ICategoryUpdate = Pick<ICategory, 'title' | 'description'>
