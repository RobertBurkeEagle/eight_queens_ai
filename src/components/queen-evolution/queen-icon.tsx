import { cn } from "@/lib/utils";

export function QueenIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45 45"
      fill="currentColor"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-full h-full", className)}
    >
        {/* Crown */}
        <path d="M13 13 L 9 5 L 15 9 L 22.5 5 L 30 9 L 36 5 L 32 13 Z" strokeLinejoin="miter" />

        {/* Head and Body */}
        <path d="M22.5 14c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38-1.95 1.22-3.28 3.28-3.28 5.62h13c0-2.34-1.33-4.4-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />
        
        {/* Base */}
        <path d="M12 36h21v-3H12v3z" />
        <path d="M15 33h15v-3H15v3z" />
        <path d="M12 27h21v-3H12v3z" />
        <path d="M12 24h21v-3H12v3z" />
    </svg>
  );
}
