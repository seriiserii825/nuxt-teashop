<script setup lang="ts">
  import type { PropType } from 'vue'

  import type { IProduct } from '~/interfaces/IProduct'

  const props = defineProps({
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  })

  const productImageUrl = computed(() => {
    const image = props.product.images[0] || null
    if (!image) {
      return 'https://via.placeholder.com/300x240?text=No+Image'
    } else {
      return userGetServerUrl(image)
    }
  })
</script>
<template>
  <div
    class="group relative flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-gray-200 transition duration-300 hover:ring-2 hover:ring-blue-400"
  >
    <!-- Image Container -->
    <NuxtLink
      :to="`/product/${product.id}`"
      class="relative block aspect-[1/0.8] overflow-hidden bg-gray-50"
    >
      <img
        :src="productImageUrl"
        alt="Apple MacBook Pro"
        class="h-full w-full scale-[0.8] object-contain transition duration-700 group-hover:scale-110"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
      ></div>
      <div
        class="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-4 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <NuxtLink
          :to="`/product/${product.id}`"
          class="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg transition hover:bg-gray-50"
        >
          <IconIView />
          <span>View</span>
        </NuxtLink>
        <button
          class="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
        >
          <IconICartView />
          <span>Cart</span>
        </button>
      </div>
    </NuxtLink>

    <!-- Content -->
    <div class="flex flex-1 flex-col p-3">
      <p v-if="product.category" class="mb-2 text-sm text-gray-500">
        {{ product.category.title }}
      </p>
      <NuxtLink to="/product/123">
        <h3
          class="mb-3 text-xl font-bold text-gray-900 transition hover:text-blue-600"
        >
          {{ product.title }}
        </h3>
      </NuxtLink>

      <div class="mt-auto flex items-center justify-between">
        <p class="text-2xl font-bold text-blue-600">
          {{ useFormatPrice(product.price) }}
        </p>
        <button class="text-gray-400 transition hover:text-red-500">
          <IconILike />
        </button>
      </div>
    </div>
  </div>
</template>
