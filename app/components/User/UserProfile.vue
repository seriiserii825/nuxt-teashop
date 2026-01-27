<script setup lang="ts">
  import { authService } from '~/api/services/authService'

  const auth_store = useAuthStore()
  const { user } = storeToRefs(auth_store)

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
        <span class="text-xs text-gray-500">{{ user.email }}</span>
      </div>
      <svg
        class="h-4 w-4 text-gray-500 transition"
        :class="{ 'rotate-180': isDropdownOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
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
            to="/profile"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-gray-50"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span class="text-sm font-medium">Мой профиль</span>
          </NuxtLink>

          <NuxtLink
            to="/orders"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-gray-50"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span class="text-sm font-medium">Мои заказы</span>
          </NuxtLink>

          <NuxtLink
            to="/favorites"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-gray-50"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span class="text-sm font-medium">Избранное</span>
          </NuxtLink>

          <NuxtLink
            to="/settings"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-gray-50"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span class="text-sm font-medium">Настройки</span>
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
