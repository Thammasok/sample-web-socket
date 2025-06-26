import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset } from '@/components/ui/sidebar'

export default function AppChatPage() {
  return (
    <SidebarInset>
      <SiteHeader title='Global Chat' />
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <SectionCards />
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
