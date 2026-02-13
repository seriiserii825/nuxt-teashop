<script setup lang="ts">
  import type { IProduct } from '~/interfaces/IProduct'

  interface Props {
    products: IProduct[]
  }

  withDefaults(defineProps<Props>(), {})

  const auth_store = useAuthStore()
  const { favorite_products_ids } = storeToRefs(auth_store)
</script>

<template>
  <div
    class="xl:grid-cols-4 grid grid-cols-4 gap-2 lg:grid-cols-3 sm:grid-cols-2"
  >
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      :is-favorite="favorite_products_ids.includes(product.id)"
    />
  </div>
</template>
