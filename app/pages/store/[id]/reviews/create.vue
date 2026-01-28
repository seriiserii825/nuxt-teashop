<script setup lang="ts">
  definePageMeta({
    layout: 'store',
  })
  const storeId = useIdParamFromUrl()
</script>

<template>
  <div class="p-4">
    <Heading
      title="Create Review"
      :link-url="`/store/${storeId}/reviews`"
      link-text="List reviews"
    />
    <FormCreateReview />
  </div>
</template>
