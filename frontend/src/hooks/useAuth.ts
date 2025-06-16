import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth(requireAuth = true) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (requireAuth && !token) {
      router.push('/login')
    } else if (!requireAuth && token) {
      router.push('/products')
    }

    setIsLoading(false)
  }, [requireAuth, router])

  return { isLoading }
}
