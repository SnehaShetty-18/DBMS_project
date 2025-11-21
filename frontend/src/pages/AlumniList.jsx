import React, { useState, useEffect } from 'react'
import AlumniCard from '../components/AlumniCard'
import alumniService from '../services/alumniService'

const AlumniList = () => {
  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Fetch alumni data from API
    const fetchAlumni = async () => {
      try {
        const alumniData = await alumniService.getAllAlumni()
        setAlumni(alumniData)
      } catch (err) {
        setError('Failed to fetch alumni data')
        console.error('Error fetching alumni:', err)
        // Fallback to mock data if API fails
        const mockAlumni = [
          {
            alumni_id: 1,
            User: {
              first_name: 'John',
              last_name: 'Smith',
              email: 'john.smith@example.com'
            },
            company: 'Tech Corp',
            position: 'Senior Software Engineer',
            industry: 'Technology',
            graduation_year: 2015,
            is_available_for_mentorship: true,
            linkedin_profile: 'https://linkedin.com/in/johnsmith'
          },
          {
            alumni_id: 2,
            User: {
              first_name: 'Jane',
              last_name: 'Doe',
              email: 'jane.doe@example.com'
            },
            company: 'Innovation Inc',
            position: 'Product Manager',
            industry: 'Technology',
            graduation_year: 2015,
            is_available_for_mentorship: true,
            linkedin_profile: 'https://linkedin.com/in/janedoe'
          },
          {
            alumni_id: 3,
            User: {
              first_name: 'Robert',
              last_name: 'Johnson',
              email: 'robert.johnson@example.com'
            },
            company: 'Finance Group',
            position: 'Financial Analyst',
            industry: 'Finance',
            graduation_year: 2010,
            is_available_for_mentorship: false,
            linkedin_profile: 'https://linkedin.com/in/robertjohnson'
          },
          {
            alumni_id: 4,
            User: {
              first_name: 'Sarah',
              last_name: 'Williams',
              email: 'sarah.williams@example.com'
            },
            company: 'Health Solutions',
            position: 'Data Scientist',
            industry: 'Healthcare',
            graduation_year: 2018,
            is_available_for_mentorship: true,
            linkedin_profile: 'https://linkedin.com/in/sarahwilliams'
          }
        ]
        
        setAlumni(mockAlumni)
      } finally {
        setLoading(false)
      }
    }

    fetchAlumni()
  }, [])

  // Filter alumni based on search term and filter
  const filteredAlumni = alumni.filter(alum => {
    const matchesSearch = 
      alum.User.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.User.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.industry.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'available' && alum.is_available_for_mentorship) ||
      (filter === 'industry' && alum.industry.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Alumni Network</h1>
        <div className="flex-center">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <h1 className="page-title">Alumni Network</h1>
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="page-title">Alumni Network</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              placeholder="Search alumni by name, company, or industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
          </div>
          <div className="form-group">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Alumni</option>
              <option value="available">Available for Mentorship</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredAlumni.length === 0 ? (
        <div className="card text-center">
          <h3>No alumni found</h3>
          <p>Try adjusting your search criteria</p>
          <div className="mt-3">
            <p>Be the first to join as an alumni!</p>
            <a href="/register?role=alumni" className="btn">Register as Alumni</a>
          </div>
        </div>
      ) : (
        <div className="grid">
          {filteredAlumni.map(alum => (
            <AlumniCard key={alum.alumni_id} alumni={alum} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AlumniList