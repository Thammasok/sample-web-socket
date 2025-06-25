import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface IAccountDocument {
  id: string
  displayName: string
  email: string
}

const useAuthHook = () => {
  const [user, setUser] = useState<IAccountDocument | null>(null)

  const logout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  useEffect(() => {
    const user = localStorage.getItem('user')

    if (!user) {
      toast.error('Please login to continue')
      window.location.href = '/login'
    }

    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  return {
    user,
    logout,
  }
}

export default useAuthHook
