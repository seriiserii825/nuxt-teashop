<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
  })
</script>

<template>
  <div>
    <h2 class="mb-4 text-2xl font-bold">
      {{ title }}
    </h2>
    <p v-if="description" class="mb-6 text-gray-600">
      {{ description }}
    </p>
  </div>
</template>
