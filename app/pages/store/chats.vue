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

  const { data: conversations, refetch } = useQuery<IConversation[]>(() =>
    conversationService.getAll()
  )

  const { connect, disconnect, sendReply, markRead, unreadCounts } =
    useAdminChat(chats, refetch)

  watch(conversations, (newConversations) => {
    if (!newConversations) return

    // Seed initial unread counts from REST (don't overwrite socket-updated ones)
    const initial: Record<string, number> = {}
    for (const conv of newConversations) {
      if (unreadCounts.value[conv.id] === undefined) {
        initial[conv.id] = conv.unreadCount ?? 0
      }
    }
    unreadCounts.value = { ...initial, ...unreadCounts.value }

    const prevIds = new Set(chats.value.map((c) => c.id))
    chats.value = newConversations

    // First load — select first chat and mark it read
    if (!selectedChatId.value) {
      const first = newConversations[0]
      if (first) {
        selectedChatId.value = first.id
        markRead(first.id)
        unreadCounts.value = { ...unreadCounts.value, [first.id]: 0 }
      }
      return
    }

    // After refetch — if a new chat appeared, select it
    const newChat = newConversations.find((c) => !prevIds.has(c.id))
    if (newChat) {
      selectedChatId.value = newChat.id
      markRead(newChat.id)
      unreadCounts.value = { ...unreadCounts.value, [newChat.id]: 0 }
    }
  })

  onMounted(() => connect())
  onUnmounted(() => disconnect())

  function selectChat(id: string) {
    selectedChatId.value = id
    markRead(id)
    unreadCounts.value = { ...unreadCounts.value, [id]: 0 }
  }

  function sendMessage() {
    if (!selectedChatId.value || !messageInput.value.trim()) return
    sendReply(selectedChatId.value, messageInput.value)
    messageInput.value = ''
  }
</script>

<template>
  <div class="flex h-[calc(100vh-64px)]">
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
          :unread-count="unreadCounts[chat.id] ?? 0"
          @select-chat="selectChat"
        />
      </ul>
    </aside>

    <div class="flex flex-1 flex-col">
      <template v-if="selectedChat">
        <div class="relative pb-6">
          <ChatHeaderSelected :selected-chat="selectedChat" />
          <ChatMessages :selected-chat="selectedChat" />
          <ChatSendAdminMessage
            v-model:message-input="messageInput"
            @send="sendMessage"
          />
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
