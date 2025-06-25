import { useEffect } from 'react'

const useAuthGuard = () => {
  useEffect(() => {
    console.log(window.location.pathname)

    if (window.location.pathname === '/login' || window.location.pathname === '/register') {
      const user = localStorage.getItem('user')

      if (user) {
        window.location.href = '/'
      }
    }
  }, [])
}

export default useAuthGuard
