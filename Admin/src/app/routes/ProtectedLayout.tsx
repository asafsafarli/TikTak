import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '@/entities/session'
import { Sidebar } from '@/widgets/sidebar'

export function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useSession()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-neutral-500">
        Yüklənir...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
