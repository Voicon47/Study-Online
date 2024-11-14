import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { LoadingProvider } from './context/loadingContext.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { ThemeProvider } from './context/themeContext.tsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <AuthProvider>
        <ThemeProvider>
          <LoadingProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
          </LoadingProvider>
        </ThemeProvider>
      </AuthProvider>
    </NextUIProvider>
  </StrictMode>,
)
