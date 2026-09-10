import type { ComponentProps } from "react";

// Auth formlarının əsas düyməsi: 566×60, radius 10, yaşıl (#92D871).
export function Button({ className = "", ...props }: ComponentProps<"button">) {
  return (
    <button
      className={`inline-flex h-[60px] w-full items-center justify-center rounded-[10px] bg-[#92D871] px-4 text-[26px] font-medium leading-none text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}
