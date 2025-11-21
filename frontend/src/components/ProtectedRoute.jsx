import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role } = useAuth()
  const location = useLocation()

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to={`/login?role=${allowedRoles[0]}`} state={{ from: location }} replace />
  }

  // If user role is not allowed, redirect to appropriate dashboard
  if (!allowedRoles.includes(role)) {
    if (role === 'student') {
      return <Navigate to="/student-dashboard" replace />
    } else if (role === 'alumni') {
      return <Navigate to="/alumni-dashboard" replace />
    } else {
      return <Navigate to="/" replace />
    }
  }

  return children
}

export default ProtectedRoute