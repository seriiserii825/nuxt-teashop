import type { IStore } from './IStore'

export interface ICategory {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  store_id: null
  store?: IStore
}

export type ICategoryCreate = Pick<ICategory, 'title' | 'description'>
export type ICategoryUpdate = Pick<ICategory, 'title' | 'description'>
