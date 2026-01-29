<script setup lang="ts">
  const store_id = useIdParamFromUrl('store_id')
  console.log('store_id', store_id)
</script>

<template>
  <div class="container py-12">
    <h1 class="mb-8 text-center text-4xl font-bold">Store Details Page</h1>
    <!-- Store details content goes here -->
  </div>
</template>
