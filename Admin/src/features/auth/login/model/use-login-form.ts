import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '@/entities/session'
import { ApiError } from '@/shared/api/client'

export function useLoginForm() {
  const { login } = useSession()
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await login(phone, password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Giriş uğursuz oldu')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { phone, setPhone, password, setPassword, error, isSubmitting, handleSubmit }
}
