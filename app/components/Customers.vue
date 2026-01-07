<script setup lang="ts">
  import { statisticsService } from '~/api/services/statisticsService'
  import type { IStatisticsMiddle } from '~/interfaces/IStatisticsMiddle'

  const store = useStoreStore()

  const { data: statistic, loading } = useQuery<IStatisticsMiddle>(() =>
    statisticsService.middleStatistics(store.store_id)
  )
</script>

<template>
  <div>
    <Preloader v-if="loading" />
    <div
      v-else-if="statistic && statistic.lastUsers.length"
      class="flex flex-col gap-6"
    >
      <CustomerCard
        v-for="user in statistic.lastUsers"
        :key="user.id"
        :image-url="userGetServerUrl(user.picture)"
        :title="user.name"
        :email="user.email"
        :price="user.total"
      />
    </div>
  </div>
</template>
