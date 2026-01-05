export interface IColor {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  value: string
  storeId: string
}

export type IColorCreate = Pick<IColor, 'name' | 'value'>
export type IColorEdit = Pick<IColor, 'name' | 'value'>
