<script setup lang="ts">
  import type { PropType } from 'vue'

  import type { IProduct } from '~/interfaces/IProduct'

  defineProps({
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  })
</script>

<template>
  <!-- ProductContent -->
  <div>
    <h1 class="mb-4 text-4xl font-bold text-gray-900">{{ product.title }}</h1>
    <p class="mb-8 text-3xl font-bold text-gray-900">
      {{ useFormatPrice(product.price) }}
    </p>

    <div class="mb-6 border-t border-gray-200 pt-6">
      <p class="mb-8 leading-relaxed text-gray-700">
        {{ product.description }}
      </p>

      <!-- Color -->
      <div v-if="product.color" class="mb-6">
        <div class="flex items-center gap-3">
          <span class="font-semibold text-gray-900">Color:</span>
          <div
            :style="`background: ${product.color.value}`"
            class="h-8 w-8 rounded-full border-2 border-gray-300"
          ></div>
        </div>
      </div>

      <!-- Category -->
      <div v-if="product.category" class="mb-6">
        <div class="flex items-center gap-3">
          <span class="font-semibold text-gray-900">Category:</span>
          <span class="text-gray-700">{{ product.category.title }}</span>
        </div>
      </div>

      <!-- Rating -->
      <div class="mb-8">
        <div class="flex items-center gap-3">
          <span class="font-semibold text-gray-900">Avg rating:</span>
          <div class="flex items-center gap-1">
            <svg
              class="h-5 w-5 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <span class="text-gray-700"
              >{{ String(product.avg_rating) }} |
              {{ String(product.reviews_count) }} reviews</span
            >
          </div>
        </div>
      </div>

      <!-- Add to Cart Button -->
      <button
        class="w-full rounded-lg bg-blue-600 py-4 text-lg font-semibold text-white shadow-lg transition duration-200 hover:bg-blue-700 hover:shadow-xl"
      >
        Добавить в корзину
      </button>
    </div>
  </div>
</template>
