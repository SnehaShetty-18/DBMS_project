import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import userService from '../services/userService'
import BackAndLogout from '../components/BackAndLogout'

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'student',
    student_number: '',
    major: '',
    year_of_study: '',
    graduation_year: '',
    university: '',
    company: '',
    position: '',
    industry: '',
    years_of_experience: '',
    is_available_for_mentorship: false
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

  const { 
    first_name, 
    last_name, 
    email, 
    password, 
    role,
    student_number,
    major,
    year_of_study,
    graduation_year,
    university,
    company,
    position,
    industry,
    years_of_experience,
    is_available_for_mentorship
  } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  const onCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked })
  }

  const toggleRole = () => {
    setFormData(prev => ({ 
      ...prev, 
      role: prev.role === 'student' ? 'alumni' : 'student',
      // Reset role-specific fields when switching
      student_number: '',
      major: '',
      year_of_study: '',
      graduation_year: '',
      university: '',
      company: '',
      position: '',
      industry: '',
      years_of_experience: '',
      is_available_for_mentorship: false
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Basic validation
    if (!first_name || !last_name || !email || !password) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }
    
    if (role === 'student' && !student_number) {
      setError('Student number is required for students')
      setLoading(false)
      return
    }
    
    if (role === 'alumni' && !company) {
      setError('Company is required for alumni')
      setLoading(false)
      return
    }
    
    try {
      // Prepare registration data
      const registrationData = {
        first_name,
        last_name,
        email,
        password,
        role,
        ...(role === 'student' ? {
          student_number,
          major,
          year_of_study,
          graduation_year,
          university
        } : {
          company,
          position,
          industry,
          graduation_year,
          university,
          years_of_experience,
          is_available_for_mentorship
        })
      }
      
      // Call actual registration API
      const response = await userService.register(registrationData)
      
      // Login with actual user data from backend
      login(response.user, response.user.role)
      
      // Redirect to appropriate dashboard
      if (response.user.role === 'student') {
        navigate('/linkedin-dashboard') // Redirect to community page for students
      } else {
        navigate('/alumni-linkedin-dashboard') // Redirect to community page for alumni
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <BackAndLogout showLogout={false} />
      <h2 className="form-title">Create Your Account</h2>
      
      <div className="role-toggle text-center mb-3">
        <p>Registering as: <strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong></p>
        <button type="button" className="btn btn-outline" onClick={toggleRole}>
          Switch to {role === 'student' ? 'Alumni' : 'Student'}
        </button>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name *</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={first_name}
            onChange={onChange}
            required
            placeholder="Enter your first name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name *</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={last_name}
            onChange={onChange}
            required
            placeholder="Enter your last name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
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
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="Create a password"
          />
        </div>
        
        {role === 'student' ? (
          <>
            <div className="form-group">
              <label htmlFor="student_number">Student Number *</label>
              <input
                type="text"
                id="student_number"
                name="student_number"
                value={student_number}
                onChange={onChange}
                required
                placeholder="Enter your student number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="major">Major</label>
              <input
                type="text"
                id="major"
                name="major"
                value={major}
                onChange={onChange}
                placeholder="Enter your major"
              />
            </div>
            <div className="form-group">
              <label htmlFor="university">University</label>
              <input
                type="text"
                id="university"
                name="university"
                value={university}
                onChange={onChange}
                placeholder="Enter your university"
              />
            </div>
            <div className="form-group">
              <label htmlFor="year_of_study">Year of Study</label>
              <select
                id="year_of_study"
                name="year_of_study"
                value={year_of_study}
                onChange={onChange}
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year+</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="graduation_year">Graduation Year</label>
              <input
                type="number"
                id="graduation_year"
                name="graduation_year"
                value={graduation_year}
                onChange={onChange}
                min="2020"
                max="2030"
                placeholder="Enter your graduation year"
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="company">Company *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={company}
                onChange={onChange}
                required
                placeholder="Enter your company name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={position}
                onChange={onChange}
                placeholder="Enter your position"
              />
            </div>
            <div className="form-group">
              <label htmlFor="industry">Industry</label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={industry}
                onChange={onChange}
                placeholder="Enter your industry"
              />
            </div>
            <div className="form-group">
              <label htmlFor="university">University</label>
              <input
                type="text"
                id="university"
                name="university"
                value={university}
                onChange={onChange}
                placeholder="Enter your university"
              />
            </div>
            <div className="form-group">
              <label htmlFor="graduation_year">Graduation Year</label>
              <input
                type="number"
                id="graduation_year"
                name="graduation_year"
                value={graduation_year}
                onChange={onChange}
                min="1980"
                max="2025"
                placeholder="Enter your graduation year"
              />
            </div>
            <div className="form-group">
              <label htmlFor="years_of_experience">Years of Experience</label>
              <input
                type="number"
                id="years_of_experience"
                name="years_of_experience"
                value={years_of_experience}
                onChange={onChange}
                min="0"
                max="50"
                placeholder="Enter your years of experience"
              />
            </div>
            <div className="form-group">
              <label htmlFor="is_available_for_mentorship">
                <input
                  type="checkbox"
                  id="is_available_for_mentorship"
                  name="is_available_for_mentorship"
                  checked={is_available_for_mentorship}
                  onChange={onCheckboxChange}
                /> Available for Mentorship
              </label>
            </div>
          </>
        )}
        
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? <span className="spinner"></span> : 'Register'}
        </button>
      </form>
      
      <div className="mt-3 text-center">
        <p>
          Already have an account? <Link to={`/login?role=${role}`}>Login here</Link>
        </p>
        <p className="mt-2">
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  )
}

export default Register