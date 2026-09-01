import { NavLink } from 'react-router-dom'
import { LogoutButton } from '@/features/auth/logout'
import { navItems } from '../model/nav-items'

export function Sidebar() {
  return (
    <aside className="w-full shrink-0 rounded-[10px] bg-white px-8 pt-[42px] pb-[88px] shadow-sm lg:mt-2 lg:min-h-[482px] lg:w-[390px]">
      <nav className="flex flex-col">
        {navItems.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `border-b border-neutral-100 pb-[27px] text-[20px] leading-[100%] font-normal tracking-normal transition-colors ${
                index === 0 ? 'pt-0' : 'pt-[27px]'
              } ${isActive ? 'text-[#6FCF54]' : 'text-neutral-800 hover:text-neutral-950'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <LogoutButton />
      </nav>
    </aside>
  )
}
