import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { fetchAdminProfile, loginAdmin } from '../api/session'
import { tokenStorage } from '@/shared/lib/token-storage'
import type { AdminProfile } from './types'

interface SessionContextValue {
  profile: AdminProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (phone: string, password: string) => Promise<void>
  logout: () => void
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = tokenStorage.getAccessToken()
    if (!token) {
      setIsLoading(false)
      return
    }

    fetchAdminProfile()
      .then((res) => setProfile(res.data))
      .catch(() => tokenStorage.clear())
      .finally(() => setIsLoading(false))
  }, [])

  async function login(phone: string, password: string) {
    const res = await loginAdmin(phone, password)
    tokenStorage.setTokens(res.data.tokens.access_token, res.data.tokens.refresh_token)
    setProfile(res.data.profile)
  }

  function logout() {
    tokenStorage.clear()
    setProfile(null)
  }

  return (
    <SessionContext.Provider
      value={{ profile, isAuthenticated: profile !== null, isLoading, login, logout }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) throw new Error('useSession must be used within a SessionProvider')
  return context
}
