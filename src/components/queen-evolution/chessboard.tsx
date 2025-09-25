"use client";

import { QueenIcon } from "./queen-icon";
import { cn } from "@/lib/utils";
import type { Chromosome } from "@/lib/types";

interface ChessboardProps {
  queens: Chromosome;
}

export default function Chessboard({ queens }: ChessboardProps) {
  const boardSize = 8;
  const squares = [];

  for (let i = 0; i < boardSize * boardSize; i++) {
    const row = Math.floor(i / boardSize);
    const col = i % boardSize;
    const isLight = (row + col) % 2 !== 0;
    squares.push(
      <div
        key={i}
        className={cn(
          "w-full h-full",
          isLight ? "bg-background" : "bg-accent/20"
        )}
      />
    );
  }

  return (
    <div className="relative grid grid-cols-8 grid-rows-8 w-full aspect-square border-4 border-card-foreground/20 rounded-md overflow-hidden shadow-lg">
      {squares}
      {queens.map((row, col) => (
        <div
          key={col}
          className="absolute w-[12.5%] h-[12.5%] p-1 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translate(${col * 100}%, ${row * 100}%)`,
          }}
        >
          <QueenIcon className="text-primary-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />
        </div>
      ))}
    </div>
  );
}
