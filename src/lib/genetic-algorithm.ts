
import type { Chromosome, Individual, Population } from "./types";

const BOARD_SIZE = 8;
export const MAX_FITNESS = (BOARD_SIZE * (BOARD_SIZE - 1)) / 2; // 28 for 8 queens

// Fisher-Yates shuffle to create a valid initial chromosome (no row/col conflicts)
function shuffle(array: number[]): number[] {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export function createChromosome(): Chromosome {
  const initial = Array.from({ length: BOARD_SIZE }, (_, i) => i);
  return shuffle(initial);
}

export function calculateFitness(chromosome: Chromosome): number {
  let clashes = 0;
  for (let i = 0; i < chromosome.length; i++) {
    for (let j = i + 1; j < chromosome.length; j++) {
      if (Math.abs(i - j) === Math.abs(chromosome[i] - chromosome[j])) {
        clashes++;
      }
    }
  }
  return MAX_FITNESS - clashes;
}

export function createInitialPopulation(size: number): Population {
  const population: Population = [];
  for (let i = 0; i < size; i++) {
    const chromosome = createChromosome();
    const fitness = calculateFitness(chromosome);
    population.push({ chromosome, fitness });
  }
  return population;
}

function tournamentSelection(population: Population): Individual {
  const tournamentSize = 5;
  let best = null;
  for (let i = 0; i < tournamentSize; i++) {
    const randomIndividual =
      population[Math.floor(Math.random() * population.length)];
    if (best === null || randomIndividual.fitness > best.fitness) {
      best = randomIndividual;
    }
  }
  return best!;
}

// Ordered Crossover (OX1)
function crossover(parent1: Chromosome, parent2: Chromosome): [Chromosome, Chromosome] {
  const size = parent1.length;
  const start = Math.floor(Math.random() * size);
  const end = Math.floor(Math.random() * (size - start)) + start;

  const child1 = Array(size).fill(-1);
  const child2 = Array(size).fill(-1);

  // Copy segment from parents to children
  for(let i = start; i <= end; i++) {
    child1[i] = parent1[i];
    child2[i] = parent2[i];
  }

  // Fill remaining genes from other parent
  let p2Index = 0;
  let p1Index = 0;

  for (let i = 0; i < size; i++) {
    if(child1[i] === -1) {
      while(child1.includes(parent2[p2Index])) {
        p2Index++;
      }
      child1[i] = parent2[p2Index];
    }
    if(child2[i] === -1) {
        while(child2.includes(parent1[p1Index])) {
            p1Index++;
        }
        child2[i] = parent1[p1Index];
    }
  }
  return [child1, child2];
}


function mutate(chromosome: Chromosome, mutationRate: number): Chromosome {
  if (Math.random() < mutationRate) {
    const i = Math.floor(Math.random() * chromosome.length);
    let j = Math.floor(Math.random() * chromosome.length);
    while (i === j) {
      j = Math.floor(Math.random() * chromosome.length);
    }
    [chromosome[i], chromosome[j]] = [chromosome[j], chromosome[i]];
  }
  return chromosome;
}

export function evolve(
  population: Population,
  mutationRate: number
): Population {
  const newPopulation: Population = [];
  const eliteSize = Math.max(2, Math.floor(population.length * 0.1)); // Elitism

  // Sort by fitness and carry over the best individuals
  const sortedPopulation = [...population].sort((a, b) => b.fitness - a.fitness);
  for (let i = 0; i < eliteSize; i++) {
    newPopulation.push(sortedPopulation[i]);
  }

  while (newPopulation.length < population.length) {
    const parent1 = tournamentSelection(population);
    const parent2 = tournamentSelection(population);
    let [child1Chromosome, child2Chromosome] = crossover(parent1.chromosome, parent2.chromosome);
    
    child1Chromosome = mutate(child1Chromosome, mutationRate);
    child2Chromosome = mutate(child2Chromosome, mutationRate);
    
    newPopulation.push({
        chromosome: child1Chromosome,
        fitness: calculateFitness(child1Chromosome)
    });
    if (newPopulation.length < population.length) {
        newPopulation.push({
            chromosome: child2Chromosome,
            fitness: calculateFitness(child2Chromosome)
        });
    }
  }

  return newPopulation;
}
