<script setup lang="ts">
  import { userService } from '~/api/services/userService'
  import type { IUser } from '~/interfaces/IUser'

  const auth_store = useAuthStore()

  const { data } = useQuery<IUser>(() => userService.profile())
  watch(data, (newData) => {
    if (newData) {
      auth_store.setUser(newData)
    }
  })

  const mini_cart_store = useMiniCartStore()

  const show_empty_cart = ref(false)

  function hideMiniCart() {
    mini_cart_store.setVisibleDrawer(false)
  }
</script>
<template>
  <div class="flex min-h-screen flex-col">
    <!-- FrontHeader -->
    <FrontHeader class="relative z-40" />
    <main class="min-h-[100vh] flex-grow">
      <NuxtPage />
    </main>
    <Drawer
      v-if="mini_cart_store.is_visible_drawer"
      :has-close-icon="false"
      position="right"
      @emit-close="hideMiniCart"
    >
      <template #default="{ close }">
        <MiniCartEmpty v-if="show_empty_cart" @emit-close="close" />
        <MiniCartFilled v-else @emit-close="close" />
      </template>
    </Drawer>
    <FrontFooter />
  </div>
</template>
