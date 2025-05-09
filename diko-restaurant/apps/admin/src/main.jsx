import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppStateProvider, AuthProvider } from '@repo/utils'
import { NotificationProvider } from '@repo/ui'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppStateProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </AppStateProvider>
    </AuthProvider>
  </StrictMode>,
)
