import { BrowserRouter, Route, Routes } from 'react-router'
import { routers } from '@/router'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routers.map((route) =>
          route.layout ? (
            <Route
              key={route.path}
              path={route.path}
              element={<route.layout>{route.element}</route.layout>}
            />
          ) : (
            <Route key={route.path} path={route.path} element={route.element} />
          ),
        )}
      </Routes>

      <Toaster />
    </BrowserRouter>
  )
}

export default App
