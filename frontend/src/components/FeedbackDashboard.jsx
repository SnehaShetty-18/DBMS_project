import React from 'react'

const FeedbackDashboard = ({ feedback, role }) => {
  const averageRating = feedback.length > 0 
    ? (feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length).toFixed(1)
    : 0

  const ratingDistribution = {
    5: feedback.filter(item => item.rating === 5).length,
    4: feedback.filter(item => item.rating === 4).length,
    3: feedback.filter(item => item.rating === 3).length,
    2: feedback.filter(item => item.rating === 2).length,
    1: feedback.filter(item => item.rating === 1).length
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>Feedback Overview</h3>
      </div>
      <div className="card-body">
        <div className="grid">
          <div className="stat-card">
            <h3>{role === 'student' ? 'Received' : 'Given'}</h3>
            <p>{feedback.length}</p>
          </div>
          <div className="stat-card">
            <h3>Average Rating</h3>
            <p>{averageRating}/5</p>
          </div>
        </div>
        
        <div className="mt-3">
          <h4>Rating Distribution</h4>
          <div style={{marginTop: '15px'}}>
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                <div style={{width: '50px'}}>
                  <span style={{color: '#f39c12', fontSize: '1.2rem'}}>
                    {'★'.repeat(rating)}
                  </span>
                </div>
                <div style={{flexGrow: 1, marginLeft: '10px'}}>
                  <div 
                    style={{
                      height: '10px',
                      backgroundColor: '#ecf0f1',
                      borderRadius: '5px',
                      overflow: 'hidden'
                    }}
                  >
                    <div 
                      style={{
                        height: '100%',
                        backgroundColor: '#667eea',
                        width: `${(ratingDistribution[rating] / feedback.length) * 100 || 0}%`
                      }}
                    ></div>
                  </div>
                </div>
                <div style={{width: '30px', textAlign: 'right'}}>
                  <small>{ratingDistribution[rating]}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackDashboard