<script setup lang="ts">
  import { productService } from '~/api/services/productService'
  import type { IProduct } from '~/interfaces/IProduct'

  const product_id = useIdParamFromUrl('product_id')

  const { data: product, loading } = useQuery<IProduct>(() =>
    productService.getById(product_id.value)
  )
</script>

<template>
  <Preloader v-if="loading" />
  <div v-else-if="product" class="container mx-auto px-4 pb-14">
    <div class="flex gap-8 py-16">
      <!-- Left Column - Product Images -->
      <div class="flex-1/3">
        <ProductSlider />
      </div>

      <!-- Right Column - Product Info -->
      <div class="flex-1">
        <ProductContent :product="product" />
      </div>
    </div>

    <!-- Similar Products Section -->
    <div class="mt-20">
      <FrontHeaders
        title="Similar Products"
        text="You may like these products also"
      />
    </div>

    <div class="mt-20">
      <ProductReviews />
    </div>
  </div>
</template>
