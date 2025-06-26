import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface MessageInputProps {
  sendMessage: (event: React.FormEvent<HTMLFormElement>) => void
  newMessage: string
  handleTyping: (event: React.ChangeEvent<HTMLInputElement>) => void
  isConnected: boolean
}

const MessageInput = ({
  sendMessage,
  newMessage,
  handleTyping,
  isConnected,
}: MessageInputProps) => {
  return (
    <form onSubmit={sendMessage} className='flex space-x-2'>
      <Input
        type='text'
        value={newMessage}
        onChange={handleTyping}
        placeholder='Type your message...'
        className='flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
        disabled={!isConnected}
        maxLength={500}
      />
      <Button
        type='submit'
        disabled={!newMessage.trim() || !isConnected}
        className='cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
      >
        Send
      </Button>
    </form>
  )
}

export default MessageInput
