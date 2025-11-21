import axios from 'axios'

const API_URL = '/api/alumni'

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

// Alumni API calls
const getAllAlumni = async () => {
  const response = await api.get('/')
  return response.data
}

const getAlumniById = async (id) => {
  const response = await api.get(`/${id}`)
  return response.data
}

const updateAlumniProfile = async (alumniData) => {
  const response = await api.put('/profile', alumniData)
  return response.data
}

const getMyRequests = async () => {
  const response = await api.get('/mentorship/requests')
  return response.data.requests || response.data
}

const updateMentorshipRequestStatus = async (requestId, statusData) => {
  const response = await api.put(`/mentorship/requests/${requestId}`, statusData)
  return response.data
}

const alumniService = {
  getAllAlumni,
  getAlumniById,
  updateAlumniProfile,
  getMyRequests,
  updateMentorshipRequestStatus
}

export default alumniService