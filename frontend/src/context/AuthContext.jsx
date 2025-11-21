import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [token, setToken] = useState(null)

  // Load user data from localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedRole = localStorage.getItem('role')
    const savedToken = localStorage.getItem('token')
    
    if (savedUser && savedRole && savedToken) {
      setUser(JSON.parse(savedUser))
      setRole(savedRole)
      setToken(savedToken)
    }
  }, [])

  const login = (userData, userRole, userToken = null) => {
    setUser(userData)
    setRole(userRole)
    if (userToken) {
      setToken(userToken)
      localStorage.setItem('token', userToken)
    }
    // Store in localStorage to persist across page refreshes
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('role', userRole)
  }

  const logout = () => {
    setUser(null)
    setRole(null)
    setToken(null)
    // Remove from localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('token')
  }

  const value = {
    user,
    role,
    token,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}