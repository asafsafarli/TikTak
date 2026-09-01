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
      className="pt-[27px] pb-0 text-left text-[20px] leading-[100%] font-normal tracking-normal text-neutral-800 transition-colors hover:text-red-600"
    >
      Çıxış
    </button>
  )
}
