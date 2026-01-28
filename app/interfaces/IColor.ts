export interface IColor {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  value: string
  store_id: string
}

export type IColorCreate = Pick<IColor, 'name' | 'value'>
export type IColorUpdate = Pick<IColor, 'name' | 'value'>

export interface IColorResponse {
  data: IColor[]
  meta: Meta
}
interface Meta {
  total: number
  page: number
  limit: number
  totalPages: number
}
