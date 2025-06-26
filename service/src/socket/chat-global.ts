import { Server as SocketIO } from 'socket.io'
import { Server as HttpServer } from 'node:http'

export default function chatGlobal(server: HttpServer): SocketIO {
  const io = new SocketIO(server, {
    path: '/chat/global',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    // Listen for messages from client
    socket.on('message', (data) => {
      console.log('Message received:', data)

      // Send message back to the sender
      socket.emit('messageResponse', {
        id: Date.now(),
        text: data.text,
        user: data.user,
        timestamp: new Date().toISOString(),
      })

      // Broadcast message to all other clients
      socket.broadcast.emit('messageResponse', {
        id: Date.now(),
        text: data.text,
        user: data.user,
        timestamp: new Date().toISOString(),
      })
    })

    // Handle typing indicator
    socket.on('typing', (data) => {
      socket.broadcast.emit('userTyping', data)
    })

    socket.on('stopTyping', () => {
      socket.broadcast.emit('userStoppedTyping')
    })

    // Handle user joining
    socket.on('join', (userId) => {
      socket.data.userId = userId
      socket.broadcast.emit('userJoined', `${userId} joined the chat`)
    })

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
      if (socket.data.userId) {
        socket.broadcast.emit('userLeft', `${socket.data.userId} left the chat`)
      }
    })

    // Custom event example
    socket.on('customEvent', (data) => {
      console.log('Custom event received:', data)
      io.emit('customResponse', { message: 'Custom event processed', data })
    })
  })

  return io
}
