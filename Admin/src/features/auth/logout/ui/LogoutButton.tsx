import { useNavigate } from 'react-router-dom'
import { useSession } from '@/entities/session'
import { Button } from '@/shared/ui/button'

export function LogoutButton() {
  const { logout } = useSession()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Çıxış
    </Button>
  )
}
