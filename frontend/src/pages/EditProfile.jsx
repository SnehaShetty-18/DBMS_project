import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import userService from '../services/userService'
import BackAndLogout from '../components/BackAndLogout'

const EditProfile = () => {
  const { user, role } = useAuth()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    date_of_birth: '',
    // Student specific fields
    student_number: '',
    major: '',
    year_of_study: '',
    graduation_year: '',
    university: '',
    linkedin_profile: '',
    // Alumni specific fields
    company: '',
    position: '',
    industry: '',
    years_of_experience: '',
    is_available_for_mentorship: false
  })
  
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await userService.getProfile()
        
        setFormData({
          first_name: profileData.user.first_name || '',
          last_name: profileData.user.last_name || '',
          phone: profileData.user.phone || '',
          date_of_birth: profileData.user.date_of_birth || '',
          // Student specific fields
          student_number: profileData.profile?.student_number || '',
          major: profileData.profile?.major || '',
          year_of_study: profileData.profile?.year_of_study || '',
          graduation_year: profileData.profile?.graduation_year || '',
          university: profileData.profile?.university || '',
          linkedin_profile: profileData.profile?.linkedin_profile || '',
          // Alumni specific fields
          company: profileData.profile?.company || '',
          position: profileData.profile?.position || '',
          industry: profileData.profile?.industry || '',
          years_of_experience: profileData.profile?.years_of_experience || '',
          is_available_for_mentorship: profileData.profile?.is_available_for_mentorship || false
        })
      } catch (err) {
        setError('Failed to load profile data')
        console.error('Error fetching profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)
    setError('')
    setSuccess('')
    
    try {
      // Prepare data for update
      const updateData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        date_of_birth: formData.date_of_birth,
        // Include role-specific fields
        ...(role === 'student' ? {
          student_number: formData.student_number,
          major: formData.major,
          year_of_study: formData.year_of_study,
          graduation_year: formData.graduation_year,
          university: formData.university,
          linkedin_profile: formData.linkedin_profile
        } : {
          company: formData.company,
          position: formData.position,
          industry: formData.industry,
          graduation_year: formData.graduation_year,
          university: formData.university,
          years_of_experience: formData.years_of_experience,
          linkedin_profile: formData.linkedin_profile,
          is_available_for_mentorship: formData.is_available_for_mentorship
        })
      }
      
      await userService.updateProfile(updateData)
      setSuccess('Profile updated successfully!')
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
      console.error('Error updating profile:', err)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <BackAndLogout />
        <h1 className="page-title">Edit Profile</h1>
        <div className="flex-center">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <BackAndLogout />
      <h1 className="page-title">Edit Profile</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date_of_birth">Date of Birth</label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={onChange}
            />
          </div>
          
          {role === 'student' ? (
            <>
              <div className="form-group">
                <label htmlFor="student_number">Student Number</label>
                <input
                  type="text"
                  id="student_number"
                  name="student_number"
                  value={formData.student_number}
                  onChange={onChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="major">Major</label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={onChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="university">University</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={onChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="year_of_study">Year of Study</label>
                <select
                  id="year_of_study"
                  name="year_of_study"
                  value={formData.year_of_study}
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
                  value={formData.graduation_year}
                  onChange={onChange}
                  min="2020"
                  max="2030"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="linkedin_profile">LinkedIn Profile</label>
                <input
                  type="url"
                  id="linkedin_profile"
                  name="linkedin_profile"
                  value={formData.linkedin_profile}
                  onChange={onChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={onChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={onChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="industry">Industry</label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={onChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="university">University</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={onChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="graduation_year">Graduation Year</label>
                <input
                  type="number"
                  id="graduation_year"
                  name="graduation_year"
                  value={formData.graduation_year}
                  onChange={onChange}
                  min="1980"
                  max="2025"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="years_of_experience">Years of Experience</label>
                <input
                  type="number"
                  id="years_of_experience"
                  name="years_of_experience"
                  value={formData.years_of_experience}
                  onChange={onChange}
                  min="0"
                  max="50"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="linkedin_profile">LinkedIn Profile</label>
                <input
                  type="url"
                  id="linkedin_profile"
                  name="linkedin_profile"
                  value={formData.linkedin_profile}
                  onChange={onChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="is_available_for_mentorship">
                  <input
                    type="checkbox"
                    id="is_available_for_mentorship"
                    name="is_available_for_mentorship"
                    checked={formData.is_available_for_mentorship}
                    onChange={onChange}
                  /> Available for Mentorship
                </label>
              </div>
            </>
          )}
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={updating}
            >
              {updating ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile