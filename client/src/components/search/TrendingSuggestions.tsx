import React from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendingSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

// Mock trending suggestions - in a real app, these might come from an API
const trendingSuggestions = [
  "artificial intelligence",
  "machine learning",
  "web development",
  "climate change",
  "cryptocurrency",
  "quantum computing",
  "augmented reality",
  "sustainable energy"
];

export default function TrendingSuggestions({ onSuggestionClick }: TrendingSuggestionsProps) {
  return (
    <div className="p-2">
      <div className="p-2 mb-1">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center">
          <TrendingUp className="h-4 w-4 mr-2" />
          Trending Searches
        </h3>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {trendingSuggestions.map((suggestion, index) => (
          <li 
            key={index}
            className={cn(
              "flex items-center rounded-md px-3 py-1.5 text-sm cursor-pointer",
              "hover:bg-muted/50 transition-colors"
            )}
            onClick={() => onSuggestionClick(suggestion)}
          >
            <span className="mr-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
              {index + 1}
            </span>
            <span className="truncate">{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}