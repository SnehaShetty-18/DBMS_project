import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import alumniService from '../services/alumniService';
import mentorshipService from '../services/mentorshipService';
import internshipService from '../services/internshipService';


const LinkedInStyleDashboard = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('community');
  const [userData, setUserData] = useState(null);
  const [alumniList, setAlumniList] = useState([]);
  const [internships, setInternships] = useState([]);
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [connectModal, setConnectModal] = useState(false);
  const [connectMessage, setConnectMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const profileData = await userService.getProfile();
        const alumniData = await alumniService.getAllAlumni();

        // Mock internships
        const mockInternships = [
          {
            internship_id: 1,
            alumni_id: 1,
            title: 'Software Engineering Intern',
            company: 'Tech Corp',
            description:
              'Join our development team to work on cutting-edge web applications using React and Node.js.',
            location: 'San Francisco, CA',
            start_date: '2026-06-01',
            end_date: '2026-09-01',
            application_deadline: '2026-05-15',
            is_active: true,
            created_at: '2026-01-15T10:30:00Z',
          },
          {
            internship_id: 2,
            alumni_id: 2,
            title: 'Product Management Intern',
            company: 'Innovation Inc',
            description:
              'Work with our product team to develop new features and improve user experience for our flagship product.',
            location: 'New York, NY',
            start_date: '2026-07-01',
            end_date: '2026-12-01',
            application_deadline: '2026-06-15',
            is_active: true,
            created_at: '2026-02-20T14:15:00Z',
          },
        ];

        // Mock mentorships
        const mockRequests = [
          {
            request_id: 1,
            student_id: profileData.user.user_id,
            alumni_id: 1,
            subject: 'Mentorship Request',
            message: 'I would like to request mentorship in software engineering.',
            status: 'accepted',
            requested_at: '2026-01-15T10:30:00Z',
          },
          {
            request_id: 2,
            student_id: profileData.user.user_id,
            alumni_id: 2,
            subject: 'Career Guidance Request',
            message: 'Seeking guidance for product management career path.',
            status: 'pending',
            requested_at: '2026-03-20T14:20:00Z',
          },
        ];

        setUserData(profileData);
        setAlumniList(alumniData);
        setInternships(mockInternships);
        setMentorshipRequests(mockRequests);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const filteredAlumni = alumniList.filter((alum) => {
    return (
      alum.User.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.User.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alum.company && alum.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alum.industry && alum.industry.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alum.university && alum.university.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const connectedAlumni = mentorshipRequests
    .filter((request) => request.status === 'accepted')
    .map((request) => alumniList.find((alum) => alum.alumni_id === request.alumni_id))
    .filter(Boolean);

  const pendingRequestsCount = mentorshipRequests.filter(
    (request) => request.status === 'pending'
  ).length;

  // -------- FIXED TEMPLATE STRING ----------
  const handleConnectClick = (alumni) => {
    const existingRequest = mentorshipRequests.find(
      (request) =>
        request.alumni_id === alumni.alumni_id &&
        (request.status === 'pending' || request.status === 'accepted')
    );

    if (existingRequest) {
      alert(`You already have a ${existingRequest.status} request with this alumni.`);
      return;
    }

    setSelectedAlumni(alumni);
    setConnectModal(true);
    setConnectMessage(
      `Hi ${alumni.User.first_name}, I'd like to connect with you for mentorship guidance.`
    );
  };

  const handleSendConnectionRequest = () => {
    alert('Connection request sent successfully!');
    setConnectModal(false);
    setConnectMessage('');
  };

  const handleInternshipApplication = (internshipId) => {
    alert('Application submitted successfully!');
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    alert('Message sent successfully!');
    setNewMessage('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBack = () => {
    if (activeView !== 'community') {
      setActiveView('community');
    }
  };

  const handleViewProfile = () => {
    setActiveView('profile');
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
      {/* ================= NAVBAR ================= */}
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
        </div>

        <div className="nav-user">
          <button className="btn btn-secondary" onClick={handleBack} style={{ marginRight: 10 }}>
            Back
          </button>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* ================= MAIN GRID ================= */}
      <div className="dashboard-container">
        {/* LEFT COLUMN */}
        <div className="left-column">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {userData?.user?.first_name?.charAt(0)}
                {userData?.user?.last_name?.charAt(0)}
              </div>
              <h3>
                {userData?.user?.first_name} {userData?.user?.last_name}
              </h3>
              <p>Student</p>
            </div>

            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{connectedAlumni.length}</span>
                <span className="stat-label">Connected Alumni</span>
              </div>
            </div>

            <button className="profile-link" onClick={handleViewProfile}>
              View My Profile
            </button>
          </div>

          <div className="utility-card">
            <h3>Quick Stats</h3>
            <div className="stat-item">
              <span className="stat-label">Pending Requests</span>
              <span className="stat-value">{pendingRequestsCount}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Connected Alumni</span>
              <span className="stat-value">{connectedAlumni.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Alumni</span>
              <span className="stat-value">{alumniList.length}</span>
            </div>
          </div>
        </div>

        {/* ================= CENTER COLUMN ================= */}
        <div className="central-column">
          {/* COMMUNITY */}
          {activeView === 'community' && (
            <div className="view community-view">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search alumni by name, company, or industry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="alumni-feed">
                {filteredAlumni.length > 0 ? (
                  filteredAlumni.map((alum) => {
                    const existingRequest = mentorshipRequests.find(
                      (request) =>
                        request.alumni_id === alum.alumni_id &&
                        (request.status === 'pending' || request.status === 'accepted')
                    );

                    return (
                      <div key={alum.alumni_id} className="alumni-card">
                        <div className="alumni-header">
                          <div className="alumni-avatar">
                            {alum.User.first_name.charAt(0)}
                            {alum.User.last_name.charAt(0)}
                          </div>

                          <div className="alumni-info">
                            <h3>
                              {alum.User.first_name} {alum.User.last_name}
                            </h3>

                            <p>
                              {alum.position || 'Position not specified'} at{' '}
                              {alum.company || 'Company not specified'}
                            </p>

                            <p className="industry">
                              {alum.industry || 'Industry not specified'} -{' '}
                              {alum.university || 'University not specified'}
                            </p>

                            {alum.linkedin_profile && (
                              <p>
                                <a
                                  href={alum.linkedin_profile}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  LinkedIn Profile
                                </a>
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="alumni-actions">
                          {/* ---------- FIXED BUTTON CLASSNAME ---------- */}
                          {existingRequest ? (
                            <button
                              className={
                                existingRequest.status === 'pending'
                                  ? 'btn-pending'
                                  : 'btn-connected'
                              }
                              disabled
                            >
                              {existingRequest.status === 'pending'
                                ? 'Pending'
                                : 'Connected'}
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={() => handleConnectClick(alum)}
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
                    <p>No alumni found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= INTERNSHIPS ================= */}
          {activeView === 'internships' && (
            <div className="view internships-view">
              <h2>Internship Opportunities</h2>

              <div className="internship-list">
                {internships.length > 0 ? (
                  internships.map((internship) => (
                    <div key={internship.internship_id} className="internship-card">
                      <div className="internship-header">
                        <h3>{internship.title}</h3>
                        <p className="company">{internship.company}</p>
                      </div>

                      <div className="internship-details">
                        <p>
                          <strong>Location:</strong> {internship.location}
                        </p>
                        <p>
                          <strong>Posted:</strong>{' '}
                          {new Date(internship.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="internship-actions">
                        <button
                          className="btn btn-secondary"
                          onClick={() => setSelectedInternship(internship)}
                        >
                          View Details
                        </button>

                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            handleInternshipApplication(internship.internship_id)
                          }
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No internships available at the moment.</p>
                )}
              </div>
            </div>
          )}

          {/* ================= MESSAGES ================= */}
          {activeView === 'messages' && (
            <div className="view messages-view">
              <div className="messages-container">
                <div className="conversation-list">
                  <h3>Conversations</h3>

                  {connectedAlumni.length > 0 ? (
                    connectedAlumni.map((alum) => (
                      <div
                        key={alum.alumni_id}
                        className={`conversation-item ${
                          selectedConversation?.alumni_id === alum.alumni_id
                            ? 'active'
                            : ''
                        }`}
                        onClick={() => setSelectedConversation(alum)}
                      >
                        <div className="conversation-avatar">
                          {alum.User.first_name.charAt(0)}
                          {alum.User.last_name.charAt(0)}
                        </div>

                        <div className="conversation-info">
                          <h4>
                            {alum.User.first_name} {alum.User.last_name}
                          </h4>
                          <p>
                            {alum.position} at {alum.company}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No active conversations.</p>
                  )}
                </div>

                <div className="chat-window">
                  {selectedConversation ? (
                    <>
                      <div className="chat-header">
                        <div className="chat-header-info">
                          <div className="chat-avatar">
                            {selectedConversation.User.first_name.charAt(0)}
                            {selectedConversation.User.last_name.charAt(0)}
                          </div>

                          <div>
                            <h3>
                              {selectedConversation.User.first_name}{' '}
                              {selectedConversation.User.last_name}
                            </h3>
                            <p>
                              {selectedConversation.position} at{' '}
                              {selectedConversation.company}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="chat-messages">
                        <div className="message received">
                          <p>Hello! How can I help you today?</p>
                          <span className="timestamp">10:30 AM</span>
                        </div>

                        <div className="message sent">
                          <p>I'm interested in learning more about your career path.</p>
                          <span className="timestamp">10:32 AM</span>
                        </div>
                      </div>

                      <div className="chat-input">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === 'Enter' && handleSendMessage()
                          }
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

          {/* ================= PROFILE ================= */}
          {activeView === 'profile' && (
            <div className="view profile-view">
              <h2>My Profile</h2>

              <div className="profile-details">
                <div className="profile-header">
                  <div className="profile-avatar-large">
                    {userData?.user?.first_name?.charAt(0)}
                    {userData?.user?.last_name?.charAt(0)}
                  </div>

                  <div className="profile-info">
                    <h3>
                      {userData?.user?.first_name} {userData?.user?.last_name}
                    </h3>
                    <p>User ID: {userData?.user?.user_id}</p>
                    <p>Email: {userData?.user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Connected Network</h3>

                {connectedAlumni.length > 0 ? (
                  <div className="connections-grid">
                    {connectedAlumni.map((alum) => (
                      <div key={alum.alumni_id} className="connection-card">
                        <div className="connection-avatar">
                          {alum.User.first_name.charAt(0)}
                          {alum.User.last_name.charAt(0)}
                        </div>

                        <div className="connection-info">
                          <h4>
                            {alum.User.first_name} {alum.User.last_name}
                          </h4>
                          <p>
                            {alum.position || 'Position not specified'} at{' '}
                            {alum.company || 'Company not specified'}
                          </p>
                          <p>{alum.university || 'University not specified'}</p>

                          {alum.linkedin_profile && (
                            <p>
                              <a
                                href={alum.linkedin_profile}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                LinkedIn Profile
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>You haven't connected with any alumni yet.</p>
                )}
              </div>

              <div className="profile-section">
                <h3>Pending Requests</h3>

                {pendingRequestsCount > 0 ? (
                  mentorshipRequests
                    .filter((req) => req.status === 'pending')
                    .map((req) => {
                      const alum = alumniList.find(
                        (a) => a.alumni_id === req.alumni_id
                      );
                      return alum ? (
                        <div key={req.request_id} className="request-card">
                          <div className="request-info">
                            <h4>
                              {alum.User.first_name} {alum.User.last_name}
                            </h4>
                            <p>
                              {alum.position} at {alum.company}
                            </p>
                          </div>
                          <div className="request-status">
                            <span className="status-pending">Pending</span>
                          </div>
                        </div>
                      ) : null;
                    })
                ) : (
                  <p>No pending requests.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        {activeView === 'community' && (
          <div className="right-column">
            <div className="utility-card">
              <h3>Quick Stats</h3>

              <div className="stat-item">
                <span className="stat-label">Pending Requests</span>
                <span className="stat-value">{pendingRequestsCount}</span>
              </div>

              <div className="stat-item">
                <span className="stat-label">Connected Alumni</span>
                <span className="stat-value">{connectedAlumni.length}</span>
              </div>

              <div className="stat-item">
                <span className="stat-label">Total Alumni</span>
                <span className="stat-value">{alumniList.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= CONNECT MODAL ================= */}
      {connectModal && selectedAlumni && (
        <div className="modal-overlay" onClick={() => setConnectModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                Connect with {selectedAlumni.User.first_name}{' '}
                {selectedAlumni.User.last_name}
              </h2>

              <button className="close-btn" onClick={() => setConnectModal(false)}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="alumni-preview">
                <div className="alumni-avatar-large">
                  {selectedAlumni.User.first_name.charAt(0)}
                  {selectedAlumni.User.last_name.charAt(0)}
                </div>

                <div>
                  <h3>
                    {selectedAlumni.User.first_name}{' '}
                    {selectedAlumni.User.last_name}
                  </h3>
                  <p>
                    {selectedAlumni.position} at {selectedAlumni.company}
                  </p>
                </div>
              </div>

              <label htmlFor="connectMessage">Message:</label>
              <textarea
                id="connectMessage"
                rows="4"
                value={connectMessage}
                onChange={(e) => setConnectMessage(e.target.value)}
              />

              <div className="modal-actions">
                <button className="btn btn-primary" onClick={handleSendConnectionRequest}>
                  Send Request
                </button>

                <button className="btn btn-secondary" onClick={() => setConnectModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= INTERNSHIP MODAL ================= */}
      {selectedInternship && (
        <div className="modal-overlay" onClick={() => setSelectedInternship(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedInternship.title}</h2>

              <button className="close-btn" onClick={() => setSelectedInternship(null)}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <p>
                <strong>Company:</strong> {selectedInternship.company}
              </p>
              <p>
                <strong>Location:</strong> {selectedInternship.location}
              </p>
              <p>
                <strong>Description:</strong> {selectedInternship.description}
              </p>
              <p>
                <strong>Start Date:</strong>{' '}
                {new Date(selectedInternship.start_date).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{' '}
                {new Date(selectedInternship.end_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Deadline:</strong>{' '}
                {new Date(selectedInternship.application_deadline).toLocaleDateString()}
              </p>

              <div className="modal-actions">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleInternshipApplication(selectedInternship.internship_id)
                  }
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedInStyleDashboard;
