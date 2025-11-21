import React from 'react'

const JobCard = ({ internship }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Check if deadline has passed
  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{internship.title}</h3>
        {isDeadlinePassed(internship.application_deadline) && (
          <span className="status-badge rejected">Closed</span>
        )}
      </div>
      <div className="card-body">
        <p><strong>Company:</strong> {internship.company}</p>
        <p><strong>Location:</strong> {internship.location}</p>
        <p><strong>Description:</strong> {internship.description}</p>
        <p><strong>Application Deadline:</strong> {formatDate(internship.application_deadline)}</p>
      </div>
      <div className="card-footer">
        <button 
          className="btn" 
          disabled={isDeadlinePassed(internship.application_deadline)}
        >
          {isDeadlinePassed(internship.application_deadline) ? 'Deadline Passed' : 'Apply'}
        </button>
      </div>
    </div>
  )
}

export default JobCard