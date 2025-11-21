import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SimpleNavbar = () => {
  const location = useLocation()
  const { user, role } = useAuth()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">Alumni Network</Link>
        </div>
        <div className="navbar-links">
          {!user ? (
            <>
              <Link to="/login" className={isActive('/login') ? 'active' : ''}>Login</Link>
              <Link to="/register" className={isActive('/register') ? 'active' : ''}>Sign Up</Link>
              <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>Profile</Link>
              <Link to="/internships" className={isActive('/internships') ? 'active' : ''}>Internships</Link>
              <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default SimpleNavbar