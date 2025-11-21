import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import userService from '../services/userService'
import BackAndLogout from '../components/BackAndLogout'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  // Set role based on URL parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const roleParam = searchParams.get('role')
    if (roleParam === 'alumni' || roleParam === 'student') {
      setFormData(prev => ({ ...prev, role: roleParam }))
    }
  }, [location])

  const { email, password, role } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  const toggleRole = () => {
    setFormData(prev => ({ 
      ...prev, 
      role: prev.role === 'student' ? 'alumni' : 'student' 
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }
    
    try {
      // Call actual login API
      const response = await userService.login({ email, password })
      
      // Login with actual user data from backend
      login(response.user, response.user.role)
      
      // Redirect to appropriate dashboard
      if (response.user.role === 'student') {
        navigate('/linkedin-dashboard') // Redirect to community page for students
      } else {
        navigate('/alumni-linkedin-dashboard') // Redirect to community page for alumni
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <BackAndLogout showLogout={false} />
      <h2 className="form-title">Login to Your Account</h2>
      
      <div className="role-toggle text-center mb-3">
        <p>Logging in as: <strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong></p>
        <button type="button" className="btn btn-outline" onClick={toggleRole}>
          Switch to {role === 'student' ? 'Alumni' : 'Student'}
        </button>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="Enter your password"
          />
        </div>
        
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? <span className="spinner"></span> : 'Login'}
        </button>
      </form>
      
      <div className="mt-3 text-center">
        <p>
          Don't have an account? <Link to={`/register?role=${role}`}>Register here</Link>
        </p>
        <p className="mt-2">
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  )
}

export default Login