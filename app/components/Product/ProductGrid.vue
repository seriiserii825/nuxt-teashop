<script setup lang="ts">
  import type { IProduct } from '~/interfaces/IProduct'

  interface Props {
    products: IProduct[]
  }

  withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div
    class="xl:grid-cols-4 grid grid-cols-4 gap-6 lg:grid-cols-3 sm:grid-cols-2"
  >
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
