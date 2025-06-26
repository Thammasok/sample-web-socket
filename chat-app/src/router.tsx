import AppLayout from '@/components/layout/app-layour'
import FullLayout from '@/components/layout/full-layout'
import HomePage from '@/app/home/page'
import LoginPage from '@/app/login/page'
import RegisterPage from '@/app/register/page'
import AppChatPage from '@/app/app/overview/page'
import NotFoundPage from '@/app/404/page'
import GlobalChatPage from '@/app/app/global/page'

export const routers = [
  {
    path: '/app',
    layout: AppLayout,
    element: <AppChatPage />,
  },
  {
    path: '/global',
    layout: AppLayout,
    element: <GlobalChatPage />,
  },
  {
    path: '/',
    layout: FullLayout,
    element: <HomePage />,
  },
  {
    path: '/login',
    layout: FullLayout,
    element: <LoginPage />,
  },
  {
    path: '/register',
    layout: FullLayout,
    element: <RegisterPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
