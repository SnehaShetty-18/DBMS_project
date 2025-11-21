import React from 'react'

const InternshipDashboard = ({ internships, applications, role }) => {
  const openInternships = internships.filter(internship => {
    const deadline = new Date(internship.application_deadline)
    return deadline > new Date()
  })
  
  const pendingApplications = applications.filter(app => app.status === 'pending')
  const acceptedApplications = applications.filter(app => app.status === 'accepted')

  return (
    <div className="grid">
      {role === 'alumni' ? (
        <>
          <div className="stat-card">
            <h3>My Internships</h3>
            <p>{internships.length}</p>
          </div>
          <div className="stat-card">
            <h3>Open Positions</h3>
            <p>{openInternships.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Applications</h3>
            <p>{applications.length}</p>
          </div>
        </>
      ) : (
        <>
          <div className="stat-card">
            <h3>My Applications</h3>
            <p>{applications.length}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p>{pendingApplications.length}</p>
          </div>
          <div className="stat-card">
            <h3>Accepted</h3>
            <p>{acceptedApplications.length}</p>
          </div>
          <div className="stat-card">
            <h3>Open Internships</h3>
            <p>{openInternships.length}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default InternshipDashboard