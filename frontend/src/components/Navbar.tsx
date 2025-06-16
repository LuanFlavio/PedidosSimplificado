import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'
import toast from 'react-hot-toast'

export function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authService.logout()
      toast.success('Logout realizado com sucesso!')
      router.push('/login')
    } catch (err) {
      toast.error('Erro ao fazer logout. Tente novamente.')
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Pedidos
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => router.push('/products')}>
            Produtos
          </Button>
          <Button color="inherit" onClick={() => router.push('/orders')}>
            Pedidos
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
