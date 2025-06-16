'use client'

import { Box, Container, TextField, Button, Typography, CircularProgress, Card, CardContent, Link } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'
import { LoginDTO } from '@/types/dtos'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import NextLink from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { isLoading } = useAuth(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data: LoginDTO = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    try {
      const response = await authService.login(data)
      if (response.flag) {
        localStorage.setItem('token', response.token!)
        toast.success('Login realizado com sucesso!')
        router.push('/products')
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      toast.error('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    )
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
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link component={NextLink} href="/register" variant="body2">
                  Não tem uma conta? Faça seu cadastro
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
