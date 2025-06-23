import { Server as SocketIO } from 'socket.io'
import { NextFunction, Request, Response } from 'express'

export const chatConnection = (_req: Request, res: Response, _next: NextFunction, io: SocketIO) => {
  const PORT = process.env.PORT ?? 3210

  res.json({
    websocketPath: '/connection',
    serverUrl: `http://localhost:${PORT}`,
    connectedClients: io.engine.clientsCount,
  })
}
