import React from "react";
import { Search } from "lucide-react";
import { Suggestion } from "@/lib/datamuse";
import { highlightText } from "@/utils/highlight-text";
import { cn } from "@/lib/utils";

interface SearchSuggestionsProps {
  suggestions: Suggestion[];
  query: string;
  selectedIndex: number;
  onSuggestionClick: (suggestion: string) => void;
}

export default function SearchSuggestions({ 
  suggestions, 
  query, 
  selectedIndex, 
  onSuggestionClick 
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No suggestions found
      </div>
    );
  }

  return (
    <ul className="py-2">
      {suggestions.map((suggestion, index) => (
        <li 
          key={`${suggestion.word}-${index}`}
          className={cn(
            "flex items-center px-4 py-2 cursor-pointer hover:bg-muted/50 transition-colors",
            index === selectedIndex && "bg-muted"
          )}
          onClick={() => onSuggestionClick(suggestion.word)}
          onMouseEnter={() => {/* Could update selected index on hover */}}
        >
          <Search className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
          <span>{highlightText(suggestion.word, query)}</span>
        </li>
      ))}
    </ul>
  );
}