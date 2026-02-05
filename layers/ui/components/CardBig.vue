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
  })
</script>

<template>
  <div class="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
    <div class="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
      <h3 class="text-lg font-medium text-gray-400">
        {{ title }}
      </h3>
      <font-awesome-icon :icon="icon" class="text-gray-400" />
    </div>
    <div class="p-4">
      <slot></slot>
    </div>
  </div>
</template>
