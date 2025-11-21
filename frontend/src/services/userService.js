import axios from 'axios'

const API_URL = '/api/users'

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

// User API calls
const register = async (userData) => {
  const response = await api.post('/register', userData)
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
  }
  return response.data
}

const login = async (userData) => {
  const response = await api.post('/login', userData)
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
  }
  return response.data
}

const getProfile = async () => {
  const response = await api.get('/profile')
  return response.data
}

const updateProfile = async (userData) => {
  const response = await api.put('/profile', userData)
  return response.data
}

const userService = {
  register,
  login,
  getProfile,
  updateProfile
}

export default userService