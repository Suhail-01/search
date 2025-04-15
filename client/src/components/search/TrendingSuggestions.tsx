import React from "react";
import { TrendingUp } from "lucide-react";

interface TrendingSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

// These would typically come from an API, but for the demo we'll hardcode some trending topics
const trendingSearches = [
  "artificial intelligence",
  "machine learning",
  "data science",
  "web development",
  "react hooks",
  "tailwind css",
  "javascript",
  "typescript",
];

export default function TrendingSuggestions({ onSuggestionClick }: TrendingSuggestionsProps) {
  return (
    <div className="p-3">
      <div className="flex items-center mb-2 px-1">
        <TrendingUp className="h-4 w-4 text-muted-foreground mr-2" />
        <span className="text-sm font-medium">Trending Searches</span>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {trendingSearches.map((search, index) => (
          <li key={index}>
            <button
              className="w-full text-left px-3 py-2 text-sm rounded hover:bg-muted transition-colors"
              onClick={() => onSuggestionClick(search)}
              type="button"
            >
              {search}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
