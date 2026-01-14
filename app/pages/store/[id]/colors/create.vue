<script setup lang="ts">
  definePageMeta({
    layout: 'store',
  })
  const storeId = useIdParamFromUrl()
</script>

<template>
  <div class="p-4">
    <Heading
      title="Create Color"
      :link-url="`/store/${storeId}/colors`"
      link-text="List colors"
    />
    <FormCreateColor />
  </div>
</template>
