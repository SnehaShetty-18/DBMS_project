import axios from 'axios'

const API_URL = '/api/students'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Student API calls
const getAllStudents = async () => {
  const response = await api.get('/')
  return response.data
}

const getStudentById = async (id) => {
  const response = await api.get(`/${id}`)
  return response.data
}

const updateStudentProfile = async (studentData) => {
  const response = await api.put('/profile', studentData)
  return response.data
}

const createMentorshipRequest = async (requestData) => {
  const response = await api.post('/mentorship/request', requestData)
  return response.data
}

const getMyMentorshipRequests = async () => {
  const response = await api.get('/mentorship/requests')
  return response.data
}

const studentService = {
  getAllStudents,
  getStudentById,
  updateStudentProfile,
  createMentorshipRequest,
  getMyMentorshipRequests
}

export default studentService