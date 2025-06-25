import { Button } from '@/components/ui/button'
import { IconDoorEnter } from '@tabler/icons-react'

interface IJoinRoomContentProps {
  join: boolean
  onClick: () => void
}

const JoinRoomContent = ({ join, onClick }: IJoinRoomContentProps) => {
  return (
    <div className={join ? 'hidden' : 'flex flex-1 flex-col gap-2'}>
      <div className='h-full flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center gap-2 justify-between p-2'>
          <img src='/global-chat.png' alt='Global Chat Icon' className='w-36 h-36' />
          <div className='font-bold text-4xl'>Walcome to Glabol room</div>
          <p className='text-gray-400'>Please join the chat room to start chatting.</p>
          <Button variant='default' className='cursor-pointer' onClick={onClick}>
            <IconDoorEnter />
            Join Chat
          </Button>
        </div>
      </div>
    </div>
  )
}

export default JoinRoomContent
