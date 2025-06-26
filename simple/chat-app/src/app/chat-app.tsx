import React, { useState, useEffect, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import MessageInput from '@/app/message-input'
import CustomEventButton from '@/app/custom-event-button'
import MessageBoby from '@/app/message-boby'
import Notifications from '@/app/notifications'
import ErrorMessages from '@/app/error-messages'
import ChatHeader from '@/app/chat-header'
import WelcomeContent from '@/app/chat-welcome'

// Type definitions matching server
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

// Data interfaces
export interface MessageData {
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

export interface Notification {
  id: number
  type: 'join' | 'leave' | 'custom' | 'error'
  message: string
}

// Socket type
type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>

const ChatApp: React.FC = () => {
  // State with proper typing
  const [socket, setSocket] = useState<ClientSocket | null>(null)
  const [messages, setMessages] = useState<MessageData[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [typing, setTyping] = useState<string>('')
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [error, setError] = useState<string>('')

  // Refs with proper typing
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Helper function to add notifications
  const addNotification = useCallback((type: Notification['type'], message: string) => {
    const notification: Notification = {
      id: Date.now(),
      type,
      message,
    }
    setNotifications((prev) => [...prev, notification])
  }, [])

  // Initialize socket connection
  useEffect(() => {
    const newSocket: ClientSocket = io('http://localhost:3100', {
      transports: ['websocket'],
      timeout: 20000,
    })

    setSocket(newSocket)

    // Connection event listeners
    newSocket.on('connect', () => {
      setIsConnected(true)
      setError('')
      console.log('Connected to server')
    })

    newSocket.on('disconnect', (reason: string) => {
      setIsConnected(false)
      console.log('Disconnected from server:', reason)

      if (reason === 'io server disconnect') {
        // Server disconnected, reconnect manually
        newSocket.connect()
      }
    })

    newSocket.on('connect_error', (error: Error) => {
      setError(`Connection failed: ${error.message}`)
      console.error('Connection error:', error)
    })

    // Message event listeners
    newSocket.on('messageResponse', (message: MessageData) => {
      setMessages((prev) => [...prev, message])
    })

    // Typing indicators
    newSocket.on('userTyping', (data: TypingData) => {
      setTyping(`${data.username} is typing...`)
    })

    newSocket.on('userStoppedTyping', () => {
      setTyping('')
    })

    // User join/leave notifications
    newSocket.on('userJoined', (message: string) => {
      addNotification('join', message)
    })

    newSocket.on('userLeft', (message: string) => {
      addNotification('leave', message)
    })

    // Custom event listener
    newSocket.on('customResponse', (data: CustomEventResponse) => {
      console.log('Custom response:', data)
      addNotification('custom', data.message)
    })

    // Error handling
    newSocket.on('error', (message: string) => {
      setError(message)
      addNotification('error', message)
    })

    return () => {
      newSocket.close()
    }
  }, [addNotification])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Clear notifications after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notifications])

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const joinChat = useCallback(() => {
    const trimmedUsername = username.trim()
    if (trimmedUsername && socket) {
      socket.emit('join', trimmedUsername)
    }
  }, [username, socket])

  const sendMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const trimmedMessage = newMessage.trim()
      if (trimmedMessage && socket && username) {
        const messageData: MessageData = {
          text: trimmedMessage,
          user: username,
          timestamp: new Date().toISOString(),
        }

        socket.emit('message', messageData)
        setNewMessage('')

        // Stop typing indicator
        socket.emit('stopTyping')
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current)
        }
      }
    },
    [newMessage, socket, username],
  )

  const handleTyping = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewMessage(e.target.value)

      if (socket && username) {
        socket.emit('typing', { username })

        // Clear previous timeout
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current)
        }

        // Set new timeout to stop typing indicator
        typingTimeoutRef.current = setTimeout(() => {
          socket.emit('stopTyping')
        }, 1000)
      }
    },
    [socket, username],
  )

  const sendCustomEvent = useCallback(() => {
    if (socket && username) {
      const customData: CustomEventData = {
        message: 'This is a custom TypeScript event!',
        user: username,
        timestamp: Date.now(),
      }
      socket.emit('customEvent', customData)
    }
  }, [socket, username])

  // Username input screen
  if (!username) {
    return (
      <WelcomeContent
        username={username}
        isConnected={isConnected}
        joinChat={joinChat}
        setUsername={setUsername}
        error={error}
      />
    )
  }

  // Main chat interface
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto p-4 max-w-4xl'>
        {/* Header */}
        <ChatHeader isConnected={isConnected} username={username} />

        {/* Error Messages */}
        <ErrorMessages error={error} />

        {/* Notifications */}
        <Notifications notifications={notifications} />

        {/* Chat Container */}
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          {/* Messages */}
          <MessageBoby
            messages={messages}
            username={username}
            typing={typing}
            messagesEndRef={messagesEndRef}
          />

          {/* Message Input */}
          <div className='p-4 border-t'>
            <MessageInput
              newMessage={newMessage}
              sendMessage={sendMessage}
              handleTyping={handleTyping}
              isConnected={isConnected}
            />

            {/* Custom Event Button */}
            <CustomEventButton
              newMessage={newMessage}
              isConnected={isConnected}
              sendCustomEvent={sendCustomEvent}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatApp
