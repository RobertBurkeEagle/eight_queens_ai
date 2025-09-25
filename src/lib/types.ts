export type Queen = {
  id: number;
  row: number;
  col: number;
};

export type Chromosome = Queen[];

export interface Individual {
  chromosome: Chromosome;
  fitness: number;
}

export type Population = Individual[];
