import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import mentorshipService from '../services/mentorshipService';
import internshipService from '../services/internshipService';
import AlumniCard from '../components/AlumniCard';
import "../utils/UnifiedDashboard.css";

const UnifiedDashboard = () => {
  const { user, role } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [userData, setUserData] = useState(null);
  const [alumniList, setAlumniList] = useState([]);
  const [internships, setInternships] = useState([]);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [mentorshipRequests, setMentorshipRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile
        const profileData = await userService.getProfile();
        
        // Fetch alumni list
        // For now, using mock data similar to AlumniList.jsx
        const mockAlumni = [
          {
            alumni_id: 1,
            User: {
              user_id: 1,
              first_name: 'John',
              last_name: 'Smith',
              email: 'john.smith@example.com'
            },
            company: 'Tech Corp',
            position: 'Senior Software Engineer',
            industry: 'Technology',
            graduation_year: 2015,
            is_available_for_mentorship: true,
            linkedin_profile: 'https://linkedin.com/in/johnsmith'
          },
          {
            alumni_id: 2,
            User: {
              user_id: 2,
              first_name: 'Jane',
              last_name: 'Doe',
              email: 'jane.doe@example.com'
            },
            company: 'Innovation Inc',
            position: 'Product Manager',
            industry: 'Technology',
            graduation_year: 2015,
            is_available_for_mentorship: true,
            linkedin_profile: 'https://linkedin.com/in/janedoe'
          },
          {
            alumni_id: 3,
            User: {
              user_id: 3,
              first_name: 'Robert',
              last_name: 'Johnson',
              email: 'robert.johnson@example.com'
            },
            company: 'Finance Group',
            position: 'Financial Analyst',
            industry: 'Finance',
            graduation_year: 2010,
            is_available_for_mentorship: false,
            linkedin_profile: 'https://linkedin.com/in/robertjohnson'
          },
          {
            alumni_id: 4,
            User: {
              user_id: 4,
              first_name: 'Sarah',
              last_name: 'Williams',
              email: 'sarah.williams@example.com'
            },
            company: 'Health Solutions',
            position: 'Data Scientist',
            industry: 'Healthcare',
            graduation_year: 2018,
            is_available_for_mentorship: true,
            linkedin_profile: 'https://linkedin.com/in/sarahwilliams'
          }
        ];
        
        // Fetch internships
        // For now, using mock data
        const mockInternships = [
          {
            internship_id: 1,
            alumni_id: 1,
            title: 'Software Engineering Intern',
            company: 'Tech Corp',
            description: 'Join our development team to work on cutting-edge web applications using React and Node.js.',
            location: 'San Francisco, CA',
            start_date: '2026-06-01',
            end_date: '2026-09-01',
            application_deadline: '2026-05-15',
            is_active: true,
            created_at: '2026-01-15T10:30:00Z'
          },
          {
            internship_id: 2,
            alumni_id: 2,
            title: 'Product Management Intern',
            company: 'Innovation Inc',
            description: 'Work with our product team to develop new features and improve user experience for our flagship product.',
            location: 'New York, NY',
            start_date: '2026-07-01',
            end_date: '2026-12-01',
            application_deadline: '2026-06-15',
            is_active: true,
            created_at: '2026-02-20T14:15:00Z'
          },
          {
            internship_id: 3,
            alumni_id: 4,
            title: 'Data Science Intern',
            company: 'Health Solutions',
            description: 'Analyze healthcare data to identify trends and improve patient outcomes using machine learning.',
            location: 'Boston, MA',
            start_date: '2026-06-15',
            end_date: '2026-09-15',
            application_deadline: '2026-05-30',
            is_active: true,
            created_at: '2026-03-10T09:45:00Z'
          }
        ];
        
        // Mock mentorship requests
        const mockRequests = [
          { 
            request_id: 1, 
            student_id: profileData.user.user_id,
            alumni_id: 1,
            subject: 'Mentorship Request',
            message: 'I would like to request mentorship in software engineering.',
            status: 'accepted',
            requested_at: '2026-01-15T10:30:00Z'
          },
          { 
            request_id: 2, 
            student_id: profileData.user.user_id,
            alumni_id: 2,
            subject: 'Career Guidance Request',
            message: 'Seeking guidance for product management career path.',
            status: 'pending',
            requested_at: '2026-03-20T14:20:00Z'
          },
          { 
            request_id: 3, 
            student_id: profileData.user.user_id,
            alumni_id: 3,
            subject: 'Industry Insights',
            message: 'Interested in learning about the finance industry.',
            status: 'rejected',
            requested_at: '2026-02-10T09:15:00Z'
          }
        ];
        
        setUserData(profileData);
        setAlumniList(mockAlumni);
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

  // Filter alumni based on search term
  const filteredAlumni = alumniList.filter(alum => {
    return (
      alum.User.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.User.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get connected alumni (status: 'accepted')
  const connectedAlumni = mentorshipRequests
    .filter(request => request.status === 'accepted')
    .map(request => {
      return alumniList.find(alum => alum.alumni_id === request.alumni_id);
    })
    .filter(Boolean);

  // Get pending requests count
  const pendingRequestsCount = mentorshipRequests.filter(
    request => request.status === 'pending'
  ).length;

  // Handle mentorship request
  const handleMentorshipRequest = (alumniId) => {
    // Check if request already exists
    const existingRequest = mentorshipRequests.find(
      request => request.alumni_id === alumniId && 
                (request.status === 'pending' || request.status === 'accepted')
    );
    
    if (existingRequest) {
      alert(`You already have a ${existingRequest.status} request with this alumni.`);
      return;
    }
    
    // In a real implementation, this would create a new request
    alert('Mentorship request sent successfully!');
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

  if (loading) {
    return (
      <div className="unified-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="unified-dashboard">
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="unified-dashboard">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="nav-brand">
          <h2>Alumni Network</h2>
        </div>
        <div className="nav-user">
          <span>User ID: {userData?.user?.user_id}</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="dashboard-container">
        {/* Sidebar Navigation */}
        <aside className="sidebar">
          <ul className="nav-menu">
            <li 
              className={activeView === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveView('dashboard')}
            >
              <span className="nav-icon">📊</span>
              <span>Dashboard</span>
            </li>
            <li 
              className={activeView === 'community' ? 'active' : ''}
              onClick={() => setActiveView('community')}
            >
              <span className="nav-icon">👥</span>
              <span>Community</span>
            </li>
            <li 
              className={activeView === 'internships' ? 'active' : ''}
              onClick={() => setActiveView('internships')}
            >
              <span className="nav-icon">💼</span>
              <span>Internships</span>
            </li>
            <li 
              className={activeView === 'messages' ? 'active' : ''}
              onClick={() => setActiveView('messages')}
            >
              <span className="nav-icon">💬</span>
              <span>Messages</span>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Dashboard View */}
          {activeView === 'dashboard' && (
            <div className="view dashboard-view">
              <h1>Student Dashboard</h1>
              
              {/* Profile Summary */}
              <div className="card profile-summary">
                <h2>Profile Summary</h2>
                <div className="profile-info">
                  <p><strong>Name:</strong> {userData?.user?.first_name} {userData?.user?.last_name}</p>
                  <p><strong>Email:</strong> {userData?.user?.email}</p>
                  <p><strong>Role:</strong> {userData?.role}</p>
                </div>
              </div>
              
              {/* Connected Alumni */}
              <div className="card connected-alumni">
                <h2>Connected Alumni</h2>
                {connectedAlumni.length > 0 ? (
                  <div className="alumni-grid">
                    {connectedAlumni.map(alum => (
                      <div key={alum.alumni_id} className="alumni-card">
                        <h3>{alum.User.first_name} {alum.User.last_name}</h3>
                        <p>{alum.position} at {alum.company}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No connected alumni yet.</p>
                )}
              </div>
              
              {/* Pending Requests */}
              <div className="card pending-requests">
                <h2>Pending Requests</h2>
                <div className="pending-badge">
                  {pendingRequestsCount} Pending Requests
                </div>
              </div>
            </div>
          )}

          {/* Community View */}
          {activeView === 'community' && (
            <div className="view community-view">
              <h1>Alumni Community</h1>
              
              {/* Search Bar */}
              <div className="card search-bar">
                <input
                  type="text"
                  placeholder="Search alumni by name, company, or industry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              {/* Alumni List */}
              <div className="alumni-list">
                {filteredAlumni.length > 0 ? (
                  filteredAlumni.map(alum => (
                    <div key={alum.alumni_id} className="card alumni-item">
                      <div className="alumni-header">
                        <h3>{alum.User.first_name} {alum.User.last_name}</h3>
                        {alum.is_available_for_mentorship && (
                          <span className="mentor-badge">Available for Mentorship</span>
                        )}
                      </div>
                      <p><strong>Position:</strong> {alum.position}</p>
                      <p><strong>Company:</strong> {alum.company}</p>
                      <p><strong>Industry:</strong> {alum.industry}</p>
                      <div className="alumni-actions">
                        <button 
                          className="btn btn-primary"
                          onClick={() => setSelectedAlumni(alum)}
                        >
                          View Profile
                        </button>
                        <button 
                          className="btn btn-secondary"
                          onClick={() => handleMentorshipRequest(alum.alumni_id)}
                          disabled={!alum.is_available_for_mentorship}
                        >
                          Request Mentorship
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card">
                    <p>No alumni found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Internships View */}
          {activeView === 'internships' && (
            <div className="view internships-view">
              <h1>Internship Board</h1>
              
              {/* Internship Listings */}
              <div className="internship-list">
                {internships.length > 0 ? (
                  internships.map(internship => (
                    <div key={internship.internship_id} className="card internship-item">
                      <h3>{internship.title}</h3>
                      <p><strong>Company:</strong> {internship.company}</p>
                      <p><strong>Location:</strong> {internship.location}</p>
                      <p><strong>Posted:</strong> {new Date(internship.created_at).toLocaleDateString()}</p>
                      <div className="internship-actions">
                        <button 
                          className="btn btn-primary"
                          onClick={() => setSelectedInternship(internship)}
                        >
                          View Details
                        </button>
                        <button 
                          className="btn btn-secondary"
                          onClick={() => handleInternshipApplication(internship.internship_id)}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card">
                    <p>No internships available at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Messages View */}
          {activeView === 'messages' && (
            <div className="view messages-view">
              <h1>Messages</h1>
              
              <div className="messages-container">
                {/* Conversation List */}
                <div className="conversation-list">
                  <h2>Conversations</h2>
                  {connectedAlumni.length > 0 ? (
                    connectedAlumni.map(alum => (
                      <div 
                        key={alum.alumni_id}
                        className={`conversation-item ${selectedConversation?.alumni_id === alum.alumni_id ? 'active' : ''}`}
                        onClick={() => setSelectedConversation(alum)}
                      >
                        <h4>{alum.User.first_name} {alum.User.last_name}</h4>
                        <p>{alum.position} at {alum.company}</p>
                      </div>
                    ))
                  ) : (
                    <p>No active conversations. Connect with alumni to start messaging.</p>
                  )}
                </div>
                
                {/* Chat Window */}
                <div className="chat-window">
                  {selectedConversation ? (
                    <>
                      <div className="chat-header">
                        <h3>{selectedConversation.User.first_name} {selectedConversation.User.last_name}</h3>
                      </div>
                      <div className="chat-messages">
                        {/* Mock messages */}
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
        </main>
      </div>

      {/* Modals */}
      {/* Alumni Detail Modal */}
      {selectedAlumni && (
        <div className="modal-overlay" onClick={() => setSelectedAlumni(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedAlumni.User.first_name} {selectedAlumni.User.last_name}</h2>
              <button className="close-btn" onClick={() => setSelectedAlumni(null)}>×</button>
            </div>
            <div className="modal-body">
              <p><strong>Position:</strong> {selectedAlumni.position}</p>
              <p><strong>Company:</strong> {selectedAlumni.company}</p>
              <p><strong>Industry:</strong> {selectedAlumni.industry}</p>
              <p><strong>Graduation Year:</strong> {selectedAlumni.graduation_year}</p>
              {selectedAlumni.linkedin_profile && (
                <p><strong>LinkedIn:</strong> <a href={selectedAlumni.linkedin_profile} target="_blank" rel="noopener noreferrer">View Profile</a></p>
              )}
              <div className="modal-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleMentorshipRequest(selectedAlumni.alumni_id)}
                  disabled={!selectedAlumni.is_available_for_mentorship}
                >
                  {selectedAlumni.is_available_for_mentorship ? 'Request Mentorship' : 'Not Available for Mentorship'}
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
              <div className="modal-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleInternshipApplication(selectedInternship.internship_id)}
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

export default UnifiedDashboard;