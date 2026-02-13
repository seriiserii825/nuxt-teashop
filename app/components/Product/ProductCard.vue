<script setup lang="ts">
  import type { PropType } from 'vue'

  import { userService } from '~/api/services/userService'
  import type { IProduct } from '~/interfaces/IProduct'

  const emits = defineEmits(['toggle-favorite'])

  const props = defineProps({
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
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

  async function toggleFavorite(product_id: number) {
    emits('toggle-favorite', product_id)
  }
</script>
<template>
  <div
    class="group relative flex h-full flex-col overflow-hidden rounded-md bg-white ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:ring-blue-200"
  >
    <!-- Image -->
    <NuxtLink
      :to="`/product/${product.id}`"
      class="relative block overflow-hidden bg-gray-50"
    >
      <!-- fixed ratio, nice crop -->
      <div class="aspect-[4/3]">
        <img
          :src="productImageUrl"
          :alt="product.title"
          class="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <!-- subtle overlay -->
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-0 transition duration-300 group-hover:opacity-100"
      ></div>

      <div
        v-if="product.color"
        class="absolute left-3 top-3 h-4 w-4 rounded-full border-2 border-white shadow-lg"
        :style="`background: ${product.color.value}`"
      ></div>

      <!-- Actions -->
      <div
        class="absolute right-3 top-3 flex -translate-y-1 gap-2 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-0 md:opacity-100"
      >
        <NuxtLink
          :to="`/product/${product.id}`"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
          aria-label="View"
        >
          <IconIView />
        </NuxtLink>

        <button
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700"
          aria-label="Add to cart"
        >
          <IconICartView />
        </button>
      </div>
    </NuxtLink>

    <!-- Content -->
    <div class="flex flex-1 flex-col p-4">
      <div class="mb-2 flex items-start justify-between gap-3">
        <p
          v-if="product.category"
          class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
        >
          {{ product.category.title }} ({{ product.id }})
        </p>

        <button
          v-if="useIsLoggedIn()"
          class="rounded-full p-2 text-gray-400 transition hover:bg-gray-50 hover:text-red-500"
          aria-label="Like"
          :class="{ 'text-red-500': isFavorite }"
          @click="toggleFavorite(product.id)"
        >
          <IconILike />
        </button>
      </div>

      <NuxtLink :to="`/product/${product.id}`" class="group/title">
        <h3
          class="line-clamp-2 text-base font-semibold leading-snug text-gray-900 transition group-hover/title:text-blue-600"
        >
          {{ product.title }}
        </h3>
      </NuxtLink>

      <!-- Rating -->
      <div class="mb-4 mt-2 flex items-center gap-2">
        <div class="flex items-center gap-0.5">
          <IconIStar
            v-for="i in 5"
            :key="i"
            :active="i <= product.avg_rating"
          />
        </div>
        <span class="text-sm text-gray-500">({{ product.reviews_count }})</span>
      </div>

      <!-- bottom row -->
      <div class="mt-auto pt-4">
        <div class="flex items-end justify-between gap-3">
          <p class="text-xl font-bold tracking-tight text-blue-600">
            {{ useFormatPrice(product.price) }}
          </p>

          <NuxtLink
            :to="`/product/${product.id}`"
            class="text-sm font-medium text-gray-500 transition hover:text-gray-700"
          >
            Details →
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
