import type { components } from '~/generated/schema'

type StatisticsSchema = components['schemas']['StatisticItemDto']

export interface IMainStatistics {
  id: StatisticsSchema[]
  name: string
  value: number
}
