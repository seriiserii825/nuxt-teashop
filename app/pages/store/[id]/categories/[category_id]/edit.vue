<script setup lang="ts">
  definePageMeta({
    layout: 'store',
  })
  const storeId = useIdParamFromUrl()
  const product_id = useIdParamFromUrl('product_id')
</script>

<template>
  <div class="p-4">
    <Heading
      title="Edit Product"
      :link-url="`/store/${storeId}/products`"
      link-text="List products"
    />
    <FormUpdateProduct :product-id="product_id" />
  </div>
</template>
