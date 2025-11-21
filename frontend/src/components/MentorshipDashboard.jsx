import React from 'react'

const MentorshipDashboard = ({ requests, role }) => {
  const pendingRequests = requests.filter(req => req.status === 'pending')
  const activeMentorships = requests.filter(req => req.status === 'accepted')
  const completedMentorships = requests.filter(req => req.status === 'completed')

  return (
    <div className="grid">
      <div className="stat-card">
        <h3>{role === 'student' ? 'My Requests' : 'Received Requests'}</h3>
        <p>{requests.length}</p>
      </div>
      <div className="stat-card">
        <h3>Pending</h3>
        <p>{pendingRequests.length}</p>
      </div>
      <div className="stat-card">
        <h3>Active</h3>
        <p>{activeMentorships.length}</p>
      </div>
      <div className="stat-card">
        <h3>Completed</h3>
        <p>{completedMentorships.length}</p>
      </div>
    </div>
  )
}

export default MentorshipDashboard