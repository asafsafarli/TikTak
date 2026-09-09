import { Navigate } from 'react-router-dom'
import { useSession } from '@/entities/session'
import { LoginForm } from '@/features/auth/login'
import loginIllustration from '@/shared/assets/login.webp'

export function LoginPage() {
  const { isAuthenticated, isLoading } = useSession()

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="flex min-h-screen w-full bg-white">
      <div className="hidden w-1/2 flex-col gap-10 p-10 min-[1800px]:flex">
        <h1 className="text-[50px] leading-[100%] font-extrabold tracking-[0.03em] text-neutral-900">
          TIK TAK ADMİN
        </h1>
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <img
            src={loginIllustration}
            alt="Admin Control Panel"
            className="h-[744px] w-[744px] object-contain"
          />
        </div>
      </div>
      <div className="hidden w-[2px] self-stretch bg-[#D9D9D9] min-[1800px]:block" />
      <div className="flex w-full flex-col items-center justify-center gap-8 p-10 min-[1800px]:w-1/2">
        <div className="flex w-full max-w-[566px] flex-col items-center gap-3">
          <span className="h-[40px] w-[161px] text-[26px] font-normal leading-[100%] tracking-normal text-neutral-700">
            Admin Panel
          </span>

          <span className="h-px w-full bg-neutral-200" />
        </div>

        <div className="w-full max-w-[566px]">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
