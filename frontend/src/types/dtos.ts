export interface User {
  id: number
  name: string
  email: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl?: string
  category: string
  stock: number
}

export interface Order {
  id: number
  userId: number
  status: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED'
  total: number
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: number
  orderId: number
  productId: number
  quantity: number
  price: number
  product: Product
}

export interface LoginDTO {
  email: string
  password: string
}

export interface RegisterDTO {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface LoginResponse {
  flag: boolean
  message: string
  token?: string
}

export interface RegistrationResponse {
  flag: boolean
  message: string
}

export interface ProductDTO {
  id: number
  name: string
  description: string
  price: number
  stockQuantity: number
}

export interface CreateOrderDTO {
  items: OrderItemDTO[]
}

export interface OrderItemDTO {
  productId: number
  quantity: number
}

export interface OrderItemResponseDTO {
  productId: number
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface OrderResponseDTO {
  id: number
  userId: string
  status: OrderStatus
  totalAmount: number
  createdAt: string
  items: OrderItemResponseDTO[]
}

export enum OrderStatus {
  Received = 'Received',
  AwaitingPayment = 'AwaitingPayment',
  PaymentApproved = 'PaymentApproved',
  PaymentRejected = 'PaymentRejected',
  StockReserved = 'StockReserved',
  StockReservationCancelled = 'StockReservationCancelled',
}
