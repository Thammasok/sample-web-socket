'use client'

import Avvvatars from 'avvvatars-react'
import { IconDots } from '@tabler/icons-react'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function NavChatFriend() {
  const lists = [
    {
      id: '123',
      name: 'John Doe',
    },
    {
      id: '124',
      name: 'Anna Smith',
    },
    {
      id: '125',
      name: 'Mary Doe',
    },
  ]

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>Friends</SidebarGroupLabel>
      <SidebarMenu>
        {lists.map((list) => (
          <SidebarMenuItem key={list.name}>
            <SidebarMenuButton asChild>
              <a href={`/chat/${list.id}`}>
                <Avvvatars value={list.name} size={24} />
                <span>{list.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className='text-sidebar-foreground/70'>
            <IconDots className='text-sidebar-foreground/70' />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
