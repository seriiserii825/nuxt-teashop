import type { IUser } from './IUser'

export interface ILoginPayload {
  user: IUser
  accessToken: string
}
