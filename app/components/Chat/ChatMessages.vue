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
  <div class="chat-messages">
    <div class="flex-1 overflow-y-auto bg-gray-50 px-6 py-4">
      <div class="flex flex-col gap-3">
        <div
          v-for="msg in selectedChat.messages"
          :key="msg.id"
          class="flex"
          :class="msg.isFromAdmin ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[65%] rounded-2xl px-4 py-2.5 text-sm shadow-sm"
            :class="
              msg.isFromAdmin
                ? 'rounded-br-sm bg-[var(--accent-color)] text-white'
                : 'rounded-bl-sm bg-white text-[var(--text-color)]'
            "
          >
            <p>{{ msg.text }}</p>
            <p
              class="mt-1 text-right text-[10px]"
              :class="msg.isFromAdmin ? 'text-blue-200' : 'text-gray-400'"
            >
              {{ useFormatDate(msg.createdAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
