<script setup lang="ts">
  const emits = defineEmits(['emit-show-drawer'])
  function showDrawer() {
    emits('emit-show-drawer')
  }

  const auth_store = useAuthStore()
  const user = computed(() => auth_store.user)
</script>

<template>
  <div
    class="flex w-full items-center gap-x-4 border-b bg-white px-4 py-4 shadow-sm"
  >
    <font-awesome-icon
      :icon="['fas', 'bars']"
      class="hidden text-xl lg:block"
      @click="showDrawer"
    />
    <nav class="mr-auto flex items-center"></nav>
    <div class="flex items-center gap-x-4">
      <StoreSwitcher />
      <img
        :src="
          user?.picture ? userGetServerUrl(user.picture) : '/images/profile.png'
        "
        alt="Logo"
        class="h-8 w-8 rounded-full"
      />
    </div>
  </div>
</template>
