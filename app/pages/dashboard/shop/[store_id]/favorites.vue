<script setup lang="ts">
  import { cartService } from '~/api/services/cartService'
  import { userService } from '~/api/services/userService'

  const mini_cart_store = useMiniCartStore()

  const store_id = useIdParamFromUrl('store_id')

  const auth_store = useAuthStore()
  const { user } = storeToRefs(auth_store)

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

  async function addToCart(product_id: number) {
    try {
      await cartService.add({
        product_id,
        quantity: 1,
      })
      const cart = await cartService.get()
      mini_cart_store.setCart(cart)

      useSweetAlert('success', 'Product added to cart!')
    } catch (error) {
      handleAxiosError(error)
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
      <ProductGrid
        v-else-if="user && user.favorite_products.length"
        :products="user.favorite_products"
        :store-id="+store_id"
        @toggle-favorite="toggleFavorite"
        @add-to-cart="addToCart"
      />
      <div
        v-else
        class="flex flex-col items-center space-y-4 rounded-lg border border-gray-300 bg-gray-50 p-8 text-center"
      >
        <font-awesome-icon
          :icon="['fas', 'heart-pulse']"
          class="size-8 text-red-500"
        />
        <h2 class="text-2xl font-semibold text-gray-700">No Favorites Yet</h2>
        <p class="text-gray-500">
          You haven't added any products to your favorites yet. Start exploring
          our store and add your favorite items!
        </p>
      </div>
    </div>
  </section>
</template>
