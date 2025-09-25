export type Chromosome = number[];

export interface Individual {
  chromosome: Chromosome;
  fitness: number;
}

export type Population = Individual[];
