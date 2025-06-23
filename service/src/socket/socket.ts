import { Server as SocketIO } from 'socket.io'
import { Server as HttpServer } from 'node:http'

export default function socket(server: HttpServer): SocketIO {
  const io = new SocketIO(server, {
    path: '/connection',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log(`User connected via /connection: ${socket.id}`)

    // Send welcome message
    socket.emit('welcome', {
      message: 'Connected to WebSocket server via /connection',
      socketId: socket.id,
      timestamp: new Date().toISOString(),
    })
  })

  return io
}
