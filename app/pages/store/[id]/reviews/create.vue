<script setup lang="ts">
  definePageMeta({
    layout: 'store',
  })
  const storeId = useIdParamFromUrl()
</script>

<template>
  <div class="p-4">
    <Heading
      title="Create Category"
      :link-url="`/store/${storeId}/categories`"
      link-text="List categories"
    />
    <FormCreateCategory />
  </div>
</template>
