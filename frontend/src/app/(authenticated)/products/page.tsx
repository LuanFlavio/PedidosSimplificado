'use client'

import { Container, Typography, Box, Card, CardContent, CardMedia, Button, Grid, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { productService } from '@/services/product.service'
import { orderService } from '@/services/order.service'
import { ProductDTO } from '@/types/dtos'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [creatingOrder, setCreatingOrder] = useState<number | null>(null)
  const { isLoading: isAuthLoading } = useAuth()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await productService.getAll()
      setProducts(data)
    } catch (err) {
      toast.error('Erro ao carregar produtos. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateOrder = async (productId: number) => {
    setCreatingOrder(productId)
    try {
      await orderService.create({
        items: [
          {
            productId,
            quantity: 1,
          },
        ],
      })
      toast.success('Pedido criado com sucesso!')
      // Recarregar produtos após criar o pedido
      await loadProducts()
    } catch (err) {
      toast.error('Erro ao criar pedido. Tente novamente.')
    } finally {
      setCreatingOrder(null)
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
        Produtos
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Box key={product.id} sx={{ display: 'flex', gap: 4 }}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`https://picsum.photos/seed/${product.id}/200/140`}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  R$ {product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Estoque: {product.stockQuantity}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleCreateOrder(product.id)}
                  disabled={creatingOrder === product.id}
                >
                  {creatingOrder === product.id ? 'Criando Pedido...' : 'Fazer Pedido'}
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Grid>
    </Container>
  )
}
