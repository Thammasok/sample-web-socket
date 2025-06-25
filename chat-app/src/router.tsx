import HomePage from '@/app/home/page'
import LoginPage from '@/app/login/page'
import RegisterPage from './app/register/page'
import AppChatPage from './app/app/overview/page'
import NotFoundPage from './app/404/page'

import AppLayout from './components/layout/app-layour'

export const routers = [
  {
    path: '/app',
    layout: AppLayout,
    element: <AppChatPage />,
  },
  {
    path: '/global',
    layout: AppLayout,
    element: <NotFoundPage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
