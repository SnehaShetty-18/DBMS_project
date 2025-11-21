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

const StudentDashboard = () => {
  const { user, role } = useAuth()
  const [userData, setUserData] = useState(null)
  const [alumniData, setAlumniData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        if (user) {
          // Fetch actual user profile from backend
          const profileData = await userService.getProfile()
          
          // Fetch alumni data from backend
          const alumniList = await alumniService.getAllAlumni()
          
          // Mock additional data for student dashboard elements
          const mockStats = [
            { label: 'My Connections', value: alumniList.length },
            { label: 'Mentorship Requests', value: 3 },
            { label: 'Internship Applications', value: 2 },
            { label: 'Upcoming Events', value: 5 }
          ]

          // Mock timeline events
          const mockEvents = [
            {
              title: 'Connected with John Smith',
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

          // Mock connections based on real alumni data
          const connections = alumniList.slice(0, 3).map(alum => ({
            name: `${alum.User.first_name} ${alum.User.last_name}`,
            position: alum.position || 'Not specified',
            company: alum.company || 'Not specified'
          }))

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
            { application_id: 2, status: 'accepted' }
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
            connections: connections,
            upcomingEvents: mockUpcomingEvents,
            mentorshipRequests: mockMentorshipRequests,
            internships: mockInternships,
            applications: mockApplications,
            feedback: mockFeedback
          })
          
          setAlumniData(alumniList)
        }
      } catch (err) {
        setError('Failed to fetch user data')
        console.error('Error fetching user data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [user])

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Student Dashboard</h1>
        <div className="flex-center">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <h1 className="page-title">Student Dashboard</h1>
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="flex-between mb-4">
        <h1 className="page-title">Student Dashboard</h1>
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
              <h4>Find Alumni</h4>
              <p>Connect with alumni in your field</p>
              <Link to="/alumni" className="btn mt-2">Browse Alumni</Link>
            </div>
            <div className="card text-center">
              <h4>Request Mentorship</h4>
              <p>Get guidance from professionals</p>
              <Link to="/mentorship" className="btn mt-2">Request Mentor</Link>
            </div>
            <div className="card text-center">
              <h4>Find Internships</h4>
              <p>Discover opportunities</p>
              <Link to="/internships" className="btn mt-2">Browse Internships</Link>
            </div>
            <div className="card text-center">
              <h4>Give Feedback</h4>
              <p>Rate your mentors</p>
              <Link to="/feedback" className="btn mt-2">Leave Feedback</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard