import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSuggestions } from "@/hooks/use-suggestions";
import SearchSuggestions from "./SearchSuggestions";
import TrendingSuggestions from "./TrendingSuggestions";

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ initialQuery = "", onSearch }: SearchBarProps) {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState<string>(initialQuery);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { suggestions, loading } = useSuggestions(query);
  
  const showSuggestions = isFocused && (suggestions.length > 0 || query.trim() === "");
  
  // Update query if initialQuery changes (for controlled component behavior)
  useEffect(() => {
    if (initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);
  
  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Handle arrow key navigation
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        // Use the selected suggestion
        const selectedQuery = suggestions[selectedIndex].word;
        handleSuggestionClick(selectedQuery);
        // Submit the form or perform search
        handleSearch(selectedQuery);
      } else {
        // Just search with the current query
        handleSearch(query);
      }
    } else if (e.key === "Escape") {
      // Close suggestions and blur input
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };
  
  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery}`);
      
      // If onSearch prop is provided, use that
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        // Otherwise navigate to search results page
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
      
      // Hide suggestions after search
      setIsFocused(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };
  
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay hiding suggestions to allow for clicks
            setTimeout(() => setIsFocused(false), 200);
          }}
          onKeyDown={handleKeyDown}
          className="pr-12 h-12 text-base rounded-full border-2 focus-visible:ring-2 focus-visible:ring-offset-0"
        />
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="absolute right-1"
          onClick={() => handleSearch()}
        >
          <Search className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
      
      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute w-full mt-2 rounded-lg border bg-background shadow-lg z-50 overflow-hidden">
          {query.trim() ? (
            <SearchSuggestions 
              suggestions={suggestions} 
              query={query}
              selectedIndex={selectedIndex}
              onSuggestionClick={(suggestion) => {
                handleSuggestionClick(suggestion);
                // Automatically search when clicking a suggestion
                handleSearch(suggestion);
              }}
            />
          ) : (
            <TrendingSuggestions 
              onSuggestionClick={(suggestion) => {
                handleSuggestionClick(suggestion);
                // Automatically search when clicking a trending suggestion
                handleSearch(suggestion);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}