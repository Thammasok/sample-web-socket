import AuthGuard from '@/guard/auth-guard'

interface IFullLayoutProps {
  children: React.ReactNode
}

export default function FullLayout({ children }: Readonly<IFullLayoutProps>) {
  return <AuthGuard ignoreAuth={['/', '/login', '/register']}>{children}</AuthGuard>
}
