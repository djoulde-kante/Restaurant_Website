import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppStateProvider, AuthProvider } from '@repo/utils'
import { NotificationProvider } from '@repo/ui'
import { Toaster } from 'react-hot-toast'
import { router } from './router'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppStateProvider>
        <NotificationProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </NotificationProvider>
      </AppStateProvider>
    </AuthProvider>
  </StrictMode>
)
