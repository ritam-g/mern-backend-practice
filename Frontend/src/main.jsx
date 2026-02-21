import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {RouterProvider} from 'react-router-dom'
import AuthProvider from './features/auth/context/AuthContext.jsx'
import { router } from './App.Route.jsx'
import './index.css'
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>


)
