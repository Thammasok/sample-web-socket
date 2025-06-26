import { useEffect } from 'react'
import useUserStore from '@/store/user-store'

interface IAuthGuardProps {
  ignoreAuth?: string[]
  children: React.ReactNode
}
const AuthGuard = ({ ignoreAuth = [], children }: Readonly<IAuthGuardProps>) => {
  const { user } = useUserStore()

  useEffect(() => {
    if (ignoreAuth.includes(window.location.pathname)) {
      console.log('User is not logged in, redirecting to /')
      // if (user) {
      //   console.log('User is logged in, redirecting to /app')
      //   // window.location.href = '/app'
      // }
    }
  }, [user])

  return children
}

export default AuthGuard
