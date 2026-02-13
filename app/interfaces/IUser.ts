import type { components } from '~/generated/schema'

type UserSchema = components['schemas']['UserBasicDto']

export type IUser = UserSchema

export type IUserFavorite = components['schemas']['UserFavoriteDto']
