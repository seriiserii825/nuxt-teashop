<script setup lang="ts">
  import type { IConversation } from '~/interfaces/IConversation'

  const emits = defineEmits(['select-chat'])
  const props = defineProps({
    selectedChatId: {
      type: String,
      required: true,
    },
    chat: {
      type: Object as PropType<IConversation>,
      required: true,
    },
    unreadCount: {
      type: Number,
      default: 0,
    },
  })

  function selectChat(id: string) {
    emits('select-chat', id)
  }
</script>

<template>
  <div class="chat-sidebar-item">
    <li
      class="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
      :class="{ 'bg-blue-50': selectedChatId === chat.id }"
      @click="selectChat(chat.id)"
    >
      <!-- Avatar -->
      <div class="relative flex-shrink-0">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-color)] text-sm font-semibold text-white"
        >
          {{ chat.guestName }}
        </div>
        <span
          v-if="chat"
          class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500"
        ></span>
      </div>

      <!-- Info -->
      <div class="min-w-0 flex-1">
        <div class="flex items-center justify-between">
          <span class="truncate text-sm font-medium text-[var(--text-color)]">{{
            chat.guestName
          }}</span>
          <span class="ml-2 flex-shrink-0 text-xs text-gray-400">{{
            useFormatDate(chat.updatedAt)
          }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span
            v-if="unreadCount > 0"
            class="ml-2 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent-color)] text-[10px] font-bold text-white"
          >
            {{ unreadCount }}
          </span>
        </div>
      </div>
    </li>
  </div>
</template>
