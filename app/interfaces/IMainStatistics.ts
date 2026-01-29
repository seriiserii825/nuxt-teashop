import type { components } from '~/generated/schema'

type StatisticsSchema = components['schemas']['StatisticItemDto']

export type IMainStatistics = StatisticsSchema
export type TStatisticsId = IMainStatistics['id']
