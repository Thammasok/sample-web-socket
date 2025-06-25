import Avvvatars from 'avvvatars-react'
import { useState } from 'react'
import { IconDoorEnter, IconDoorExit, IconSend2 } from '@tabler/icons-react'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

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
            <IconDoorExit />
            Leave room
          </Button>
        }
      />
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          {/* Walcome message and join chat button */}
          <div className={joinChat ? 'hidden' : 'flex flex-1 flex-col gap-2'}>
            <div className='h-full flex flex-col items-center justify-center'>
              <div className='flex flex-col items-center gap-2 justify-between p-2'>
                <img src='/global-chat.png' alt='Global Chat Icon' className='w-36 h-36' />
                <div className='font-bold text-4xl'>Walcome to Glabol room</div>
                <p className='text-gray-400'>Please join the chat room to start chatting.</p>
                <Button
                  variant='default'
                  className='cursor-pointer'
                  onClick={() => onClickJoinChat(true)}
                >
                  <IconDoorEnter />
                  Join Chat
                </Button>
              </div>
            </div>
          </div>
          {/* Chat */}
          <div className={joinChat ? 'flex flex-1 flex-col gap-2' : 'hidden'}>
            <ResizablePanelGroup direction='horizontal'>
              <ResizablePanel minSize={6} maxSize={25}>
                <div className='flex flex-col gap-2 h-full'>
                  <div className='flex items-center justify-between p-2 border-b'>
                    <div className='font-medium text-xs text-gray-400'>Members</div>
                  </div>
                  <ScrollArea className='h-[calc(100vh-120px)]'>
                    <ul className='flex flex-col gap-2 px-2'>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
                        <li
                          key={item}
                          className='flex flex-row w-full items-center justify-start gap-3 p-2 rounded cursor-pointer hover:bg-gray-100'
                        >
                          <Avvvatars style='character' value='John Doe' size={40} />
                          <span className='truncate  max-w-48'>John Doe</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel>
                <ResizablePanelGroup direction='vertical'>
                  <ResizablePanel defaultSize={80}>
                    <div className='flex flex-col gap-2 h-full p-2'>
                      <ScrollArea className='h-[calc(100vh-120px)]'>
                        <div className='flex flex-col gap-2'>
                          <div className='flex items-start gap-2.5'>
                            <Avvvatars style='character' value='John Doe' />
                            <div className='flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
                              <div className='flex items-center space-x-2 rtl:space-x-reverse'>
                                <span className='text-sm font-semibold text-gray-900 dark:text-white'>
                                  Bonnie Green
                                </span>
                                <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                                  11:46
                                </span>
                              </div>
                              <p className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>
                                That's awesome. I think our users will really appreciate the
                                improvements.
                              </p>
                            </div>
                          </div>

                          <div className='flex items-start justify-end gap-2.5'>
                            <div className='flex flex-col w-full max-w-[320px] leading-1.5 px-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-ee-xl dark:bg-gray-700'>
                              <p className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>
                                That's awesome. I think our users will really appreciate the
                                improvements.
                              </p>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel maxSize={12} minSize={12}>
                    <div className='flex flex-raw gap-2 h-full px-2 pt-2 items-end'>
                      <Textarea placeholder='Type your message here.' className='w-full h-full' />
                      <Button className='h-full cursor-pointer'>
                        <IconSend2 />
                        Send Message
                      </Button>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </>
  )
}
