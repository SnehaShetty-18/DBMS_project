import React, { useState, useEffect } from 'react'
import JobCard from '../components/JobCard'

const InternshipList = () => {
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Fetch internships from API
    // This is a mock implementation
    const mockInternships = [
      {
        internship_id: 1,
        title: 'Software Engineering Intern',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        description: 'Join our engineering team to work on cutting-edge web applications.',
        application_deadline: '2025-11-15T00:00:00Z'
      },
      {
        internship_id: 2,
        title: 'Data Analyst Intern',
        company: 'Data Insights Inc',
        location: 'New York, NY',
        description: 'Analyze large datasets to help businesses make data-driven decisions.',
        application_deadline: '2025-11-10T00:00:00Z'
      },
      {
        internship_id: 3,
        title: 'Marketing Intern',
        company: 'Creative Agency',
        location: 'Los Angeles, CA',
        description: 'Support our marketing team in developing and executing campaigns.',
        application_deadline: '2025-11-20T00:00:00Z'
      },
      {
        internship_id: 4,
        title: 'Finance Intern',
        company: 'Investment Partners',
        location: 'Chicago, IL',
        description: 'Assist in financial analysis and investment research.',
        application_deadline: '2025-10-30T00:00:00Z'
      }
    ]
    
    setInternships(mockInternships)
    setLoading(false)
  }, [])

  // Filter internships based on search term and filter
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'open' && new Date(internship.application_deadline) > new Date())
    
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Internship Opportunities</h1>
        <div className="flex-center">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="page-title">Internship Opportunities</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              placeholder="Search internships by title, company, or location..."
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
              <option value="all">All Internships</option>
              <option value="open">Open Applications</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredInternships.length === 0 ? (
        <div className="card text-center">
          <h3>No internships found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid">
          {filteredInternships.map(internship => (
            <JobCard key={internship.internship_id} internship={internship} />
          ))}
        </div>
      )}
    </div>
  )
}

export default InternshipList