<script setup lang="ts">
  const auth_store = useAuthStore()
  const mini_cart_store = useMiniCartStore()
  function showMiniCart() {
    mini_cart_store.setVisibleDrawer(true)
  }
</script>

<template>
  <nav class="flex items-center space-x-6">
    <NuxtLink
      v-if="auth_store.last_store_id"
      :to="`/shop/${auth_store.last_store_id}`"
      class="text-gray-700 transition hover:text-blue-600"
      :class="{
        'font-bold text-blue-600': $route.path.startsWith(
          `/shop/${auth_store.last_store_id}`
        ),
      }"
      >Store</NuxtLink
    >
    <NuxtLink
      v-if="useIsLoggedIn()"
      to="/dashboard/favorites"
      class="text-gray-700 transition hover:text-blue-600"
      :class="{
        'font-bold text-blue-600': $route.path.startsWith(
          '/dashboard/favorites'
        ),
      }"
      >Favorites</NuxtLink
    >
    <Btn @click="showMiniCart">Cart(4)</Btn>
    <UserProfile v-if="useIsLoggedIn()" />
    <NuxtLink
      v-else
      class="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      to="/login"
    >
      <IconILogout />
      <span>Login</span>
    </NuxtLink>
  </nav>
</template>
