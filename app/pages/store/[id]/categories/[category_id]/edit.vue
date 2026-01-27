<script setup lang="ts">
  definePageMeta({
    layout: 'store',
  })
  const storeId = useIdParamFromUrl()
  const category_id = useIdParamFromUrl('category_id')
</script>

<template>
  <div class="p-4">
    <Heading
      title="Edit Product"
      :link-url="`/store/${storeId}/categories`"
      link-text="List categories"
    />
    <FormUpdateCategory :category-id="+category_id" />
  </div>
</template>
