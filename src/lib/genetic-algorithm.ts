
import type { Chromosome, Individual, Population, Queen } from "./types";

const BOARD_SIZE = 8;
export const MAX_FITNESS = (BOARD_SIZE * (BOARD_SIZE - 1)) / 2; // 28 for 8 queens

export function createChromosome(): Chromosome {
  const chromosome: Chromosome = [];
  const positions = new Set<string>();

  for (let i = 0; i < BOARD_SIZE; i++) {
    let row, col, posKey;
    do {
      row = Math.floor(Math.random() * BOARD_SIZE);
      col = Math.floor(Math.random() * BOARD_SIZE);
      posKey = `${row},${col}`;
    } while (positions.has(posKey));

    positions.add(posKey);
    chromosome.push({
      id: i,
      row,
      col,
    });
  }
  return chromosome;
}

export function calculateFitness(chromosome: Chromosome): number {
  let clashes = 0;
  for (let i = 0; i < chromosome.length; i++) {
    for (let j = i + 1; j < chromosome.length; j++) {
      const q1 = chromosome[i];
      const q2 = chromosome[j];
      // Same row, same column, or same diagonal
      if (
        q1.row === q2.row ||
        q1.col === q2.col ||
        Math.abs(q1.row - q2.row) === Math.abs(q1.col - q2.col)
      ) {
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

// Single-point crossover for queen positions
function crossover(parent1: Chromosome, parent2: Chromosome): [Chromosome, Chromosome] {
    const size = parent1.length;
    const crossoverPoint = Math.floor(Math.random() * (size - 1)) + 1;
    
    const child1Chromosome = [
        ...parent1.slice(0, crossoverPoint),
        ...parent2.slice(crossoverPoint)
    ].map((queen, index) => ({ ...queen, id: index }));

    const child2Chromosome = [
        ...parent2.slice(0, crossoverPoint),
        ...parent1.slice(crossoverPoint)
    ].map((queen, index) => ({ ...queen, id: index }));

    return [child1Chromosome, child2Chromosome];
}


function mutate(chromosome: Chromosome, mutationRate: number): Chromosome {
  const newChromosome = [...chromosome];
  const positions = new Set(newChromosome.map(q => `${q.row},${q.col}`));

  return newChromosome.map(queen => {
    if (Math.random() < mutationRate) {
      let newRow, newCol, posKey;
      
      // Attempt to find an empty square for the mutated queen
      let attempts = 0;
      const maxAttempts = BOARD_SIZE * BOARD_SIZE; // Avoid infinite loops

      do {
        // Small chance to move to a completely new random square
        if (Math.random() < 0.1 || attempts > 20) {
          newRow = Math.floor(Math.random() * BOARD_SIZE);
          newCol = Math.floor(Math.random() * BOARD_SIZE);
        } else {
          // Nudge the queen to an adjacent square
          const rowChange = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          const colChange = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          newRow = Math.max(0, Math.min(BOARD_SIZE - 1, queen.row + rowChange));
          newCol = Math.max(0, Math.min(BOARD_SIZE - 1, queen.col + colChange));
        }
        posKey = `${newRow},${newCol}`;
        attempts++;
      } while (positions.has(posKey) && attempts < maxAttempts);


      // Update positions set for next mutations in the same generation
      positions.delete(`${queen.row},${queen.col}`);
      positions.add(posKey);

      return { ...queen, row: newRow, col: newCol };
    }
    return queen;
  });
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
