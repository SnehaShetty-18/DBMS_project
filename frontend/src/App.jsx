import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import SimpleNavbar from './components/SimpleNavbar'
import LandingNavbar from './components/LandingNavbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import AlumniDashboard from './pages/AlumniDashboard'
import AlumniList from './pages/AlumniList'
import MentorshipRequests from './pages/MentorshipRequests'
import InternshipList from './pages/InternshipList'
import Feedback from './pages/Feedback'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import About from './pages/About'
import UnifiedDashboard from './pages/UnifiedDashboard'
import LinkedInStyleDashboard from './pages/LinkedInStyleDashboard'
import AlumniLinkedInDashboard from './pages/AlumniLinkedInDashboard'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={
              <>
                <LandingNavbar />
                <main>
                  <Landing />
                </main>
                <Footer />
              </>
            } />
            <Route path="/login" element={
              <>
                <LandingNavbar />
                <main>
                  <Login />
                </main>
                <Footer />
              </>
            } />
            <Route path="/register" element={
              <>
                <LandingNavbar />
                <main>
                  <Register />
                </main>
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <LandingNavbar />
                <main>
                  <About />
                </main>
                <Footer />
              </>
            } />
            <Route 
              path="/student-dashboard" 
              element={
                <>
                  <SimpleNavbar />
                  <main>
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentDashboard />
                    </ProtectedRoute>
                  </main>
                  <Footer />
                </>
              } 
            />
            <Route 
              path="/alumni-dashboard" 
              element={
                <>
                  <SimpleNavbar />
                  <main>
                    <ProtectedRoute allowedRoles={['alumni']}>
                      <AlumniDashboard />
                    </ProtectedRoute>
                  </main>
                  <Footer />
                </>
              } 
            />
            <Route 
              path="/unified-dashboard" 
              element={
                <>
                  <SimpleNavbar />
                  <main>
                    <ProtectedRoute allowedRoles={['student', 'alumni']}>
                      <UnifiedDashboard />
                    </ProtectedRoute>
                  </main>
                  <Footer />
                </>
              } 
            />
            <Route 
              path="/linkedin-dashboard" 
              element={
                <>
                  <SimpleNavbar />
                  <main>
                    <ProtectedRoute allowedRoles={['student']}>
                      <LinkedInStyleDashboard />
                    </ProtectedRoute>
                  </main>
                  <Footer />
                </>
              } 
            />
            <Route 
              path="/alumni-linkedin-dashboard" 
              element={
                <>
                  <SimpleNavbar />
                  <main>
                    <ProtectedRoute allowedRoles={['alumni']}>
                      <AlumniLinkedInDashboard />
                    </ProtectedRoute>
                  </main>
                  <Footer />
                </>
              } 
            />
            <Route path="/alumni" element={
              <>
                <SimpleNavbar />
                <main>
                  <AlumniList />
                </main>
                <Footer />
              </>
            } />
            <Route path="/mentorship" element={
              <>
                <SimpleNavbar />
                <main>
                  <MentorshipRequests />
                </main>
                <Footer />
              </>
            } />
            <Route path="/internships" element={
              <>
                <SimpleNavbar />
                <main>
                  <InternshipList />
                </main>
                <Footer />
              </>
            } />
            <Route path="/feedback" element={
              <>
                <SimpleNavbar />
                <main>
                  <Feedback />
                </main>
                <Footer />
              </>
            } />
            <Route path="/profile" element={
              <>
                <SimpleNavbar />
                <main>
                  <Profile />
                </main>
                <Footer />
              </>
            } />
            <Route path="/edit-profile" element={
              <>
                <SimpleNavbar />
                <main>
                  <EditProfile />
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App