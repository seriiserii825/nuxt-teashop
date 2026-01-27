<script setup lang="ts">
  defineProps({
    id: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: Array,
      required: false,
      default: () => ['fas', 'chart-bar'],
    },
  })
</script>

<template>
  <NuxtLink
    :to="`/store/${id}/${slug}`"
    class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-blue-200/20 hover:text-blue-500 hover:drop-shadow-sm"
    active-class="bg-blue-200/30 text-blue-600 shadow-sm"
  >
    <font-awesome-icon :icon="icon" />
    {{ title }}
  </NuxtLink>
</template>
