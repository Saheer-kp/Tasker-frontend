import api from './axios'

export const login = (data) => api.post('/v1/login', data)

export const register = (data) => api.post('/v1/register', data)  

export const logout = () => api.post('/v1/logout')

export const me = () => api.get('/v1/me')