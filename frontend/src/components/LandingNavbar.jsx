import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const LandingNavbar = () => {
  const location = useLocation()

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
          <Link to="/login" className={isActive('/login') ? 'active' : ''}>Login</Link>
          <Link to="/register" className={isActive('/register') ? 'active' : ''}>Sign Up</Link>
          <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
        </div>
      </div>
    </nav>
  )
}

export default LandingNavbar