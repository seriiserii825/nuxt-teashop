import type { components } from '~/generated/schema'

import type { IUser } from './IUser'

type RegisterPayloadSchema = components['schemas']['CreateUserDto']

export type IRegisterPayload = RegisterPayloadSchema
export type IRegisterResponse = IUser
