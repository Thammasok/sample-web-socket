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

export function NavChatGroup() {
  const lists = [
    {
      id: '123',
      name: 'Close Friends',
    },
    {
      id: '124',
      name: 'Travel Gang',
    },
    {
      id: '125',
      name: 'Japan Trip',
    },
  ]

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>Groups</SidebarGroupLabel>
      <SidebarMenu className='max-h-[200px] overflow-y-auto'>
        {lists.map((list) => (
          <SidebarMenuItem key={list.name}>
            <SidebarMenuButton asChild>
              <a href={`/group/${list.id}`}>
                <Avvvatars style='shape' value={list.name} size={24} />
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
