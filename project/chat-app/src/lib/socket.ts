import { config } from '@/config'
import { io } from 'socket.io-client'

if (!config.globalService) {
  console.log('no service url')
}

export const socketChatGlobal = io(config.globalService, {
  path: '/chat/global',
})
