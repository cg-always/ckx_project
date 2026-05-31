import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

apiClient.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    return Promise.reject(err)
  }
)

export async function isApiAvailable() {
  try {
    const res = await apiClient.get('/health', { timeout: 3000 })
    return res.data?.status === 'ok'
  } catch {
    return false
  }
}

/** Glossary */
export const glossaryAPI = {
  getAll: (params = {}) => apiClient.get('/glossary', { params }),
  getById: (id) => apiClient.get(`/glossary/${id}`),
  create: (data) => apiClient.post('/glossary', data),
  update: (id, data) => apiClient.put(`/glossary/${id}`, data),
  delete: (id) => apiClient.delete(`/glossary/${id}`)
}

/** Cases */
export const casesAPI = {
  getAll: () => apiClient.get('/cases'),
  getById: (id) => apiClient.get(`/cases/${id}`),
  create: (data) => apiClient.post('/cases', data),
  update: (id, data) => apiClient.put(`/cases/${id}`, data),
  delete: (id) => apiClient.delete(`/cases/${id}`)
}

/** Links */
export const linksAPI = {
  getAll: (params = {}) => apiClient.get('/links', { params }),
  create: (data) => apiClient.post('/links', data),
  update: (id, data) => apiClient.put(`/links/${id}`, data),
  delete: (id) => apiClient.delete(`/links/${id}`)
}

/** Templates */
export const templatesAPI = {
  getAll: () => apiClient.get('/templates'),
  getContent: (id) => apiClient.get(`/templates/${id}`)
}

/** Auth */
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  me: () => apiClient.get('/auth/me')
}

/** Feedback */
export const feedbackAPI = {
  submit: (data) => apiClient.post('/feedback', data),
  getAll: () => apiClient.get('/feedback')
}

/** Checklists */
export const checklistsAPI = {
  getAll: () => apiClient.get('/checklists'),
  getById: (id) => apiClient.get(`/checklists/${id}`),
  create: (data) => apiClient.post('/checklists', data),
  update: (id, data) => apiClient.put(`/checklists/${id}`, data),
  delete: (id) => apiClient.delete(`/checklists/${id}`)
}

/** Admin */
export const adminAPI = {
  stats: () => apiClient.get('/admin/stats'),
  users: () => apiClient.get('/admin/users')
}

export default apiClient
