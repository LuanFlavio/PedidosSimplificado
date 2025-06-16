import api from '@/lib/axios'
import { LoginDTO, RegisterDTO, LoginResponse, RegistrationResponse, User } from '@/types/dtos'

export const authService = {
  async login(data: LoginDTO) {
    const response = await api.post<LoginResponse>('/api/User/login', data)
    if (response.data.flag && response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  },

  async register(data: RegisterDTO) {
    const response = await api.post<RegistrationResponse>('/api/User/register', data)
    return response.data
  },

  async getProfile(id: number) {
    const response = await api.get<User>(`/api/User/${id}`)
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
  },
}
