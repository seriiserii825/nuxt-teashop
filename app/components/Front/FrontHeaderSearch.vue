<script setup lang="ts">
  const search = ref('')
  function searchByQuery() {
    navigateTo('/explorer?q=' + encodeURIComponent(search.value))
  }
</script>

<template>
  <div class="mx-8 max-w-2xl flex-1 md:flex">
    <div class="relative w-full">
      <input
        v-model="search"
        type="text"
        placeholder="Поиск товаров"
        class="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Btn
        class="absolute right-0 top-0 h-full rounded-r-lg bg-blue-600 px-4 text-white transition hover:bg-blue-700"
        :disabled="!search"
        @click="searchByQuery"
      >
        <IconISearch />
      </Btn>
    </div>
  </div>
</template>
