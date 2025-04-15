import React from "react";
import { highlightText } from "@/utils/highlight-text";
import { Suggestion } from "@/lib/datamuse";

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
  if (!suggestions.length) return null;
  
  return (
    <ul 
      id="search-suggestions" 
      className="py-1" 
      role="listbox"
      aria-label="Search suggestions"
    >
      {suggestions.map((suggestion, index) => (
        <li 
          key={`${suggestion.word}-${index}`}
          role="option"
          aria-selected={index === selectedIndex}
          className={`
            px-4 py-2 text-sm cursor-pointer flex items-center
            ${index === selectedIndex ? 'bg-muted' : 'hover:bg-muted/50'}
          `}
          onClick={() => onSuggestionClick(suggestion.word)}
        >
          <div className="flex-1 truncate">
            {highlightText(suggestion.word, query)}
          </div>
          <div className="text-xs text-muted-foreground ml-2">
            {suggestion.score > 900 ? 'Popular' : ''}
          </div>
        </li>
      ))}
    </ul>
  );
}
