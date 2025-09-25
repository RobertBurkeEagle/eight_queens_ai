import { cn } from "@/lib/utils";

export function QueenIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="black"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-full h-full", className)}
    >
      <path d="M12 2L6 8h12L12 2z" />
      <path d="M12 9c-2.5 0-5 1.5-5 4v3h10v-3c0-2.5-2.5-4-5-4z" />
      <path d="M5 17h14v2H5z" />
      <circle cx="12" cy="4.5" r="1.5" fill="black" stroke="none" />
      <circle cx="8" cy="6.5" r="1.5" fill="black" stroke="none" />
      <circle cx="16" cy="6.5" r="1.5" fill="black" stroke="none" />
    </svg>
  );
}
