import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AdminLayout } from '@repo/ui'
import { useAuth } from '@repo/utils'

// Pages
import Dashboard from './pages/Dashboard'
import Menu from './pages/Menu'
import Orders from './pages/Orders'
import Employees from './pages/Employees'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  
  return children
}

// Auth Route Component
function AuthRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (user) return <Navigate to="/" replace />
  
  return children
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'menu',
        element: <Menu />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'employees',
        element: <Employees />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthRoute>
        <Register />
      </AuthRoute>
    ),
  },
])
