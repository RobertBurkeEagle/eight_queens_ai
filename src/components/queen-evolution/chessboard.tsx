
"use client";
import React, { useState, useRef } from 'react';
import { QueenIcon } from "./queen-icon";
import { cn } from "@/lib/utils";
import type { Chromosome } from "@/lib/types";

interface ChessboardProps {
  queens: Chromosome;
  onQueenPositionChange?: (newQueens: Chromosome) => void;
  isDraggable?: boolean;
}

export default function Chessboard({ queens, onQueenPositionChange, isDraggable = false }: ChessboardProps) {
  const boardSize = 8;
  const boardRef = useRef<HTMLDivElement>(null);
  const [draggingQueen, setDraggingQueen] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, col: number) => {
    if (!isDraggable) return e.preventDefault();
    setDraggingQueen(col);
    e.dataTransfer.effectAllowed = 'move';
     // Use a transparent image to hide default drag preview
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggingQueen === null || !boardRef.current) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    const squareSize = boardRect.width / boardSize;
    const clientX = e.clientX;
    const clientY = e.clientY;

    const droppedRow = Math.floor((clientY - boardRect.top) / squareSize);
    const droppedCol = Math.floor((clientX - boardRect.left) / squareSize);

    if (droppedRow >= 0 && droppedRow < boardSize) {
      const newQueens = [...queens];
      // Find which queen was originally at the dropped column
      const originalQueenCol = newQueens.findIndex((row, col) => col === droppedCol);
      
      if(originalQueenCol !== -1) {
          // Swap positions
          const temp = newQueens[draggingQueen];
          newQueens[draggingQueen] = newQueens[originalQueenCol];
          newQueens[originalQueenCol] = temp;
      } else {
        // This case should ideally not happen if we drag from a queen
        newQueens[draggingQueen] = droppedRow;
      }

      onQueenPositionChange?.(newQueens);
    }

    setDraggingQueen(null);
  };

  const handleDragEnd = () => {
    setDraggingQueen(null);
  };

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
    <div 
      ref={boardRef}
      className="relative grid grid-cols-8 grid-rows-8 w-full aspect-square border-4 border-card-foreground/20 rounded-md overflow-hidden shadow-lg"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {squares}
      {queens.map((row, col) => (
        <div
          key={col}
          draggable={isDraggable}
          onDragStart={(e) => handleDragStart(e, col)}
          onDragEnd={handleDragEnd}
          className={cn(
            "absolute w-[12.5%] h-[12.5%] p-1 transition-transform duration-500 ease-in-out",
            isDraggable && "cursor-grab",
            draggingQueen === col && "opacity-50 cursor-grabbing"
          )}
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
