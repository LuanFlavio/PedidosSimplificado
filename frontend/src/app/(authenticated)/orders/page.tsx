'use client'

import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Chip,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { orderService } from '@/services/order.service'
import { OrderResponseDTO, OrderStatus } from '@/types/dtos'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  [OrderStatus.Received]: 'info',
  [OrderStatus.AwaitingPayment]: 'warning',
  [OrderStatus.PaymentApproved]: 'success',
  [OrderStatus.PaymentRejected]: 'error',
  [OrderStatus.StockReserved]: 'success',
  [OrderStatus.StockReservationCancelled]: 'error',
}

const statusLabels: Record<string, string> = {
  [OrderStatus.Received]: 'Recebido',
  [OrderStatus.AwaitingPayment]: 'Aguardando Pagamento',
  [OrderStatus.PaymentApproved]: 'Pagamento Aprovado',
  [OrderStatus.PaymentRejected]: 'Pagamento Rejeitado',
  [OrderStatus.StockReserved]: 'Estoque Reservado',
  [OrderStatus.StockReservationCancelled]: 'Reserva Cancelada',
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderResponseDTO[]>([])
  const [loading, setLoading] = useState(true)
  const { isLoading: isAuthLoading } = useAuth()

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const data = await orderService.getAll()
      setOrders(data)
    } catch (err) {
      toast.error('Erro ao carregar pedidos. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (loading || isAuthLoading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Pedidos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Número do Pedido</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>
                  <Chip label={statusLabels[order.status]} color={statusColors[order.status]} size="small" />
                </TableCell>
                <TableCell>R$ {order.totalAmount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
