import type { ComponentProps } from "react";

interface TextFieldProps extends ComponentProps<"input"> {
  label: string;
}

// Auth formlarının input-u: hündürlük 60, radius 10, konteynerin tam eni, açıq boz fon.
export function TextField({ label, id, className = "", ...props }: TextFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[22px] font-normal leading-none tracking-normal text-ink"
      >
        {label}
      </label>
      <input
        id={id}
        className={`h-[60px] w-full rounded-[10px] border border-transparent bg-brand-soft px-4 text-[22px] leading-none text-ink outline-none transition-colors placeholder:font-light placeholder:text-[#BABBC2] focus:border-leaf focus:bg-white ${className}`}
        {...props}
      />
    </div>
  );
}
