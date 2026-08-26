import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '@/entities/session'
import { SearchProvider } from '@/shared/lib/search-context'
import { Sidebar } from '@/widgets/sidebar'
import { Topbar } from '@/widgets/topbar'

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
    <SearchProvider>
      <div className="flex min-h-screen w-full flex-col bg-[#F4F4F9]">
        <Topbar />
        <div className="flex flex-1 gap-6 pt-[101px] pr-[189px] pb-6 pl-[180px]">
          <Sidebar />
          <main className="flex-1 rounded-xl bg-white p-6 shadow-sm">
            <Outlet />
          </main>
        </div>
      </div>
    </SearchProvider>
  )
}
