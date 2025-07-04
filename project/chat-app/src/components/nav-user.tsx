import Avvvatars from 'avvvatars-react'
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import useUserStore from '@/store/user-store'

export function NavUser() {
  const { isMobile } = useSidebar()
  const { user, logout } = useUserStore()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='h-8 w-8 rounded-lg grayscale'>
                <Avvvatars size={32} value={user?.displayName ?? 'Unknown'} />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user?.displayName}</span>
                <span className='text-muted-foreground truncate text-xs'>{user?.email}</span>
              </div>
              <IconDotsVertical className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <div className='h-8 w-8 rounded-lg'>
                  <Avvvatars size={32} value={user?.displayName ?? 'Unknown'} />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{user?.displayName}</span>
                  <span className='text-muted-foreground truncate text-xs'>{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className='cursor-pointer'>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
