import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import useAuthGuard from '@/hooks/use-auth-guard'

interface IAppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: Readonly<IAppLayoutProps>) {
  useAuthGuard()

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant='inset' />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
