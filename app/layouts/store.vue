<script setup lang="ts">
  import { userService } from '~/api/services/userService'
  import type { IUser } from '~/interfaces/IUser'

  const auth_store = useAuthStore()

  const route = useRoute()
  const id = 'id' in route.params ? (route.params.id as string) : ''

  const is_drawer_visible = ref(false)

  const { data: user } = useQuery<IUser>(userService.profile)
  watch(user, (newUser) => {
    if (newUser) {
      auth_store.setUser(newUser)
      console.log('User set to store:', auth_store.user)
    }
  })
</script>

<template>
  <div class="flex min-h-screen bg-white">
    <Transition name="fade">
      <Drawer
        v-if="is_drawer_visible"
        class="hidden lg:block"
        @emit-close="is_drawer_visible = false"
      >
        <StoreNavigation :id="id" />
      </Drawer>
    </Transition>
    <div class="w-64 lg:hidden">
      <StoreNavigation :id="id" />
    </div>
    <div class="w-full">
      <StoreHeader @emit-show-drawer="is_drawer_visible = true" />
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
