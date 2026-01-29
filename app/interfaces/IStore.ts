import type { components } from '~/generated/schema'

type StoreSchema = components['schemas']['StoreBasicDto']

export type IStore = StoreSchema

export type IStoreCreate = components['schemas']['CreateStoreDto']
type StoreUpdateSchema = components['schemas']['UpdateStoreDto']

export type IStoreUpdate = StoreUpdateSchema & {
  images: File[]
  old_images: string[]
}
