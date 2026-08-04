import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,

  (error) => {
    // Network / Connection Error
    if (!error.response) {
      return Promise.reject({
        status: 0,
        message: 'Unable to connect to the server. Please try again.',
        errors: {},
      })
    }

    const { status, data } = error.response

    return Promise.reject({
      status,
      message: status === 422 ? null : data.message,
      errors: data.errors ?? {},
    })
  }
)

export default api