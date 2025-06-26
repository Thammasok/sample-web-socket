import Avvvatars from 'avvvatars-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ResizablePanel } from '@/components/ui/resizable'

const MemberList = () => {
  return (
    <ResizablePanel minSize={6} maxSize={25}>
      <div className='flex flex-col gap-2 h-full'>
        <div className='flex items-center justify-between p-2 border-b'>
          <div className='font-medium text-xs text-gray-400 text-center'>Members (15)</div>
        </div>
        <ScrollArea className='h-[calc(100vh-120px)]'>
          <ul className='flex flex-col gap-2 px-2'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
              <li
                key={item}
                className='flex flex-row w-full items-center justify-start gap-3 p-2 rounded cursor-pointer hover:bg-gray-100'
              >
                <Avvvatars style='character' value='John Doe' size={32} />
                <span className='truncate text-sm max-w-48'>John Doe</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </ResizablePanel>
  )
}

export default MemberList
