<script setup lang="ts">
  definePageMeta({
    layout: 'store',
  })

  const messageInput = ref('')

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function sendMessage() {
    if (!messageInput.value.trim()) return

    // Here you would typically send the message to the server
    // For this example, we'll just log it to the console
    console.log('Sending message:', messageInput.value)
    messageInput.value = ''
  }
</script>

<template>
  <div class="chat-send-admin-message">
    <div class="border-t border-gray-200 bg-white px-6 py-4">
      <div class="flex items-end gap-3">
        <textarea
          v-model="messageInput"
          rows="1"
          placeholder="Type a message..."
          class="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-[var(--text-color)] outline-none transition-colors placeholder:text-gray-400 focus:border-[var(--accent-color)] focus:bg-white"
          @keydown="onKeydown"
        ></textarea>
        <button
          class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-color)] text-white transition-colors hover:bg-[var(--accent-color-dark)] disabled:opacity-50"
          :disabled="!messageInput.trim()"
          @click="sendMessage"
        >
          <font-awesome-icon :icon="['fas', 'paper-plane']" class="text-sm" />
        </button>
      </div>
    </div>
  </div>
</template>
