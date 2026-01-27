<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
    linkText: {
      type: String,
      required: false,
      default: '',
    },
    linkUrl: {
      type: String,
      required: false,
      default: '#',
    },
  })
</script>

<template>
  <!-- FrontHeaders -->
  <div class="mb-8 flex items-center justify-between">
    <div>
      <h2 class="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
        {{ title }}
      </h2>
      <p v-if="text" class="text-gray-600">{{ text }}</p>
    </div>
    <NuxtLink
      v-if="linkText && linkUrl"
      :to="linkUrl"
      class="flex items-center space-x-1 font-medium text-blue-600 hover:text-blue-700"
    >
      <span>{{ linkText }}</span>
      <svg
        class="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </NuxtLink>
  </div>
</template>
