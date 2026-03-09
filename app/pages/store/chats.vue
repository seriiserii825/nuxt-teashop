<script setup lang="ts">
  import { conversationService } from '~/api/services/conversationService'
  import type { IConversation } from '~/interfaces/IConversation'

  definePageMeta({
    layout: 'store',
  })

  const chats = ref<IConversation[]>([])
  const selectedChatId = ref<string | null>(null)
  const messageInput = ref('')

  const selectedChat = computed(
    () => chats.value.find((c) => c.id === selectedChatId.value) ?? null
  )

  function selectChat(id: string) {
    selectedChatId.value = id
  }

  const { data: conversations } = useQuery<IConversation[]>(() =>
    conversationService.getAll()
  )

  watch(conversations, (newConversations) => {
    if (!newConversations) return
    chats.value = newConversations
    if (!selectedChatId.value && newConversations.length > 0) {
      selectedChatId.value = newConversations[0]?.id ?? null
    }
  })

  const { connect, disconnect, sendReply } = useAdminChat(chats)

  onMounted(() => connect())
  onUnmounted(() => disconnect())

  function sendMessage() {
    if (!selectedChatId.value || !messageInput.value.trim()) return
    sendReply(selectedChatId.value, messageInput.value)
    messageInput.value = ''
  }
</script>

<template>
  <div class="flex h-[calc(100vh-64px)] overflow-hidden">
    <!-- Sidebar: user list -->
    <aside
      class="flex w-80 flex-shrink-0 flex-col border-r border-gray-200 bg-white lg:w-64"
    >
      <ChatSidebarSearch />
      <ul class="flex-1 overflow-y-auto">
        <ChatSidebarItem
          v-for="chat in chats"
          :key="chat.id"
          :chat="chat"
          :selected-chat-id="selectedChatId ?? ''"
          @select-chat="selectChat"
        />
      </ul>
    </aside>

    <!-- Main: messages -->
    <div class="flex h-full flex-1 flex-col overflow-hidden">
      <template v-if="selectedChat">
        <div class="relative h-full">
          <ChatHeaderSelected :selected-chat="selectedChat" />
          <ChatMessages :selected-chat="selectedChat" />
          <div class="absolute bottom-0 left-0 w-full">
            <ChatSendAdminMessage
              v-model:message-input="messageInput"
              @send="sendMessage"
            />
          </div>
        </div>
      </template>

      <div v-else class="flex flex-1 items-center justify-center bg-gray-50">
        <div class="text-center text-gray-400">
          <font-awesome-icon
            :icon="['fas', 'comments']"
            class="mb-3 text-5xl"
          />
          <p class="text-sm">Select a chat to start messaging</p>
        </div>
      </div>
    </div>
  </div>
</template>
