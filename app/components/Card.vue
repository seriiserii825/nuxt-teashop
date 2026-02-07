<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: Array as PropType<string[]>,
      required: true,
    },
    count: {
      type: [String, Number],
      required: true,
    },
    url: {
      type: String,
      required: false,
      default: null,
    },
  })
</script>

<template>
  <NuxtLink v-if="url" :to="url">
    <div
      class="rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:bg-gray-50 hover:shadow-md"
    >
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-400">
          {{ title }}
        </h3>
        <font-awesome-icon :icon="icon" class="text-gray-400" />
      </div>
      <div class="text-2xl font-bold">
        {{ count }}
      </div>
    </div>
  </NuxtLink>
  <div v-else class="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-lg font-medium text-gray-400">
        {{ title }}
      </h3>
      <font-awesome-icon :icon="icon" class="text-gray-400" />
    </div>
    <div class="text-2xl font-bold">
      {{ count }}
    </div>
  </div>
</template>
