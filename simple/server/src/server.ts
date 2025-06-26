import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'

// Type definitions for socket events
interface ServerToClientEvents {
  messageResponse: (data: MessageData) => void
  userTyping: (data: TypingData) => void
  userStoppedTyping: () => void
  userJoined: (message: string) => void
  userLeft: (message: string) => void
  customResponse: (data: CustomEventResponse) => void
  error: (message: string) => void
}

interface ClientToServerEvents {
  message: (data: MessageData) => void
  typing: (data: TypingData) => void
  stopTyping: () => void
  join: (username: string) => void
  customEvent: (data: CustomEventData) => void
}

interface InterServerEvents {
  ping: () => void
}

interface SocketData {
  username?: string
  userId?: string
}

// Data type definitions
interface MessageData {
  id?: number
  text: string
  user: string
  timestamp: string
}

interface TypingData {
  username: string
}

interface CustomEventData {
  message: string
  user: string
  timestamp: number
}

interface CustomEventResponse {
  message: string
  data: CustomEventData
}

// Extended Socket type
type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>

const app = express()
const server = createServer(app)

// Configure Socket.IO with TypeScript types
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
  server,
  {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  },
)

// Middleware
app.use(cors())
app.use(express.json())

// Basic route
app.get('/', (_req, res) => {
  res.json({ message: 'Socket.IO TypeScript server is running!' })
})

// Store connected users
const connectedUsers = new Map<string, { username: string; socketId: string }>()

// Socket.IO connection handling
io.on('connection', (socket: TypedSocket) => {
  console.log('User connected:', socket.id)

  // Handle user joining
  socket.on('join', (username: string) => {
    try {
      // Validate username
      if (!username || username.trim().length === 0) {
        socket.emit('error', 'Username cannot be empty')
        return
      }

      // Store user data
      socket.data.username = username
      socket.data.userId = socket.id

      connectedUsers.set(socket.id, { username, socketId: socket.id })

      console.log(`User ${username} joined with socket ID: ${socket.id}`)

      // Notify other users
      socket.broadcast.emit('userJoined', `${username} joined the chat`)
    } catch (error) {
      console.error('Error in join event:', error)
      socket.emit('error', 'Failed to join chat')
    }
  })

  // Handle messages
  socket.on('message', (data: MessageData) => {
    try {
      // Validate message data
      if (!data.text || !data.user) {
        socket.emit('error', 'Invalid message data')
        return
      }

      const messageData: MessageData = {
        id: Date.now(),
        text: data.text.trim(),
        user: data.user,
        timestamp: new Date().toISOString(),
      }

      console.log('Message received:', messageData)

      // Send to sender
      socket.emit('messageResponse', messageData)

      // Broadcast to all other clients
      socket.broadcast.emit('messageResponse', messageData)
    } catch (error) {
      console.error('Error in message event:', error)
      socket.emit('error', 'Failed to send message')
    }
  })

  // Handle typing indicators
  socket.on('typing', (data: TypingData) => {
    try {
      if (data.username) {
        socket.broadcast.emit('userTyping', data)
      }
    } catch (error) {
      console.error('Error in typing event:', error)
    }
  })

  socket.on('stopTyping', () => {
    try {
      socket.broadcast.emit('userStoppedTyping')
    } catch (error) {
      console.error('Error in stopTyping event:', error)
    }
  })

  // Handle custom events
  socket.on('customEvent', (data: CustomEventData) => {
    try {
      console.log('Custom event received:', data)

      const response: CustomEventResponse = {
        message: 'Custom event processed successfully',
        data,
      }

      // Send to all clients including sender
      io.emit('customResponse', response)
    } catch (error) {
      console.error('Error in customEvent:', error)
      socket.emit('error', 'Failed to process custom event')
    }
  })

  // Handle disconnection
  socket.on('disconnect', (reason: string) => {
    console.log(`User disconnected: ${socket.id}, reason: ${reason}`)

    const user = connectedUsers.get(socket.id)
    if (user) {
      connectedUsers.delete(socket.id)
      socket.broadcast.emit('userLeft', `${user.username} left the chat`)
    }
  })

  // Handle connection errors
  socket.on('error', (error: Error) => {
    console.error('Connection error:', error)
  })
})

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Express error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env['PORT'] ?? 3100

server.listen(PORT, () => {
  console.log(`TypeScript Socket.IO server running on port ${PORT}`)
})
