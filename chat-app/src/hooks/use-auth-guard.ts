import { useEffect } from 'react'

const useAuthGuard = () => {
  useEffect(() => {
    const link = ['/login', '/register', '/']

    if (link.includes(window.location.pathname)) {
      const user = localStorage.getItem('user')

      if (user) {
        window.location.href = '/app'
      }
    }
  }, [])
}

export default useAuthGuard
