<script setup lang="ts">
  import type { IStore } from '~/interfaces/IStore'

  defineProps({
    store: {
      type: Object as PropType<IStore>,
      required: true,
    },
  })
</script>

<template>
  <div class="group cursor-pointer">
    <div
      class="overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div
        class="relative h-64 overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-400"
      >
        <img
          :src="userGetServerUrl(store.picture)"
          alt="Store Image"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
        ></div>
        <!-- Status Badge -->
      </div>
      <!-- Content -->
      <div class="p-6">
        <h3 class="mb-2 text-2xl font-bold text-gray-900">{{ store.title }}</h3>
        <!-- Action Button -->
        <NuxtLink
          :to="`/shop/${store.id}`"
          class="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
        >
          Visit Store
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
