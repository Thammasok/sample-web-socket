import type { MessageData } from '@/app/chat-app'

interface MessageBobyProps {
  messages: MessageData[]
  username: string
  typing: string
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

const MessageBoby = ({ messages, username, typing, messagesEndRef }: MessageBobyProps) => {
  return (
    <div className='h-96 overflow-y-auto p-4 bg-gray-50'>
      {messages.length === 0 ? (
        <div className='text-center text-gray-500 mt-8'>
          No messages yet. Start the conversation!
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id ?? `${message.user}-${message.timestamp}`}
            className={`mb-4 ${message.user === username ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg transition-all ${
                message.user === username
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-300'
              }`}
            >
              <div className='text-sm font-semibold mb-1'>
                {message.user === username ? 'You' : message.user}
              </div>
              <div className='break-words'>{message.text}</div>
              <div
                className={`text-xs mt-1 ${
                  message.user === username ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Typing indicator */}
      {typing && <div className='text-gray-500 italic text-sm mb-2 animate-pulse'>{typing}</div>}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageBoby
