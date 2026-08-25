import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface SearchContextValue {
  search: string
  setSearch: (value: string) => void
  debouncedSearch: string
}

const SearchContext = createContext<SearchContextValue | null>(null)

const DEBOUNCE_MS = 400

export function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), DEBOUNCE_MS)
    return () => clearTimeout(timeout)
  }, [search])

  return (
    <SearchContext.Provider value={{ search, setSearch, debouncedSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) throw new Error('useSearch must be used within a SearchProvider')
  return context
}
