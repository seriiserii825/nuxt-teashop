<script setup lang="ts">
  definePageMeta({
    layout: 'store',
  })
  const storeId = useIdParamFromUrl()
  const review_id = useIdParamFromUrl('review_id')
</script>

<template>
  <div class="p-4">
    <Heading
      title="Edit Review"
      :link-url="`/store/${storeId}/reviews`"
      link-text="List reviews"
    />
    <FormUpdateReview :review-id="+review_id" />
  </div>
</template>
