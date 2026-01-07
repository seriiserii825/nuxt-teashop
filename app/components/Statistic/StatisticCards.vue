<script setup lang="ts">
  import { statisticsService } from '~/api/services/statisticsService'
  import type { IMainStatistics } from '~/interfaces/IMainStatistics'

  const storeId = useIdParamFromUrl()

  const { data: statistics, loading } = useQuery<IMainStatistics[]>(() =>
    statisticsService.mainStatistics(storeId!)
  )
  const sales = ref<IMainStatistics | null>(null)
  const products = ref<IMainStatistics | null>(null)
  const categories = ref<IMainStatistics | null>(null)
  const colors = ref<IMainStatistics | null>(null)
  const reviews = ref<IMainStatistics | null>(null)
  const rating = ref<IMainStatistics | null>(null)

  watch(statistics, (newStatistics) => {
    if (newStatistics) {
      sales.value = useGetStatisticById(newStatistics, 'revenue') ?? null
      products.value = useGetStatisticById(newStatistics, 'products') ?? null
      categories.value =
        useGetStatisticById(newStatistics, 'categories') ?? null
      colors.value = useGetStatisticById(newStatistics, 'colors') ?? null
      reviews.value = useGetStatisticById(newStatistics, 'reviews') ?? null
      rating.value = useGetStatisticById(newStatistics, 'rating') ?? null
    }
  })
</script>

<template>
  <div>
    <Preloader v-if="loading" />
    <div
      v-else-if="statistics"
      class="grid grid-cols-3 gap-4 lg:grid-cols-2 sm:grid-cols-1"
    >
      <Card
        v-if="sales && sales.value"
        title="Total Sales"
        :icon="['fas', 'dollar-sign']"
        :count="useFormatPrice(sales.value)"
      />
      <Card
        v-if="products && products.value"
        title="Products"
        :icon="['fab', 'product-hunt']"
        :count="products.value"
      />
      <Card
        v-if="categories && categories.value"
        title="Categories"
        :icon="['fas', 'icons']"
        :count="categories.value"
      />
      <Card
        v-if="colors && colors.value"
        title="Colors"
        :icon="['fas', 'brush']"
        :count="colors.value"
      />
      <Card
        v-if="reviews && reviews.value"
        title="Reviews"
        :icon="['fas', 'chart-simple']"
        :count="reviews.value"
      />
      <Card
        v-if="rating && rating.value"
        title="Rating"
        :icon="['fas', 'star-half-stroke']"
        :count="rating.value"
      />
    </div>
    <div v-else>
      <p class="text-center text-red-500">Failed to load statistics.</p>
    </div>
  </div>
</template>
