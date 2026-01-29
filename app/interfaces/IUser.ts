import type { components } from '~/generated/schema'

import type { IStore } from './IStore'

type UserSchema = components['schemas']['UserBasicDto']

export type IUser = UserSchema & {
  stores?: IStore[]
}
