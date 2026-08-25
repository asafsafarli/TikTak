import { useNavigate } from 'react-router-dom'
import { useSession } from '@/entities/session'

export function LogoutButton() {
  const { logout } = useSession()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-neutral-700 transition-colors hover:text-red-600"
    >
      Çıxış
    </button>
  )
}
