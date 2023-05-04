import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/main.scss'
import App from '@/App'

import { AppContextProvider } from '@/AppContext'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
)

console.info('B R E A T H E')
