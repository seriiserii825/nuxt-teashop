<script setup lang="ts">
  import { storeService } from '~/api/services/storeService'
  import type { IStoreFull } from '~/interfaces/IStore'

  const store_id = useIdParamFromUrl('store_id')
  console.log('store_id.value', store_id.value)

  const { data: store, loading: store_loading } = useQuery<IStoreFull>(() =>
    storeService.getByIdFull(+store_id.value)
  )
</script>

<template>
  <section class="bg-white py-8">
    <div class="container mx-auto px-4">
      <FrontHeaders
        title="Products Catalog"
        text="Explore our wide range of products."
        :center="true"
      />
      <div class="flex items-start gap-8">
        <div class="w-64 flex-shrink-0 md:w-full">
          <Preloader v-if="store_loading" />
          <ShopSidebar v-else-if="store" />
          <div v-else>
            <p class="text-red-500">Failed to load store data.</p>
          </div>
        </div>
        <ProductGrid class="flex-1" />
      </div>
    </div>
  </section>
</template>
