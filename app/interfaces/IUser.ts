import type { components } from '~/generated/schema'

type UserSchema = components['schemas']['UserBasicDto']

export type IUser = UserSchema
