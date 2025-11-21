import React from 'react'
import { Link } from 'react-router-dom'

const UserProfile = ({ user, profile }) => {
  if (!user) {
    return <div className="card text-center">No user data available</div>
  }

  return (
    <div className="card">
      <div className="text-center mb-4">
        <div className="stat-card" style={{margin: '0 auto', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <h2>{user.first_name.charAt(0)}{user.last_name.charAt(0)}</h2>
        </div>
        <h2 className="mt-2">{user.first_name} {user.last_name}</h2>
        <p>{user.email}</p>
      </div>
      
      <div className="grid">
        <div className="card">
          <h3>Contact Information</h3>
          <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
          <p><strong>Date of Birth:</strong> {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : 'Not provided'}</p>
        </div>
        
        {profile && (
          <div className="card">
            <h3>Profile Details</h3>
            {profile.student_id ? (
              <>
                <p><strong>Student Number:</strong> {profile.student_number}</p>
                <p><strong>Major:</strong> {profile.major || 'Not specified'}</p>
                <p><strong>University:</strong> {profile.university || 'Not specified'}</p>
                <p><strong>Year of Study:</strong> {profile.year_of_study || 'Not specified'}</p>
                <p><strong>Graduation Year:</strong> {profile.graduation_year || 'Not specified'}</p>
                {profile.linkedin_profile && (
                  <p><strong>LinkedIn:</strong> <a href={profile.linkedin_profile} target="_blank" rel="noopener noreferrer">View Profile</a></p>
                )}
              </>
            ) : (
              <>
                <p><strong>Company:</strong> {profile.company || 'Not specified'}</p>
                <p><strong>Position:</strong> {profile.position || 'Not specified'}</p>
                <p><strong>Industry:</strong> {profile.industry || 'Not specified'}</p>
                <p><strong>University:</strong> {profile.university || 'Not specified'}</p>
                <p><strong>Years of Experience:</strong> {profile.years_of_experience || 'Not specified'}</p>
                <p><strong>Graduation Year:</strong> {profile.graduation_year || 'Not specified'}</p>
                {profile.linkedin_profile && (
                  <p><strong>LinkedIn:</strong> <a href={profile.linkedin_profile} target="_blank" rel="noopener noreferrer">View Profile</a></p>
                )}
                <p><strong>Available for Mentorship:</strong> 
                  <span className={`status-badge ${profile.is_available_for_mentorship ? 'available' : 'rejected'}`}>
                    {profile.is_available_for_mentorship ? 'Yes' : 'No'}
                  </span>
                </p>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="text-center mt-3">
        <Link to="/edit-profile" className="btn">Edit Profile</Link>
      </div>
    </div>
  )
}

export default UserProfile