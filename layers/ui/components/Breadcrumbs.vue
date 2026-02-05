<script setup lang="ts">
  import type { PropType } from 'vue'

  export interface BreadcrumbItem {
    label: string
    to?: string
  }

  defineProps({
    items: {
      type: Array as PropType<BreadcrumbItem[]>,
      required: true,
    },
    separator: {
      type: String,
      required: false,
      default: '/',
    },
  })
</script>

<template>
  <nav class="mb-6 flex items-center gap-2 text-sm text-gray-600">
    <template v-for="(item, index) in items" :key="index">
      <span v-if="index > 0">{{ separator }}</span>
      <NuxtLink
        v-if="item.to"
        :to="item.to"
        class="hover:text-gray-900"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else class="text-gray-900">{{ item.label }}</span>
    </template>
  </nav>
</template>
