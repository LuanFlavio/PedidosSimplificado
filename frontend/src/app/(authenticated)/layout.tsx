'use client'

import { Navbar } from '@/components/Navbar'
import { useAuth } from '@/hooks/useAuth'
import { CircularProgress, Container } from '@mui/material'

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
