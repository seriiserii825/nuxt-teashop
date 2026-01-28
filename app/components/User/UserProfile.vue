<script setup lang="ts">
  import { authService } from '~/api/services/authService'

  const user = useGetUserFromStore()

  const route = useRoute()

  watch(
    () => route.fullPath,
    () => {
      isDropdownOpen.value = false
    }
  )

  const loading = ref(false)

  const isDropdownOpen = ref(false)

  async function logout() {
    try {
      loading.value = true
      await authService.logout()
      window.location.reload()
    } catch (error) {
      handleAxiosError(error)
    } finally {
      loading.value = false
    }
  }

  // Закрытие дропдауна при клике вне его
  onMounted(() => {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (!target.closest('.relative')) {
        isDropdownOpen.value = false
      }
    })
  })
</script>
<template>
  <div v-if="user" class="relative">
    <button
      class="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-2 transition hover:bg-gray-100"
      @click="isDropdownOpen = !isDropdownOpen"
    >
      <img
        :src="userGetServerUrl(user.picture)"
        alt="User Avatar"
        class="h-10 w-10 rounded-full ring-2 ring-gray-200"
      />
      <div class="flex flex-col items-start">
        <span class="text-sm font-semibold text-gray-900">{{ user.name }}</span>
      </div>
      <IconIArrowDown :class="{ 'rotate-180': isDropdownOpen }" />
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isDropdownOpen"
        class="absolute right-0 top-full mt-2 w-64 rounded-xl bg-white shadow-xl ring-1 ring-gray-200"
      >
        <!-- User Info Header -->
        <div class="border-b border-gray-100 p-4">
          <div class="flex items-center gap-3">
            <img
              :src="userGetServerUrl(user.picture)"
              alt="User Avatar"
              class="h-12 w-12 rounded-full ring-2 ring-blue-100"
            />
            <div class="flex-1">
              <p class="font-semibold text-gray-900">{{ user.name }}</p>
              <p class="text-sm text-gray-500">{{ user.email }}</p>
            </div>
          </div>
        </div>

        <!-- Menu Items -->
        <div class="py-2">
          <NuxtLink
            to="/dashboard"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-gray-50"
            exact-active-class="!bg-gray-200"
          >
            <font-awesome-icon :icon="['fas', 'gauge']" />
            <span class="text-sm font-medium">Dashboard</span>
          </NuxtLink>

          <NuxtLink
            to="/dashboard/profile"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-gray-50"
            exact-active-class="!bg-gray-200"
          >
            <IconIProfile />
            <span class="text-sm font-medium">My profile</span>
          </NuxtLink>

          <NuxtLink
            to="/dashboard/orders"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-gray-50"
            exact-active-class="!bg-gray-200"
          >
            <IconIOrder />
            <span class="text-sm font-medium">My orders</span>
          </NuxtLink>

          <NuxtLink
            to="/dashboard/favorites"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-gray-50"
            exact-active-class="!bg-gray-200"
          >
            <IconIFavorites />
            <span class="text-sm font-medium">Favorites</span>
          </NuxtLink>

          <NuxtLink
            to="/dashboard/settings"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-gray-50"
            exact-active-class="!bg-gray-200"
          >
            <IconISettings />
            <span class="text-sm font-medium">Settings</span>
          </NuxtLink>

          <NuxtLink
            v-if="useIsAdmin()"
            to="/store"
            exact-active-class="!bg-gray-200"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-gray-50"
          >
            <IconIPlus />
            <span class="text-sm font-medium">Store</span>
          </NuxtLink>
        </div>

        <!-- Logout -->
        <div class="border-t border-gray-100 px-4 py-2">
          <Btn variant="btn-danger" :disabled="loading" @click="logout">
            <IconILogout />
            <span class="text-sm font-medium">Logout</span>
          </Btn>
        </div>
      </div>
    </Transition>
  </div>
</template>
