// composables/useAdminChat.ts
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { getAccessToken } from '~/api/api_tokens'
import type { IConversation, IConversationMessage } from '~/interfaces/IConversation'

export const useAdminChat = (
  conversations: Ref<IConversation[]>,
  refetch: () => void,
) => {
  const socket = shallowRef<Socket | null>(null)
  const isConnected = ref(false)
  const unreadCounts = ref<Record<string, number>>({})

  const connect = () => {
    const token = getAccessToken()
    const serverUrl = useRuntimeConfig().public.serverUrl.replace(/\/api$/, '')

    socket.value = io(serverUrl, {
      auth: { token: token ?? null },
    })

    socket.value.on('connect', () => {
      isConnected.value = true
    })

    socket.value.on('disconnect', () => {
      isConnected.value = false
    })

    socket.value.on(
      'newMessage',
      (data: { conversationId: string; message: IConversationMessage }) => {
        const index = conversations.value.findIndex((c) => c.id === data.conversationId)

        if (index === -1) {
          refetch()
          return
        }

        const conv = conversations.value[index]
        if (!conv) return
        conv.messages = [...(conv.messages ?? []), data.message]

        if (index !== 0) {
          conversations.value.splice(index, 1)
          conversations.value.unshift(conv)
        }
      },
    )

    socket.value.on(
      'unreadCount',
      (data: { conversationId: string; unreadCount: number }) => {
        unreadCounts.value = { ...unreadCounts.value, [data.conversationId]: data.unreadCount }
      },
    )
  }

  const disconnect = () => {
    socket.value?.disconnect()
    socket.value = null
  }

  const sendReply = (conversationId: string, text: string) => {
    if (!socket.value || !text.trim()) return
    socket.value.emit('adminReply', { conversationId, text })
  }

  const markRead = (conversationId: string) => {
    if (!socket.value) return
    socket.value.emit('markRead', conversationId)
  }

  return {
    isConnected,
    unreadCounts,
    connect,
    disconnect,
    sendReply,
    markRead,
  }
}
