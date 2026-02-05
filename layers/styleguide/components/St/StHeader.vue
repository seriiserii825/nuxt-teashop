<script setup lang="ts">
  interface Props {
    title: string
    description: string
  }

  withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="mb-8">
    <h1 class="mb-4 text-4xl font-bold text-gray-900">{{ title }}</h1>
    <!-- Description -->
    <p class="mb-8 text-gray-700">{{ description }}</p>
  </div>
</template>
