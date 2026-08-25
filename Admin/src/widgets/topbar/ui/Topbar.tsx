import { useSearch } from '@/shared/lib/search-context'

export function Topbar() {
  const { search, setSearch } = useSearch()

  return (
    <header className="flex items-center gap-6 bg-white pt-[29px] pr-[189px] pb-[21px] pl-[171px]">
      <span className="shrink-0 text-[40px] leading-[100%] font-extrabold tracking-[1.2px] text-neutral-900">
        TIK TAK ADMİN
      </span>

      <div className="flex flex-1 justify-center">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Axtarış"
          className="h-[45px] w-[586px] max-w-full rounded-[10px] bg-neutral-100 px-4 text-sm text-neutral-900 outline-none"
        />
      </div>
    </header>
  )
}
