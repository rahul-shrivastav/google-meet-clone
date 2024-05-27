import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from '../context/SocketContext.tsx'
import { UserProvider } from '../context/UserContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <UserProvider>
          <App />
        </UserProvider>


      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
