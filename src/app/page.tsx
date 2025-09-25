
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
import ThemeSelector from "@/components/queen-evolution/theme-selector";

const createAcceptableInitialIndividual = (): Individual => {
  let individual: Individual;
  let fitness = 0;
  let attempts = 0;
  do {
    const chromosome = createChromosome();
    fitness = calculateFitness(chromosome);
    individual = { chromosome, fitness };
    attempts++;
  } while (fitness > 10 && attempts < 1000); // Add attempt limit to prevent infinite loops
  
  if (fitness > 10) {
    // Fallback if a suitable individual isn't found quickly
    const chromosome = createChromosome();
    individual = { chromosome, fitness: calculateFitness(chromosome) };
  }

  return individual;
}


export default function Home() {
  const [populationSize, setPopulationSize] = useState(100);
  const [mutationRate, setMutationRate] = useState(0.1);
  const [simulationState, setSimulationState] = useState<
    "stopped" | "running" | "paused"
  >("stopped");
  const [generation, setGeneration] = useState(0);
  const [bestIndividual, setBestIndividual] =
    useState<Individual | null>(null);
  const [displayIndividual, setDisplayIndividual] =
    useState<Individual | null>(null);
  const [simulationHistory, setSimulationHistory] = useState<any[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [displayMode, setDisplayMode] = useState<'random' | 'best'>('random');

  const populationRef = useRef<Population>([]);
  const animationFrameId = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  const resetSimulation = useCallback(() => {
    setSimulationState("stopped");
    const acceptableIndividual = createAcceptableInitialIndividual();
    let initialPopulation = createInitialPopulation(populationSize-1, acceptableIndividual.chromosome);
    initialPopulation.push(acceptableIndividual)

    populationRef.current = initialPopulation;
    setBestIndividual(acceptableIndividual);
    setDisplayIndividual(acceptableIndividual);
    setGeneration(0);
    setElapsedTime(0);
    pausedTimeRef.current = 0;
  }, [populationSize]);

  useEffect(() => {
    // This effect runs only on the client, after initial render
    // It prevents the hydration error.
    if (typeof window !== 'undefined') {
      const initialIndividual = createAcceptableInitialIndividual();
      setBestIndividual(initialIndividual);
      setDisplayIndividual(initialIndividual);

      let initialPopulation = createInitialPopulation(populationSize - 1, initialIndividual.chromosome);
      initialPopulation.push(initialIndividual);
      populationRef.current = initialPopulation;
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const runSimulation = useCallback(() => {
    if (simulationState !== "running") return;

    let currentPopulation = populationRef.current;
    if (currentPopulation.length === 0) {
      const acceptableIndividual = createAcceptableInitialIndividual();
      currentPopulation = createInitialPopulation(populationSize - 1, acceptableIndividual.chromosome);
      currentPopulation.push(acceptableIndividual);
    }
    
    const newPopulation = evolve(currentPopulation, mutationRate);
    populationRef.current = newPopulation;
    
    const bestInGeneration = newPopulation.reduce((best, current) =>
      current.fitness > best.fitness ? current : best
    );

    setGeneration((prev) => prev + 1);
    setBestIndividual(bestInGeneration);
    setElapsedTime(pausedTimeRef.current + (performance.now() - startTimeRef.current));


    if (bestInGeneration.fitness === MAX_FITNESS) {
      setSimulationState("stopped");
      setDisplayIndividual(bestInGeneration);
      const finalTime = pausedTimeRef.current + (performance.now() - startTimeRef.current);
      setSimulationHistory(prev => [...prev, {
        populationSize,
        mutationRate,
        generations: generation + 1,
        finalFitness: bestInGeneration.fitness,
        time: finalTime,
      }]);
      setElapsedTime(finalTime);
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

  useEffect(() => {
    let displayInterval: NodeJS.Timeout | undefined;

    if (simulationState === 'running') {
      if (displayMode === 'random' && populationRef.current.length > 0) {
        displayInterval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * populationRef.current.length);
          setDisplayIndividual(populationRef.current[randomIndex]);
        }, 1000);
      } else {
        setDisplayIndividual(bestIndividual);
      }
    } else if (bestIndividual) {
      setDisplayIndividual(bestIndividual);
    }

    return () => {
      if (displayInterval) {
        clearInterval(displayInterval);
      }
    };
  }, [simulationState, bestIndividual, displayMode]);


  const handleStart = () => {
    if (simulationState === 'stopped' || (bestIndividual && bestIndividual.fitness === MAX_FITNESS)) {
      resetSimulation();
      pausedTimeRef.current = 0;
    }
    startTimeRef.current = performance.now();
    setSimulationState("running");
  };

  const handlePause = () => {
    pausedTimeRef.current = elapsedTime;
    setSimulationState("paused");
  }
  const handleReset = () => resetSimulation();
  
  const handleApplySuggestion = (params: { populationSize: number, mutationRate: number }) => {
    setPopulationSize(params.populationSize);
    setMutationRate(params.mutationRate);
    resetSimulation();
  };

  const handleQueenPositionChange = (newChromosome: Chromosome) => {
    if (simulationState !== "running") {
      const newFitness = calculateFitness(newChromosome);
      const newIndividual = { chromosome: newChromosome, fitness: newFitness };
      setBestIndividual(newIndividual);
      setDisplayIndividual(newIndividual);
      
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
        const initialPop = createInitialPopulation(populationSize, newIndividual.chromosome);
        initialPop[0] = newIndividual;
        populationRef.current = initialPop;
      }
    }
  };

  const handleToggleDisplayMode = () => {
    setDisplayMode(prev => prev === 'random' ? 'best' : 'random');
  };

  if (!displayIndividual || !bestIndividual) {
    return (
        <main className="min-h-screen bg-background text-foreground font-body p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <p>Loading...</p>
        </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-body p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 relative">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-widest uppercase">
            Queens Evolution
          </h1>
          <p className="mt-4 text-lg text-muted-foreground font-display">
            Solving the 8-Queens Puzzle with a Genetic Algorithm
          </p>
          <div className="absolute top-0 right-0">
            <ThemeSelector />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex justify-center items-start">
            <div className="w-full max-w-2xl aspect-square">
              <Chessboard 
                queens={displayIndividual.chromosome}
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
              elapsedTime={elapsedTime}
            />
            <ControlsCard
              simulationState={simulationState}
              populationSize={populationSize}
              mutationRate={mutationRate}
              displayMode={displayMode}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onPopulationChange={setPopulationSize}
              onMutationRateChange={setMutationRate}
              onToggleDisplayMode={handleToggleDisplayMode}
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
