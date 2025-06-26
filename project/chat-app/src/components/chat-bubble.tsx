import Avvvatars from 'avvvatars-react'

interface IChatBubbleProps {
  message: string
  sender: string
  timestamp: string
  isSender?: boolean
}

const ChatBubble = ({ message, sender, timestamp, isSender }: IChatBubbleProps) => {
  return isSender ? (
    <div className='flex items-start justify-end gap-2.5'>
      <div className='flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-ee-xl dark:bg-gray-700'>
        <div className='flex items-center space-x-2 rtl:space-x-reverse justify-end'>
          <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>{timestamp}</span>
          <span className='text-sm font-semibold text-gray-900 dark:text-white'>{sender}</span>
        </div>
        <p className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>{message}</p>
      </div>
    </div>
  ) : (
    <div className='flex items-start gap-2.5'>
      {!isSender && <Avvvatars style='character' value={sender} size={32} />}

      <div className='flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
        <div className='flex items-center space-x-2 rtl:space-x-reverse'>
          <span className='text-sm font-semibold text-gray-900 dark:text-white'>{sender}</span>
          <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>{timestamp}</span>
        </div>
        <p className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>{message}</p>
      </div>
    </div>
  )
}

export default ChatBubble
