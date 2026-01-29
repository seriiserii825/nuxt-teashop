import type { components } from '~/generated/schema'

type StoreSchema = components['schemas']['StoreBasicDto']

export type IStore = StoreSchema

export type IStoreCreate = components['schemas']['CreateStoreDto']
export type IStoreUpdate = components['schemas']['UpdateStoreDto']
