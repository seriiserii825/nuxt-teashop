<script setup lang="ts">
  import { storeService } from '~/api/services/storeService'
  import type { IStore } from '~/interfaces/IStore'

  definePageMeta({
    layout: 'store',
  })

  const { data: stores, loading } = useQuery<IStore[]>(storeService.getAll)
</script>

<template>
  <div class="p-8">
    <Heading title="Stores" />
    <Preloader v-if="loading" />
    <ul v-else class="mt-6 grid grid-cols-4 gap-4">
      <li
        v-for="store in stores"
        :key="store.id"
        class="rounded border bg-white transition-shadow hover:shadow-lg"
      >
        <NuxtLink :to="`/store/${store.id}`" class="block">
          <div class="p-4">
            <h2 class="mb-2 text-lg font-semibold">{{ store.title }}</h2>
            <p v-if="store.description" class="text-gray-600">
              {{ store.description }}
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
