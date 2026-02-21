import {createBrowserRouter} from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/register'

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Login/>
    },
    {
        path:'/regiester',
        element:<Register/>
    }
])