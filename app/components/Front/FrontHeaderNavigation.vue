<script setup lang="ts">
  const { isActive } = useMenuActive()
  const mini_cart_store = useMiniCartStore()
  function showMiniCart() {
    mini_cart_store.setVisibleDrawer(true)
  }
  const route = useRoute()
  const store_id = computed(() => {
    const store_id = 'store_id' in route.params ? +route.params.store_id : null
    return store_id
  })
</script>

<template>
  <nav class="flex items-center space-x-6">
    <NuxtLink
      v-if="store_id"
      :to="$routes.store(+store_id)"
      class="text-gray-700 transition hover:text-blue-600"
      :class="{
        'font-bold text-blue-600': isActive('store'),
      }"
      >Store</NuxtLink
    >
    <NuxtLink
      v-if="useIsLoggedIn() && store_id"
      :to="$routes.favorites(+store_id)"
      class="text-gray-700 transition hover:text-blue-600"
      :class="{
        'font-bold text-blue-600': isActive('favorites'),
      }"
      >Favorites</NuxtLink
    >
    <Btn @click="showMiniCart">Cart(4)</Btn>
    <UserProfile v-if="useIsLoggedIn()" />
    <NuxtLink
      v-else
      class="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      :to="$routes.login()"
    >
      <IconILogout />
      <span>Login</span>
    </NuxtLink>
  </nav>
</template>
