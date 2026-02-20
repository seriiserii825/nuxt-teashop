<script setup lang="ts">
  import type { IProduct } from '~/interfaces/IProduct'

  const emits = defineEmits(['toggle-favorite', 'add-to-cart'])

  interface Props {
    products: IProduct[]
    storeId: number
  }

  withDefaults(defineProps<Props>(), {})

  const auth_store = useAuthStore()
  const { favorite_products_ids } = storeToRefs(auth_store)

  function toggleFavorite(product_id: number) {
    emits('toggle-favorite', product_id)
  }

  function addToCart(product_id: number) {
    emits('add-to-cart', product_id)
  }
</script>

<template>
  <div
    class="xl:grid-cols-4 grid grid-cols-4 gap-2 lg:grid-cols-3 sm:grid-cols-2"
  >
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      :store-id="storeId"
      :is-favorite="favorite_products_ids.includes(product.id)"
      @toggle-favorite="toggleFavorite"
      @add-to-cart="addToCart"
    />
  </div>
</template>
