import { IconSend2 } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { ResizablePanel } from '@/components/ui/resizable'
import { Textarea } from '@/components/ui/textarea'

const ChatInput = () => {
  return (
    <ResizablePanel maxSize={12} minSize={12}>
      <div className='flex flex-raw gap-2 h-full p-2  items-end'>
        <Textarea placeholder='Type your message here.' className='w-full h-full' />
        <Button className='h-full cursor-pointer'>
          <IconSend2 />
          Send Message
        </Button>
      </div>
    </ResizablePanel>
  )
}

export default ChatInput
