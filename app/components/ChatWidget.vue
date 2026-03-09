<script setup lang="ts">
  const { messages, isConnected, connect, disconnect, sendMessage } = useChat()

  const chatRef = ref<HTMLElement | null>(null)
  const isOpen = ref(false)
  const inputText = ref('')
  const messagesContainer = ref<HTMLElement | null>(null)

  const toggleChat = () => {
    isOpen.value = !isOpen.value
  }

  watch(isOpen, (val) => {
    if (val) connect()
    else disconnect()
  })

  watch(
    messages,
    async () => {
      await nextTick()
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    },
    { deep: true }
  )

  const send = () => {
    if (!inputText.value.trim()) return
    sendMessage(inputText.value)
    inputText.value = ''
  }

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  useClickOutside(chatRef, () => {
    isOpen.value = false
  })
</script>
<template>
  <div
    ref="chatRef"
    class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
  >
    <!-- Окно чата -->
    <div
      v-show="isOpen"
      class="flex h-[480px] w-80 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
    >
      <!-- Шапка -->
      <div class="flex items-center justify-between bg-indigo-600 px-4 py-3">
        <div class="flex items-center gap-2">
          <div
            class="h-2 w-2 rounded-full"
            :class="isConnected ? 'bg-green-400' : 'bg-gray-400'"
          ></div>
          <span class="text-sm font-medium text-white">Онлайн чат</span>
        </div>
        <button
          class="text-white/70 transition-colors hover:text-white"
          @click="isOpen = false"
        >
          ✕
        </button>
      </div>

      <!-- Сообщения -->
      <div
        ref="messagesContainer"
        class="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-3"
      >
        <div
          v-if="messages.length === 0"
          class="mt-8 text-center text-sm text-gray-400"
        >
          Начните диалог 👋
        </div>

        <div
          v-for="message in messages"
          :key="message.id"
          class="flex flex-col gap-1"
          :class="message.isFromAdmin ? 'items-start' : 'items-end'"
        >
          <span
            class="text-xs font-semibold"
            :class="message.isFromAdmin ? 'text-indigo-600' : 'text-gray-500'"
          >
            {{ message.isFromAdmin ? 'Поддержка' : 'Вы' }}
            <span class="ml-1 font-normal text-gray-400">{{
              formatTime(message.createdAt)
            }}</span>
          </span>
          <div
            class="max-w-[85%] break-words rounded-xl px-3 py-2 text-sm"
            :class="
              message.isFromAdmin
                ? 'rounded-tl-none bg-gray-100 text-gray-800'
                : 'rounded-tr-none bg-indigo-600 text-white'
            "
          >
            {{ message.text }}
          </div>
        </div>
      </div>

      <!-- Поле ввода -->
      <div class="flex gap-2 border-t border-gray-100 px-3 py-3">
        <input
          v-model="inputText"
          type="text"
          placeholder="Напишите сообщение..."
          class="flex-1 rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-indigo-300"
          @keydown.enter="send"
        />
        <button
          class="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-40"
          :disabled="!inputText.trim() || !isConnected"
          @click="send"
        >
          ➤
        </button>
      </div>
    </div>

    <!-- Уведомление для незалогиненных -->
    <ChatNotification />

    <!-- Кнопка открытия -->
    <button
      class="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-2xl text-white shadow-lg transition-all hover:scale-110 hover:bg-indigo-700 active:scale-95"
      @click="toggleChat"
    >
      {{ isOpen ? '✕' : '💬' }}
    </button>
  </div>
</template>
