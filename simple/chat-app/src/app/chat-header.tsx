interface ChatHeaderProps {
  isConnected: boolean
  username: string
}

const ChatHeader = ({ isConnected, username }: ChatHeaderProps) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 mb-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Global Chat</h1>
        <div className='flex items-center space-x-4'>
          <span
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
          <span className='text-gray-600'>Welcome, {username}!</span>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
