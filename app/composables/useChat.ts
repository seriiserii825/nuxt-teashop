// composables/useChat.ts
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { getAccessToken } from '~/api/api_tokens'

interface Message {
  id: string
  text: string
  authorName: string
  authorEmail: string | undefined
  isAnonymous: boolean
  createdAt: string
}

export const useChat = () => {
  const messages = ref<Message[]>([])
  const isConnected = ref(false)
  const socket = shallowRef<Socket | null>(null)

  const connect = () => {
    const token = getAccessToken()
    console.log('[useChat] token from cookie:', token ? token.slice(0, 30) + '...' : 'NULL')
    const serverUrl = useRuntimeConfig().public.serverUrl.replace(/\/api$/, '')
    console.log('[useChat] connecting to:', serverUrl)
    socket.value = io(serverUrl, {
      auth: {
        token: token ?? null,
      },
    })

    socket.value.on('connect', () => {
      isConnected.value = true
    })

    socket.value.on('disconnect', () => {
      isConnected.value = false
    })

    // Получаем историю сообщений при подключении
    socket.value.on('history', (data: Message[]) => {
      messages.value = data
    })

    // Получаем новые сообщения в реальном времени
    socket.value.on('newMessage', (message: Message) => {
      messages.value.push(message)
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
    connect,
    disconnect,
    sendMessage,
  }
}
