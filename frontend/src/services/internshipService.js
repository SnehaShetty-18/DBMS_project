import axios from 'axios'

const API_URL = '/api/internships'

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

// Internship API calls
const getAllInternships = async () => {
  const response = await api.get('/')
  return response.data
}

const getInternshipById = async (id) => {
  const response = await api.get(`/${id}`)
  return response.data
}

const createInternship = async (internshipData) => {
  const response = await api.post('/', internshipData)
  return response.data
}

const updateInternship = async (id, internshipData) => {
  const response = await api.put(`/${id}`, internshipData)
  return response.data
}

const deleteInternship = async (id) => {
  const response = await api.delete(`/${id}`)
  return response.data
}

const applyForInternship = async (id, applicationData) => {
  const response = await api.post(`/${id}/apply`, applicationData)
  return response.data
}

const getApplications = async (id) => {
  const response = await api.get(`/${id}/applications`)
  return response.data
}

const getMyInternships = async () => {
  const response = await api.get('/my')
  return response.data
}

const internshipService = {
  getAllInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
  applyForInternship,
  getApplications,
  getMyInternships
}

export default internshipService