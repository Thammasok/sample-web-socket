import express, { Express, Router } from 'express'
import { Server as SocketIO } from 'socket.io'
import * as HelloController from './hello'
import * as ChatController from './chat'
import * as AuthController from './auth'

export default function api(app: Express, io: SocketIO): void {
  const router: Router = express.Router()

  // Hello
  router.get('/v1', HelloController.hello)
  router.get('/v1/login', AuthController.authLogin)
  router.get('/v1/connection-info', (req, res, next) =>
    ChatController.chatConnection(req, res, next, io),
  )

  app.use('/api', router)
}
