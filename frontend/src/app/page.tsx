'use client'

import { Container, Typography, Button, Box } from '@mui/material'
import Link from 'next/link'

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Sistema de Pedidos
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Bem-vindo ao nosso sistema simplificado de gerenciamento de pedidos. Aqui você pode gerenciar seus produtos e
          pedidos de forma fácil e eficiente.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button component={Link} href="/products" variant="contained" size="large">
            Ver Produtos
          </Button>
          <Button component={Link} href="/orders" variant="outlined" size="large">
            Ver Pedidos
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
