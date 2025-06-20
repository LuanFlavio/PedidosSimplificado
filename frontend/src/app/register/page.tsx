'use client'

import { Box, Container, TextField, Button, Typography, Alert, Card, CardContent, Link } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'
import { RegisterDTO } from '@/types/dtos'
import NextLink from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data: RegisterDTO = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    }

    try {
      const response = await authService.register(data)
      if (response.flag) {
        router.push('/login')
      } else {
        setError(response.message)
      }
    } catch (err) {
      setError('Erro ao fazer registro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Card sx={{ width: '100%', boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
              Registro
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nome completo"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar senha"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                {loading ? 'Registrando...' : 'Registrar'}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link component={NextLink} href="/login" variant="body2">
                  Já tem uma conta? Faça login
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
