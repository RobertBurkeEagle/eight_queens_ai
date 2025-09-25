import { cn } from "@/lib/utils";

export function QueenIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45 45"
      fill="currentColor"
      stroke="black"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-full h-full", className)}
    >
        <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38-1.95 1.22-3.28 3.28-3.28 5.62h13c0-2.34-1.33-4.4-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" stroke-linecap="round" />
        <path d="M12 36h21v-3H12v3z" />
        <path d="M15 33h15v-3H15v3z" />
        <path d="M12 27h21v-3H12v3z" />
        <path d="M12 24h21v-3H12v3z" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="12" cy="8" r="3" />
        <circle cx="22.5" cy="6.5" r="3" />
        <circle cx="33" cy="8" r="3" />
        <circle cx="39" cy="12" r="3" />
    </svg>
  );
}
