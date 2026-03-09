<script setup lang="ts">
  import type { PropType } from 'vue'

  import type { IConversation } from '~/interfaces/IConversation'

  defineProps({
    selectedChat: {
      type: Object as PropType<IConversation>,
      required: true,
    },
  })
</script>

<template>
  <div class="chat-header-selected">
    <div
      class="flex items-center gap-3 border-b border-gray-200 bg-white px-6 py-4"
    >
      <div class="relative flex-shrink-0">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-color)] text-sm font-semibold text-white"
        >
          {{ selectedChat.guestName }}
        </div>
      </div>
    </div>
  </div>
</template>
