import type {
  IMainStatistics,
  TStatisticsId,
} from '~/interfaces/IMainStatistics'

export default function useGetStatisticById(
  statistics: IMainStatistics[],
  id: TStatisticsId
) {
  return statistics.find((statistic) => statistic.id === id)
}
