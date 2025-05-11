import { createBrowserRouter } from 'react-router-dom'
import ClientLayout from './components/layout/ClientLayout'

// Pages
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'menu',
        element: <Menu />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
])
