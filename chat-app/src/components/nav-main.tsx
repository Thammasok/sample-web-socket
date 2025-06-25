import {
  IconAt,
  IconBrandWechat,
  IconCirclePlusFilled,
  IconHash,
  IconHome2,
  IconUserPlus,
  type Icon,
} from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useLocation } from 'react-router-dom'

const menus = [
  {
    title: 'Overview',
    url: '/app',
    icon: IconHome2,
  },
  {
    title: 'Public',
    url: '/public',
    icon: IconBrandWechat,
  },
  {
    title: 'Mentions',
    url: '/mentions',
    icon: IconAt,
  },
  {
    title: 'Topics',
    url: '/topics',
    icon: IconHash,
  },
]

export function NavMain() {
  const location = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2'>
        <SidebarMenu>
          <SidebarMenuItem className='flex items-center gap-2'>
            <SidebarMenuButton
              tooltip='Quick Create'
              className='bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear'
            >
              <IconCirclePlusFilled />
              <span>Create Chat</span>
            </SidebarMenuButton>
            <Button
              size='icon'
              className='size-8 group-data-[collapsible=icon]:opacity-0'
              variant='outline'
            >
              <IconUserPlus />
              <span className='sr-only'>Add Firend</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {menus.map((menu) => (
            <SidebarMenuItem key={menu.title} onClick={() => (window.location.href = menu.url)}>
              <SidebarMenuButton
                tooltip={menu.title}
                isActive={location.pathname === menu.url}
                className='cursor-pointer'
              >
                {(menu.icon as Icon) && <menu.icon />}
                <span>{menu.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
