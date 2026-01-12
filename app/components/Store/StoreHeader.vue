<script setup lang="ts">
  import { authService } from '~/api/services/authService'
  import { LocalStorage } from '~/helpers/LocalStorage'

  const emits = defineEmits(['emit-show-drawer'])
  function showDrawer() {
    emits('emit-show-drawer')
  }

  const auth_store = useAuthStore()
  const user = computed(() => auth_store.user)
  async function logout() {
    try {
      await authService.logout()
      LocalStorage.clear()
      navigateTo('/login')
    } catch (error) {
      handleAxiosError(error)
    }
  }
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
        class="h-8 w-8 cursor-pointer rounded-full"
        @click="logout"
      />
    </div>
  </div>
</template>
