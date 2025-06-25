import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/app/home/page'
import LoginPage from '@/app/login/page'
import RegisterPage from './app/register/page'
import AppChatPage from './app/app/page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/app',
    element: <AppChatPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
])
