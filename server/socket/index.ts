/* eslint-disable @typescript-eslint/no-unused-vars */
import http from 'http'
import { Server } from 'socket.io'

const messagesInMemory: { user: string; message: string }[] = []

// Crie o servidor HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Server is running\n')
})

// Inicialize o servidor WebSocket com suporte ao CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})

io.on('connection', (socket) => {
  const userId = socket.id
  console.log(`User ${userId} connected`)

  // Envia todas as mensagens em memória ao novo cliente
  socket.emit('previous messages', messagesInMemory)

  // Handle chat messages
  socket.on('chat message', (message) => {
    const userMessage = { user: userId, message }
    messagesInMemory.push(userMessage)
    io.emit('chat message', userMessage) // Broadcast the message with user info
  })

  socket.on('disconnect', () => {
    console.log(`User ${userId} disconnected`)
  })
})

server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001')
})
