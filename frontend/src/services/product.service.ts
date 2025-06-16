import api from '@/lib/axios'
import { ProductDTO } from '@/types/dtos'

export const productService = {
  async getAll() {
    const response = await api.get<ProductDTO[]>('/api/orders/products')
    return response.data
  },
}
