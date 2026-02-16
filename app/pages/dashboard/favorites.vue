<script setup lang="ts">
  import { userService } from '~/api/services/userService'

  const user_store = useAuthStore()
  const { user } = storeToRefs(user_store)

  const favorites_is_loading = ref(false)

  async function getProfile() {
    const auth_store = useAuthStore()
    const newData = await userService.profile()
    auth_store.setUser(newData)
  }

  async function toggleFavorite(product_id: number) {
    favorites_is_loading.value = true
    try {
      const data = await userService.toggleFavorite(product_id)
      await getProfile()
      useSweetAlert('success', data.message)
    } catch (error) {
      handleAxiosError(error)
    } finally {
      favorites_is_loading.value = false
    }
  }
</script>

<template>
  <section class="bg-white py-16">
    <div class="container mx-auto px-4">
      <FrontHeaders
        title="Favorites"
        text="Our customers' favorite products."
      />
      <Preloader v-if="favorites_is_loading" />
      <!-- <ProductGrid -->
      <!--   v-else-if="user &#38;&#38; user.favorite_products.length" -->
      <!--   :products="user.favorite_products" -->
      <!--   @toggle-favorite="toggleFavorite" -->
      <!-- /> -->
    </div>
  </section>
</template>
