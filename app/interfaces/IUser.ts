import type { IProduct } from './IProduct'
import type { IStore } from './IStore'

export type IUser = {
  id: string
  createdAt: Date
  updatedAt: Date
  email: string
  password: string
  name: string
  picture: string
  stores: IStore[]
  favorites: IProduct[]
}
