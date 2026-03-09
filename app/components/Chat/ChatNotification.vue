<script setup lang="ts">
  const DISMISSED_KEY = 'chat_login_notification_dismissed'

  const visible = ref(false)

  onMounted(() => {
    const authStore = useAuthStore()
    const dismissed = sessionStorage.getItem(DISMISSED_KEY)

    if (!authStore.user && !dismissed) {
      setTimeout(() => {
        visible.value = true
      }, 3000)
    }
  })

  function dismiss() {
    sessionStorage.setItem(DISMISSED_KEY, '1')
    visible.value = false
  }
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div
      v-if="visible"
      class="w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl"
    >
      <div class="mb-2 flex items-start justify-between gap-2">
        <p class="text-sm font-semibold text-gray-800">
          💬 Сохраняйте историю чата
        </p>
        <button
          class="mt-0.5 flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
          @click="dismiss"
        >
          ✕
        </button>
      </div>
      <p class="mb-3 text-xs leading-relaxed text-gray-500">
        Войдите в аккаунт — и все ваши сообщения будут сохранены. Вы сможете
        продолжить диалог в любое время.
      </p>
      <div class="flex gap-2">
        <NuxtLink
          to="/login"
          class="flex-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-center text-xs font-medium text-white transition-colors hover:bg-indigo-700"
          @click="dismiss"
        >
          Войти
        </NuxtLink>
        <button
          class="flex-1 rounded-xl bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
          @click="dismiss"
        >
          Не сейчас
        </button>
      </div>
    </div>
  </Transition>
</template>
