import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createServer } from 'node:http'
import socket from './socket/socket'
import apiRouter from './rest/api'

const app = express()
const server = createServer(app)

const PORT = process.env.PORT ?? 3210

app.use(cors())
app.use(express.json())

// Call socket setup
const io = socket(server)

// Call API routes
apiRouter(app, io)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`WebSocket server available at: ws://localhost:${PORT}/connection`)
  console.log(`HTTP server available at: http://localhost:${PORT}`)
})
