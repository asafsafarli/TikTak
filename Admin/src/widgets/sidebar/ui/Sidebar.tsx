import { NavLink } from 'react-router-dom'
import { LogoutButton } from '@/features/auth/logout'
import { navItems } from '../model/nav-items'

export function Sidebar() {
  return (
    <aside className="flex w-52 shrink-0 flex-col justify-between">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'text-[#6FCF54]' : 'text-neutral-700 hover:text-neutral-900'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-neutral-300/70 pt-3">
        <LogoutButton />
      </div>
    </aside>
  )
}
