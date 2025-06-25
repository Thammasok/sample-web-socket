import { useState } from 'react'
import { IconDoorExit } from '@tabler/icons-react'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import ChatInput from '@/components/chat-input'
import ChatContent from './chat-content'
import MemberList from './member-list'
import JoinRoomContent from './join-room-content'

export default function GlobalChatPage() {
  const [joinChat, setJoinChat] = useState(false)

  const onClickJoinChat = (join: boolean) => {
    setJoinChat(join)
  }

  return (
    <>
      <SiteHeader
        title='Global'
        rigthContent={
          <Button variant='ghost' className='cursor-pointer' onClick={() => onClickJoinChat(false)}>
            Leave room
            <IconDoorExit />
          </Button>
        }
      />
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          {/* Walcome message and join chat button */}
          <JoinRoomContent join={joinChat} onClick={() => onClickJoinChat(true)} />

          {/* Chat */}
          <div className={joinChat ? 'flex flex-1 flex-col gap-2' : 'hidden'}>
            <ResizablePanelGroup direction='horizontal'>
              <MemberList />
              <ResizableHandle withHandle />
              <ResizablePanel>
                <ResizablePanelGroup direction='vertical'>
                  <ChatContent />
                  <ResizableHandle />
                  <ChatInput />
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </>
  )
}
