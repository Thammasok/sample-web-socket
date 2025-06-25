import { ScrollArea } from '@/components/ui/scroll-area'
import { ResizablePanel } from '@/components/ui/resizable'
import ChatBubble from '@/components/chat-bubble'

const ChatContent = () => {
  return (
    <ResizablePanel defaultSize={80}>
      <div className='flex flex-col gap-2 h-full p-2'>
        <ScrollArea className='h-[calc(100vh-120px)]'>
          <div className='flex flex-col gap-2'>
            <ChatBubble
              message="That's awesome. I think our users will really appreciate the improvements."
              sender='John Doe'
              timestamp='11:46'
            />

            <ChatBubble message="That's cool" sender='Nutz' timestamp='11:46' isSender />
          </div>
        </ScrollArea>
      </div>
    </ResizablePanel>
  )
}

export default ChatContent
