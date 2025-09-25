"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatsCardProps {
  generation: number;
  fitness: number;
  maxFitness: number;
}

export default function StatsCard({
  generation,
  fitness,
  maxFitness,
}: StatsCardProps) {
  const fitnessPercentage = (fitness / maxFitness) * 100;
  
  return (
    <Card className="font-display">
      <CardHeader>
        <CardTitle className="uppercase tracking-widest">Statistics</CardTitle>
        <CardDescription>Real-time simulation data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-baseline">
          <p className="text-sm font-medium text-muted-foreground">GENERATION</p>
          <p className="text-2xl font-bold text-primary">{generation.toLocaleString()}</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <p className="text-sm font-medium text-muted-foreground">FITNESS</p>
            <p className="text-2xl font-bold text-primary">
              {fitness}/{maxFitness}
            </p>
          </div>
          <Progress value={fitnessPercentage} aria-label={`${fitnessPercentage.toFixed(0)}% complete`} />
        </div>
      </CardContent>
    </Card>
  );
}
