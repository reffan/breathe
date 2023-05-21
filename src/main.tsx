import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/main.scss'
import App from '@/App'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

console.info('B R E A T H E')
