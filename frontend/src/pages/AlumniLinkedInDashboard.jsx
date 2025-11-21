import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import studentService from '../services/studentService';
import mentorshipService from '../services/mentorshipService';
import internshipService from '../services/internshipService';

const AlumniLinkedInDashboard = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('community'); // Default to community
  const [userData, setUserData] = useState(null);
  const [studentsList, setStudentsList] = useState([]);
  const [myInternships, setMyInternships] = useState([]);
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [connectModal, setConnectModal] = useState(false);
  const [connectMessage, setConnectMessage] = useState('');
  const [newInternship, setNewInternship] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    start_date: '',
    end_date: '',
    application_deadline: ''
  });
  const [showInternshipForm, setShowInternshipForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile
        const profileData = await userService.getProfile();
        
        // Fetch students list
        const studentsData = await studentService.getAllStudents();
        
        // Fetch mentorship requests for this alumni
        const requestsData = await mentorshipService.getMyRequests();
        
        // Fetch internships posted by this alumni
        const internshipsData = await internshipService.getMyInternships();
        
        setUserData(profileData);
        setStudentsList(studentsData);
        setMentorshipRequests(Array.isArray(requestsData) ? requestsData : requestsData.requests || []);
        setMyInternships(Array.isArray(internshipsData) ? internshipsData : internshipsData.internships || []);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
        console.error('Error response:', err.response);
        console.error('Error request:', err.request);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Filter students based on search term
  const filteredStudents = studentsList.filter(student => {
    return (
      student.User.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.User.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.major && student.major.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.student_number && student.student_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.university && student.university.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Get connected students (status: 'accepted')
  const connectedStudents = mentorshipRequests
    .filter(request => request.status === 'accepted')
    .map(request => {
      return studentsList.find(student => student.student_id === request.student_id);
    })
    .filter(Boolean);

  // Get pending requests count
  const pendingRequestsCount = mentorshipRequests.filter(
    request => request.status === 'pending'
  ).length;

  // Handle connect button click
  const handleConnectClick = (student) => {
    setSelectedStudent(student);
    setConnectModal(true);
    setConnectMessage(`Hi ${student.User.first_name}, I'd like to connect with you for mentorship guidance.`);
  };

  // Handle send connection request
  const handleSendConnectionRequest = () => {
    // In a real implementation, this would create a new request
    alert('Connection request sent successfully!');
    setConnectModal(false);
    setConnectMessage('');
  };

  // Handle internship application
  const handleInternshipApplication = (internshipId) => {
    // In a real implementation, this would submit an application
    alert('Application submitted successfully!');
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real implementation, this would send the message
    alert('Message sent successfully!');
    setNewMessage('');
  };

  // Handle post internship
  const handlePostInternship = async () => {
    try {
      // In a real implementation, this would post the internship
      alert('Internship posted successfully!');
      setShowInternshipForm(false);
      setNewInternship({
        title: '',
        company: '',
        description: '',
        location: '',
        start_date: '',
        end_date: '',
        application_deadline: ''
      });
    } catch (err) {
      alert('Failed to post internship');
      console.error('Error posting internship:', err);
    }
  };

  // Handle accept mentorship request
  const handleAcceptRequest = async (requestId) => {
    try {
      // In a real implementation, this would update the request status
      alert('Mentorship request accepted!');
      // Update local state
      setMentorshipRequests(prev => 
        prev.map(request => 
          request.request_id === requestId 
            ? { ...request, status: 'accepted' } 
            : request
        )
      );
    } catch (err) {
      alert('Failed to accept request');
      console.error('Error accepting request:', err);
    }
  };

  // Handle decline mentorship request
  const handleDeclineRequest = async (requestId) => {
    try {
      // In a real implementation, this would update the request status
      alert('Mentorship request declined!');
      // Update local state
      setMentorshipRequests(prev => 
        prev.map(request => 
          request.request_id === requestId 
            ? { ...request, status: 'rejected' } 
            : request
        )
      );
    } catch (err) {
      alert('Failed to decline request');
      console.error('Error declining request:', err);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Handle back navigation - only go back to community view
  const handleBack = () => {
    if (activeView !== 'community') {
      setActiveView('community');
    }
  };

  if (loading) {
    return (
      <div className="linkedin-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="linkedin-dashboard">
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="linkedin-dashboard">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="nav-brand">
          <h2>Alumni Network</h2>
        </div>
        <div className="nav-links">
          <button 
            className={activeView === 'community' ? 'active' : ''}
            onClick={() => setActiveView('community')}
          >
            Community
          </button>
          <button 
            className={activeView === 'internships' ? 'active' : ''}
            onClick={() => setActiveView('internships')}
          >
            Internships
          </button>
          <button 
            className={activeView === 'messages' ? 'active' : ''}
            onClick={() => setActiveView('messages')}
          >
            Messages
          </button>
          <button 
            className={activeView === 'mentorship' ? 'active' : ''}
            onClick={() => setActiveView('mentorship')}
          >
            Mentorship Requests
          </button>
        </div>
        <div className="nav-user">
          <button className="btn btn-secondary" onClick={handleBack} style={{marginRight: '10px'}}>
            Back
          </button>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="dashboard-container">
        {/* Left Column (Profile/Sticky Card) */}
        <div className="left-column">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {userData?.user?.first_name?.charAt(0)}{userData?.user?.last_name?.charAt(0)}
              </div>
              <h3>{userData?.user?.first_name} {userData?.user?.last_name}</h3>
              <p>Alumni</p>
            </div>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{connectedStudents.length}</span>
                <span className="stat-label">Students Connected</span>
              </div>
            </div>
            <button 
              className="profile-link"
              onClick={() => setActiveView('profile')}
            >
              View My Profile
            </button>
          </div>
          
          {/* Quick Stats Card */}
          <div className="utility-card">
            <h3>Quick Stats</h3>
            <div className="stat-item">
              <span className="stat-label">Pending Requests</span>
              <span className="stat-value">{pendingRequestsCount}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Connected Students</span>
              <span className="stat-value">{connectedStudents.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Internships Posted</span>
              <span className="stat-value">{myInternships.length}</span>
            </div>
          </div>
        </div>

        {/* Central Column (Main Content) */}
        <div className="central-column">
          {/* Community View */}
          {activeView === 'community' && (
            <div className="view community-view">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search students by name, major, or university..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="alumni-feed">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => {
                    // Check if there's an existing request
                    const existingRequest = mentorshipRequests.find(
                      request => request.student_id === student.student_id && 
                                (request.status === 'pending' || request.status === 'accepted')
                    );
                    
                    return (
                      <div key={student.student_id} className="alumni-card">
                        <div className="alumni-header">
                          <div className="alumni-avatar">
                            {student.User.first_name.charAt(0)}{student.User.last_name.charAt(0)}
                          </div>
                          <div className="alumni-info">
                            <h3>{student.User.first_name} {student.User.last_name}</h3>
                            <p>{student.major || 'Major not specified'} at {student.university || 'University not specified'}</p>
                            <p className="industry">Year: {student.year_of_study || 'Not specified'}</p>
                            {student.linkedin_profile && (
                              <p><a href={student.linkedin_profile} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
                            )}
                          </div>
                        </div>
                        <div className="alumni-actions">
                          {existingRequest ? (
                            <button 
                              className={`btn ${existingRequest.status === 'pending' ? 'btn-pending' : 'btn-connected'}`}
                              disabled
                            >
                              {existingRequest.status === 'pending' ? 'Pending' : 'Connected'}
                            </button>
                          ) : (
                            <button 
                              className="btn btn-primary"
                              onClick={() => handleConnectClick(student)}
                            >
                              Connect
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-results">
                    <p>No students found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Internships View */}
          {activeView === 'internships' && (
            <div className="view internships-view">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                <h2>Internship Management</h2>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowInternshipForm(!showInternshipForm)}
                >
                  {showInternshipForm ? 'Cancel' : 'Post New Internship'}
                </button>
              </div>
              
              {/* Post Internship Form */}
              {showInternshipForm && (
                <div className="card" style={{marginBottom: '1.5rem'}}>
                  <div className="card-header">
                    <h3>Post New Internship</h3>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="title">Internship Title</label>
                      <input
                        type="text"
                        id="title"
                        value={newInternship.title}
                        onChange={(e) => setNewInternship({...newInternship, title: e.target.value})}
                        placeholder="e.g., Software Engineering Intern"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <input
                        type="text"
                        id="company"
                        value={newInternship.company}
                        onChange={(e) => setNewInternship({...newInternship, company: e.target.value})}
                        placeholder="e.g., Tech Corp"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        value={newInternship.description}
                        onChange={(e) => setNewInternship({...newInternship, description: e.target.value})}
                        placeholder="Describe the internship opportunity..."
                        rows="3"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        id="location"
                        value={newInternship.location}
                        onChange={(e) => setNewInternship({...newInternship, location: e.target.value})}
                        placeholder="e.g., San Francisco, CA"
                        className="form-control"
                      />
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem'}}>
                      <div className="form-group">
                        <label htmlFor="start_date">Start Date</label>
                        <input
                          type="date"
                          id="start_date"
                          value={newInternship.start_date}
                          onChange={(e) => setNewInternship({...newInternship, start_date: e.target.value})}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="end_date">End Date</label>
                        <input
                          type="date"
                          id="end_date"
                          value={newInternship.end_date}
                          onChange={(e) => setNewInternship({...newInternship, end_date: e.target.value})}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="application_deadline">Application Deadline</label>
                        <input
                          type="date"
                          id="application_deadline"
                          value={newInternship.application_deadline}
                          onChange={(e) => setNewInternship({...newInternship, application_deadline: e.target.value})}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '0.5rem'}}>
                      <button 
                        className="btn btn-primary"
                        onClick={handlePostInternship}
                      >
                        Post Internship
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* My Internship Postings */}
              <h3>My Internship Postings</h3>
              <div className="internship-list">
                {myInternships.length > 0 ? (
                  myInternships.map(internship => (
                    <div key={internship.internship_id} className="internship-card">
                      <div className="internship-header">
                        <h3>{internship.title}</h3>
                        <p className="company">{internship.company}</p>
                      </div>
                      <div className="internship-details">
                        <p><strong>Location:</strong> {internship.location}</p>
                        <p><strong>Posted:</strong> {new Date(internship.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="internship-actions">
                        <button 
                          className="btn btn-secondary"
                          onClick={() => setSelectedInternship(internship)}
                        >
                          View Details
                        </button>
                        <button className="btn btn-primary">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <p>You haven't posted any internships yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Messages View */}
          {activeView === 'messages' && (
            <div className="view messages-view">
              <div className="messages-container">
                {/* Conversation List */}
                <div className="conversation-list">
                  <h3>Conversations</h3>
                  {connectedStudents.length > 0 ? (
                    connectedStudents.map(student => (
                      <div 
                        key={student.student_id}
                        className={`conversation-item ${selectedConversation?.student_id === student.student_id ? 'active' : ''}`}
                        onClick={() => setSelectedConversation(student)}
                      >
                        <div className="conversation-avatar">
                          {student.User.first_name.charAt(0)}{student.User.last_name.charAt(0)}
                        </div>
                        <div className="conversation-info">
                          <h4>{student.User.first_name} {student.User.last_name}</h4>
                          <p>{student.major || 'Major not specified'} at {student.university || 'University not specified'}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-conversations">
                      <p>No active conversations. Connect with students to start messaging.</p>
                    </div>
                  )}
                </div>
                
                {/* Chat Window */}
                <div className="chat-window">
                  {selectedConversation ? (
                    <>
                      <div className="chat-header">
                        <div className="chat-header-info">
                          <div className="chat-avatar">
                            {selectedConversation.User.first_name.charAt(0)}{selectedConversation.User.last_name.charAt(0)}
                          </div>
                          <div>
                            <h3>{selectedConversation.User.first_name} {selectedConversation.User.last_name}</h3>
                            <p>{selectedConversation.major || 'Major not specified'} at {selectedConversation.university || 'University not specified'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="chat-messages">
                        {/* Mock messages */}
                        <div className="message received">
                          <p>Hello! I'm interested in your internship opportunities.</p>
                          <span className="timestamp">10:30 AM</span>
                        </div>
                        <div className="message sent">
                          <p>Hi! I'd be happy to discuss opportunities with you.</p>
                          <span className="timestamp">10:32 AM</span>
                        </div>
                      </div>
                      <div className="chat-input">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button className="btn btn-primary" onClick={handleSendMessage}>
                          Send
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="chat-placeholder">
                      <p>Select a conversation to start messaging</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Mentorship Requests View */}
          {activeView === 'mentorship' && (
            <div className="view mentorship-view">
              <h2>Mentorship Request Inbox</h2>
              
              <div className="requests-list">
                {mentorshipRequests.filter(req => req.status === 'pending').length > 0 ? (
                  mentorshipRequests
                    .filter(req => req.status === 'pending')
                    .map(request => {
                      const student = studentsList.find(s => s.student_id === request.student_id);
                      return student ? (
                        <div key={request.request_id} className="request-card">
                          <div className="request-header">
                            <div className="request-avatar">
                              {student.User.first_name.charAt(0)}{student.User.last_name.charAt(0)}
                            </div>
                            <div className="request-info">
                              <h3>{student.User.first_name} {student.User.last_name}</h3>
                              <p>{student.major} at {student.university}</p>
                              <p className="request-subject">{request.subject}</p>
                              <p className="request-message">{request.message}</p>
                            </div>
                          </div>
                          <div className="request-actions">
                            <button 
                              className="btn btn-success"
                              onClick={() => handleAcceptRequest(request.request_id)}
                            >
                              Accept
                            </button>
                            <button 
                              className="btn btn-danger"
                              onClick={() => handleDeclineRequest(request.request_id)}
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      ) : null;
                    })
                ) : (
                  <div className="no-results">
                    <p>No pending mentorship requests.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* My Profile View */}
          {activeView === 'profile' && (
            <div className="view profile-view">
              <h2>My Profile</h2>
              
              <div className="profile-details">
                <div className="profile-header">
                  <div className="profile-avatar-large">
                    {userData?.user?.first_name?.charAt(0)}{userData?.user?.last_name?.charAt(0)}
                  </div>
                  <div className="profile-info">
                    <h3>{userData?.user?.first_name} {userData?.user?.last_name}</h3>
                    <p>User ID: {userData?.user?.user_id}</p>
                    <p>Email: {userData?.user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="profile-section">
                <h3>Connected Students</h3>
                {connectedStudents.length > 0 ? (
                  <div className="connections-grid">
                    {connectedStudents.map(student => (
                      <div key={student.student_id} className="connection-card">
                        <div className="connection-avatar">
                          {student.User.first_name.charAt(0)}{student.User.last_name.charAt(0)}
                        </div>
                        <div className="connection-info">
                          <h4>{student.User.first_name} {student.User.last_name}</h4>
                          <p>{student.major || 'Major not specified'} at {student.university || 'University not specified'}</p>
                          {student.linkedin_profile && (
                            <p><a href={student.linkedin_profile} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>You haven't connected with any students yet.</p>
                )}
              </div>
              
              <div className="profile-section">
                <h3>Pending Requests</h3>
                {pendingRequestsCount > 0 ? (
                  <div className="pending-requests">
                    {mentorshipRequests
                      .filter(request => request.status === 'pending')
                      .map(request => {
                        const student = studentsList.find(s => s.student_id === request.student_id);
                        return student ? (
                          <div key={request.request_id} className="request-card">
                            <div className="request-info">
                              <h4>{student.User.first_name} {student.User.last_name}</h4>
                              <p>{student.major} at {student.university}</p>
                            </div>
                            <div className="request-status">
                              <span className="status-pending">Pending</span>
                            </div>
                          </div>
                        ) : null;
                      })
                    }
                  </div>
                ) : (
                  <p>You have no pending requests.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Utility/Suggestions) - Only shown on community view */}
        {activeView === 'community' && (
          <div className="right-column">
            <div className="utility-card">
              <h3>Quick Stats</h3>
              <div className="stat-item">
                <span className="stat-label">Pending Requests</span>
                <span className="stat-value">{pendingRequestsCount}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Connected Students</span>
                <span className="stat-value">{connectedStudents.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Internships Posted</span>
                <span className="stat-value">{myInternships.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Connect Modal */}
      {connectModal && selectedStudent && (
        <div className="modal-overlay" onClick={() => setConnectModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Connect with {selectedStudent.User.first_name} {selectedStudent.User.last_name}</h2>
              <button className="close-btn" onClick={() => setConnectModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="alumni-preview">
                <div className="alumni-avatar-large">
                  {selectedStudent.User.first_name.charAt(0)}{selectedStudent.User.last_name.charAt(0)}
                </div>
                <div>
                  <h3>{selectedStudent.User.first_name} {selectedStudent.User.last_name}</h3>
                  <p>{selectedStudent.major} at {selectedStudent.university}</p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="connectMessage">Message:</label>
                <textarea
                  id="connectMessage"
                  value={connectMessage}
                  onChange={(e) => setConnectMessage(e.target.value)}
                  rows="4"
                  placeholder="Add a personal message..."
                  className="form-control"
                />
              </div>
              <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}>
                <button 
                  className="btn btn-primary"
                  onClick={handleSendConnectionRequest}
                >
                  Send Request
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setConnectModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Internship Detail Modal */}
      {selectedInternship && (
        <div className="modal-overlay" onClick={() => setSelectedInternship(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedInternship.title}</h2>
              <button className="close-btn" onClick={() => setSelectedInternship(null)}>×</button>
            </div>
            <div className="modal-body">
              <p><strong>Company:</strong> {selectedInternship.company}</p>
              <p><strong>Location:</strong> {selectedInternship.location}</p>
              <p><strong>Description:</strong> {selectedInternship.description}</p>
              <p><strong>Start Date:</strong> {new Date(selectedInternship.start_date).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(selectedInternship.end_date).toLocaleDateString()}</p>
              <p><strong>Application Deadline:</strong> {new Date(selectedInternship.application_deadline).toLocaleDateString()}</p>
              <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniLinkedInDashboard;