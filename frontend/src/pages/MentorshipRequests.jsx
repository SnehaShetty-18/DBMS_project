import React, { useState, useEffect } from 'react'

const MentorshipRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('received')

  useEffect(() => {
    // Fetch mentorship requests from API
    // This is a mock implementation
    const mockRequests = [
      {
        request_id: 1,
        subject: 'Career guidance in software engineering',
        message: 'I am a computer science student looking for advice on building a career in software engineering.',
        status: 'pending',
        requested_at: '2025-10-20T10:30:00Z',
        Student: {
          User: {
            first_name: 'Alice',
            last_name: 'Brown'
          }
        },
        Alumni: {
          User: {
            first_name: 'John',
            last_name: 'Smith'
          }
        }
      },
      {
        request_id: 2,
        subject: 'Resume review',
        message: 'Could you please review my resume and provide feedback?',
        status: 'accepted',
        requested_at: '2025-10-18T14:15:00Z',
        Student: {
          User: {
            first_name: 'Bob',
            last_name: 'Wilson'
          }
        },
        Alumni: {
          User: {
            first_name: 'Jane',
            last_name: 'Doe'
          }
        }
      },
      {
        request_id: 3,
        subject: 'Interview preparation',
        message: 'I have an upcoming interview and would appreciate some guidance.',
        status: 'completed',
        requested_at: '2025-10-15T09:00:00Z',
        Student: {
          User: {
            first_name: 'Charlie',
            last_name: 'Davis'
          }
        },
        Alumni: {
          User: {
            first_name: 'Robert',
            last_name: 'Johnson'
          }
        }
      }
    ]
    
    setRequests(mockRequests)
    setLoading(false)
  }, [])

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Mentorship Requests</h1>
        <div className="flex-center">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  // Filter requests based on active tab
  const filteredRequests = activeTab === 'received' 
    ? requests.filter(req => req.Alumni.User.first_name) // Mock filter
    : requests.filter(req => req.Student.User.first_name) // Mock filter

  return (
    <div className="container">
      <h1 className="page-title">Mentorship Requests</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="flex-between">
            <button 
              className={`btn ${activeTab === 'received' ? 'btn-secondary' : ''}`}
              onClick={() => setActiveTab('received')}
            >
              Received Requests
            </button>
            <button 
              className={`btn ${activeTab === 'sent' ? 'btn-secondary' : ''}`}
              onClick={() => setActiveTab('sent')}
            >
              Sent Requests
            </button>
          </div>
        </div>
      </div>
      
      {filteredRequests.length === 0 ? (
        <div className="card text-center">
          <h3>No mentorship requests found</h3>
          <p>{activeTab === 'received' 
            ? 'You have not received any mentorship requests yet.' 
            : 'You have not sent any mentorship requests yet.'}</p>
        </div>
      ) : (
        <div className="grid">
          {filteredRequests.map(request => (
            <div key={request.request_id} className="card">
              <div className="card-header">
                <h3>{request.subject}</h3>
                <span className={`status-badge ${request.status}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
              <div className="card-body">
                <p><strong>{activeTab === 'received' ? 'From:' : 'To:'}</strong> 
                  {activeTab === 'received' 
                    ? `${request.Student.User.first_name} ${request.Student.User.last_name}`
                    : `${request.Alumni.User.first_name} ${request.Alumni.User.last_name}`}
                </p>
                <p><strong>Requested:</strong> {formatDate(request.requested_at)}</p>
                <p><strong>Message:</strong> {request.message}</p>
              </div>
              <div className="card-footer">
                {request.status === 'pending' && activeTab === 'received' && (
                  <>
                    <button className="btn btn-success">Accept</button>
                    <button className="btn btn-danger">Reject</button>
                  </>
                )}
                <button className="btn">View Messages</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MentorshipRequests