"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Sparkles, Loader2 } from "lucide-react";
import { getAiSuggestions } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

interface AiAdvisorCardProps {
  history: any[];
  onApplySuggestion: (params: { populationSize: number; mutationRate: number }) => void;
  disabled: boolean;
}

export default function AiAdvisorCard({ history, onApplySuggestion, disabled }: AiAdvisorCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{
    populationSize: number;
    mutationRate: number;
    reasoning: string;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    try {
      const historyString = JSON.stringify(history.slice(-5)); // Send last 5 runs
      const result = await getAiSuggestions(historyString);
      setSuggestion(result);
      setIsDialogOpen(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Advisor Error",
        description: "Could not fetch suggestions. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleApply = () => {
    if (suggestion) {
      onApplySuggestion({
        populationSize: suggestion.populationSize,
        mutationRate: suggestion.mutationRate
      });
      setIsDialogOpen(false);
    }
  }

  return (
    <Card className="font-display">
      <CardHeader>
        <CardTitle className="uppercase tracking-widest">Heuristic Advisor</CardTitle>
        <CardDescription>
          Get AI-powered parameter suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full" onClick={handleGetSuggestion} disabled={isLoading || disabled}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4 text-accent" />
              )}
              Get Suggestion
            </Button>
          </DialogTrigger>
          {suggestion && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-headline uppercase tracking-widest">AI Suggestion</DialogTitle>
                <DialogDescription>
                  The AI suggests the following parameters based on recent simulations.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4 font-display">
                <div className="p-4 bg-secondary rounded-none">
                  <h4 className="font-bold text-lg">Suggested Parameters</h4>
                  <p>Population Size: <span className="font-bold text-primary">{suggestion.populationSize}</span></p>
                  <p>Mutation Rate: <span className="font-bold text-primary">{(suggestion.mutationRate * 100).toFixed(1)}%</span></p>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Reasoning</h4>
                  <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button onClick={handleApply}>Apply & Reset</Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
}
