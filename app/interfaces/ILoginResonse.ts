import type { IUser } from './IUser'

export interface ILoginResponse {
  user: IUser
  accessToken: string
}

export interface ILoginAccessTokenResponse {
  user: IUser
  accessToken: string
}
