import { io } from './node_modules/socket.io-client/build/esm/index.js'

const TOKEN = process.argv[2] || null
const URL = process.argv[3] || 'http://localhost:3001'

console.log(`Connecting to ${URL}...`)
console.log(`Token: ${TOKEN ? TOKEN.slice(0, 20) + '...' : 'none (anonymous)'}`)

const socket = io(URL, {
  auth: { token: TOKEN },
  transports: ['polling'],
})

socket.on('connect', () => {
  console.log('✅ Connected! socket.id =', socket.id)

  setTimeout(() => {
    console.log('📤 Sending "sendMessage"...')
    socket.emit('sendMessage', 'test message from script')
  }, 500)
})

socket.on('history', (msgs) => {
  console.log(`📜 History received: ${msgs.length} messages`)
})

socket.on('newMessage', (msg) => {
  console.log('📨 newMessage received:', msg)
  socket.disconnect()
  process.exit(0)
})

socket.on('connect_error', (err) => {
  console.error('❌ connect_error:', err.message)
  process.exit(1)
})

setTimeout(() => {
  console.error('⏰ Timeout — no response in 5s')
  process.exit(1)
}, 5000)
