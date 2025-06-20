import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/app/home/page'
import LoginPage from '@/app/login/page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])
