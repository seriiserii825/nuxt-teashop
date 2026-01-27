<script setup lang="ts">
  const mini_cart_store = useMiniCartStore()
  function showMiniCart() {
    mini_cart_store.setVisibleDrawer(true)
  }
</script>

<template>
  <nav class="flex items-center space-x-6">
    <NuxtLink to="/catalog" class="text-gray-700 transition hover:text-blue-600"
      >Catalog</NuxtLink
    >
    <NuxtLink
      to="/favorites"
      class="text-gray-700 transition hover:text-blue-600"
      >Favorites</NuxtLink
    >
    <Btn @click="showMiniCart">Cart(4)</Btn>
    <button
      class="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
    >
      <IconILogout />
      <span>Войти</span>
    </button>
  </nav>
</template>
