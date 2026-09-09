import type { ComponentProps } from "react";

// Auth formlarının əsas düyməsi: 60px hündürlük, radius 10, yaşıl (#76CB4F).
export function Button({ className = "", ...props }: ComponentProps<"button">) {
  return (
    <button
      className={`inline-flex h-[60px] w-full items-center justify-center rounded-[10px] bg-leaf px-4 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}
