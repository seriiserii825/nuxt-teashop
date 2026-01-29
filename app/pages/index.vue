<script setup lang="ts">
  import { storeService } from '~/api/services/storeService'
  import type { IStore } from '~/interfaces/IStore'

  const { data: stores, loading } = useQuery<IStore[]>(storeService.getAll)
</script>

<template>
  <div>
    <!-- HomeHero -->
    <HomeHero />
    <div class="container">
      <Preloader v-if="loading" />
      <ShopGrid v-else-if="stores && stores.length" :stores="stores" />
    </div>
  </div>
</template>
