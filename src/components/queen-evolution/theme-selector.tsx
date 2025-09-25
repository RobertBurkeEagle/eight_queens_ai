
"use client";

import { useState, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { themes, type Theme } from "@/lib/themes";

export default function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>('green');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("queens-evolution-theme") || 'green';
    applyTheme(themes.find(t => t.name === storedTheme) || themes[0]);
  }, []);


  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme.cssVars)) {
      root.style.setProperty(key, value);
    }
    localStorage.setItem("queens-evolution-theme", theme.name);
    setCurrentTheme(theme.name);
  };

  if (!mounted) {
    return (
        <Button variant="outline" size="icon" disabled>
          <Palette className="h-5 w-5" />
          <span className="sr-only">Change Theme</span>
        </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Change Theme</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline uppercase tracking-widest">Select a Theme</DialogTitle>
          <DialogDescription>
            Choose a color palette for the application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => applyTheme(theme)}
              className={cn(
                "relative p-4 rounded-none border-2 flex flex-col items-center justify-center space-y-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                currentTheme === theme.name ? "border-primary" : "border-muted"
              )}
            >
              {currentTheme === theme.name && (
                <div className="absolute top-2 right-2 p-1 bg-primary text-primary-foreground rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              )}
              <div className="flex space-x-2">
                <div
                  className="h-8 w-8 rounded-sm"
                  style={{ backgroundColor: `hsl(${theme.cssVars['--background']})` }}
                ></div>
                <div
                  className="h-8 w-8 rounded-sm"
                  style={{ backgroundColor: `hsl(${theme.cssVars['--primary']})` }}
                ></div>
                <div
                  className="h-8 w-8 rounded-sm"
                  style={{ backgroundColor: `hsl(${theme.cssVars['--accent']})` }}
                ></div>
              </div>
              <span className="font-display text-sm font-medium">{theme.displayName}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
