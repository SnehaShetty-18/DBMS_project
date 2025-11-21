import React, { useState, useEffect } from 'react'

const Feedback = () => {
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    to_user_id: '',
    rating: 5,
    comment: ''
  })

  useEffect(() => {
    // Fetch feedback from API
    // This is a mock implementation
    const mockFeedback = [
      {
        feedback_id: 1,
        rating: 5,
        comment: 'Great mentor! Very helpful and responsive. Provided valuable insights into my career path.',
        fromUser: {
          first_name: 'Alice',
          last_name: 'Brown'
        },
        created_at: '2025-10-15T10:30:00Z'
      },
      {
        feedback_id: 2,
        rating: 4,
        comment: 'Good guidance on career planning. Helped me understand industry expectations.',
        fromUser: {
          first_name: 'Bob',
          last_name: 'Wilson'
        },
        created_at: '2025-10-10T14:15:00Z'
      },
      {
        feedback_id: 3,
        rating: 5,
        comment: 'Exceptional mentorship experience. Went above and beyond to help me with my projects.',
        fromUser: {
          first_name: 'Charlie',
          last_name: 'Davis'
        },
        created_at: '2025-10-05T09:00:00Z'
      }
    ]
    
    setFeedback(mockFeedback)
    setLoading(false)
  }, [])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    
    // Simulate API call
    setTimeout(() => {
      // Reset form and hide it
      setFormData({
        to_user_id: '',
        rating: 5,
        comment: ''
      })
      setShowForm(false)
    }, 1000)
  }

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Render star ratings
  const renderStars = (rating) => {
    return (
      <div>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < rating ? '#f39c12' : '#ddd', fontSize: '1.2rem' }}>
            ★
          </span>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Feedback</h1>
        <div className="flex-center">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="page-title">Feedback</h1>
      
      <div className="mb-4 text-center">
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Leave Feedback'}
        </button>
      </div>
      
      {showForm && (
        <div className="form-container">
          <h2 className="form-title">Leave Feedback</h2>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="to_user_id">Recipient</label>
              <select
                id="to_user_id"
                name="to_user_id"
                value={formData.to_user_id}
                onChange={onChange}
                required
              >
                <option value="">Select a recipient</option>
                <option value="1">John Smith</option>
                <option value="2">Jane Doe</option>
                <option value="3">Robert Johnson</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={onChange}
                required
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={onChange}
                rows="4"
                required
                placeholder="Share your experience..."
              ></textarea>
            </div>
            <button type="submit" className="btn btn-block">Submit Feedback</button>
          </form>
        </div>
      )}
      
      <div className="feedback-list">
        <h2 className="mb-3">Received Feedback</h2>
        {feedback.length === 0 ? (
          <div className="card text-center">
            <h3>No feedback received yet</h3>
            <p>Feedback from your mentees will appear here</p>
          </div>
        ) : (
          <div className="grid">
            {feedback.map(item => (
              <div key={item.feedback_id} className="card">
                <div className="card-header">
                  <h3>{item.fromUser.first_name} {item.fromUser.last_name}</h3>
                  <div>{renderStars(item.rating)}</div>
                </div>
                <div className="card-body">
                  <p>{item.comment}</p>
                </div>
                <div className="card-footer">
                  <small>Posted on {formatDate(item.created_at)}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Feedback