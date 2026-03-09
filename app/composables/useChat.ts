// composables/useChat.ts
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

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
  const socket = ref<Socket | null>(null)
  const token = localStorage.getItem('token')

  const connect = () => {
    socket.value = io(useRuntimeConfig().public.serverUrl, {
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
    console.log(text, 'text')
    if (!socket.value || !text.trim()) return
    console.log(text, 'text')
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
