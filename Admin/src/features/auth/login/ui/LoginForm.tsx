import { useLoginForm } from '../model/use-login-form'
import { Button } from '@/shared/ui/button'

export function LoginForm() {
  const { phone, setPhone, password, setPassword, error, isSubmitting, handleSubmit } =
    useLoginForm()

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="phone"
          className="text-[22px] font-normal leading-[100%] tracking-normal text-neutral-500"
        >
          Telefon
        </label>
        <input
          id="phone"
          type="tel"
          required
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="telefon"
          className="h-[60px] rounded-[10px] bg-neutral-100 px-4 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-300"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-[22px] font-normal leading-[100%] tracking-normal text-neutral-500"
        >
          Parol
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="parol"
          className="h-[60px] rounded-[10px] bg-neutral-100 px-4 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-300"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-[60px] w-full rounded-[10px] text-center text-[26px] leading-[100%] font-medium tracking-normal text-white hover:brightness-95"
        style={{ backgroundColor: '#92D871' }}
      >
        {isSubmitting ? 'Giriş edilir...' : 'Daxil ol'}
      </Button>
    </form>
  )
}
