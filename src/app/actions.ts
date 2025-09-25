"use server";

import { suggestParameters } from "@/ai/flows/suggest-parameters";
import type { SuggestParametersOutput } from "@/ai/flows/suggest-parameters";

export async function getAiSuggestions(
  previousData: string
): Promise<SuggestParametersOutput> {
  try {
    const result = await suggestParameters({ previousData });
    return result;
  } catch (error) {
    console.error("Error getting AI suggestions:", error);
    throw new Error("Failed to get suggestions from AI.");
  }
}
