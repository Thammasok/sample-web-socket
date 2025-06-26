'use client'

import { useEffect, useState } from 'react'
import { IconDoorExit } from '@tabler/icons-react'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import ChatInput from '@/components/chat-input'
import ChatContent from './chat-content'
import MemberList from './member-list'
import JoinRoomContent from './join-room-content'
import { socketChatGlobal } from '@/lib/socket'

export default function GlobalChatPage() {
  const [joinChat, setJoinChat] = useState(false)

  const joinChatRoom = () => {
    socketChatGlobal.on('connection', () => {
      console.log('connected to server')
    })
  }

  const leaveRoom = () => {
    setJoinChat(false)
    socketChatGlobal.on('disconnect', () => {
      console.log(socketChatGlobal.id) // undefined
    })
  }

  const handleClick = () => {
    console.log('pass')
    socketChatGlobal.emit('message', {
      senderId: '123',
      message: 'Hello',
      time: new Date(),
    })
  }

  useEffect(() => {
    socketChatGlobal.on('connection', () => {
      console.log('connected to server')
    })
    //   socketChatGlobal.on('welcome', (data) => {
    //     console.log(data)
    //     setJoinChat(true)
    //   })
  }, [])

  return (
    <>
      <SiteHeader
        title='Global'
        rigthContent={
          <Button variant='ghost' className='cursor-pointer' onClick={() => leaveRoom()}>
            Leave room
            <IconDoorExit />
          </Button>
        }
      />
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          {/* Walcome message and join chat button */}
          <JoinRoomContent join={joinChat} onClick={() => joinChatRoom()} />

          {/* Chat */}
          <div className={joinChat ? 'flex flex-1 flex-col gap-2' : 'hidden'}>
            <ResizablePanelGroup direction='horizontal'>
              <MemberList />
              <ResizableHandle withHandle />
              <ResizablePanel>
                <ResizablePanelGroup direction='vertical'>
                  <ChatContent />
                  <ResizableHandle />
                  <ChatInput onSend={handleClick} />
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </>
  )
}
