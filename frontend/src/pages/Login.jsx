import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import userService from '../services/userService'
import BackAndLogout from '../components/BackAndLogout'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { login } = useAuth()

  const { email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      const response = await userService.login({ email, password })

      login(response.user, response.user.role)

      navigate(
        response.user.role === 'student'
          ? '/linkedin-dashboard'
          : '/alumni-linkedin-dashboard'
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="form-master-container">
      <BackAndLogout showLogout={false} />

      <div className="form-card">
        <h2 className="form-title">Login to Your Account</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSubmit}>
          {/* Email */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder=" "
              value={email}
              onChange={onChange}
              required
            />
            <label className="form-label">Email Address</label>
          </div>

          {/* Password */}
          <div className="form-group" style={{ marginTop: "20px" }}>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder=" "
              value={password}
              onChange={onChange}
              required
            />
            <label className="form-label">Password</label>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: "100%", marginTop: "10px" }}
          >
            {loading ? 'Checking...' : 'Login'}
          </button>
        </form>

        <div className="mt-3 text-center">
          <p>
            Don’t have an account?{' '}
            <Link to="/register">Register here</Link>
          </p>
          <p className="mt-2">
            <Link to="/">Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
