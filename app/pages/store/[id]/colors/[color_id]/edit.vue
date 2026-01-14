<script setup lang="ts">
  definePageMeta({
    layout: 'store',
  })
  const storeId = useIdParamFromUrl()
  const color_id = useIdParamFromUrl('color_id')
</script>

<template>
  <div class="p-4">
    <Heading
      title="Edit Color"
      :link-url="`/store/${storeId}/colors`"
      link-text="List colors"
    />
    <FormUpdateColor :color-id="color_id" />
  </div>
</template>
