<script setup lang="ts">
  definePageMeta({
    layout: 'store',
  })
  const storeId = useIdParamFromUrl()
</script>

<template>
  <div class="p-4">
    <Heading
      title="Create Product"
      :link-url="`/store/${storeId}/products`"
      link-text="List products"
    />
    <FormCreateProduct />
  </div>
</template>
