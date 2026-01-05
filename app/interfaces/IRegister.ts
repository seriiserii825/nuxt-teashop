import type { IUser } from './IUser'

export interface IRegisterPayload {
  name: string
  email: string
  password: string
}

export interface IRegisterResponse {
  user: IUser
}
