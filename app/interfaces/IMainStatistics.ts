export type TStatisticsId =
  | 'revenue'
  | 'products'
  | 'categories'
  | 'colors'
  | 'reviews'
  | 'rating'

export interface IMainStatistics {
  id: TStatisticsId
  name: string
  value: number
}
