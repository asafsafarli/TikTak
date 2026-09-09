import { useRouteError } from 'react-router-dom'

export function RouteError() {
  const error = useRouteError()
  const message =
    error instanceof Error ? error.message : 'Gözlənilməz xəta baş verdi. Bir az sonra yenidən cəhd edin.'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F4F4F9] p-6 text-center">
      <h1 className="text-[24px] font-semibold text-[#2B3043]">Nəsə səhv getdi</h1>
      <p className="max-w-md text-sm text-neutral-500">{message}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="h-10 rounded-[10px] px-5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#92D871' }}
      >
        Yenidən yüklə
      </button>
    </div>
  )
}
