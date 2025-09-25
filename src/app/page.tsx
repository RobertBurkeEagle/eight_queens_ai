
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  createInitialPopulation,
  evolve,
  MAX_FITNESS,
  createChromosome,
  calculateFitness
} from "@/lib/genetic-algorithm";
import type { Chromosome, Individual, Population } from "@/lib/types";
import Chessboard from "@/components/queen-evolution/chessboard";
import StatsCard from "@/components/queen-evolution/stats-card";
import ControlsCard from "@/components/queen-evolution/controls-card";
import AiAdvisorCard from "@/components/queen-evolution/ai-advisor-card";

const initialChromosome: Chromosome = createChromosome();
const initialIndividual: Individual = {
  chromosome: initialChromosome,
  fitness: calculateFitness(initialChromosome),
};

export default function Home() {
  const [populationSize, setPopulationSize] = useState(100);
  const [mutationRate, setMutationRate] = useState(0.1);
  const [simulationState, setSimulationState] = useState<
    "stopped" | "running" | "paused"
  >("stopped");
  const [generation, setGeneration] = useState(0);
  const [bestIndividual, setBestIndividual] =
    useState<Individual>(initialIndividual);
  const [simulationHistory, setSimulationHistory] = useState<any[]>([]);

  const populationRef = useRef<Population>([]);
  const animationFrameId = useRef<number>();

  const resetSimulation = useCallback(() => {
    setSimulationState("stopped");
    const initialPopulation = createInitialPopulation(populationSize);
    populationRef.current = initialPopulation;
    const bestInitial = initialPopulation.reduce((best, current) =>
      current.fitness > best.fitness ? current : best
    );
    setBestIndividual(bestInitial);
    setGeneration(0);
  }, [populationSize]);

  useEffect(() => {
    resetSimulation();
  }, [resetSimulation]);

  const runSimulation = useCallback(() => {
    if (simulationState !== "running") return;

    let currentPopulation = populationRef.current;
    if (currentPopulation.length === 0) {
      currentPopulation = createInitialPopulation(populationSize);
    }
    
    const newPopulation = evolve(currentPopulation, mutationRate);
    populationRef.current = newPopulation;
    
    const bestInGeneration = newPopulation.reduce((best, current) =>
      current.fitness > best.fitness ? current : best
    );

    setGeneration((prev) => prev + 1);
    setBestIndividual(bestInGeneration);

    if (bestInGeneration.fitness === MAX_FITNESS) {
      setSimulationState("stopped");
      setSimulationHistory(prev => [...prev, {
        populationSize,
        mutationRate,
        generations: generation + 1,
        finalFitness: bestInGeneration.fitness,
      }]);
    } else {
      animationFrameId.current = requestAnimationFrame(runSimulation);
    }
  }, [simulationState, populationSize, mutationRate, generation]);

  useEffect(() => {
    if (simulationState === "running") {
      animationFrameId.current = requestAnimationFrame(runSimulation);
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [simulationState, runSimulation]);

  const handleStart = () => {
    if (simulationState === 'stopped' || bestIndividual.fitness === MAX_FITNESS) {
      resetSimulation();
    }
    setSimulationState("running");
  };

  const handlePause = () => setSimulationState("paused");
  const handleReset = () => resetSimulation();
  
  const handleApplySuggestion = (params: { populationSize: number, mutationRate: number }) => {
    setPopulationSize(params.populationSize);
    setMutationRate(params.mutationRate);
    resetSimulation();
  };

  const handleQueenPositionChange = (newChromosome: Chromosome) => {
    if (simulationState !== "running") {
      const newFitness = calculateFitness(newChromosome);
      setBestIndividual({ chromosome: newChromosome, fitness: newFitness });
      
      const newIndividual = { chromosome: newChromosome, fitness: newFitness };
      const currentPopulation = populationRef.current;
      if (currentPopulation.length > 0) {
        let worstIndex = 0;
        for (let i = 1; i < currentPopulation.length; i++) {
          if (currentPopulation[i].fitness < currentPopulation[worstIndex].fitness) {
            worstIndex = i;
          }
        }
        const newPopulation = [...currentPopulation];
        newPopulation[worstIndex] = newIndividual;
        populationRef.current = newPopulation;
      } else {
        const initialPop = createInitialPopulation(populationSize);
        initialPop[0] = newIndividual;
        populationRef.current = initialPop;
      }
    }
  };


  return (
    <main className="min-h-screen bg-background text-foreground font-body p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary-foreground tracking-tight">
            Queens Evolution
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Solving the 8-Queens Puzzle with a Genetic Algorithm
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex justify-center items-start">
            <div className="w-full max-w-2xl aspect-square">
              <Chessboard 
                queens={bestIndividual.chromosome}
                onQueenPositionChange={handleQueenPositionChange}
                isDraggable={simulationState !== "running"}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <StatsCard
              generation={generation}
              fitness={bestIndividual.fitness}
              maxFitness={MAX_FITNESS}
            />
            <ControlsCard
              simulationState={simulationState}
              populationSize={populationSize}
              mutationRate={mutationRate}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onPopulationChange={setPopulationSize}
              onMutationRateChange={setMutationRate}
              isSolved={bestIndividual.fitness === MAX_FITNESS}
            />
            <AiAdvisorCard
              history={simulationHistory}
              onApplySuggestion={handleApplySuggestion}
              disabled={simulationState === 'running'}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
