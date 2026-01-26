import type { IUser } from './IUser'

export interface ILoginResponse {
  user: IUser
  tokens: {
    accessToken: string
  }
}

export interface ILoginAccessTokenResponse {
  user: IUser
  tokens: {
    accessToken: string
  }
}
