import React from 'react'

const AlumniCard = ({ alumni }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{alumni.User.first_name} {alumni.User.last_name}</h3>
        {alumni.is_available_for_mentorship && (
          <span className="status-badge available">Available</span>
        )}
      </div>
      <div className="card-body">
        <p><strong>Company:</strong> {alumni.company || 'Not specified'}</p>
        <p><strong>Position:</strong> {alumni.position || 'Not specified'}</p>
        <p><strong>Industry:</strong> {alumni.industry || 'Not specified'}</p>
        <p><strong>University:</strong> {alumni.university || 'Not specified'}</p>
        <p><strong>Graduation Year:</strong> {alumni.graduation_year || 'Not specified'}</p>
        {alumni.linkedin_profile && (
          <p><strong>LinkedIn:</strong> <a href={alumni.linkedin_profile} target="_blank" rel="noopener noreferrer">View Profile</a></p>
        )}
      </div>
      <div className="card-footer">
        <button className="btn">Connect</button>
        {alumni.is_available_for_mentorship && (
          <button className="btn btn-secondary">Request Mentorship</button>
        )}
      </div>
    </div>
  )
}

export default AlumniCard