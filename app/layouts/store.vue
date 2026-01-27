<script setup lang="ts">
  const store = useStoreStore()
  const route = useRoute()
  watch(
    () => route.params,
    (params) => {
      const id = 'id' in params ? params.id : null
      if (typeof id === 'string' && id) {
        store.setStoreId(+id)
      }
    },
    { immediate: true }
  )

  const is_drawer_visible = ref(false)
  useFetchProfileToPinia()
</script>

<template>
  <div class="flex min-h-screen bg-white">
    <Transition name="fade">
      <Drawer
        v-if="is_drawer_visible"
        class="hidden lg:block"
        @emit-close="is_drawer_visible = false"
      >
        <StoreNavigation @emit-navigation-close="is_drawer_visible = false" />
      </Drawer>
    </Transition>
    <div class="w-64 lg:hidden">
      <StoreNavigation />
    </div>
    <div class="w-full">
      <StoreHeader @emit-show-drawer="is_drawer_visible = true" />
      <div class="overflow-hidden">
        <slot></slot>
      </div>
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
