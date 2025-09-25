"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCw } from "lucide-react";

interface ControlsCardProps {
  simulationState: "stopped" | "running" | "paused";
  populationSize: number;
  mutationRate: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onPopulationChange: (value: number) => void;
  onMutationRateChange: (value: number) => void;
  isSolved: boolean;
}

export default function ControlsCard({
  simulationState,
  populationSize,
  mutationRate,
  onStart,
  onPause,
  onReset,
  onPopulationChange,
  onMutationRateChange,
  isSolved,
}: ControlsCardProps) {
  const isRunning = simulationState === "running";

  return (
    <Card className="font-display">
      <CardHeader>
        <CardTitle className="uppercase tracking-widest">Controls</CardTitle>
        <CardDescription>
          Adjust parameters and run the simulation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 justify-stretch w-full">
          <Button
            onClick={onStart}
            disabled={isRunning}
            className="flex-1"
          >
            <Play className="mr-2 h-4 w-4" />
            {simulationState === 'paused' ? 'Resume' : 'Start'}
          </Button>
          <Button
            onClick={onPause}
            disabled={!isRunning}
            variant="secondary"
            className="flex-1"
          >
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </Button>
        </div>
        
        <div className="space-y-4 pt-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="population-slider">Population</Label>
              <span className="text-sm font-medium text-primary">{populationSize}</span>
            </div>
            <Slider
              id="population-slider"
              min={10}
              max={500}
              step={10}
              value={[populationSize]}
              onValueChange={(value) => onPopulationChange(value[0])}
              disabled={isRunning}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="mutation-slider">Mutation</Label>
              <span className="text-sm font-medium text-primary">{(mutationRate * 100).toFixed(0)}%</span>
            </div>
            <Slider
              id="mutation-slider"
              min={0}
              max={1}
              step={0.01}
              value={[mutationRate]}
              onValueChange={(value) => onMutationRateChange(value[0])}
              disabled={isRunning}
            />
          </div>
        </div>

        <Button onClick={onReset} variant="destructive" className="w-full">
          <RotateCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </CardContent>
    </Card>
  );
}
