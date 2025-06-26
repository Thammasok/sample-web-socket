interface WelcomePageProps {
  joinChat: () => void
  setUsername: (username: string) => void
  error: string | null
  username: string
  isConnected: boolean
}

const ChatWelcome = ({ username, setUsername, joinChat, isConnected, error }: WelcomePageProps) => {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Join Global Chat</h2>

        {error && <div className='mb-4 p-3 bg-red-100 text-red-800 rounded-lg'>{error}</div>}

        <div className='space-y-4'>
          <input
            type='text'
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            onKeyDown={(e) => e.key === 'Enter' && joinChat()}
            maxLength={20}
          />
          <button
            onClick={joinChat}
            disabled={!username.trim() || !isConnected}
            className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
          >
            {isConnected ? 'Join Chat' : 'Connecting...'}
          </button>

          <div className='text-center'>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatWelcome
