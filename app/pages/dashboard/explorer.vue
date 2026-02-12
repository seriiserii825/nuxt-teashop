<script setup lang="ts">
  const route = useRoute()
  const search_query = computed(() => (route.query.q as string) || '')
</script>

<template>
  <section class="bg-white py-16">
    <div v-if="search_query" class="container mx-auto px-4">
      <FrontHeaders :title="`Search for '${search_query}'`" />
    </div>
    <div v-else class="container mx-auto px-4">
      <h2 class="mb-4 text-2xl font-bold">
        Please enter a search query, for example: shoes
      </h2>
    </div>
  </section>
</template>
