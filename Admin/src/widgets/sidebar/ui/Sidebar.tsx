import { NavLink } from 'react-router-dom'
import { useSession } from '@/entities/session'
import { LogoutButton } from '@/features/auth/logout'
import { navItems } from '../model/nav-items'

export function Sidebar() {
  const { profile } = useSession()

  return (
    <aside className="flex w-60 shrink-0 flex-col justify-between border-r border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-6">
        <span className="text-lg font-semibold text-neutral-900">TikTak Admin</span>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-2 border-t border-neutral-200 pt-4">
        {profile && <span className="text-sm text-neutral-600">{profile.full_name}</span>}
        <LogoutButton />
      </div>
    </aside>
  )
}
