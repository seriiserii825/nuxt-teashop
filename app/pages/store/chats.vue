<script setup lang="ts">
  import { conversationService } from '~/api/services/conversationService'
  import type { IConversation } from '~/interfaces/IConversation'

  definePageMeta({
    layout: 'store',
  })

  const chats = ref<IConversation[]>([])

  const selectedChatId = ref<string>('1')
  const messageInput = ref('')

  const selectedChat = computed(
    () => chats.value.find((c) => c.id === selectedChatId.value) ?? null
  )

  function selectChat(id: string) {
    selectedChatId.value = id
    const chat = chats.value.find((c) => c.id === id)
    if (chat) {
      console.log(chat, 'chat')
    }
  }

  const { data: conversations } = useQuery<IConversation[]>(() =>
    conversationService.getAll()
  )

  watch(conversations, (newConversations) => {
    if (!newConversations) return
    chats.value = newConversations
  })

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function sendMessage() {
    if (!messageInput.value.trim() || !selectedChat.value) return

    // Here you would typically send the message to the server
    // For this example, we'll just add it to the local state
    const newMessage = {
      id: Date.now().toString(),
      text: messageInput.value,
      isFromAdmin: true,
      createdAt: new Date().toISOString(),
    }

    selectedChat.value.messages.push(newMessage)
    messageInput.value = ''
  }
</script>

<template>
  <div class="flex h-[calc(100vh-64px)] overflow-hidden">
    <!-- Sidebar: user list -->
    <aside
      class="flex w-80 flex-shrink-0 flex-col border-r border-gray-200 bg-white lg:w-64"
    >
      <!-- Sidebar header -->
      <ChatSidebarSearch />
      <!-- Chat list -->
      <ul class="flex-1 overflow-y-auto">
        <li
          v-for="chat in chats"
          :key="chat.id"
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
              <span
                class="truncate text-sm font-medium text-[var(--text-color)]"
                >{{ chat.guestName }}</span
              >
              <span class="ml-2 flex-shrink-0 text-xs text-gray-400">{{
                useFormatDate(chat.updatedAt)
              }}</span>
            </div>
            <div class="flex items-center justify-between">
              <!-- <span -->
              <!--   v-if="chat.unread > 0" -->
              <!--   class="ml-2 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent-color)] text-[10px] font-bold text-white" -->
              <!-- > -->
              <!--   {{ chat.unread }} -->
              <!-- </span> -->
            </div>
          </div>
        </li>
      </ul>
    </aside>

    <!-- Main: messages -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <template v-if="selectedChat">
        <!-- Chat header -->
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

        <!-- Messages -->
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

        <!-- Input -->
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
              <font-awesome-icon
                :icon="['fas', 'paper-plane']"
                class="text-sm"
              />
            </button>
          </div>
        </div>
      </template>

      <!-- Empty state -->
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
