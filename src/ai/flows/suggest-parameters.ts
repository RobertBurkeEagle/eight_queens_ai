// src/ai/flows/suggest-parameters.ts
'use server';
/**
 * @fileOverview A parameter suggestion AI agent for the 8-Queens genetic algorithm.
 *
 * - suggestParameters - A function that suggests optimal values for genetic algorithm parameters.
 * - SuggestParametersInput - The input type for the suggestParameters function.
 * - SuggestParametersOutput - The return type for the suggestParameters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestParametersInputSchema = z.object({
  previousData: z
    .string()
    .describe(
      'JSON string containing previous simulation data (generation count, fitness score, population size, mutation rate) for the genetic algorithm.'
    )
    .optional(),
});
export type SuggestParametersInput = z.infer<typeof SuggestParametersInputSchema>;

const SuggestParametersOutputSchema = z.object({
  populationSize: z
    .number()
    .describe('Suggested population size for the genetic algorithm.'),
  mutationRate: z
    .number()
    .describe('Suggested mutation rate for the genetic algorithm.'),
  reasoning: z
    .string()
    .describe('Explanation of why the suggested parameters were chosen.'),
});
export type SuggestParametersOutput = z.infer<typeof SuggestParametersOutputSchema>;

export async function suggestParameters(input: SuggestParametersInput): Promise<SuggestParametersOutput> {
  return suggestParametersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestParametersPrompt',
  input: {schema: SuggestParametersInputSchema},
  output: {schema: SuggestParametersOutputSchema},
  prompt: `You are an expert in genetic algorithms, specializing in optimizing parameters for the 8-Queens problem.

Based on the previous simulation data, suggest optimal values for population size and mutation rate to achieve faster convergence and better solutions.

Provide a brief explanation of your reasoning for the suggested values. Take into account that the goal is to avoid local optima, ensure a good diversity in the population, and converge to a good solution quickly.

Previous Simulation Data: {{{previousData}}}

Consider the trade-offs between exploration (diversity) and exploitation (convergence) when suggesting parameter values.`,
});

const suggestParametersFlow = ai.defineFlow(
  {
    name: 'suggestParametersFlow',
    inputSchema: SuggestParametersInputSchema,
    outputSchema: SuggestParametersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
