import api from '@/lib/axios'
import { CreateOrderDTO, OrderResponseDTO } from '@/types/dtos'

export const orderService = {
  async getAll() {
    const response = await api.get<OrderResponseDTO[]>('/api/orders')
    return response.data
  },

  async getById(id: number) {
    const response = await api.get<OrderResponseDTO>(`/api/orders/${id}`)
    return response.data
  },

  async create(data: CreateOrderDTO) {
    const response = await api.post<OrderResponseDTO>('/api/orders', data)
    return response.data
  },
}
