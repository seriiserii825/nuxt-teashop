<script setup lang="ts">
  const props = defineProps({
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  })
</script>

<template>
  <div class="flex items-center">
    <img
      class="mr-4 w-10 overflow-hidden rounded-full"
      :src="imageUrl"
      alt="customer"
    />
    <div class="flex flex-col gap-1">
      <h4 class="text-lg font-medium text-gray-900">{{ title }}</h4>
      <p class="text-sm text-gray-500">{{ email }}</p>
    </div>
    <div class="ml-auto text-lg font-semibold text-gray-900">
      ${{ price.toFixed(2) }}
    </div>
  </div>
</template>
