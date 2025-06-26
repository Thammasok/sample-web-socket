import { useEffect } from 'react'
import useUserStore from '@/store/user-store'
import { useLocation, useNavigate } from 'react-router'

interface IAuthGuardProps {
  ignoreAuth?: string[]
  children: React.ReactNode
}
const AuthGuard = ({ ignoreAuth = [], children }: Readonly<IAuthGuardProps>) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useUserStore()

  useEffect(() => {
    if (!user) {
      if (!ignoreAuth.includes(location.pathname)) {
        navigate('/login')
      }
    } else if (user && ignoreAuth.length > 0 && ignoreAuth.includes(location.pathname)) {
      navigate('/app')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
}

export default AuthGuard
