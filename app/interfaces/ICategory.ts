export interface ICategory {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  storeId: null
}

export type ICategoryCreate = Pick<ICategory, 'title' | 'description'>
export type ICategoryUpdate = Pick<ICategory, 'title' | 'description'>
