<script setup lang="ts">
  import type { IProduct } from '~/interfaces/IProduct'

  defineProps({
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
    activeIndex: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  })
</script>

<template>
  <li
    class="group flex cursor-pointer items-center gap-4 px-4 py-3 transition hover:bg-gray-50"
    :class="activeIndex === index ? 'bg-gray-100' : ''"
  >
    <!-- Image -->
    <div
      class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100"
    >
      <img
        v-if="product.images?.[0]"
        :src="userGetServerUrl(product.images[0])"
        alt=""
        class="h-full w-full object-cover transition group-hover:scale-105"
      />
    </div>

    <!-- Content -->
    <div class="flex min-w-0 flex-1 flex-col">
      <!-- Title -->
      <p
        class="truncate text-sm font-medium text-gray-900 group-hover:text-blue-600"
      >
        {{ product.title }}
      </p>

      <!-- Meta -->
      <div class="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
        <span class="font-semibold text-gray-900"> {{ product.price }} € </span>

        <span
          v-if="product.store"
          class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5"
        >
          {{ product.store.title }}
        </span>
      </div>
    </div>

    <!-- Arrow -->
    <svg
      class="h-4 w-4 shrink-0 text-gray-400 opacity-0 transition group-hover:text-blue-500 group-hover:opacity-100"
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
  </li>
</template>
