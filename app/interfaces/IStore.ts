export interface IStore {
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  userId: string
}

export type IStoreCreate = Pick<IStore, 'title'>
export type IStoreUpdate = Pick<IStore, 'title' | 'description'>
