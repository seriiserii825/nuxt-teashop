export interface IStore {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: null
  userId: string
}

export type IStoreCreate = Pick<IStore, 'title'>
export type IStoreUpdate = Pick<IStore, 'title' | 'description'>
