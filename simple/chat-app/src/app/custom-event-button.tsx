import { Button } from '@/components/ui/button'

interface CustomEventButtonProps {
  newMessage: string
  isConnected: boolean
  sendCustomEvent: () => void
}

const CustomEventButton = ({
  newMessage,
  sendCustomEvent,
  isConnected,
}: CustomEventButtonProps) => {
  return (
    <div className='mt-2 flex justify-between items-center'>
      <Button
        onClick={sendCustomEvent}
        disabled={!isConnected}
        className='cursor-pointer bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm transition-colors'
      >
        Send Custom Event
      </Button>

      <div className='text-xs text-gray-500'>{newMessage.length}/500 characters</div>
    </div>
  )
}

export default CustomEventButton
