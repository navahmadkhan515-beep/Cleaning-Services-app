import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: '9999px',
          background: '#0F5C56',
          color: '#fff',
          fontSize: '14px',
          padding: '10px 18px',
        },
        success: { iconTheme: { primary: '#F4A93B', secondary: '#fff' } },
      }}
    />
  </React.StrictMode>,
)
