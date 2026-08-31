import { useSearch } from '@/shared/lib/search-context'

export function Topbar() {
  const { search, setSearch } = useSearch()

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-[84px] w-full max-w-[1560px] items-center gap-10 px-4 2xl:px-0">
        <span className="shrink-0 text-[40px] leading-[100%] font-extrabold tracking-[0.03em] text-neutral-900">
          TIK TAK ADMİN
        </span>

        <div className="flex flex-1 justify-center">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Axtarış"
            className="h-[45px] w-full max-w-[586px] rounded-[10px] bg-neutral-100 px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
          />
        </div>
      </div>
    </header>
  )
}
