import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext'
import { VisitorContextProvider } from './context/VisitorContext.jsx'
import { AppointmentContextProvider } from './context/AppointmentContext.jsx'
import { PassContextProvider } from './context/PassContext.jsx'
import { CheckInContextProvider } from './context/CheckInContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <VisitorContextProvider>
        <AppointmentContextProvider>
          <PassContextProvider>
            <CheckInContextProvider>
              <App />
            </CheckInContextProvider>
          </PassContextProvider>
        </AppointmentContextProvider>
      </VisitorContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
