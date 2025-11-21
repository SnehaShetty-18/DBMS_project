import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import userService from '../services/userService'
import UserProfile from '../components/UserProfile'
import Statistics from '../components/Statistics'
import Timeline from '../components/Timeline'
import Connections from '../components/Connections'
import UpcomingEvents from '../components/UpcomingEvents'
import MentorshipDashboard from '../components/MentorshipDashboard'
import InternshipDashboard from '../components/InternshipDashboard'
import FeedbackDashboard from '../components/FeedbackDashboard'
import BackAndLogout from '../components/BackAndLogout'

const Profile = () => {
  const { user, role } = useAuth()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch actual user profile from backend
        const profileData = await userService.getProfile()
        
        // Mock statistics
        const mockStats = [
          { label: 'Connections', value: 24 },
          { label: 'Mentorship Requests', value: 5 },
          { label: 'Internship Applications', value: 3 },
          { label: 'Events Attended', value: 8 }
        ]

        // Mock timeline events
        const mockEvents = [
          {
            title: 'Connected with Jane Smith',
            description: 'Connected with an alumni in your field',
            time: '2 hours ago'
          },
          {
            title: 'Applied to Software Engineering Internship',
            description: 'Applied to internship at Tech Corp',
            time: '1 day ago'
          },
          {
            title: 'Joined Networking Event',
            description: 'Attended Virtual Networking Event',
            time: '3 days ago'
          }
        ]

        // Mock connections
        const mockConnections = [
          { name: 'Jane Smith', position: 'Product Manager', company: 'Innovation Inc' },
          { name: 'Robert Johnson', position: 'Senior Developer', company: 'Tech Corp' },
          { name: 'Sarah Williams', position: 'Data Scientist', company: 'Data Insights' }
        ]

        // Mock events
        const mockUpcomingEvents = [
          {
            title: 'Alumni Networking Night',
            description: 'Virtual networking event with alumni',
            date: 'Nov 5, 2025',
            time: '6:00 PM - 8:00 PM'
          },
          {
            title: 'Career Workshop: Resume Building',
            description: 'Learn how to create an effective resume',
            date: 'Nov 12, 2025',
            time: '2:00 PM - 4:00 PM'
          }
        ]

        // Mock mentorship requests
        const mockMentorshipRequests = [
          { request_id: 1, status: 'accepted' },
          { request_id: 2, status: 'pending' },
          { request_id: 3, status: 'completed' }
        ]

        // Mock internships and applications
        const mockInternships = [
          { internship_id: 1, title: 'Software Engineering Intern' }
        ]

        const mockApplications = [
          { application_id: 1, status: 'pending' },
          { application_id: 2, status: 'accepted' },
          { application_id: 3, status: 'rejected' }
        ]

        // Mock feedback
        const mockFeedback = [
          { feedback_id: 1, rating: 5, comment: 'Great mentor!' },
          { feedback_id: 2, rating: 4, comment: 'Helpful guidance' },
          { feedback_id: 3, rating: 5, comment: 'Excellent support' }
        ]

        setUserData({
          user: profileData.user,
          profile: profileData.profile,
          role: profileData.role,
          stats: mockStats,
          events: mockEvents,
          connections: mockConnections,
          upcomingEvents: mockUpcomingEvents,
          mentorshipRequests: mockMentorshipRequests,
          internships: mockInternships,
          applications: mockApplications,
          feedback: mockFeedback
        })
      } catch (err) {
        setError('Failed to fetch profile data')
        console.error('Error fetching profile data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="container">
        <BackAndLogout />
        <h1 className="page-title">My Profile</h1>
        <div className="flex-center">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <BackAndLogout />
        <h1 className="page-title">My Profile</h1>
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  return (
    <div className="container">
      <BackAndLogout />
      <h1 className="page-title">My Profile</h1>
      
      <UserProfile user={userData.user} profile={userData.profile} />
      
      <Statistics stats={userData.stats} />
      
      <MentorshipDashboard 
        requests={userData.mentorshipRequests} 
        role={userData.role} 
      />
      
      <InternshipDashboard 
        internships={userData.internships} 
        applications={userData.applications} 
        role={userData.role} 
      />
      
      <FeedbackDashboard 
        feedback={userData.feedback} 
        role={userData.role} 
      />
      
      <div className="grid">
        <Timeline events={userData.events} />
        <Connections connections={userData.connections} />
      </div>
      
      <UpcomingEvents events={userData.upcomingEvents} />
    </div>
  )
}

export default Profile