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
  })
</script>

<template>
  <div class="border border-gray-200 p-4 rounded-md shadow-sm bg-white">
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
