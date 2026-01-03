<script setup lang="ts">
  import type { NuxtError } from '#app'

  const is_dev = true

  defineProps({
    error: {
      type: Object as () => NuxtError,
      default: () => ({
        statusCode: 500,
        message: 'An unexpected error occurred',
      }),
    },
  })
</script>

<template>
  <div>
    <pre v-if="error && is_dev">{{ JSON.stringify(error, null, 2) }}</pre>
    <div v-if="error" class="rounded bg-white p-8 text-center shadow-md">
      <h1 class="mb-4 text-4xl font-bold">Error {{ error.statusCode }}</h1>
      <p class="mb-4 text-lg">{{ error.message }}</p>
      <NuxtLink to="/" class="text-indigo-600 hover:underline"
        >Go back to Home</NuxtLink
      >
    </div>
  </div>
</template>
