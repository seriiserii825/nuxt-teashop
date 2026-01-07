export interface IStatisticsMiddle {
  lastUsers: ILastUser[]
}
export interface ILastUser {
  id: string
  name: string
  email: string
  picture: string
  total: number
}
