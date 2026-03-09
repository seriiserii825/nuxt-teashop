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
          // Новый чат которого ещё нет в списке — перезапрашиваем
          refetch()
          return
        }

        const conv = conversations.value[index]
        if (!conv) return
        conv.messages = [...(conv.messages ?? []), data.message]

        // Перемещаем чат с новым сообщением наверх
        if (index !== 0) {
          conversations.value.splice(index, 1)
          conversations.value.unshift(conv)
        }
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

  return {
    isConnected,
    connect,
    disconnect,
    sendReply,
  }
}
