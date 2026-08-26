import { NavLink } from 'react-router-dom'
import { LogoutButton } from '@/features/auth/logout'
import { navItems } from '../model/nav-items'

export function Sidebar() {
  return (
    <aside className="flex min-h-[482px] w-[390px] shrink-0 flex-col gap-1 self-start rounded-[10px]">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `rounded-md px-3 py-2 text-[20px] leading-[100%] font-normal tracking-normal transition-colors ${
              isActive ? 'text-[#6FCF54]' : 'text-neutral-700 hover:text-neutral-900'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
      <LogoutButton />
    </aside>
  )
}
