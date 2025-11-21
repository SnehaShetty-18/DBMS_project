import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import userService from '../services/userService'
import alumniService from '../services/alumniService'
import UserProfile from '../components/UserProfile'
import Statistics from '../components/Statistics'
import MentorshipDashboard from '../components/MentorshipDashboard'
import InternshipDashboard from '../components/InternshipDashboard'
import FeedbackDashboard from '../components/FeedbackDashboard'
import Timeline from '../components/Timeline'
import Connections from '../components/Connections'
import UpcomingEvents from '../components/UpcomingEvents'

const AlumniDashboard = () => {
  const { user, role } = useAuth()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          // Fetch actual user profile from backend
          const profileData = await userService.getProfile()
          
          // Mock statistics
          const mockStats = [
            { label: 'My Connections', value: 45 },
            { label: 'Mentorship Requests', value: 8 },
            { label: 'Internships Posted', value: 3 },
            { label: 'Upcoming Events', value: 2 }
          ]

          // Mock timeline events
          const mockEvents = [
            {
              title: 'Posted new internship',
              description: 'Software Engineering Intern position',
              time: '1 hour ago'
            },
            {
              title: 'Accepted mentorship request',
              description: 'From student Sneha Smith',
              time: '1 day ago'
            },
            {
              title: 'Received feedback',
              description: '5-star rating from mentee',
              time: '2 days ago'
            }
          ]

          // Mock connections
          const mockConnections = [
            { name: 'Sneha Smith', position: 'Computer Science Student', company: 'University' },
            { name: 'Robert Davis', position: 'Data Science Student', company: 'University' },
            { name: 'Jennifer Wilson', position: 'Product Manager', company: 'Startup Co.' }
          ]

          // Mock events
          const mockUpcomingEvents = [
            {
              title: 'Alumni Panel Discussion',
              description: 'Career advice for students',
              date: 'Nov 8, 2025',
              time: '3:00 PM - 5:00 PM'
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
            { internship_id: 1, title: 'Software Engineering Intern', applications: 12 },
            { internship_id: 2, title: 'Data Analyst Intern', applications: 8 },
            { internship_id: 3, title: 'Product Manager Intern', applications: 5 }
          ]

          const mockApplications = [
            { application_id: 1, status: 'pending' },
            { application_id: 2, status: 'accepted' }
          ]

          // Mock feedback
          const mockFeedback = [
            { feedback_id: 1, rating: 5, comment: 'Excellent mentor!' },
            { feedback_id: 2, rating: 5, comment: 'Very helpful and responsive' },
            { feedback_id: 3, rating: 4, comment: 'Great guidance' }
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
        }
      } catch (err) {
        setError('Failed to fetch user data')
        console.error('Error fetching user data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Alumni Dashboard</h1>
        <div className="flex-center">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <h1 className="page-title">Alumni Dashboard</h1>
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="flex-between mb-4">
        <h1 className="page-title">Alumni Dashboard</h1>
        <div>
          <Link to="/profile" className="btn">My Profile</Link>
        </div>
      </div>
      
      <UserProfile user={userData.user} profile={userData.profile} />
      
      <Statistics stats={userData.stats} />
      
      <div className="grid">
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
      </div>
      
      <div className="grid">
        <Timeline events={userData.events} />
        <div>
          <Connections connections={userData.connections} />
          <UpcomingEvents events={userData.upcomingEvents} />
        </div>
      </div>
      
      <div className="card mt-4">
        <div className="card-header">
          <h3>Quick Actions</h3>
        </div>
        <div className="card-body">
          <div className="grid">
            <div className="card text-center">
              <h4>Post Internship</h4>
              <p>Create new opportunities</p>
              <Link to="/internships/new" className="btn mt-2">Post Internship</Link>
            </div>
            <div className="card text-center">
              <h4>Manage Mentorship</h4>
              <p>Review requests</p>
              <Link to="/mentorship" className="btn mt-2">View Requests</Link>
            </div>
            <div className="card text-center">
              <h4>My Internships</h4>
              <p>Manage postings</p>
              <Link to="/internships" className="btn mt-2">View Internships</Link>
            </div>
            <div className="card text-center">
              <h4>View Feedback</h4>
              <p>See ratings</p>
              <Link to="/feedback" className="btn mt-2">View Feedback</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlumniDashboard