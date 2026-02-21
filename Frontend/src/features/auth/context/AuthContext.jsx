import React, { createContext, useState } from 'react'
export const context= createContext()
function AuthProvider({children}) {
  const [user, setuser] = useState(null)
  const [loading, setloading] = useState(false)
  return (
    <context.Provider  value={{user,setuser,loading,setloading}}>
      {children}
    </context.Provider>
  )
}

export default AuthProvider
