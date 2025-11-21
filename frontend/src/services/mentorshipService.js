import axios from 'axios'

const API_URL = '/api/mentorship'

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

// Mentorship API calls
const getAllRequests = async () => {
  const response = await api.get('/')
  return response.data
}

const getRequestById = async (id) => {
  const response = await api.get(`/${id}`)
  return response.data
}

const updateRequestStatus = async (id, statusData) => {
  const response = await api.put(`/${id}/status`, statusData)
  return response.data
}

const getMessages = async (requestId) => {
  const response = await api.get(`/${requestId}/messages`)
  return response.data
}

const sendMessage = async (requestId, messageData) => {
  const response = await api.post(`/${requestId}/messages`, messageData)
  return response.data
}

const getMyRequests = async () => {
  const response = await api.get('/my')
  return response.data
}

const mentorshipService = {
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  getMessages,
  sendMessage,
  getMyRequests
}

export default mentorshipService