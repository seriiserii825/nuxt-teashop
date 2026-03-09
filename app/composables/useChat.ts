// composables/useChat.ts
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

import { getAccessToken } from '~/api/api_tokens'

export interface ChatMessage {
  id: string
  text: string
  isFromAdmin: boolean
  createdAt: string
}

const CONVERSATION_ID_KEY = 'support_conversation_id'

export const useChat = () => {
  const messages = ref<ChatMessage[]>([])
  const isConnected = ref(false)
  const conversationId = ref<string | null>(null)
  const socket = shallowRef<Socket | null>(null)

  const connect = () => {
    const token = getAccessToken()
    const serverUrl = useRuntimeConfig().public.serverUrl.replace(/\/api$/, '')

    const savedConversationId = token ? null : sessionStorage.getItem(CONVERSATION_ID_KEY)

    socket.value = io(serverUrl, {
      auth: { token: token ?? null },
      query: {
        ...(savedConversationId ? { conversationId: savedConversationId } : {}),
      },
    })

    socket.value.on('connect', () => {
      isConnected.value = true
    })

    socket.value.on('disconnect', () => {
      isConnected.value = false
    })

    socket.value.on('history', (data: { conversationId: string; messages: ChatMessage[] }) => {
      conversationId.value = data.conversationId
      messages.value = data.messages
      // Сохраняем id для анонимных пользователей чтобы восстановить историю
      if (!token) {
        sessionStorage.setItem(CONVERSATION_ID_KEY, data.conversationId)
      }
    })

    socket.value.on('newMessage', (data: { conversationId: string; message: ChatMessage }) => {
      if (data.conversationId === conversationId.value) {
        messages.value.push(data.message)
      }
    })
  }

  const disconnect = () => {
    socket.value?.disconnect()
    socket.value = null
  }

  const sendMessage = (text: string) => {
    if (!socket.value || !text.trim()) return
    socket.value.emit('sendMessage', text)
  }

  return {
    messages,
    isConnected,
    conversationId,
    connect,
    disconnect,
    sendMessage,
  }
}
